"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _draggableControl = _interopRequireDefault(require("./draggable-control"));

var _crispPixel = require("../utils/crisp-pixel");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var propTypes = Object.assign({}, _draggableControl["default"].propTypes, {
  className: _propTypes["default"].string,
  longitude: _propTypes["default"].number.isRequired,
  latitude: _propTypes["default"].number.isRequired
});
var defaultProps = Object.assign({}, _draggableControl["default"].defaultProps, {
  className: ''
});

var Marker = function (_DraggableControl) {
  (0, _inherits2["default"])(Marker, _DraggableControl);

  var _super = _createSuper(Marker);

  function Marker() {
    var _this;

    (0, _classCallCheck2["default"])(this, Marker);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_control", null);
    return _this;
  }

  (0, _createClass2["default"])(Marker, [{
    key: "_getPosition",
    value: function _getPosition() {
      var _this$props = this.props,
          longitude = _this$props.longitude,
          latitude = _this$props.latitude,
          offsetLeft = _this$props.offsetLeft,
          offsetTop = _this$props.offsetTop;
      var _this$state = this.state,
          dragPos = _this$state.dragPos,
          dragOffset = _this$state.dragOffset;

      if (dragPos && dragOffset) {
        return this._getDraggedPosition(dragPos, dragOffset);
      }

      var _this$_context$viewpo = this._context.viewport.project([longitude, latitude]),
          _this$_context$viewpo2 = (0, _slicedToArray2["default"])(_this$_context$viewpo, 2),
          x = _this$_context$viewpo2[0],
          y = _this$_context$viewpo2[1];

      x += offsetLeft;
      y += offsetTop;
      return [x, y];
    }
  }, {
    key: "_render",
    value: function _render() {
      var _this$_getPosition = this._getPosition(),
          _this$_getPosition2 = (0, _slicedToArray2["default"])(_this$_getPosition, 2),
          x = _this$_getPosition2[0],
          y = _this$_getPosition2[1];

      var transform = "translate(".concat((0, _crispPixel.crispPixel)(x), "px, ").concat((0, _crispPixel.crispPixel)(y), "px)");
      var div = this._containerRef.current;

      if (this._control && div) {
        div.style.transform = transform;
      } else {
        var _this$props2 = this.props,
            className = _this$props2.className,
            draggable = _this$props2.draggable;
        var dragPos = this.state.dragPos;
        var containerStyle = {
          position: 'absolute',
          left: 0,
          top: 0,
          transform: transform,
          cursor: draggable ? dragPos ? 'grabbing' : 'grab' : 'auto'
        };
        this._control = React.createElement("div", {
          className: "mapboxgl-marker ".concat(className),
          ref: this._containerRef,
          style: containerStyle
        }, this.props.children);
      }

      return this._control;
    }
  }, {
    key: "render",
    value: function render() {
      this._control = null;
      return (0, _get2["default"])((0, _getPrototypeOf2["default"])(Marker.prototype), "render", this).call(this);
    }
  }]);
  return Marker;
}(_draggableControl["default"]);

exports["default"] = Marker;
(0, _defineProperty2["default"])(Marker, "propTypes", propTypes);
(0, _defineProperty2["default"])(Marker, "defaultProps", defaultProps);
//# sourceMappingURL=marker.js.map