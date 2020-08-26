import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import { equals } from '../math-utils';
import assert from '../assert';
export default class TransitionInterpolator {
  constructor() {
    _defineProperty(this, "propNames", []);
  }

  arePropsEqual(currentProps, nextProps) {
    for (const key of this.propNames || []) {
      if (!equals(currentProps[key], nextProps[key])) {
        return false;
      }
    }

    return true;
  }

  initializeProps(startProps, endProps) {
    return {
      start: startProps,
      end: endProps
    };
  }

  interpolateProps(startProps, endProps, t) {
    assert(false, 'interpolateProps is not implemented');
  }

  getDuration(startProps, endProps) {
    return endProps.transitionDuration;
  }

}
//# sourceMappingURL=transition-interpolator.js.map