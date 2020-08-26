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

var _globals = require("../utils/globals");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _baseControl = _interopRequireDefault(require("./base-control"));

var React = _interopRequireWildcard(require("react"));

var _mapboxgl = _interopRequireDefault(require("../utils/mapboxgl"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var propTypes = Object.assign({}, _baseControl["default"].propTypes, {
  className: _propTypes["default"].string,
  container: _propTypes["default"].object
});
var defaultProps = Object.assign({}, _baseControl["default"].defaultProps, {
  className: '',
  container: null
});

var FullscreenControl = function (_BaseControl) {
  (0, _inherits2["default"])(FullscreenControl, _BaseControl);

  var _super = _createSuper(FullscreenControl);

  function FullscreenControl() {
    var _this;

    (0, _classCallCheck2["default"])(this, FullscreenControl);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
      isFullscreen: false,
      showButton: false
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_mapboxFullscreenControl", null);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onFullscreenChange", function () {
      var nextState = !_this._mapboxFullscreenControl._fullscreen;
      _this._mapboxFullscreenControl._fullscreen = nextState;

      _this.setState({
        isFullscreen: nextState
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onClickFullscreen", function () {
      _this._mapboxFullscreenControl._onClickFullscreen();
    });
    return _this;
  }

  (0, _createClass2["default"])(FullscreenControl, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var container = this.props.container || this._context.mapContainer;
      this._mapboxFullscreenControl = new _mapboxgl["default"].FullscreenControl({
        container: container
      });
      this.setState({
        showButton: this._mapboxFullscreenControl._checkFullscreenSupport()
      });

      _globals.document.addEventListener(this._mapboxFullscreenControl._fullscreenchange, this._onFullscreenChange);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      _globals.document.removeEventListener(this._mapboxFullscreenControl._fullscreenchange, this._onFullscreenChange);
    }
  }, {
    key: "_renderButton",
    value: function _renderButton(type, label, callback) {
      return React.createElement("button", {
        key: type,
        className: "mapboxgl-ctrl-icon mapboxgl-ctrl-".concat(type),
        type: "button",
        title: label,
        onClick: callback
      }, React.createElement("span", {
        className: "mapboxgl-ctrl-icon",
        "aria-hidden": "true"
      }));
    }
  }, {
    key: "_render",
    value: function _render() {
      if (!this.state.showButton) {
        return null;
      }

      var className = this.props.className;
      var isFullscreen = this.state.isFullscreen;
      var type = isFullscreen ? 'shrink' : 'fullscreen';
      return React.createElement("div", {
        className: "mapboxgl-ctrl mapboxgl-ctrl-group ".concat(className),
        ref: this._containerRef
      }, this._renderButton(type, 'Toggle fullscreen', this._onClickFullscreen));
    }
  }]);
  return FullscreenControl;
}(_baseControl["default"]);

exports["default"] = FullscreenControl;
(0, _defineProperty2["default"])(FullscreenControl, "propTypes", propTypes);
(0, _defineProperty2["default"])(FullscreenControl, "defaultProps", defaultProps);
//# sourceMappingURL=fullscreen-control.js.map