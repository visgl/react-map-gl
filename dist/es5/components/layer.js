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

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _mapContext = _interopRequireDefault(require("./map-context"));

var _assert = _interopRequireDefault(require("../utils/assert"));

var _deepEqual = _interopRequireDefault(require("../utils/deep-equal"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var propTypes = {
  type: _propTypes["default"].string.isRequired,
  id: _propTypes["default"].string,
  source: _propTypes["default"].string,
  beforeId: _propTypes["default"].string
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
      otherProps = (0, _objectWithoutProperties2["default"])(props, ["layout", "paint", "filter", "minzoom", "maxzoom", "beforeId"]);

  if (beforeId !== prevProps.beforeId) {
    map.moveLayer(id, beforeId);
  }

  if (layout !== prevProps.layout) {
    for (var key in layout) {
      if (!(0, _deepEqual["default"])(layout[key], prevProps.layout[key])) {
        map.setLayoutProperty(id, key, layout[key]);
      }
    }
  }

  if (paint !== prevProps.paint) {
    for (var _key in paint) {
      if (!(0, _deepEqual["default"])(paint[_key], prevProps.paint[_key])) {
        map.setPaintProperty(id, _key, paint[_key]);
      }
    }
  }

  if (!(0, _deepEqual["default"])(filter, prevProps.filter)) {
    map.setFilter(id, filter);
  }

  if (minzoom !== prevProps.minzoom || maxzoom !== prevProps.maxzoom) {
    map.setLayerZoomRange(id, minzoom, maxzoom);
  }

  for (var _key2 in otherProps) {
    if (!(0, _deepEqual["default"])(otherProps[_key2], prevProps[_key2])) {
      map.setLayerProperty(id, _key2, otherProps[_key2]);
    }
  }
}

var layerCounter = 0;

var Layer = function (_PureComponent) {
  (0, _inherits2["default"])(Layer, _PureComponent);

  var _super = _createSuper(Layer);

  function Layer(_props) {
    var _this;

    (0, _classCallCheck2["default"])(this, Layer);
    _this = _super.call(this, _props);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "id", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "type", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_map", null);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_layerOptions", {});
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_updateLayer", function () {
      var map = _this._map;

      if (!map) {
        return;
      }

      var _assertThisInitialize = (0, _assertThisInitialized2["default"])(_this),
          props = _assertThisInitialize.props,
          layerOptions = _assertThisInitialize._layerOptions;

      (0, _assert["default"])(!props.id || props.id === _this.id, 'layer id changed');
      (0, _assert["default"])(props.type === _this.type, 'layer type changed');

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

  (0, _createClass2["default"])(Layer, [{
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
      return React.createElement(_mapContext["default"].Consumer, null, this._render.bind(this));
    }
  }]);
  return Layer;
}(React.PureComponent);

exports["default"] = Layer;
(0, _defineProperty2["default"])(Layer, "propTypes", propTypes);
//# sourceMappingURL=layer.js.map