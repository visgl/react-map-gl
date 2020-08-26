"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _viewportMercatorProject = _interopRequireDefault(require("viewport-mercator-project"));

var _assert = _interopRequireDefault(require("../assert"));

var _transitionInterpolator = _interopRequireDefault(require("./transition-interpolator"));

var _transitionUtils = require("./transition-utils");

var _mathUtils = require("../math-utils");

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var VIEWPORT_TRANSITION_PROPS = ['longitude', 'latitude', 'zoom', 'bearing', 'pitch'];

var LinearInterpolator = function (_TransitionInterpolat) {
  (0, _inherits2["default"])(LinearInterpolator, _TransitionInterpolat);

  var _super = _createSuper(LinearInterpolator);

  function LinearInterpolator() {
    var _this;

    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2["default"])(this, LinearInterpolator);
    _this = _super.call(this);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "around", void 0);

    if (Array.isArray(opts)) {
      opts = {
        transitionProps: opts
      };
    }

    _this.propNames = opts.transitionProps || VIEWPORT_TRANSITION_PROPS;

    if (opts.around) {
      _this.around = opts.around;
    }

    return _this;
  }

  (0, _createClass2["default"])(LinearInterpolator, [{
    key: "initializeProps",
    value: function initializeProps(startProps, endProps) {
      var startViewportProps = {};
      var endViewportProps = {};

      if (this.around) {
        startViewportProps.around = this.around;
        var aroundLngLat = new _viewportMercatorProject["default"](startProps).unproject(this.around);
        Object.assign(endViewportProps, endProps, {
          around: new _viewportMercatorProject["default"](endProps).project(aroundLngLat),
          aroundLngLat: aroundLngLat
        });
      }

      var _iterator = _createForOfIteratorHelper(this.propNames),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var key = _step.value;
          var startValue = startProps[key];
          var endValue = endProps[key];
          (0, _assert["default"])((0, _transitionUtils.isValid)(startValue) && (0, _transitionUtils.isValid)(endValue), "".concat(key, " must be supplied for transition"));
          startViewportProps[key] = startValue;
          endViewportProps[key] = (0, _transitionUtils.getEndValueByShortestPath)(key, startValue, endValue);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return {
        start: startViewportProps,
        end: endViewportProps
      };
    }
  }, {
    key: "interpolateProps",
    value: function interpolateProps(startProps, endProps, t) {
      var viewport = {};

      var _iterator2 = _createForOfIteratorHelper(this.propNames),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var key = _step2.value;
          viewport[key] = (0, _mathUtils.lerp)(startProps[key], endProps[key], t);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      if (endProps.around) {
        var _WebMercatorViewport$ = new _viewportMercatorProject["default"](Object.assign({}, endProps, viewport)).getMapCenterByLngLatPosition({
          lngLat: endProps.aroundLngLat,
          pos: (0, _mathUtils.lerp)(startProps.around, endProps.around, t)
        }),
            _WebMercatorViewport$2 = (0, _slicedToArray2["default"])(_WebMercatorViewport$, 2),
            longitude = _WebMercatorViewport$2[0],
            latitude = _WebMercatorViewport$2[1];

        viewport.longitude = longitude;
        viewport.latitude = latitude;
      }

      return viewport;
    }
  }]);
  return LinearInterpolator;
}(_transitionInterpolator["default"]);

exports["default"] = LinearInterpolator;
//# sourceMappingURL=linear-interpolator.js.map