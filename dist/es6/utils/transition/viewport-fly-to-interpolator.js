import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import assert from '../assert';
import TransitionInterpolator from './transition-interpolator';
import { flyToViewport, getFlyToDuration } from 'viewport-mercator-project';
import { isValid, getEndValueByShortestPath } from './transition-utils';
import { lerp } from '../math-utils';
const VIEWPORT_TRANSITION_PROPS = ['longitude', 'latitude', 'zoom', 'bearing', 'pitch'];
const REQUIRED_PROPS = ['latitude', 'longitude', 'zoom', 'width', 'height'];
const LINEARLY_INTERPOLATED_PROPS = ['bearing', 'pitch'];
const DEFAULT_OPTS = {
  speed: 1.2,
  curve: 1.414
};
export default class ViewportFlyToInterpolator extends TransitionInterpolator {
  constructor(props = {}) {
    super();

    _defineProperty(this, "speed", void 0);

    _defineProperty(this, "propNames", VIEWPORT_TRANSITION_PROPS);

    _defineProperty(this, "props", void 0);

    this.props = Object.assign({}, DEFAULT_OPTS, props);
  }

  initializeProps(startProps, endProps) {
    const startViewportProps = {};
    const endViewportProps = {};

    for (const key of REQUIRED_PROPS) {
      const startValue = startProps[key];
      const endValue = endProps[key];
      assert(isValid(startValue) && isValid(endValue), "".concat(key, " must be supplied for transition"));
      startViewportProps[key] = startValue;
      endViewportProps[key] = getEndValueByShortestPath(key, startValue, endValue);
    }

    for (const key of LINEARLY_INTERPOLATED_PROPS) {
      const startValue = startProps[key] || 0;
      const endValue = endProps[key] || 0;
      startViewportProps[key] = startValue;
      endViewportProps[key] = getEndValueByShortestPath(key, startValue, endValue);
    }

    return {
      start: startViewportProps,
      end: endViewportProps
    };
  }

  interpolateProps(startProps, endProps, t) {
    const viewport = flyToViewport(startProps, endProps, t, this.props);

    for (const key of LINEARLY_INTERPOLATED_PROPS) {
      viewport[key] = lerp(startProps[key], endProps[key], t);
    }

    return viewport;
  }

  getDuration(startProps, endProps) {
    let {
      transitionDuration
    } = endProps;

    if (transitionDuration === 'auto') {
      transitionDuration = getFlyToDuration(startProps, endProps, this.props);
    }

    return transitionDuration;
  }

}
//# sourceMappingURL=viewport-fly-to-interpolator.js.map