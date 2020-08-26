import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import * as React from 'react';
import PropTypes from 'prop-types';
import BaseControl from '../components/base-control';
import { window } from '../utils/globals';
var propTypes = Object.assign({}, BaseControl.propTypes, {
  redraw: PropTypes.func.isRequired
});
var defaultProps = {
  captureScroll: false,
  captureDrag: false,
  captureClick: false,
  captureDoubleClick: false
};

var CanvasOverlay = function (_BaseControl) {
  _inherits(CanvasOverlay, _BaseControl);

  var _super = _createSuper(CanvasOverlay);

  function CanvasOverlay() {
    var _this;

    _classCallCheck(this, CanvasOverlay);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "_canvas", void 0);

    _defineProperty(_assertThisInitialized(_this), "_ctx", void 0);

    _defineProperty(_assertThisInitialized(_this), "_redraw", function () {
      var ctx = _this._ctx;

      if (!ctx) {
        return;
      }

      var pixelRatio = window.devicePixelRatio || 1;
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

  _createClass(CanvasOverlay, [{
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
      var pixelRatio = window.devicePixelRatio || 1;
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
}(BaseControl);

_defineProperty(CanvasOverlay, "propTypes", propTypes);

_defineProperty(CanvasOverlay, "defaultProps", defaultProps);

export { CanvasOverlay as default };
//# sourceMappingURL=canvas-overlay.js.map