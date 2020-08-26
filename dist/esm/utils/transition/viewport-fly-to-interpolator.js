import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import assert from '../assert';
import TransitionInterpolator from './transition-interpolator';
import { flyToViewport, getFlyToDuration } from 'viewport-mercator-project';
import { isValid, getEndValueByShortestPath } from './transition-utils';
import { lerp } from '../math-utils';
var VIEWPORT_TRANSITION_PROPS = ['longitude', 'latitude', 'zoom', 'bearing', 'pitch'];
var REQUIRED_PROPS = ['latitude', 'longitude', 'zoom', 'width', 'height'];
var LINEARLY_INTERPOLATED_PROPS = ['bearing', 'pitch'];
var DEFAULT_OPTS = {
  speed: 1.2,
  curve: 1.414
};

var ViewportFlyToInterpolator = function (_TransitionInterpolat) {
  _inherits(ViewportFlyToInterpolator, _TransitionInterpolat);

  var _super = _createSuper(ViewportFlyToInterpolator);

  function ViewportFlyToInterpolator() {
    var _this;

    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, ViewportFlyToInterpolator);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "speed", void 0);

    _defineProperty(_assertThisInitialized(_this), "propNames", VIEWPORT_TRANSITION_PROPS);

    _defineProperty(_assertThisInitialized(_this), "props", void 0);

    _this.props = Object.assign({}, DEFAULT_OPTS, props);
    return _this;
  }

  _createClass(ViewportFlyToInterpolator, [{
    key: "initializeProps",
    value: function initializeProps(startProps, endProps) {
      var startViewportProps = {};
      var endViewportProps = {};

      var _iterator = _createForOfIteratorHelper(REQUIRED_PROPS),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var key = _step.value;
          var startValue = startProps[key];
          var endValue = endProps[key];
          assert(isValid(startValue) && isValid(endValue), "".concat(key, " must be supplied for transition"));
          startViewportProps[key] = startValue;
          endViewportProps[key] = getEndValueByShortestPath(key, startValue, endValue);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      var _iterator2 = _createForOfIteratorHelper(LINEARLY_INTERPOLATED_PROPS),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _key = _step2.value;

          var _startValue = startProps[_key] || 0;

          var _endValue = endProps[_key] || 0;

          startViewportProps[_key] = _startValue;
          endViewportProps[_key] = getEndValueByShortestPath(_key, _startValue, _endValue);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      return {
        start: startViewportProps,
        end: endViewportProps
      };
    }
  }, {
    key: "interpolateProps",
    value: function interpolateProps(startProps, endProps, t) {
      var viewport = flyToViewport(startProps, endProps, t, this.props);

      var _iterator3 = _createForOfIteratorHelper(LINEARLY_INTERPOLATED_PROPS),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var key = _step3.value;
          viewport[key] = lerp(startProps[key], endProps[key], t);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      return viewport;
    }
  }, {
    key: "getDuration",
    value: function getDuration(startProps, endProps) {
      var transitionDuration = endProps.transitionDuration;

      if (transitionDuration === 'auto') {
        transitionDuration = getFlyToDuration(startProps, endProps, this.props);
      }

      return transitionDuration;
    }
  }]);

  return ViewportFlyToInterpolator;
}(TransitionInterpolator);

export { ViewportFlyToInterpolator as default };
//# sourceMappingURL=viewport-fly-to-interpolator.js.map