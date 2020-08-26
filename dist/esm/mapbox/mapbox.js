import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import PropTypes from 'prop-types';
import { document } from '../utils/globals';

function noop() {}

function defaultOnError(event) {
  if (event) {
    console.error(event.error);
  }
}

var propTypes = {
  container: PropTypes.object,
  gl: PropTypes.object,
  mapboxApiAccessToken: PropTypes.string,
  mapboxApiUrl: PropTypes.string,
  attributionControl: PropTypes.bool,
  preserveDrawingBuffer: PropTypes.bool,
  reuseMaps: PropTypes.bool,
  transformRequest: PropTypes.func,
  mapOptions: PropTypes.object,
  mapStyle: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  visible: PropTypes.bool,
  asyncRender: PropTypes.bool,
  onLoad: PropTypes.func,
  onError: PropTypes.func,
  width: PropTypes.number,
  height: PropTypes.number,
  viewState: PropTypes.object,
  longitude: PropTypes.number,
  latitude: PropTypes.number,
  zoom: PropTypes.number,
  bearing: PropTypes.number,
  pitch: PropTypes.number,
  altitude: PropTypes.number
};
var defaultProps = {
  container: document.body,
  mapboxApiAccessToken: getAccessToken(),
  mapboxApiUrl: 'https://api.mapbox.com',
  preserveDrawingBuffer: false,
  attributionControl: true,
  reuseMaps: false,
  mapOptions: {},
  mapStyle: 'mapbox://styles/mapbox/light-v8',
  visible: true,
  asyncRender: false,
  onLoad: noop,
  onError: defaultOnError,
  width: 0,
  height: 0,
  longitude: 0,
  latitude: 0,
  zoom: 0,
  bearing: 0,
  pitch: 0,
  altitude: 1.5
};
export function getAccessToken() {
  var accessToken = null;

  if (typeof window !== 'undefined' && window.location) {
    var match = window.location.search.match(/access_token=([^&\/]*)/);
    accessToken = match && match[1];
  }

  if (!accessToken && typeof process !== 'undefined') {
    accessToken = accessToken || process.env.MapboxAccessToken || process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
  }

  return accessToken || 'no-token';
}

function checkPropTypes(props) {
  var component = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'component';

  if (props.debug) {
    PropTypes.checkPropTypes(propTypes, props, 'prop', component);
  }
}

var Mapbox = function () {
  function Mapbox(props) {
    var _this = this;

    _classCallCheck(this, Mapbox);

    _defineProperty(this, "mapboxgl", void 0);

    _defineProperty(this, "props", defaultProps);

    _defineProperty(this, "_map", null);

    _defineProperty(this, "width", 0);

    _defineProperty(this, "height", 0);

    _defineProperty(this, "_fireLoadEvent", function () {
      _this.props.onLoad({
        type: 'load',
        target: _this._map
      });
    });

    if (!props.mapboxgl) {
      throw new Error('Mapbox not available');
    }

    this.mapboxgl = props.mapboxgl;

    if (!Mapbox.initialized) {
      Mapbox.initialized = true;

      this._checkStyleSheet(this.mapboxgl.version);
    }

    this._initialize(props);
  }

  _createClass(Mapbox, [{
    key: "finalize",
    value: function finalize() {
      this._destroy();

      return this;
    }
  }, {
    key: "setProps",
    value: function setProps(props) {
      this._update(this.props, props);

      return this;
    }
  }, {
    key: "resize",
    value: function resize() {
      this._map.resize();

      return this;
    }
  }, {
    key: "redraw",
    value: function redraw() {
      var map = this._map;

      if (map.style) {
        if (map._frame) {
          map._frame.cancel();

          map._frame = null;
        }

        map._render();
      }
    }
  }, {
    key: "getMap",
    value: function getMap() {
      return this._map;
    }
  }, {
    key: "_reuse",
    value: function _reuse(props) {
      this._map = Mapbox.savedMap;

      var oldContainer = this._map.getContainer();

      var newContainer = props.container;
      newContainer.classList.add('mapboxgl-map');

      while (oldContainer.childNodes.length > 0) {
        newContainer.appendChild(oldContainer.childNodes[0]);
      }

      this._map._container = newContainer;
      Mapbox.savedMap = null;

      if (props.mapStyle) {
        this._map.setStyle(props.mapStyle, {
          diff: false
        });
      }

      if (this._map.isStyleLoaded()) {
        this._fireLoadEvent();
      } else {
        this._map.once('styledata', this._fireLoadEvent);
      }
    }
  }, {
    key: "_create",
    value: function _create(props) {
      if (props.reuseMaps && Mapbox.savedMap) {
        this._reuse(props);
      } else {
        if (props.gl) {
          var getContext = HTMLCanvasElement.prototype.getContext;

          HTMLCanvasElement.prototype.getContext = function () {
            HTMLCanvasElement.prototype.getContext = getContext;
            return props.gl;
          };
        }

        var mapOptions = {
          container: props.container,
          center: [0, 0],
          zoom: 8,
          pitch: 0,
          bearing: 0,
          maxZoom: 24,
          style: props.mapStyle,
          interactive: false,
          trackResize: false,
          attributionControl: props.attributionControl,
          preserveDrawingBuffer: props.preserveDrawingBuffer
        };

        if (props.transformRequest) {
          mapOptions.transformRequest = props.transformRequest;
        }

        this._map = new this.mapboxgl.Map(Object.assign({}, mapOptions, props.mapOptions));

        this._map.once('load', props.onLoad);

        this._map.on('error', props.onError);
      }

      return this;
    }
  }, {
    key: "_destroy",
    value: function _destroy() {
      if (!this._map) {
        return;
      }

      if (!Mapbox.savedMap) {
        Mapbox.savedMap = this._map;

        this._map.off('load', this.props.onLoad);

        this._map.off('error', this.props.onError);

        this._map.off('styledata', this._fireLoadEvent);
      } else {
        this._map.remove();
      }

      this._map = null;
    }
  }, {
    key: "_initialize",
    value: function _initialize(props) {
      var _this2 = this;

      props = Object.assign({}, defaultProps, props);
      checkPropTypes(props, 'Mapbox');
      this.mapboxgl.accessToken = props.mapboxApiAccessToken || defaultProps.mapboxApiAccessToken;
      this.mapboxgl.baseApiUrl = props.mapboxApiUrl;

      this._create(props);

      var _props = props,
          container = _props.container;
      Object.defineProperty(container, 'offsetWidth', {
        get: function get() {
          return _this2.width;
        }
      });
      Object.defineProperty(container, 'clientWidth', {
        get: function get() {
          return _this2.width;
        }
      });
      Object.defineProperty(container, 'offsetHeight', {
        get: function get() {
          return _this2.height;
        }
      });
      Object.defineProperty(container, 'clientHeight', {
        get: function get() {
          return _this2.height;
        }
      });

      var canvas = this._map.getCanvas();

      if (canvas) {
        canvas.style.outline = 'none';
      }

      this._updateMapViewport({}, props);

      this._updateMapSize({}, props);

      this.props = props;
    }
  }, {
    key: "_update",
    value: function _update(oldProps, newProps) {
      if (!this._map) {
        return;
      }

      newProps = Object.assign({}, this.props, newProps);
      checkPropTypes(newProps, 'Mapbox');

      var viewportChanged = this._updateMapViewport(oldProps, newProps);

      var sizeChanged = this._updateMapSize(oldProps, newProps);

      if (!newProps.asyncRender && (viewportChanged || sizeChanged)) {
        this.redraw();
      }

      this.props = newProps;
    }
  }, {
    key: "_updateMapSize",
    value: function _updateMapSize(oldProps, newProps) {
      var sizeChanged = oldProps.width !== newProps.width || oldProps.height !== newProps.height;

      if (sizeChanged) {
        this.width = newProps.width;
        this.height = newProps.height;
        this.resize();
      }

      return sizeChanged;
    }
  }, {
    key: "_updateMapViewport",
    value: function _updateMapViewport(oldProps, newProps) {
      var oldViewState = this._getViewState(oldProps);

      var newViewState = this._getViewState(newProps);

      var viewportChanged = newViewState.latitude !== oldViewState.latitude || newViewState.longitude !== oldViewState.longitude || newViewState.zoom !== oldViewState.zoom || newViewState.pitch !== oldViewState.pitch || newViewState.bearing !== oldViewState.bearing || newViewState.altitude !== oldViewState.altitude;

      if (viewportChanged) {
        this._map.jumpTo(this._viewStateToMapboxProps(newViewState));

        if (newViewState.altitude !== oldViewState.altitude) {
          this._map.transform.altitude = newViewState.altitude;
        }
      }

      return viewportChanged;
    }
  }, {
    key: "_getViewState",
    value: function _getViewState(props) {
      var _ref = props.viewState || props,
          longitude = _ref.longitude,
          latitude = _ref.latitude,
          zoom = _ref.zoom,
          _ref$pitch = _ref.pitch,
          pitch = _ref$pitch === void 0 ? 0 : _ref$pitch,
          _ref$bearing = _ref.bearing,
          bearing = _ref$bearing === void 0 ? 0 : _ref$bearing,
          _ref$altitude = _ref.altitude,
          altitude = _ref$altitude === void 0 ? 1.5 : _ref$altitude;

      return {
        longitude: longitude,
        latitude: latitude,
        zoom: zoom,
        pitch: pitch,
        bearing: bearing,
        altitude: altitude
      };
    }
  }, {
    key: "_checkStyleSheet",
    value: function _checkStyleSheet() {
      var mapboxVersion = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '0.47.0';

      if (typeof document === 'undefined') {
        return;
      }

      try {
        var testElement = document.createElement('div');
        testElement.className = 'mapboxgl-map';
        testElement.style.display = 'none';
        document.body.append(testElement);
        var isCssLoaded = window.getComputedStyle(testElement).position !== 'static';

        if (!isCssLoaded) {
          var link = document.createElement('link');
          link.setAttribute('rel', 'stylesheet');
          link.setAttribute('type', 'text/css');
          link.setAttribute('href', "https://api.tiles.mapbox.com/mapbox-gl-js/v".concat(mapboxVersion, "/mapbox-gl.css"));
          document.head.append(link);
        }
      } catch (error) {}
    }
  }, {
    key: "_viewStateToMapboxProps",
    value: function _viewStateToMapboxProps(viewState) {
      return {
        center: [viewState.longitude, viewState.latitude],
        zoom: viewState.zoom,
        bearing: viewState.bearing,
        pitch: viewState.pitch
      };
    }
  }]);

  return Mapbox;
}();

_defineProperty(Mapbox, "initialized", false);

_defineProperty(Mapbox, "propTypes", propTypes);

_defineProperty(Mapbox, "defaultProps", defaultProps);

_defineProperty(Mapbox, "savedMap", null);

export { Mapbox as default };
//# sourceMappingURL=mapbox.js.map