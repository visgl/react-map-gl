import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _get from "@babel/runtime/helpers/esm/get";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import * as React from 'react';
import PropTypes from 'prop-types';
import DraggableControl from './draggable-control';
import { crispPixel } from '../utils/crisp-pixel';
var propTypes = Object.assign({}, DraggableControl.propTypes, {
  className: PropTypes.string,
  longitude: PropTypes.number.isRequired,
  latitude: PropTypes.number.isRequired
});
var defaultProps = Object.assign({}, DraggableControl.defaultProps, {
  className: ''
});

var Marker = function (_DraggableControl) {
  _inherits(Marker, _DraggableControl);

  var _super = _createSuper(Marker);

  function Marker() {
    var _this;

    _classCallCheck(this, Marker);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "_control", null);

    return _this;
  }

  _createClass(Marker, [{
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
          _this$_context$viewpo2 = _slicedToArray(_this$_context$viewpo, 2),
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
          _this$_getPosition2 = _slicedToArray(_this$_getPosition, 2),
          x = _this$_getPosition2[0],
          y = _this$_getPosition2[1];

      var transform = "translate(".concat(crispPixel(x), "px, ").concat(crispPixel(y), "px)");
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
      return _get(_getPrototypeOf(Marker.prototype), "render", this).call(this);
    }
  }]);

  return Marker;
}(DraggableControl);

_defineProperty(Marker, "propTypes", propTypes);

_defineProperty(Marker, "defaultProps", defaultProps);

export { Marker as default };
//# sourceMappingURL=marker.js.map