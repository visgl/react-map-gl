import WebMercatorViewport from 'viewport-mercator-project';

import assert from '../assert';
import TransitionInterpolator from './transition-interpolator';

import {isValid, lerp, getEndValueByShortestPath} from './transition-utils';

const VIEWPORT_TRANSITION_PROPS = ['longitude', 'latitude', 'zoom', 'bearing', 'pitch'];

/**
 * Performs linear interpolation of two viewports.
*/
export default class LinearInterpolator extends TransitionInterpolator {

  /**
   * @param opts {Object}
   *  - opts.transitionProps {Array}] - list of props to apply linear transition to.
   *  - opts.around {Array} - a screen point to zoom/rotate around
   */
  constructor(opts = {}) {
    super();

    if (Array.isArray(opts)) {
      // backward compatibility
      opts = {transitionProps: opts};
    }

    this.propNames = opts.transitionProps || VIEWPORT_TRANSITION_PROPS;
    this.around = opts.around;
  }

  initializeProps(startProps, endProps) {
    const startViewportProps = {};
    const endViewportProps = {};

    if (this.around) {
      Object.assign(endViewportProps, endProps, {
        around: this.around,
        aroundLngLat: new WebMercatorViewport(endProps).unproject(this.around)
      });
    }

    for (const key of this.propNames) {
      const startValue = startProps[key];
      const endValue = endProps[key];
      assert(isValid(startValue) && isValid(endValue), `${key} must be supplied for transition`);

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
      // zoom around provided point
      const [longitude, latitude] = new WebMercatorViewport(Object.assign({}, endProps, viewport))
        .getMapCenterByLngLatPosition({
          lngLat: endProps.aroundLngLat,
          pos: endProps.around
        });
      viewport.longitude = longitude;
      viewport.latitude = latitude;
    }

    return viewport;
  }

}
