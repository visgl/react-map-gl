import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import * as React from 'react';
import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import MapContext from './map-context';
import assert from '../utils/assert';
import deepEqual from '../utils/deep-equal';
var propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string,
  source: PropTypes.string,
  beforeId: PropTypes.string
};

function diffLayerStyles(map, id, props, prevProps) {
  var _props$layout = props.layout,
      layout = _props$layout === void 0 ? {} : _props$layout,
      _props$paint = props.paint,
      paint = _props$paint === void 0 ? {} : _props$paint,
      filter = props.filter,
      minzoom = props.minzoom,
      maxzoom = props.maxzoom,
      beforeId = props.beforeId,
      otherProps = _objectWithoutProperties(props, ["layout", "paint", "filter", "minzoom", "maxzoom", "beforeId"]);

  if (beforeId !== prevProps.beforeId) {
    map.moveLayer(id, beforeId);
  }

  if (layout !== prevProps.layout) {
    for (var key in layout) {
      if (!deepEqual(layout[key], prevProps.layout[key])) {
        map.setLayoutProperty(id, key, layout[key]);
      }
    }
  }

  if (paint !== prevProps.paint) {
    for (var _key in paint) {
      if (!deepEqual(paint[_key], prevProps.paint[_key])) {
        map.setPaintProperty(id, _key, paint[_key]);
      }
    }
  }

  if (!deepEqual(filter, prevProps.filter)) {
    map.setFilter(id, filter);
  }

  if (minzoom !== prevProps.minzoom || maxzoom !== prevProps.maxzoom) {
    map.setLayerZoomRange(id, minzoom, maxzoom);
  }

  for (var _key2 in otherProps) {
    if (!deepEqual(otherProps[_key2], prevProps[_key2])) {
      map.setLayerProperty(id, _key2, otherProps[_key2]);
    }
  }
}

var layerCounter = 0;

var Layer = function (_PureComponent) {
  _inherits(Layer, _PureComponent);

  var _super = _createSuper(Layer);

  function Layer(_props) {
    var _this;

    _classCallCheck(this, Layer);

    _this = _super.call(this, _props);

    _defineProperty(_assertThisInitialized(_this), "id", void 0);

    _defineProperty(_assertThisInitialized(_this), "type", void 0);

    _defineProperty(_assertThisInitialized(_this), "_map", null);

    _defineProperty(_assertThisInitialized(_this), "_layerOptions", {});

    _defineProperty(_assertThisInitialized(_this), "_updateLayer", function () {
      var map = _this._map;

      if (!map) {
        return;
      }

      var _assertThisInitialize = _assertThisInitialized(_this),
          props = _assertThisInitialize.props,
          layerOptions = _assertThisInitialize._layerOptions;

      assert(!props.id || props.id === _this.id, 'layer id changed');
      assert(props.type === _this.type, 'layer type changed');

      if (!_this.getLayer()) {
        _this._createLayer();

        return;
      }

      try {
        diffLayerStyles(map, _this.id, props, layerOptions);
        Object.assign(layerOptions, props);
      } catch (error) {
        console.warn(error);
      }
    });

    _this.id = _props.id || "jsx-layer-".concat(layerCounter++);
    _this.type = _props.type;
    return _this;
  }

  _createClass(Layer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._updateLayer();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this._updateLayer();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var map = this._map;

      if (map) {
        map.off('styledata', this._updateLayer);

        if (map.style && map.style._loaded) {
          map.removeLayer(this.id);
        }
      }
    }
  }, {
    key: "getLayer",
    value: function getLayer() {
      var map = this._map;
      return map && map.style && map.getLayer(this.id);
    }
  }, {
    key: "_createLayer",
    value: function _createLayer() {
      var map = this._map;

      if (map.style && map.style._loaded) {
        var options = Object.assign({}, this.props);
        options.id = this.id;
        delete options.beforeId;
        map.addLayer(options, this.props.beforeId);
        this._layerOptions = options;
      }
    }
  }, {
    key: "_render",
    value: function _render(context) {
      if (!this._map && context.map) {
        this._map = context.map;

        this._map.on('styledata', this._updateLayer);
      }

      return null;
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(MapContext.Consumer, null, this._render.bind(this));
    }
  }]);

  return Layer;
}(PureComponent);

_defineProperty(Layer, "propTypes", propTypes);

export { Layer as default };
//# sourceMappingURL=layer.js.map