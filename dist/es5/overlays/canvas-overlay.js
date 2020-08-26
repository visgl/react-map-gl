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

var _baseControl = _interopRequireDefault(require("../components/base-control"));

var _globals = require("../utils/globals");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var propTypes = Object.assign({}, _baseControl["default"].propTypes, {
  redraw: _propTypes["default"].func.isRequired
});
var defaultProps = {
  captureScroll: false,
  captureDrag: false,
  captureClick: false,
  captureDoubleClick: false
};

var CanvasOverlay = function (_BaseControl) {
  (0, _inherits2["default"])(CanvasOverlay, _BaseControl);

  var _super = _createSuper(CanvasOverlay);

  function CanvasOverlay() {
    var _this;

    (0, _classCallCheck2["default"])(this, CanvasOverlay);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_canvas", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_ctx", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_redraw", function () {
      var ctx = _this._ctx;

      if (!ctx) {
        return;
      }

      var pixelRatio = _globals.window.devicePixelRatio || 1;
      ctx.save();
      ctx.scale(pixelRatio, pixelRatio);
      var _this$_context = _this._context,
          viewport = _this$_context.viewport,
          isDragging = _this$_context.isDragging;

      _this.props.redraw({
        width: viewport.width,
        height: viewport.height,
        ctx: ctx,
        isDragging: isDragging,
        project: viewport.project.bind(viewport),
        unproject: viewport.unproject.bind(viewport)
      });

      ctx.restore();
    });
    return _this;
  }

  (0, _createClass2["default"])(CanvasOverlay, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var canvas = this._containerRef.current;

      if (canvas) {
        this._canvas = canvas;
        this._ctx = canvas.getContext('2d');
      }

      this._redraw();
    }
  }, {
    key: "_render",
    value: function _render() {
      var pixelRatio = _globals.window.devicePixelRatio || 1;
      var _this$_context$viewpo = this._context.viewport,
          width = _this$_context$viewpo.width,
          height = _this$_context$viewpo.height;

      this._redraw();

      return React.createElement("canvas", {
        ref: this._containerRef,
        width: width * pixelRatio,
        height: height * pixelRatio,
        style: {
          width: "".concat(width, "px"),
          height: "".concat(height, "px"),
          position: 'absolute',
          left: 0,
          top: 0
        }
      });
    }
  }]);
  return CanvasOverlay;
}(_baseControl["default"]);

exports["default"] = CanvasOverlay;
(0, _defineProperty2["default"])(CanvasOverlay, "propTypes", propTypes);
(0, _defineProperty2["default"])(CanvasOverlay, "defaultProps", defaultProps);
//# sourceMappingURL=canvas-overlay.js.map