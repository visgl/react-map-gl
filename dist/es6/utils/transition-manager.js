import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import assert from './assert';
import { TransitionInterpolator, LinearInterpolator } from './transition';
import MapState from './map-state';

const noop = () => {};

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
export default class TransitionManager {
  constructor(props, getTime) {
    _defineProperty(this, "props", void 0);

    _defineProperty(this, "state", void 0);

    _defineProperty(this, "time", void 0);

    _defineProperty(this, "_animationFrame", null);

    _defineProperty(this, "_onTransitionFrame", () => {
      this._animationFrame = requestAnimationFrame(this._onTransitionFrame);

      this._updateViewport();
    });

    if (props) {
      this.props = props;
    }

    this.time = getTime || Date.now;
  }

  getViewportInTransition() {
    return this._animationFrame ? this.state.propsInTransition : null;
  }

  processViewportChange(nextProps) {
    const currentProps = this.props;
    this.props = nextProps;

    if (this._shouldIgnoreViewportChange(currentProps, nextProps)) {
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

  _isTransitionInProgress() {
    return Boolean(this._animationFrame);
  }

  _isTransitionEnabled(props) {
    const {
      transitionDuration,
      transitionInterpolator
    } = props;
    return (transitionDuration > 0 || transitionDuration === 'auto') && Boolean(transitionInterpolator);
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
      return this.state.interruption === TRANSITION_EVENTS.IGNORE || this._isUpdateDueToCurrentTransition(nextProps);
    }

    if (this._isTransitionEnabled(nextProps)) {
      return nextProps.transitionInterpolator.arePropsEqual(currentProps, nextProps);
    }

    return true;
  }

  _triggerTransition(startProps, endProps) {
    assert(this._isTransitionEnabled(endProps));

    if (this._animationFrame) {
      cancelAnimationFrame(this._animationFrame);
    }

    const {
      transitionInterpolator
    } = endProps;
    const duration = transitionInterpolator.getDuration ? transitionInterpolator.getDuration(startProps, endProps) : endProps.transitionDuration;

    if (duration === 0) {
      return;
    }

    const initialProps = endProps.transitionInterpolator.initializeProps(startProps, endProps);
    const interactionState = {
      inTransition: true,
      isZooming: startProps.zoom !== endProps.zoom,
      isPanning: startProps.longitude !== endProps.longitude || startProps.latitude !== endProps.latitude,
      isRotating: startProps.bearing !== endProps.bearing || startProps.pitch !== endProps.pitch
    };
    this.state = {
      duration,
      easing: endProps.transitionEasing,
      interpolator: endProps.transitionInterpolator,
      interruption: endProps.transitionInterruption,
      startTime: this.time(),
      startProps: initialProps.start,
      endProps: initialProps.end,
      animation: null,
      propsInTransition: {},
      interactionState
    };

    this._onTransitionFrame();

    this.props.onStateChange(interactionState);
  }

  _endTransition() {
    if (this._animationFrame) {
      cancelAnimationFrame(this._animationFrame);
      this._animationFrame = null;
    }

    this.props.onStateChange({
      inTransition: false,
      isZooming: false,
      isPanning: false,
      isRotating: false
    });
  }

  _updateViewport() {
    const currentTime = this.time();
    const {
      startTime,
      duration,
      easing,
      interpolator,
      startProps,
      endProps
    } = this.state;
    let shouldEnd = false;
    let t = (currentTime - startTime) / duration;

    if (t >= 1) {
      t = 1;
      shouldEnd = true;
    }

    t = easing(t);
    const viewport = interpolator.interpolateProps(startProps, endProps, t);
    const mapState = new MapState(Object.assign({}, this.props, viewport));
    this.state.propsInTransition = mapState.getViewportProps();
    this.props.onViewportChange(this.state.propsInTransition, this.state.interactionState, this.props);

    if (shouldEnd) {
      this._endTransition();

      this.props.onTransitionEnd();
    }
  }

}

_defineProperty(TransitionManager, "defaultProps", DEFAULT_PROPS);
//# sourceMappingURL=transition-manager.js.map