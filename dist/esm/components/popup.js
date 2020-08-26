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
import { createRef } from 'react';
import PropTypes from 'prop-types';
import BaseControl from './base-control';
import { getDynamicPosition, ANCHOR_POSITION } from '../utils/dynamic-position';
import { crispPercentage, crispPixel } from '../utils/crisp-pixel';
var propTypes = Object.assign({}, BaseControl.propTypes, {
  className: PropTypes.string,
  longitude: PropTypes.number.isRequired,
  latitude: PropTypes.number.isRequired,
  altitude: PropTypes.number,
  offsetLeft: PropTypes.number,
  offsetTop: PropTypes.number,
  tipSize: PropTypes.number,
  closeButton: PropTypes.bool,
  closeOnClick: PropTypes.bool,
  anchor: PropTypes.oneOf(Object.keys(ANCHOR_POSITION)),
  dynamicPosition: PropTypes.bool,
  sortByDepth: PropTypes.bool,
  onClose: PropTypes.func
});
var defaultProps = Object.assign({}, BaseControl.defaultProps, {
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
  _inherits(Popup, _BaseControl);

  var _super = _createSuper(Popup);

  function Popup() {
    var _this;

    _classCallCheck(this, Popup);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "_closeOnClick", false);

    _defineProperty(_assertThisInitialized(_this), "_contentRef", createRef());

    _defineProperty(_assertThisInitialized(_this), "_onClick", function (evt) {
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

  _createClass(Popup, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      _get(_getPrototypeOf(Popup.prototype), "componentDidMount", this).call(this);

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
        return dynamicPosition ? getDynamicPosition({
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
      var anchorPosition = ANCHOR_POSITION[positionType];
      var left = x + offsetLeft;
      var top = y + offsetTop;
      var el = this._containerRef.current;
      var xPercentage = crispPercentage(el, -anchorPosition.x * 100);
      var yPercentage = crispPercentage(el, -anchorPosition.y * 100, 'y');
      var style = {
        position: 'absolute',
        transform: "\n        translate(".concat(xPercentage, "%, ").concat(yPercentage, "%)\n        translate(").concat(crispPixel(left), "px, ").concat(crispPixel(top), "px)\n      "),
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
          _this$_context$viewpo2 = _slicedToArray(_this$_context$viewpo, 3),
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
}(BaseControl);

_defineProperty(Popup, "propTypes", propTypes);

_defineProperty(Popup, "defaultProps", defaultProps);

export { Popup as default };
//# sourceMappingURL=popup.js.map