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

var _mapState = _interopRequireDefault(require("../utils/map-state"));

var _mapController = require("../utils/map-controller");

var _deprecateWarn = _interopRequireDefault(require("../utils/deprecate-warn"));

var _version = require("../utils/version");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var noop = function noop() {};

var propTypes = Object.assign({}, _baseControl["default"].propTypes, {
  className: _propTypes["default"].string,
  onViewStateChange: _propTypes["default"].func,
  onViewportChange: _propTypes["default"].func,
  showCompass: _propTypes["default"].bool,
  showZoom: _propTypes["default"].bool,
  zoomInLabel: _propTypes["default"].string,
  zoomOutLabel: _propTypes["default"].string,
  compassLabel: _propTypes["default"].string
});
var defaultProps = Object.assign({}, _baseControl["default"].defaultProps, {
  className: '',
  showCompass: true,
  showZoom: true,
  zoomInLabel: 'Zoom In',
  zoomOutLabel: 'Zoom Out',
  compassLabel: 'Reset North'
});
var VERSION_LEGACY = 1;
var VERSION_1_6 = 2;

function getUIVersion(mapboxVersion) {
  return (0, _version.compareVersions)(mapboxVersion, '1.6.0') >= 0 ? VERSION_1_6 : VERSION_LEGACY;
}

var NavigationControl = function (_BaseControl) {
  (0, _inherits2["default"])(NavigationControl, _BaseControl);

  var _super = _createSuper(NavigationControl);

  function NavigationControl(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, NavigationControl);
    _this = _super.call(this, props);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_uiVersion", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onZoomIn", function () {
      _this._updateViewport({
        zoom: _this._context.viewport.zoom + 1
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onZoomOut", function () {
      _this._updateViewport({
        zoom: _this._context.viewport.zoom - 1
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onResetNorth", function () {
      _this._updateViewport({
        bearing: 0,
        pitch: 0
      });
    });
    (0, _deprecateWarn["default"])(props);
    return _this;
  }

  (0, _createClass2["default"])(NavigationControl, [{
    key: "_updateViewport",
    value: function _updateViewport(opts) {
      var viewport = this._context.viewport;
      var mapState = new _mapState["default"](Object.assign({}, viewport, opts));
      var viewState = Object.assign({}, mapState.getViewportProps(), _mapController.LINEAR_TRANSITION_PROPS);
      var onViewportChange = this.props.onViewportChange || this._context.onViewportChange || noop;
      var onViewStateChange = this.props.onViewStateChange || this._context.onViewStateChange || noop;
      onViewStateChange({
        viewState: viewState
      });
      onViewportChange(viewState);
    }
  }, {
    key: "_renderCompass",
    value: function _renderCompass() {
      var bearing = this._context.viewport.bearing;
      var style = {
        transform: "rotate(".concat(-bearing, "deg)")
      };
      return this._uiVersion === VERSION_1_6 ? React.createElement("span", {
        className: "mapboxgl-ctrl-icon",
        "aria-hidden": "true",
        style: style
      }) : React.createElement("span", {
        className: "mapboxgl-ctrl-compass-arrow",
        style: style
      });
    }
  }, {
    key: "_renderButton",
    value: function _renderButton(type, label, callback, children) {
      return React.createElement("button", {
        key: type,
        className: "mapboxgl-ctrl-icon mapboxgl-ctrl-".concat(type),
        type: "button",
        title: label,
        onClick: callback
      }, children || React.createElement("span", {
        className: "mapboxgl-ctrl-icon",
        "aria-hidden": "true"
      }));
    }
  }, {
    key: "_render",
    value: function _render() {
      var _this$props = this.props,
          className = _this$props.className,
          showCompass = _this$props.showCompass,
          showZoom = _this$props.showZoom,
          zoomInLabel = _this$props.zoomInLabel,
          zoomOutLabel = _this$props.zoomOutLabel,
          compassLabel = _this$props.compassLabel;

      if (!this._uiVersion) {
        var map = this._context.map;
        this._uiVersion = map ? getUIVersion(map.version) : VERSION_1_6;
      }

      return React.createElement("div", {
        className: "mapboxgl-ctrl mapboxgl-ctrl-group ".concat(className),
        ref: this._containerRef
      }, showZoom && this._renderButton('zoom-in', zoomInLabel, this._onZoomIn), showZoom && this._renderButton('zoom-out', zoomOutLabel, this._onZoomOut), showCompass && this._renderButton('compass', compassLabel, this._onResetNorth, this._renderCompass()));
    }
  }]);
  return NavigationControl;
}(_baseControl["default"]);

exports["default"] = NavigationControl;
(0, _defineProperty2["default"])(NavigationControl, "propTypes", propTypes);
(0, _defineProperty2["default"])(NavigationControl, "defaultProps", defaultProps);
//# sourceMappingURL=navigation-control.js.map