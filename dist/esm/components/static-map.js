import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import * as React from 'react';
import { PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';
import { normalizeStyle } from '../utils/style-utils';
import WebMercatorViewport from 'viewport-mercator-project';
import AutoSizer from 'react-virtualized-auto-sizer';
import Mapbox from '../mapbox/mapbox';
import mapboxgl from '../utils/mapboxgl';
import { checkVisibilityConstraints } from '../utils/map-constraints';
import { MAPBOX_LIMITS } from '../utils/map-state';
import MapContext from './map-context';
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
var propTypes = Object.assign({}, Mapbox.propTypes, {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onResize: PropTypes.func,
  preventStyleDiffing: PropTypes.bool,
  disableTokenWarning: PropTypes.bool,
  visible: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  visibilityConstraints: PropTypes.object
});
var defaultProps = Object.assign({}, Mapbox.defaultProps, {
  preventStyleDiffing: false,
  disableTokenWarning: false,
  visible: true,
  onResize: noop,
  className: '',
  style: null,
  visibilityConstraints: MAPBOX_LIMITS
});

var StaticMap = function (_PureComponent) {
  _inherits(StaticMap, _PureComponent);

  var _super = _createSuper(StaticMap);

  function StaticMap() {
    var _this;

    _classCallCheck(this, StaticMap);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      accessTokenInvalid: false
    });

    _defineProperty(_assertThisInitialized(_this), "_mapbox", null);

    _defineProperty(_assertThisInitialized(_this), "_map", null);

    _defineProperty(_assertThisInitialized(_this), "_mapboxMapRef", createRef());

    _defineProperty(_assertThisInitialized(_this), "_mapContainerRef", createRef());

    _defineProperty(_assertThisInitialized(_this), "_queryParams", {});

    _defineProperty(_assertThisInitialized(_this), "_width", 0);

    _defineProperty(_assertThisInitialized(_this), "_height", 0);

    _defineProperty(_assertThisInitialized(_this), "getMap", function () {
      return _this._map;
    });

    _defineProperty(_assertThisInitialized(_this), "queryRenderedFeatures", function (geometry) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return _this._map.queryRenderedFeatures(geometry, options);
    });

    _defineProperty(_assertThisInitialized(_this), "_mapboxMapError", function (evt) {
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

  _createClass(StaticMap, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (!StaticMap.supported()) {
        return;
      }

      var mapStyle = this.props.mapStyle;
      this._mapbox = new Mapbox(Object.assign({}, this.props, {
        mapboxgl: mapboxgl,
        width: this._width,
        height: this._height,
        container: this._mapboxMapRef.current,
        onError: this._mapboxMapError,
        mapStyle: normalizeStyle(mapStyle)
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
        this._map.setStyle(normalizeStyle(mapStyle), {
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

      return React.createElement(MapContext.Consumer, null, function (interactiveContext) {
        var context = _objectSpread(_objectSpread({}, interactiveContext), {}, {
          viewport: new WebMercatorViewport(_objectSpread(_objectSpread(_objectSpread({}, _this2.props), _this2.props.viewState), {}, {
            width: width,
            height: height
          })),
          map: _this2._map,
          mapContainer: interactiveContext.mapContainer || _this2._mapContainerRef.current
        });

        return React.createElement(MapContext.Provider, {
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
      var visible = this.props.visible && checkVisibilityConstraints(this.props.viewState || this.props, visibilityConstraints);
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
      }), React.createElement(AutoSizer, {
        key: "autosizer",
        onResize: this.props.onResize
      }, this._renderOverlays.bind(this)), this._renderNoTokenWarning());
    }
  }], [{
    key: "supported",
    value: function supported() {
      return mapboxgl && mapboxgl.supported();
    }
  }]);

  return StaticMap;
}(PureComponent);

_defineProperty(StaticMap, "propTypes", propTypes);

_defineProperty(StaticMap, "defaultProps", defaultProps);

export { StaticMap as default };
//# sourceMappingURL=static-map.js.map