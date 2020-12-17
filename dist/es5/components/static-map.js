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

var _styleUtils = require("../utils/style-utils");

var _viewportMercatorProject = _interopRequireDefault(require("viewport-mercator-project"));

var _reactVirtualizedAutoSizer = _interopRequireDefault(require("react-virtualized-auto-sizer"));

var _mapbox = _interopRequireDefault(require("../mapbox/mapbox"));

var _mapboxgl = _interopRequireDefault(require("../utils/mapboxgl"));

var _mapConstraints = require("../utils/map-constraints");

var _mapState = require("../utils/map-state");

var _mapContext = _interopRequireDefault(require("./map-context"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var TOKEN_DOC_URL = 'https://visgl.github.io/react-map-gl/docs/get-started/mapbox-tokens';
var NO_TOKEN_WARNING = 'A valid API access token is required to use Mapbox data';

function noop() {}

var UNAUTHORIZED_ERROR_CODE = 401;
var CONTAINER_STYLE = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  overflow: 'hidden'
};
var propTypes = Object.assign({}, _mapbox["default"].propTypes, {
  width: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  height: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  onResize: _propTypes["default"].func,
  preventStyleDiffing: _propTypes["default"].bool,
  disableTokenWarning: _propTypes["default"].bool,
  visible: _propTypes["default"].bool,
  className: _propTypes["default"].string,
  style: _propTypes["default"].object,
  visibilityConstraints: _propTypes["default"].object
});
var defaultProps = Object.assign({}, _mapbox["default"].defaultProps, {
  preventStyleDiffing: false,
  disableTokenWarning: false,
  visible: true,
  onResize: noop,
  className: '',
  style: null,
  visibilityConstraints: _mapState.MAPBOX_LIMITS
});

var StaticMap = function (_PureComponent) {
  (0, _inherits2["default"])(StaticMap, _PureComponent);

  var _super = _createSuper(StaticMap);

  function StaticMap() {
    var _this;

    (0, _classCallCheck2["default"])(this, StaticMap);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
      accessTokenInvalid: false
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_mapbox", null);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_map", null);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_mapboxMapRef", (0, React.createRef)());
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_mapContainerRef", (0, React.createRef)());
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_queryParams", {});
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_width", 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_height", 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "getMap", function () {
      return _this._map;
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "queryRenderedFeatures", function (geometry) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return _this._map.queryRenderedFeatures(geometry, options);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_mapboxMapError", function (evt) {
      var statusCode = evt.error && evt.error.status || evt.status;

      if (statusCode === UNAUTHORIZED_ERROR_CODE && !_this.state.accessTokenInvalid) {
        console.error(NO_TOKEN_WARNING);

        _this.setState({
          accessTokenInvalid: true
        });
      }

      _this.props.onError(evt);
    });
    return _this;
  }

  (0, _createClass2["default"])(StaticMap, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (!StaticMap.supported()) {
        return;
      }

      var mapStyle = this.props.mapStyle;
      this._mapbox = new _mapbox["default"](Object.assign({}, this.props, {
        mapboxgl: _mapboxgl["default"],
        width: this._width,
        height: this._height,
        container: this._mapboxMapRef.current,
        onError: this._mapboxMapError,
        mapStyle: (0, _styleUtils.normalizeStyle)(mapStyle)
      }));
      this._map = this._mapbox.getMap();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this._mapbox) {
        this._updateMapStyle(prevProps, this.props);

        this._updateMapProps(this.props);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this._mapbox) {
        this._mapbox.finalize();

        this._mapbox = null;
        this._map = null;
      }
    }
  }, {
    key: "_updateMapSize",
    value: function _updateMapSize(width, height) {
      if (this._width !== width || this._height !== height) {
        this._width = width;
        this._height = height;

        this._updateMapProps(this.props);
      }
    }
  }, {
    key: "_updateMapStyle",
    value: function _updateMapStyle(oldProps, newProps) {
      var mapStyle = newProps.mapStyle;
      var oldMapStyle = oldProps.mapStyle;

      if (mapStyle !== oldMapStyle && mapStyle) {
        this._map.setStyle((0, _styleUtils.normalizeStyle)(mapStyle), {
          diff: !this.props.preventStyleDiffing
        });
      }
    }
  }, {
    key: "_updateMapProps",
    value: function _updateMapProps(props) {
      if (!this._mapbox) {
        return;
      }

      this._mapbox.setProps(Object.assign({}, props, {
        width: this._width,
        height: this._height
      }));
    }
  }, {
    key: "_renderNoTokenWarning",
    value: function _renderNoTokenWarning() {
      if (this.state.accessTokenInvalid && !this.props.disableTokenWarning) {
        var style = {
          position: 'absolute',
          left: 0,
          top: 0
        };
        return React.createElement("div", {
          key: "warning",
          id: "no-token-warning",
          style: style
        }, React.createElement("h3", {
          key: "header"
        }, "NO_TOKEN_WARNING"), React.createElement("div", {
          key: "text"
        }, "For information on setting up your basemap, read"), React.createElement("a", {
          key: "link",
          href: TOKEN_DOC_URL
        }, "Note on Map Tokens"));
      }

      return null;
    }
  }, {
    key: "_renderOverlays",
    value: function _renderOverlays(dimensions) {
      var _this2 = this;

      var width = dimensions.width,
          height = dimensions.height;

      this._updateMapSize(width, height);

      return React.createElement(_mapContext["default"].Consumer, null, function (interactiveContext) {
        var context = _objectSpread(_objectSpread({}, interactiveContext), {}, {
          viewport: new _viewportMercatorProject["default"](_objectSpread(_objectSpread(_objectSpread({}, _this2.props), _this2.props.viewState), {}, {
            width: width,
            height: height
          })),
          map: _this2._map,
          mapContainer: interactiveContext.mapContainer || _this2._mapContainerRef.current
        });

        return React.createElement(_mapContext["default"].Provider, {
          value: context
        }, React.createElement("div", {
          key: "map-overlays",
          className: "overlays",
          style: CONTAINER_STYLE
        }, _this2.props.children));
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          width = _this$props.width,
          height = _this$props.height,
          style = _this$props.style,
          visibilityConstraints = _this$props.visibilityConstraints;
      var mapContainerStyle = Object.assign({
        position: 'relative'
      }, style, {
        width: width,
        height: height
      });
      var visible = this.props.visible && (0, _mapConstraints.checkVisibilityConstraints)(this.props.viewState || this.props, visibilityConstraints);
      var mapStyle = Object.assign({}, CONTAINER_STYLE, {
        visibility: visible ? 'inherit' : 'hidden'
      });
      return React.createElement("div", {
        key: "map-container",
        style: mapContainerStyle,
        ref: this._mapContainerRef
      }, React.createElement("div", {
        key: "map-mapbox",
        ref: this._mapboxMapRef,
        style: mapStyle,
        className: className
      }), React.createElement(_reactVirtualizedAutoSizer["default"], {
        key: "autosizer",
        onResize: this.props.onResize
      }, this._renderOverlays.bind(this)), this._renderNoTokenWarning());
    }
  }], [{
    key: "supported",
    value: function supported() {
      return _mapboxgl["default"] && _mapboxgl["default"].supported();
    }
  }]);
  return StaticMap;
}(React.PureComponent);

exports["default"] = StaticMap;
(0, _defineProperty2["default"])(StaticMap, "propTypes", propTypes);
(0, _defineProperty2["default"])(StaticMap, "defaultProps", defaultProps);
//# sourceMappingURL=static-map.js.map