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

var _mapContext = _interopRequireDefault(require("./map-context"));

var _assert = _interopRequireDefault(require("../utils/assert"));

var _deepEqual = _interopRequireDefault(require("../utils/deep-equal"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var propTypes = {
  type: _propTypes["default"].string.isRequired,
  id: _propTypes["default"].string
};
var sourceCounter = 0;

var Source = function (_PureComponent) {
  (0, _inherits2["default"])(Source, _PureComponent);

  var _super = _createSuper(Source);

  function Source(_props) {
    var _this;

    (0, _classCallCheck2["default"])(this, Source);
    _this = _super.call(this, _props);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "id", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "type", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_map", null);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_sourceOptions", {});
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_updateSource", function () {
      var _assertThisInitialize = (0, _assertThisInitialized2["default"])(_this),
          type = _assertThisInitialize.type,
          map = _assertThisInitialize._map;

      if (!map) {
        return;
      }

      var _assertThisInitialize2 = (0, _assertThisInitialized2["default"])(_this),
          sourceOptions = _assertThisInitialize2._sourceOptions,
          props = _assertThisInitialize2.props;

      (0, _assert["default"])(!props.id || props.id === _this.id, 'source id changed');
      (0, _assert["default"])(props.type === type, 'source type changed');
      var changedKey = '';
      var changedKeyCount = 0;

      for (var key in props) {
        if (key !== 'children' && key !== 'id' && !(0, _deepEqual["default"])(sourceOptions[key], props[key])) {
          sourceOptions[key] = props[key];
          changedKey = key;
          changedKeyCount++;
        }
      }

      var source = _this.getSource();

      if (!source) {
        _this._createSource(sourceOptions);

        return;
      }

      if (!changedKeyCount) {
        return;
      }

      if (type === 'geojson') {
        source.setData(sourceOptions.data);
      } else if (type === 'image') {
        source.updateImage({
          url: sourceOptions.url,
          coordinates: sourceOptions.coordinates
        });
      } else if ((type === 'canvas' || type === 'video') && changedKeyCount === 1 && changedKey === 'coordinates') {
        source.setCoordinates(sourceOptions.coordinates);
      } else {
        console.warn("Unable to update <Source> prop: ".concat(changedKey));
      }
    });
    _this.id = _props.id || "jsx-source-".concat(sourceCounter++);
    _this.type = _props.type;
    return _this;
  }

  (0, _createClass2["default"])(Source, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var _this2 = this;

      var map = this._map;

      if (map) {
        map.off('styledata', this._updateSource);
        requestAnimationFrame(function () {
          if (map.style && map.style._loaded) {
            map.removeSource(_this2.id);
          }
        });
      }
    }
  }, {
    key: "getSource",
    value: function getSource() {
      var map = this._map;
      return map && map.style && map.getSource(this.id);
    }
  }, {
    key: "_createSource",
    value: function _createSource(sourceOptions) {
      var map = this._map;

      if (map.style && map.style._loaded) {
        map.addSource(this.id, sourceOptions);
      }
    }
  }, {
    key: "_render",
    value: function _render(context) {
      var _this3 = this;

      if (!this._map && context.map) {
        this._map = context.map;

        this._map.on('styledata', this._updateSource);
      }

      this._updateSource();

      return React.Children.map(this.props.children, function (child) {
        return (0, React.cloneElement)(child, {
          source: _this3.id
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(_mapContext["default"].Consumer, null, this._render.bind(this));
    }
  }]);
  return Source;
}(React.PureComponent);

exports["default"] = Source;
(0, _defineProperty2["default"])(Source, "propTypes", propTypes);
//# sourceMappingURL=source.js.map