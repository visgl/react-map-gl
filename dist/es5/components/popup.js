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

var _baseControl = _interopRequireDefault(require("./base-control"));

var _dynamicPosition = require("../utils/dynamic-position");

var _crispPixel = require("../utils/crisp-pixel");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var propTypes = Object.assign({}, _baseControl["default"].propTypes, {
  className: _propTypes["default"].string,
  longitude: _propTypes["default"].number.isRequired,
  latitude: _propTypes["default"].number.isRequired,
  altitude: _propTypes["default"].number,
  offsetLeft: _propTypes["default"].number,
  offsetTop: _propTypes["default"].number,
  tipSize: _propTypes["default"].number,
  closeButton: _propTypes["default"].bool,
  closeOnClick: _propTypes["default"].bool,
  anchor: _propTypes["default"].oneOf(Object.keys(_dynamicPosition.ANCHOR_POSITION)),
  dynamicPosition: _propTypes["default"].bool,
  sortByDepth: _propTypes["default"].bool,
  onClose: _propTypes["default"].func
});
var defaultProps = Object.assign({}, _baseControl["default"].defaultProps, {
  className: '',
  altitude: 0,
  offsetLeft: 0,
  offsetTop: 0,
  tipSize: 10,
  anchor: 'bottom',
  dynamicPosition: true,
  sortByDepth: false,
  closeButton: true,
  closeOnClick: true,
  onClose: function onClose() {}
});

var Popup = function (_BaseControl) {
  (0, _inherits2["default"])(Popup, _BaseControl);

  var _super = _createSuper(Popup);

  function Popup() {
    var _this;

    (0, _classCallCheck2["default"])(this, Popup);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_closeOnClick", false);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_contentRef", (0, React.createRef)());
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onClick", function (evt) {
      if (_this.props.captureClick) {
        evt.stopPropagation();
      }

      if (_this.props.closeOnClick || evt.target.className === 'mapboxgl-popup-close-button') {
        _this.props.onClose();

        var eventManager = _this._context.eventManager;

        if (eventManager) {
          eventManager.once('click', function (e) {
            return e.stopPropagation();
          }, evt.target);
        }
      }
    });
    return _this;
  }

  (0, _createClass2["default"])(Popup, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      (0, _get2["default"])((0, _getPrototypeOf2["default"])(Popup.prototype), "componentDidMount", this).call(this);
      this.forceUpdate();
    }
  }, {
    key: "_getPosition",
    value: function _getPosition(x, y) {
      var viewport = this._context.viewport;
      var _this$props = this.props,
          anchor = _this$props.anchor,
          dynamicPosition = _this$props.dynamicPosition,
          tipSize = _this$props.tipSize;
      var content = this._contentRef.current;

      if (content) {
        return dynamicPosition ? (0, _dynamicPosition.getDynamicPosition)({
          x: x,
          y: y,
          anchor: anchor,
          padding: tipSize,
          width: viewport.width,
          height: viewport.height,
          selfWidth: content.clientWidth,
          selfHeight: content.clientHeight
        }) : anchor;
      }

      return anchor;
    }
  }, {
    key: "_getContainerStyle",
    value: function _getContainerStyle(x, y, z, positionType) {
      var viewport = this._context.viewport;
      var _this$props2 = this.props,
          offsetLeft = _this$props2.offsetLeft,
          offsetTop = _this$props2.offsetTop,
          sortByDepth = _this$props2.sortByDepth;
      var anchorPosition = _dynamicPosition.ANCHOR_POSITION[positionType];
      var left = x + offsetLeft;
      var top = y + offsetTop;
      var el = this._containerRef.current;
      var xPercentage = (0, _crispPixel.crispPercentage)(el, -anchorPosition.x * 100);
      var yPercentage = (0, _crispPixel.crispPercentage)(el, -anchorPosition.y * 100, 'y');
      var style = {
        position: 'absolute',
        transform: "\n        translate(".concat(xPercentage, "%, ").concat(yPercentage, "%)\n        translate(").concat((0, _crispPixel.crispPixel)(left), "px, ").concat((0, _crispPixel.crispPixel)(top), "px)\n      "),
        display: undefined,
        zIndex: undefined
      };

      if (!sortByDepth) {
        return style;
      }

      if (z > 1 || z < -1 || x < 0 || x > viewport.width || y < 0 || y > viewport.height) {
        style.display = 'none';
      } else {
        style.zIndex = Math.floor((1 - z) / 2 * 100000);
      }

      return style;
    }
  }, {
    key: "_renderTip",
    value: function _renderTip(positionType) {
      var tipSize = this.props.tipSize;
      return React.createElement("div", {
        key: "tip",
        className: "mapboxgl-popup-tip",
        style: {
          borderWidth: tipSize
        }
      });
    }
  }, {
    key: "_renderContent",
    value: function _renderContent() {
      var _this$props3 = this.props,
          closeButton = _this$props3.closeButton,
          children = _this$props3.children;
      var onClick = this._context.eventManager ? null : this._onClick;
      return React.createElement("div", {
        key: "content",
        ref: this._contentRef,
        className: "mapboxgl-popup-content",
        onClick: onClick
      }, closeButton && React.createElement("button", {
        key: "close-button",
        className: "mapboxgl-popup-close-button",
        type: "button"
      }, "\xD7"), children);
    }
  }, {
    key: "_render",
    value: function _render() {
      var _this$props4 = this.props,
          className = _this$props4.className,
          longitude = _this$props4.longitude,
          latitude = _this$props4.latitude,
          altitude = _this$props4.altitude;

      var _this$_context$viewpo = this._context.viewport.project([longitude, latitude, altitude]),
          _this$_context$viewpo2 = (0, _slicedToArray2["default"])(_this$_context$viewpo, 3),
          x = _this$_context$viewpo2[0],
          y = _this$_context$viewpo2[1],
          z = _this$_context$viewpo2[2];

      var positionType = this._getPosition(x, y);

      var containerStyle = this._getContainerStyle(x, y, z, positionType);

      return React.createElement("div", {
        className: "mapboxgl-popup mapboxgl-popup-anchor-".concat(positionType, " ").concat(className),
        style: containerStyle,
        ref: this._containerRef
      }, this._renderTip(positionType), this._renderContent());
    }
  }]);
  return Popup;
}(_baseControl["default"]);

exports["default"] = Popup;
(0, _defineProperty2["default"])(Popup, "propTypes", propTypes);
(0, _defineProperty2["default"])(Popup, "defaultProps", defaultProps);
//# sourceMappingURL=popup.js.map