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
import BaseControl from './base-control';
import MapState from '../utils/map-state';
import { LINEAR_TRANSITION_PROPS } from '../utils/map-controller';
import deprecateWarn from '../utils/deprecate-warn';
import { compareVersions } from '../utils/version';

var noop = function noop() {};

var propTypes = Object.assign({}, BaseControl.propTypes, {
  className: PropTypes.string,
  onViewStateChange: PropTypes.func,
  onViewportChange: PropTypes.func,
  showCompass: PropTypes.bool,
  showZoom: PropTypes.bool,
  zoomInLabel: PropTypes.string,
  zoomOutLabel: PropTypes.string,
  compassLabel: PropTypes.string
});
var defaultProps = Object.assign({}, BaseControl.defaultProps, {
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
  return compareVersions(mapboxVersion, '1.6.0') >= 0 ? VERSION_1_6 : VERSION_LEGACY;
}

var NavigationControl = function (_BaseControl) {
  _inherits(NavigationControl, _BaseControl);

  var _super = _createSuper(NavigationControl);

  function NavigationControl(props) {
    var _this;

    _classCallCheck(this, NavigationControl);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "_uiVersion", void 0);

    _defineProperty(_assertThisInitialized(_this), "_onZoomIn", function () {
      _this._updateViewport({
        zoom: _this._context.viewport.zoom + 1
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_onZoomOut", function () {
      _this._updateViewport({
        zoom: _this._context.viewport.zoom - 1
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_onResetNorth", function () {
      _this._updateViewport({
        bearing: 0,
        pitch: 0
      });
    });

    deprecateWarn(props);
    return _this;
  }

  _createClass(NavigationControl, [{
    key: "_updateViewport",
    value: function _updateViewport(opts) {
      var viewport = this._context.viewport;
      var mapState = new MapState(Object.assign({}, viewport, opts));
      var viewState = Object.assign({}, mapState.getViewportProps(), LINEAR_TRANSITION_PROPS);
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
}(BaseControl);

_defineProperty(NavigationControl, "propTypes", propTypes);

_defineProperty(NavigationControl, "defaultProps", defaultProps);

export { NavigationControl as default };
//# sourceMappingURL=navigation-control.js.map