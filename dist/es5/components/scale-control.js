"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _baseControl = _interopRequireDefault(require("./base-control"));

var _mapboxgl = _interopRequireDefault(require("../utils/mapboxgl"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var propTypes = Object.assign({}, _baseControl["default"].propTypes, {
  maxWidth: _propTypes["default"].number,
  unit: _propTypes["default"].oneOf(['imperial', 'metric', 'nautical'])
});
var defaultProps = Object.assign({}, _baseControl["default"].defaultProps, {
  maxWidth: 100,
  unit: 'metric'
});

var ScaleControl = function (_BaseControl) {
  (0, _inherits2["default"])(ScaleControl, _BaseControl);

  var _super = _createSuper(ScaleControl);

  function ScaleControl() {
    var _this;

    (0, _classCallCheck2["default"])(this, ScaleControl);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_control", null);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_mapboxScaleControl", null);
    return _this;
  }

  (0, _createClass2["default"])(ScaleControl, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var mapboxScaleControl = new _mapboxgl["default"].ScaleControl();
      mapboxScaleControl._map = this._context.map;
      mapboxScaleControl._container = this._containerRef.current;
      this._mapboxScaleControl = mapboxScaleControl;

      this._update();
    }
  }, {
    key: "_update",
    value: function _update() {
      var mapboxScaleControl = this._mapboxScaleControl;

      if (mapboxScaleControl) {
        mapboxScaleControl.options = this.props;

        mapboxScaleControl._onMove();
      }
    }
  }, {
    key: "_render",
    value: function _render() {
      this._control = this._control || React.createElement("div", {
        ref: this._containerRef,
        className: "mapboxgl-ctrl mapboxgl-ctrl-scale"
      });

      this._update();

      return this._control;
    }
  }]);
  return ScaleControl;
}(_baseControl["default"]);

exports["default"] = ScaleControl;
(0, _defineProperty2["default"])(ScaleControl, "propTypes", propTypes);
(0, _defineProperty2["default"])(ScaleControl, "defaultProps", defaultProps);
//# sourceMappingURL=scale-control.js.map