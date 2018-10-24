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
import {PureComponent, createElement, createContext} from 'react';
import PropTypes from 'prop-types';

import {normalizeStyle} from '../utils/style-utils';

import WebMercatorViewport from 'viewport-mercator-project';
import AutoSizer from 'react-virtualized-auto-sizer';

import Mapbox from '../mapbox/mapbox';
import mapboxgl from '../utils/mapboxgl';
import {checkVisibilityConstraints} from '../utils/map-constraints';

/* eslint-disable max-len */
const TOKEN_DOC_URL = 'https://uber.github.io/react-map-gl/#/Documentation/getting-started/about-mapbox-tokens';
const NO_TOKEN_WARNING = 'A valid API access token is required to use Mapbox data';
/* eslint-disable max-len */

export const StaticContext = createContext({
  viewport: null,
  map: null
});

function noop() {}

const UNAUTHORIZED_ERROR_CODE = 401;

const CONTAINER_STYLE = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  overflow: 'hidden'
};

const propTypes = Object.assign({}, Mapbox.propTypes, {
  /** The dimensions of the map **/
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /** Callback when map size changes **/
  onResize: PropTypes.func,

  /** The Mapbox style. A string url or a MapboxGL style Immutable.Map object. */
  mapStyle: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  /** There are known issues with style diffing. As stopgap, add option to prevent style diffing. */
  preventStyleDiffing: PropTypes.bool,
  /** Hide invalid token warning even if request fails */
  disableTokenWarning: PropTypes.bool,
  /** Whether the map is visible */
  visible: PropTypes.bool,

  /** Advanced features */
  // Contraints for displaying the map. If not met, then the map is hidden.
  // Experimental! May be changed in minor version updates.
  visibilityConstraints: PropTypes.object
});

const defaultProps = Object.assign({}, Mapbox.defaultProps, {
  mapStyle: 'mapbox://styles/mapbox/light-v8',
  preventStyleDiffing: false,
  visible: true,
  onResize: noop
});

export default class StaticMap extends PureComponent {
  static supported() {
    return mapboxgl && mapboxgl.supported();
  }

  constructor(props) {
    super(props);
    this._queryParams = {};
    if (!StaticMap.supported()) {
      this.componentDidMount = noop;
      this.componentWillReceiveProps = noop;
      this.componentDidUpdate = noop;
      this.componentWillUnmount = noop;
    }
    this.state = {
      accessTokenInvalid: false
    };
    this._width = 0;
    this._height = 0;
  }

  componentDidMount() {
    const {mapStyle} = this.props;

    this._mapbox = new Mapbox(Object.assign({}, this.props, {
      mapboxgl, // Handle to mapbox-gl library
      width: this._width,
      height: this._height,
      container: this._mapboxMap,
      onError: this._mapboxMapError,
      mapStyle: normalizeStyle(mapStyle)
    }));
    this._map = this._mapbox.getMap();
  }

  componentDidUpdate(prevProps) {
    this._updateMapStyle(prevProps, this.props);
    this._updateMapProps(this.props);
  }

  componentWillUnmount() {
    this._mapbox.finalize();
    this._mapbox = null;
    this._map = null;
  }

  // External apps can access map this way
  getMap = () => {
    return this._map;
  }

  /** Uses Mapbox's
    * queryRenderedFeatures API to find features at point or in a bounding box.
    * https://www.mapbox.com/mapbox-gl-js/api/#Map#queryRenderedFeatures
    * To query only some of the layers, set the `interactive` property in the
    * layer style to `true`.
    * @param {[Number, Number]|[[Number, Number], [Number, Number]]} geometry -
    *   Point or an array of two points defining the bounding box
    * @param {Object} options - query options
    */
  queryRenderedFeatures = (geometry, options = {}) => {
    return this._map.queryRenderedFeatures(geometry, options);
  }

  // Note: needs to be called after render (e.g. in componentDidUpdate)
  _updateMapSize(width, height) {
    if (this._width !== width || this._height !== height) {
      this._width = width;
      this._height = height;
      this._updateMapProps(this.props);
      this.props.onResize({width, height});
    }
  }

  _updateMapStyle(oldProps, newProps) {
    const mapStyle = newProps.mapStyle;
    const oldMapStyle = oldProps.mapStyle;
    if (mapStyle !== oldMapStyle) {
      this._map.setStyle(normalizeStyle(mapStyle), {diff: !this.props.preventStyleDiffing});
    }
  }

  _updateMapProps(props) {
    if (!this._mapbox) {
      return;
    }
    this._mapbox.setProps(Object.assign({}, props, {
      width: this._width,
      height: this._height
    }));
  }

  _mapboxMapLoaded = (ref) => {
    this._mapboxMap = ref;
  }

  // Handle map error
  _mapboxMapError = (evt) => {
    const statusCode = evt.error && evt.error.status || evt.status;
    if (statusCode === UNAUTHORIZED_ERROR_CODE && !this.state.accessTokenInvalid) {
      // Mapbox throws unauthorized error - invalid token
      console.error(NO_TOKEN_WARNING); // eslint-disable-line
      this.setState({accessTokenInvalid: true});
    }
  }

  _renderNoTokenWarning() {
    if (this.state.accessTokenInvalid && !this.props.disableTokenWarning) {
      const style = {
        position: 'absolute',
        left: 0,
        top: 0
      };
      return (
        createElement('div', {key: 'warning', id: 'no-token-warning', style}, [
          createElement('h3', {key: 'header'}, NO_TOKEN_WARNING),
          createElement('div', {key: 'text'}, 'For information on setting up your basemap, read'),
          createElement('a', {key: 'link', href: TOKEN_DOC_URL}, 'Note on Map Tokens')
        ])
      );
    }

    return null;
  }

  _renderOverlays(dimensions) {
    const {
      width = this.props.width,
      height = this.props.height
    } = dimensions;
    this._updateMapSize(width, height);

    const staticContext = {
      viewport: new WebMercatorViewport(Object.assign({}, this.props, this.props.viewState, {
        width,
        height
      })),
      map: this._map
    };

    return createElement(StaticContext.Provider, {value: staticContext},
      createElement('div', {
        key: 'map-overlays',
        className: 'overlays',
        style: CONTAINER_STYLE,
        children: this.props.children
      })
    );
  }

  render() {
    const {className, width, height, style, visibilityConstraints} = this.props;
    const mapContainerStyle = Object.assign({position: 'relative'}, style, {width, height});

    const visible = this.props.visible &&
      checkVisibilityConstraints(this.props.viewState || this.props, visibilityConstraints);

    const mapStyle = Object.assign({}, CONTAINER_STYLE, {
      visibility: visible ? 'visible' : 'hidden'
    });

    return createElement('div', {
      key: 'map-container',
      style: mapContainerStyle,
      children: [
        createElement('div', {
          key: 'map-mapbox',
          ref: this._mapboxMapLoaded,
          style: mapStyle,
          className
        }),
        // AutoSizer is a pure component and does not rerender when map props change
        // rebind the callback so that it's triggered every render pass
        createElement(AutoSizer, {
          key: 'autosizer',
          disableWidth: Number.isFinite(width),
          disableHeight: Number.isFinite(height)
        }, this._renderOverlays.bind(this)),
        this._renderNoTokenWarning()
      ]
    });
  }
}

StaticMap.displayName = 'StaticMap';
StaticMap.propTypes = propTypes;
StaticMap.defaultProps = defaultProps;
