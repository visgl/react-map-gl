/* global requestAnimationFrame, cancelAnimationFrame */
import assert from './assert';
import {LinearInterpolator} from './transition';
import MapState from './map-state';

const noop = () => {};

// crops the old easing function from x0 to 1 where x0 is the interruption point
// returns a new easing function with domain [0, 1] and range [0, 1]
export function cropEasingFunction(easing, x0) {
  const y0 = easing(x0);
  return t => 1 / (1 - y0) * (easing(t * (1 - x0) + x0) - y0);
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

const DEFAULT_STATE = {
  animation: null,
  propsInTransition: null,
  startProps: null,
  endProps: null
};

export default class TransitionManager {
  constructor(props) {
    this.props = props;
    this.state = DEFAULT_STATE;

    this._onTransitionFrame = this._onTransitionFrame.bind(this);
  }

  // Returns current transitioned viewport.
  getViewportInTransition() {
    return this.state.propsInTransition;
  }

  // Process the viewport change, either ignore or trigger a new transiton.
  // Return true if a new transition is triggered, false otherwise.
  processViewportChange(nextProps) {
    let transitionTriggered = false;
    const currentProps = this.props;
    // Set this.props here as '_triggerTransition' calls '_updateViewport' that uses this.props.
    this.props = nextProps;

    if (!currentProps) {
      return false;
    }

    // NOTE: Be cautious re-ordering statements in this function.
    if (this._shouldIgnoreViewportChange(currentProps, nextProps)) {
      return transitionTriggered;
    }

    const isTransitionInProgress = this._isTransitionInProgress();

    if (this._isTransitionEnabled(nextProps)) {
      const startProps = Object.assign({}, currentProps,
        this.state.interruption === TRANSITION_EVENTS.SNAP_TO_END ?
          this.state.endProps : this.state.propsInTransition
      );

      const currentTime = Date.now();
      if (this.state.interruption === TRANSITION_EVENTS.UPDATE) {
        const x0 = (currentTime - this.state.startTime) / this.state.duration;
        nextProps.transitionDuration = this.state.duration - (currentTime - this.state.startTime);
        nextProps.transitionEasing = cropEasingFunction(this.state.easing, x0);
        nextProps.transitionInterpolator = startProps.transitionInterpolator;
      }

      if (isTransitionInProgress) {
        currentProps.onTransitionInterrupt();
      }
      nextProps.onTransitionStart();

      this._triggerTransition(startProps, nextProps);

      transitionTriggered = true;
    } else if (isTransitionInProgress) {
      currentProps.onTransitionInterrupt();
      this._endTransition();
    }

    return transitionTriggered;
  }

  // Helper methods

  _isTransitionInProgress() {
    return Boolean(this.state.propsInTransition);
  }

  _isTransitionEnabled(props) {
    return props.transitionDuration > 0 && Boolean(props.transitionInterpolator);
  }

  _isUpdateDueToCurrentTransition(props) {
    if (this.state.propsInTransition) {
      return this.state.interpolator.arePropsEqual(props, this.state.propsInTransition);
    }
    return false;
  }

  _shouldIgnoreViewportChange(currentProps, nextProps) {
    if (this._isTransitionInProgress()) {
      // Ignore update if it is requested to be ignored
      return this.state.interruption === TRANSITION_EVENTS.IGNORE ||
        // Ignore update if it is due to current active transition.
        this._isUpdateDueToCurrentTransition(nextProps);
    } else if (this._isTransitionEnabled(nextProps)) {
      // Ignore if none of the viewport props changed.
      return nextProps.transitionInterpolator.arePropsEqual(currentProps, nextProps);
    }
    return true;
  }

  _triggerTransition(startProps, endProps) {
    assert(this._isTransitionEnabled(endProps), 'Transition is not enabled');

    cancelAnimationFrame(this.state.animation);

    const initialProps = endProps.transitionInterpolator.initializeProps(
      startProps,
      endProps
    );

    const interactionState = {
      inTransition: true,
      isZooming: startProps.zoom !== endProps.zoom,
      isPanning: startProps.longitude !== endProps.longitude ||
        startProps.latitude !== endProps.latitude,
      isRotating: startProps.bearing !== endProps.bearing ||
        startProps.pitch !== endProps.pitch
    };

    this.state = {
      // Save current transition props
      duration: endProps.transitionDuration,
      easing: endProps.transitionEasing,
      interpolator: endProps.transitionInterpolator,
      interruption: endProps.transitionInterruption,

      startTime: Date.now(),
      startProps: initialProps.start,
      endProps: initialProps.end,
      animation: null,
      propsInTransition: {},
      interactionState
    };
    this._onTransitionFrame();
    this.props.onStateChange(interactionState);
  }

  _onTransitionFrame() {
    // _updateViewport() may cancel the animation
    this.state.animation = requestAnimationFrame(this._onTransitionFrame);
    this._updateViewport();
  }

  _endTransition() {
    cancelAnimationFrame(this.state.animation);
    this.state = DEFAULT_STATE;
    this.props.onStateChange({
      inTransition: false,
      isZooming: false,
      isPanning: false,
      isRotating: false
    });
  }

  _updateViewport() {
    // NOTE: Be cautious re-ordering statements in this function.
    const currentTime = Date.now();
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

    this.props.onViewportChange(
      this.state.propsInTransition,
      this.state.interactionState,
      this.props
    );

    if (shouldEnd) {
      this._endTransition();
      this.props.onTransitionEnd();
    }
  }
}

TransitionManager.defaultProps = DEFAULT_PROPS;
