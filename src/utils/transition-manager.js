/* global requestAnimationFrame, cancelAnimationFrame */
import assert from './assert';
import {LinearInterpolator} from './transition';
import MapState from './map-state';

const noop = () => {};

// crops the old easing function from x0 to 1 where x0 is the interruption point
// returns a new easing function with domain [0, 1] and range [0, 1]
export function cropEasingFunction(easing, x0) {
  const y0 = easing(x0);
  return t => (1 / (1 - y0)) * (easing(t * (1 - x0) + x0) - y0);
}

export const TRANSITION_EVENTS = {
  BREAK: 1,
  SNAP_TO_END: 2,
  IGNORE: 3,
  UPDATE: 4
};

const DEFAULT_PROPS = {
  transitionDuration: 0,
  transitionEasing: t => t,
  transitionInterpolator: new LinearInterpolator(),
  transitionInterruption: TRANSITION_EVENTS.BREAK,
  onTransitionStart: noop,
  onTransitionInterrupt: noop,
  onTransitionEnd: noop,
  onViewportChange: noop,
  onStateChange: noop
};

export default class TransitionManager {
  static defaultProps = DEFAULT_PROPS;

  constructor(opts = {}) {
    this.props = null;
    this.onViewportChange = opts.onViewportChange || noop;
    this.onStateChange = opts.onStateChange || noop;
    this.time = opts.getTime || Date.now;
  }

  _animationFrame = null;

  // Returns current transitioned viewport.
  getViewportInTransition() {
    return this._animationFrame ? this.state.propsInTransition : null;
  }

  // Process the viewport change, either ignore or trigger a new transiton.
  // Return true if a new transition is triggered, false otherwise.
  processViewportChange(nextProps) {
    const currentProps = this.props;
    // Set this.props here as '_triggerTransition' calls '_updateViewport' that uses this.props.
    this.props = nextProps;

    // NOTE: Be cautious re-ordering statements in this function.
    if (!currentProps || this._shouldIgnoreViewportChange(currentProps, nextProps)) {
      return false;
    }

    if (this._isTransitionEnabled(nextProps)) {
      const startProps = Object.assign({}, currentProps);
      const endProps = Object.assign({}, nextProps);

      if (this._isTransitionInProgress()) {
        currentProps.onTransitionInterrupt();

        if (this.state.interruption === TRANSITION_EVENTS.SNAP_TO_END) {
          Object.assign(startProps, this.state.endProps);
        } else {
          Object.assign(startProps, this.state.propsInTransition);
        }

        if (this.state.interruption === TRANSITION_EVENTS.UPDATE) {
          const currentTime = this.time();
          const x0 = (currentTime - this.state.startTime) / this.state.duration;
          endProps.transitionDuration = this.state.duration - (currentTime - this.state.startTime);
          endProps.transitionEasing = cropEasingFunction(this.state.easing, x0);
          endProps.transitionInterpolator = startProps.transitionInterpolator;
        }
      }
      endProps.onTransitionStart();

      this._triggerTransition(startProps, endProps);

      return true;
    }

    if (this._isTransitionInProgress()) {
      currentProps.onTransitionInterrupt();
      this._endTransition();
    }

    return false;
  }

  // Helper methods

  _isTransitionInProgress() {
    return Boolean(this._animationFrame);
  }

  _isTransitionEnabled(props) {
    const {transitionDuration, transitionInterpolator} = props;
    return (
      (transitionDuration > 0 || transitionDuration === 'auto') && Boolean(transitionInterpolator)
    );
  }

  _isUpdateDueToCurrentTransition(props) {
    if (this.state.propsInTransition) {
      return this.state.interpolator.arePropsEqual(props, this.state.propsInTransition);
    }
    return false;
  }

  _shouldIgnoreViewportChange(currentProps, nextProps) {
    if (!currentProps) {
      return true;
    }
    if (this._isTransitionInProgress()) {
      // Ignore update if it is requested to be ignored
      return (
        this.state.interruption === TRANSITION_EVENTS.IGNORE ||
        // Ignore update if it is due to current active transition.
        this._isUpdateDueToCurrentTransition(nextProps)
      );
    }
    if (this._isTransitionEnabled(nextProps)) {
      // Ignore if none of the viewport props changed.
      return nextProps.transitionInterpolator.arePropsEqual(currentProps, nextProps);
    }

    return true;
  }

  _triggerTransition(startProps, endProps) {
    assert(this._isTransitionEnabled(endProps));

    if (this._animationFrame) {
      cancelAnimationFrame(this._animationFrame);
    }

    // update transitionDuration for 'auto' mode
    const {transitionInterpolator} = endProps;
    const duration = transitionInterpolator.getDuration
      ? transitionInterpolator.getDuration(startProps, endProps)
      : endProps.transitionDuration;

    if (duration === 0) {
      return;
    }

    const initialProps = endProps.transitionInterpolator.initializeProps(startProps, endProps);

    const interactionState = {
      inTransition: true,
      isZooming: startProps.zoom !== endProps.zoom,
      isPanning:
        startProps.longitude !== endProps.longitude || startProps.latitude !== endProps.latitude,
      isRotating: startProps.bearing !== endProps.bearing || startProps.pitch !== endProps.pitch
    };

    this.state = {
      // Save current transition props
      duration,
      easing: endProps.transitionEasing,
      interpolator: endProps.transitionInterpolator,
      interruption: endProps.transitionInterruption,

      startTime: this.time(),
      startProps: initialProps.start,
      endProps: initialProps.end,
      animation: null,
      propsInTransition: {}
    };
    this._onTransitionFrame();
    this.onStateChange(interactionState);
  }

  _onTransitionFrame = () => {
    // _updateViewport() may cancel the animation
    this._animationFrame = requestAnimationFrame(this._onTransitionFrame);
    this._updateViewport();
  };

  _endTransition() {
    if (this._animationFrame) {
      cancelAnimationFrame(this._animationFrame);
      this._animationFrame = null;
    }
    this.onStateChange({
      inTransition: false,
      isZooming: false,
      isPanning: false,
      isRotating: false
    });
  }

  _updateViewport() {
    // NOTE: Be cautious re-ordering statements in this function.
    const currentTime = this.time();
    const {startTime, duration, easing, interpolator, startProps, endProps} = this.state;
    let shouldEnd = false;
    let t = (currentTime - startTime) / duration;
    if (t >= 1) {
      t = 1;
      shouldEnd = true;
    }
    t = easing(t);

    const viewport = interpolator.interpolateProps(startProps, endProps, t);
    // Normalize viewport props
    const mapState = new MapState(Object.assign({}, this.props, viewport));
    this.state.propsInTransition = mapState.getViewportProps();

    this.onViewportChange(this.state.propsInTransition, this.props);

    if (shouldEnd) {
      this._endTransition();
      this.props.onTransitionEnd();
    }
  }
}
