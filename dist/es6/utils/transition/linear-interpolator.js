import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import WebMercatorViewport from 'viewport-mercator-project';
import assert from '../assert';
import TransitionInterpolator from './transition-interpolator';
import { isValid, getEndValueByShortestPath } from './transition-utils';
import { lerp } from '../math-utils';
const VIEWPORT_TRANSITION_PROPS = ['longitude', 'latitude', 'zoom', 'bearing', 'pitch'];
export default class LinearInterpolator extends TransitionInterpolator {
  constructor(opts = {}) {
    super();

    _defineProperty(this, "around", void 0);

    if (Array.isArray(opts)) {
      opts = {
        transitionProps: opts
      };
    }

    this.propNames = opts.transitionProps || VIEWPORT_TRANSITION_PROPS;

    if (opts.around) {
      this.around = opts.around;
    }
  }

  initializeProps(startProps, endProps) {
    const startViewportProps = {};
    const endViewportProps = {};

    if (this.around) {
      startViewportProps.around = this.around;
      const aroundLngLat = new WebMercatorViewport(startProps).unproject(this.around);
      Object.assign(endViewportProps, endProps, {
        around: new WebMercatorViewport(endProps).project(aroundLngLat),
        aroundLngLat
      });
    }

    for (const key of this.propNames) {
      const startValue = startProps[key];
      const endValue = endProps[key];
      assert(isValid(startValue) && isValid(endValue), "".concat(key, " must be supplied for transition"));
      startViewportProps[key] = startValue;
      endViewportProps[key] = getEndValueByShortestPath(key, startValue, endValue);
    }

    return {
      start: startViewportProps,
      end: endViewportProps
    };
  }

  interpolateProps(startProps, endProps, t) {
    const viewport = {};

    for (const key of this.propNames) {
      viewport[key] = lerp(startProps[key], endProps[key], t);
    }

    if (endProps.around) {
      const [longitude, latitude] = new WebMercatorViewport(Object.assign({}, endProps, viewport)).getMapCenterByLngLatPosition({
        lngLat: endProps.aroundLngLat,
        pos: lerp(startProps.around, endProps.around, t)
      });
      viewport.longitude = longitude;
      viewport.latitude = latitude;
    }

    return viewport;
  }

}
//# sourceMappingURL=linear-interpolator.js.map