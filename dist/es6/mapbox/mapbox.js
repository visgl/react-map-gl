import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import PropTypes from 'prop-types';
import { document } from '../utils/globals';

function noop() {}

function defaultOnError(event) {
  if (event) {
    console.error(event.error);
  }
}

const propTypes = {
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
const defaultProps = {
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
  let accessToken = null;

  if (typeof window !== 'undefined' && window.location) {
    const match = window.location.search.match(/access_token=([^&\/]*)/);
    accessToken = match && match[1];
  }

  if (!accessToken && typeof process !== 'undefined') {
    accessToken = accessToken || process.env.MapboxAccessToken || process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
  }

  return accessToken || 'no-token';
}

function checkPropTypes(props, component = 'component') {
  if (props.debug) {
    PropTypes.checkPropTypes(propTypes, props, 'prop', component);
  }
}

export default class Mapbox {
  constructor(props) {
    _defineProperty(this, "mapboxgl", void 0);

    _defineProperty(this, "props", defaultProps);

    _defineProperty(this, "_map", null);

    _defineProperty(this, "width", 0);

    _defineProperty(this, "height", 0);

    _defineProperty(this, "_fireLoadEvent", () => {
      this.props.onLoad({
        type: 'load',
        target: this._map
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

  finalize() {
    this._destroy();

    return this;
  }

  setProps(props) {
    this._update(this.props, props);

    return this;
  }

  resize() {
    this._map.resize();

    return this;
  }

  redraw() {
    const map = this._map;

    if (map.style) {
      if (map._frame) {
        map._frame.cancel();

        map._frame = null;
      }

      map._render();
    }
  }

  getMap() {
    return this._map;
  }

  _reuse(props) {
    this._map = Mapbox.savedMap;

    const oldContainer = this._map.getContainer();

    const newContainer = props.container;
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

  _create(props) {
    if (props.reuseMaps && Mapbox.savedMap) {
      this._reuse(props);
    } else {
      if (props.gl) {
        const getContext = HTMLCanvasElement.prototype.getContext;

        HTMLCanvasElement.prototype.getContext = () => {
          HTMLCanvasElement.prototype.getContext = getContext;
          return props.gl;
        };
      }

      const mapOptions = {
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

  _destroy() {
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

  _initialize(props) {
    props = Object.assign({}, defaultProps, props);
    checkPropTypes(props, 'Mapbox');
    this.mapboxgl.accessToken = props.mapboxApiAccessToken || defaultProps.mapboxApiAccessToken;
    this.mapboxgl.baseApiUrl = props.mapboxApiUrl;

    this._create(props);

    const {
      container
    } = props;
    Object.defineProperty(container, 'offsetWidth', {
      get: () => this.width
    });
    Object.defineProperty(container, 'clientWidth', {
      get: () => this.width
    });
    Object.defineProperty(container, 'offsetHeight', {
      get: () => this.height
    });
    Object.defineProperty(container, 'clientHeight', {
      get: () => this.height
    });

    const canvas = this._map.getCanvas();

    if (canvas) {
      canvas.style.outline = 'none';
    }

    this._updateMapViewport({}, props);

    this._updateMapSize({}, props);

    this.props = props;
  }

  _update(oldProps, newProps) {
    if (!this._map) {
      return;
    }

    newProps = Object.assign({}, this.props, newProps);
    checkPropTypes(newProps, 'Mapbox');

    const viewportChanged = this._updateMapViewport(oldProps, newProps);

    const sizeChanged = this._updateMapSize(oldProps, newProps);

    if (!newProps.asyncRender && (viewportChanged || sizeChanged)) {
      this.redraw();
    }

    this.props = newProps;
  }

  _updateMapSize(oldProps, newProps) {
    const sizeChanged = oldProps.width !== newProps.width || oldProps.height !== newProps.height;

    if (sizeChanged) {
      this.width = newProps.width;
      this.height = newProps.height;
      this.resize();
    }

    return sizeChanged;
  }

  _updateMapViewport(oldProps, newProps) {
    const oldViewState = this._getViewState(oldProps);

    const newViewState = this._getViewState(newProps);

    const viewportChanged = newViewState.latitude !== oldViewState.latitude || newViewState.longitude !== oldViewState.longitude || newViewState.zoom !== oldViewState.zoom || newViewState.pitch !== oldViewState.pitch || newViewState.bearing !== oldViewState.bearing || newViewState.altitude !== oldViewState.altitude;

    if (viewportChanged) {
      this._map.jumpTo(this._viewStateToMapboxProps(newViewState));

      if (newViewState.altitude !== oldViewState.altitude) {
        this._map.transform.altitude = newViewState.altitude;
      }
    }

    return viewportChanged;
  }

  _getViewState(props) {
    const {
      longitude,
      latitude,
      zoom,
      pitch = 0,
      bearing = 0,
      altitude = 1.5
    } = props.viewState || props;
    return {
      longitude,
      latitude,
      zoom,
      pitch,
      bearing,
      altitude
    };
  }

  _checkStyleSheet(mapboxVersion = '0.47.0') {
    if (typeof document === 'undefined') {
      return;
    }

    try {
      const testElement = document.createElement('div');
      testElement.className = 'mapboxgl-map';
      testElement.style.display = 'none';
      document.body.append(testElement);
      const isCssLoaded = window.getComputedStyle(testElement).position !== 'static';

      if (!isCssLoaded) {
        const link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('type', 'text/css');
        link.setAttribute('href', "https://api.tiles.mapbox.com/mapbox-gl-js/v".concat(mapboxVersion, "/mapbox-gl.css"));
        document.head.append(link);
      }
    } catch (error) {}
  }

  _viewStateToMapboxProps(viewState) {
    return {
      center: [viewState.longitude, viewState.latitude],
      zoom: viewState.zoom,
      bearing: viewState.bearing,
      pitch: viewState.pitch
    };
  }

}

_defineProperty(Mapbox, "initialized", false);

_defineProperty(Mapbox, "propTypes", propTypes);

_defineProperty(Mapbox, "defaultProps", defaultProps);

_defineProperty(Mapbox, "savedMap", null);
//# sourceMappingURL=mapbox.js.map