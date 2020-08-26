import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import * as React from 'react';
import PropTypes from 'prop-types';
import BaseControl from '../components/base-control';
var propTypes = Object.assign({}, BaseControl.propTypes, {
  redraw: PropTypes.func.isRequired,
  style: PropTypes.object
});
var defaultProps = {
  captureScroll: false,
  captureDrag: false,
  captureClick: false,
  captureDoubleClick: false
};

var SVGOverlay = function (_BaseControl) {
  _inherits(SVGOverlay, _BaseControl);

  var _super = _createSuper(SVGOverlay);

  function SVGOverlay() {
    _classCallCheck(this, SVGOverlay);

    return _super.apply(this, arguments);
  }

  _createClass(SVGOverlay, [{
    key: "_render",
    value: function _render() {
      var _this$_context = this._context,
          viewport = _this$_context.viewport,
          isDragging = _this$_context.isDragging;
      var style = Object.assign({
        position: 'absolute',
        left: 0,
        top: 0
      }, this.props.style);
      return React.createElement("svg", {
        width: viewport.width,
        height: viewport.height,
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

  return SVGOverlay;
}(BaseControl);

_defineProperty(SVGOverlay, "propTypes", propTypes);

_defineProperty(SVGOverlay, "defaultProps", defaultProps);

export { SVGOverlay as default };
//# sourceMappingURL=svg-overlay.js.map