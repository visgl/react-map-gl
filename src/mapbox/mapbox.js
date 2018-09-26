// Copyright (c) 2015 Uber Technologies, Inc.

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

/* global window, document, process */
import PropTypes from 'prop-types';

function noop() {}

const propTypes = {
  // Creation parameters
  container: PropTypes.object, /** The container to have the map. */
  mapboxApiAccessToken: PropTypes.string, /** Mapbox API access token for Mapbox tiles/styles. */
  attributionControl: PropTypes.bool, /** Show attribution control or not. */
  preserveDrawingBuffer: PropTypes.bool, /** Useful when you want to export the canvas as a PNG. */
  onLoad: PropTypes.func, /** The onLoad callback for the map */
  onError: PropTypes.func, /** The onError callback for the map */
  reuseMaps: PropTypes.bool,
  reuseMap: PropTypes.bool,
  transformRequest: PropTypes.func, /** The transformRequest callback for the map */

  mapStyle: PropTypes.string, /** The Mapbox style. A string url to a MapboxGL style */
  visible: PropTypes.bool, /** Whether the map is visible */

  // Map view state
  width: PropTypes.number, /** The width of the map. */
  height: PropTypes.number, /** The height of the map. */

  viewState: PropTypes.object, /** object containing lng/lat/zoom/bearing/pitch */

  longitude: PropTypes.number, /** The longitude of the center of the map. */
  latitude: PropTypes.number, /** The latitude of the center of the map. */
  zoom: PropTypes.number, /** The tile zoom level of the map. */
  bearing: PropTypes.number, /** Specify the bearing of the viewport */
  pitch: PropTypes.number, /** Specify the pitch of the viewport */

  // Note: Non-public API, see https://github.com/mapbox/mapbox-gl-js/issues/1137
  altitude: PropTypes.number, /** Altitude of the viewport camera. Default 1.5 "screen heights" */
  mapOptions: PropTypes.object /** Extra options to pass to Mapbox constructor. See #545. **/
};

const defaultProps = {
  mapboxApiAccessToken: getAccessToken(),
  preserveDrawingBuffer: false,
  attributionControl: true,
  preventStyleDiffing: false,
  onLoad: noop,
  onError: noop,
  reuseMaps: false,
  reuseMap: false,
  transformRequest: null,

  mapStyle: 'mapbox://styles/mapbox/light-v8',
  visible: true,

  bearing: 0,
  pitch: 0,
  altitude: 1.5,

  width: 0,
  height: 0,

  mapOptions: {}
};

// Try to get access token from URL, env, local storage or config
export function getAccessToken() {
  let accessToken = null;

  if (typeof window !== 'undefined' && window.location) {
    const match = window.location.search.match(/access_token=([^&\/]*)/);
    accessToken = match && match[1];
  }

  if (!accessToken && typeof process !== 'undefined') {
    // Note: This depends on bundler plugins (e.g. webpack) inmporting environment correctly
    accessToken = accessToken || process.env.MapboxAccessToken; // eslint-disable-line
  }

  return accessToken || null;
}

// Helper function to merge defaultProps and check prop types
function checkPropTypes(props, component = 'component') {
  // TODO - check for production (unless done by prop types package?)
  if (props.debug) {
    PropTypes.checkPropTypes(propTypes, props, 'prop', component);
  }
}

// A small wrapper class for mapbox-gl
// - Provides a prop style interface (that can be trivially used by a React wrapper)
// - Makes sure mapbox doesn't crash under Node
// - Handles map reuse (to work around Mapbox resource leak issues)
// - Provides support for specifying tokens during development

export default class Mapbox {
  constructor(props) {
    if (!props.mapboxgl) {
      throw new Error('Mapbox not available');
    }

    if (!Mapbox.initialized && console.debug) { // eslint-disable-line
      Mapbox.initialized = true;

      // Version detection using babel plugin
      /* global __VERSION__ */
      const VERSION = typeof __VERSION__ !== 'undefined' ? __VERSION__ : 'untranspiled source';

      console.debug(`react-map-gl: ${VERSION} using mapbox-gl v${props.mapboxgl.version}`); // eslint-disable-line

      this._checkStyleSheet(props.mapboxgl.version);
    }

    this.props = {};
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

  // Mapbox's map.resize() reads size from DOM, so DOM element must already be resized
  // In a system like React we must wait to read size until after render
  // (e.g. until "componentDidUpdate")
  resize() {
    this._map.resize();
    return this;
  }

  // External apps can access map this way
  getMap() {
    return this._map;
  }

  // PRIVATE API

  _create(props) {
    // Reuse a saved map, if available
    if ((props.reuseMaps || props.reuseMap) && Mapbox.savedMap) {
      this._map = this.map = Mapbox.savedMap;
      // When reusing the saved map, we need to reparent the map(canvas) and other child nodes
      // intoto the new container from the props.
      // Step1: reparenting child nodes from old container to new container
      const oldContainer = this._map.getContainer();
      const newContainer = props.container;
      newContainer.classList.add('mapboxgl-map');
      while (oldContainer.childNodes.length > 0) {
        newContainer.appendChild(oldContainer.childNodes[0]);
      }
      // Step2: replace the internal container with new container from the react component
      this._map._container = newContainer;
      Mapbox.savedMap = null;

      // Update style
      if (props.mapStyle) {
        this._map.setStyle(props.mapStyle);
      }

      // TODO - need to call onload again, need to track with Promise?
      props.onLoad();
    } else {
      const mapOptions = {
        container: props.container || document.body,
        center: [0, 0],
        zoom: 8,
        pitch: 0,
        bearing: 0,
        style: props.mapStyle,
        interactive: false,
        attributionControl: props.attributionControl,
        preserveDrawingBuffer: props.preserveDrawingBuffer
      };
      // We don't want to pass a null or no-op transformRequest function.
      if (props.transformRequest) {
        mapOptions.transformRequest = props.transformRequest;
      }
      this._map = this.map = new props.mapboxgl.Map(
        Object.assign({}, mapOptions, props.mapOptions));

      // Attach optional onLoad function
      this.map.once('load', props.onLoad);
      this.map.on('error', props.onError);
    }

    return this;
  }

  _destroy() {
    if (!this._map) {
      return;
    }

    if (!Mapbox.savedMap) {
      Mapbox.savedMap = this._map;
    } else {
      this._map.remove();
    }
    this._map = null;
  }

  _initialize(props) {
    props = Object.assign({}, defaultProps, props);
    checkPropTypes(props, 'Mapbox');

    // Make empty string pick up default prop
    this.accessToken = props.mapboxApiAccessToken || defaultProps.mapboxApiAccessToken;

    // Creation only props
    if (props.mapboxgl) {
      if (!this.accessToken) {
        props.mapboxgl.accessToken = 'no-token'; // Prevents mapbox from throwing
      } else {
        props.mapboxgl.accessToken = this.accessToken;
      }
    }

    this._create(props);

    // Disable outline style
    const canvas = this.map.getCanvas();
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

    this._updateMapViewport(oldProps, newProps);
    this._updateMapSize(oldProps, newProps);

    this.props = newProps;
  }

  // Note: needs to be called after render (e.g. in componentDidUpdate)
  _updateMapSize(oldProps, newProps) {
    const sizeChanged = oldProps.width !== newProps.width || oldProps.height !== newProps.height;
    if (sizeChanged) {
      this._map.resize();
    }
  }

  _updateMapViewport(oldProps, newProps) {
    const oldViewState = this._getViewState(oldProps);
    const newViewState = this._getViewState(newProps);

    const viewportChanged =
      newViewState.latitude !== oldViewState.latitude ||
      newViewState.longitude !== oldViewState.longitude ||
      newViewState.zoom !== oldViewState.zoom ||
      newViewState.pitch !== oldViewState.pitch ||
      newViewState.bearing !== oldViewState.bearing ||
      newViewState.altitude !== oldViewState.altitude;

    if (viewportChanged) {
      this._map.jumpTo(this._getMapboxViewStateProps(newProps));

      // TODO - jumpTo doesn't handle altitude
      if (newViewState.altitude !== oldViewState.altitude) {
        this._map.transform.altitude = newViewState.altitude;
      }
    }
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
    return {longitude, latitude, zoom, pitch, bearing, altitude};
  }

  _checkStyleSheet(mapboxVersion = '0.47.0') {
    if (typeof document === 'undefined') {
      return;
    }

    // check mapbox styles
    try {
      const testElement = document.createElement('div');
      testElement.className = 'mapboxgl-map';
      testElement.style.display = 'none';
      document.body.append(testElement);
      const isCssLoaded = window.getComputedStyle(testElement).position !== 'static';

      if (!isCssLoaded) {
        // attempt to insert mapbox stylesheet
        const link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('type', 'text/css');
        link.setAttribute('href',
          `https://api.tiles.mapbox.com/mapbox-gl-js/v${mapboxVersion}/mapbox-gl.css`);
        document.head.append(link);
      }
    } catch (error) {
      // do nothing
    }
  }

  _getMapboxViewStateProps(props) {
    const viewState = this._getViewState(props);
    return {
      center: [viewState.longitude, viewState.latitude],
      zoom: viewState.zoom,
      bearing: viewState.bearing,
      pitch: viewState.pitch,
      width: props.width,
      height: props.height
    };
  }
}

Mapbox.propTypes = propTypes;
Mapbox.defaultProps = defaultProps;
