"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _baseControl = _interopRequireDefault(require("../components/base-control"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var propTypes = Object.assign({}, _baseControl["default"].propTypes, {
  redraw: _propTypes["default"].func.isRequired,
  style: _propTypes["default"].object
});
var defaultProps = {
  captureScroll: false,
  captureDrag: false,
  captureClick: false,
  captureDoubleClick: false
};

var HTMLOverlay = function (_BaseControl) {
  (0, _inherits2["default"])(HTMLOverlay, _BaseControl);

  var _super = _createSuper(HTMLOverlay);

  function HTMLOverlay() {
    (0, _classCallCheck2["default"])(this, HTMLOverlay);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(HTMLOverlay, [{
    key: "_render",
    value: function _render() {
      var _this$_context = this._context,
          viewport = _this$_context.viewport,
          isDragging = _this$_context.isDragging;
      var style = Object.assign({
        position: 'absolute',
        left: 0,
        top: 0,
        width: viewport.width,
        height: viewport.height
      }, this.props.style);
      return React.createElement("div", {
        ref: this._containerRef,
        style: style
      }, this.props.redraw({
        width: viewport.width,
        height: viewport.height,
        isDragging: isDragging,
        project: viewport.project.bind(viewport),
        unproject: viewport.unproject.bind(viewport)
      }));
    }
  }]);
  return HTMLOverlay;
}(_baseControl["default"]);

exports["default"] = HTMLOverlay;
(0, _defineProperty2["default"])(HTMLOverlay, "propTypes", propTypes);
(0, _defineProperty2["default"])(HTMLOverlay, "defaultProps", defaultProps);
//# sourceMappingURL=html-overlay.js.map