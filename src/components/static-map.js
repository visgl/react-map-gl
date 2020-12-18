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
import * as React from 'react';
import {PureComponent, createRef} from 'react';
import * as PropTypes from 'prop-types';

import {normalizeStyle} from '../utils/style-utils';

import WebMercatorViewport from 'viewport-mercator-project';
import ResizeObserver from 'resize-observer-polyfill';

import Mapbox from '../mapbox/mapbox';
import mapboxgl from '../utils/mapboxgl';
import {checkVisibilityConstraints} from '../utils/map-constraints';
import {MAPBOX_LIMITS} from '../utils/map-state';
import MapContext, {MapContextProvider} from './map-context';

/* eslint-disable max-len */
const TOKEN_DOC_URL = 'https://visgl.github.io/react-map-gl/docs/get-started/mapbox-tokens';
const NO_TOKEN_WARNING = 'A valid API access token is required to use Mapbox data';
/* eslint-disable max-len */

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
  /** There are known issues with style diffing. As stopgap, add option to prevent style diffing. */
  preventStyleDiffing: PropTypes.bool,
  /** Hide invalid token warning even if request fails */
  disableTokenWarning: PropTypes.bool,
  /** Whether the map is visible */
  visible: PropTypes.bool,
  /** Custom class name for the map */
  className: PropTypes.string,
  /** Custom CSS for the container */
  style: PropTypes.object,

  /** Advanced features */
  // Contraints for displaying the map. If not met, then the map is hidden.
  // Experimental! May be changed in minor version updates.
  visibilityConstraints: PropTypes.object
});

const defaultProps = Object.assign({}, Mapbox.defaultProps, {
  preventStyleDiffing: false,
  disableTokenWarning: false,
  visible: true,
  onResize: noop,
  className: '',
  style: null,
  visibilityConstraints: MAPBOX_LIMITS
});

export default class StaticMap extends PureComponent {
  static supported() {
    return mapboxgl && mapboxgl.supported();
  }

  static propTypes = propTypes;
  static defaultProps = defaultProps;

  state = {
    accessTokenInvalid: false
  };

  componentDidMount() {
    if (!StaticMap.supported()) {
      return;
    }
    const {mapStyle} = this.props;

    this._mapbox = new Mapbox({
      ...this.props,
      mapboxgl, // Handle to mapbox-gl library
      width: this._width,
      height: this._height,
      container: this._mapboxMapRef.current,
      onError: this._mapboxMapError,
      mapStyle: normalizeStyle(mapStyle)
    });
    this._map = this._mapbox.getMap();

    const resizeObserver = new ResizeObserver(entries => {
      if (entries[0].contentRect) {
        const {width, height} = entries[0].contentRect;
        this._width = width;
        this._height = height;
        this.props.onResize({width, height});
        this.forceUpdate();
      }
    });
    const container = this._mapContainerRef.current;
    if (container) {
      resizeObserver.observe(container);
    }
    this._resizeObserver = resizeObserver;
  }

  componentDidUpdate(prevProps) {
    if (this._mapbox) {
      this._updateMapStyle(prevProps, this.props);
      this._updateMapProps(this.props);
    }

    if (this._context && this._context.setMap && !this._context.map) {
      this._context.setMap(this._map);
    }
  }

  componentWillUnmount() {
    if (this._mapbox) {
      this._mapbox.finalize();
      this._mapbox = null;
      this._map = null;
    }
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
    }
  }

  _mapbox = null;
  _map = null;
  _mapboxMapRef = createRef();
  _mapContainerRef = createRef();
  _queryParams = {};
  _width = 0;
  _height = 0;
  _resizeObserver = null;
  _context = null;

  // External apps can access map this way
  getMap = () => {
    return this._map;
  };

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
  };

  // Note: needs to be called after render (e.g. in componentDidUpdate)
  _updateMapSize(width, height) {
    if (this._width !== width || this._height !== height) {
      this._width = width;
      this._height = height;
      this._updateMapProps(this.props);
    }
  }

  _updateMapStyle(oldProps, newProps) {
    const mapStyle = newProps.mapStyle;
    const oldMapStyle = oldProps.mapStyle;
    if (mapStyle !== oldMapStyle && mapStyle) {
      this._map.setStyle(normalizeStyle(mapStyle), {
        diff: !this.props.preventStyleDiffing
      });
    }
  }

  _updateMapProps(props) {
    if (!this._mapbox) {
      return;
    }
    this._mapbox.setProps(
      Object.assign({}, props, {
        width: this._width,
        height: this._height
      })
    );
  }

  // Handle map error
  _mapboxMapError = evt => {
    const statusCode = (evt.error && evt.error.status) || evt.status;
    if (statusCode === UNAUTHORIZED_ERROR_CODE && !this.state.accessTokenInvalid) {
      // Mapbox throws unauthorized error - invalid token
      console.error(NO_TOKEN_WARNING); // eslint-disable-line
      this.setState({accessTokenInvalid: true});
    }
    this.props.onError(evt);
  };

  _renderNoTokenWarning() {
    if (this.state.accessTokenInvalid && !this.props.disableTokenWarning) {
      const style = {
        position: 'absolute',
        left: 0,
        top: 0
      };
      return (
        <div
          key="warning"
          id="no-token-warning"
          // @ts-ignore
          style={style}
        >
          <h3 key="header">NO_TOKEN_WARNING</h3>
          <div key="text">For information on setting up your basemap, read</div>
          <a key="link" href={TOKEN_DOC_URL}>
            Note on Map Tokens
          </a>
        </div>
      );
    }

    return null;
  }

  _renderOverlays() {
    if (!this._map) {
      return null;
    }

    const {_width: width, _height: height} = this;
    this._updateMapSize(width, height);

    return (
      <MapContext.Consumer>
        {interactiveContext => {
          this._context = interactiveContext;

          const context = {
            ...interactiveContext,
            viewport:
              interactiveContext.viewport ||
              new WebMercatorViewport({
                ...this.props,
                ...this.props.viewState,
                width,
                height
              }),
            map: this._map,
            container: interactiveContext.container || this._mapContainerRef.current
          };
          return (
            <MapContextProvider value={context}>
              <div
                key="map-overlays"
                className="overlays"
                // @ts-ignore
                style={CONTAINER_STYLE}
              >
                {this.props.children}
              </div>
            </MapContextProvider>
          );
        }}
      </MapContext.Consumer>
    );
  }

  render() {
    const {className, width, height, style, visibilityConstraints} = this.props;
    const mapContainerStyle = Object.assign({position: 'relative'}, style, {
      width,
      height
    });

    const visible =
      this.props.visible &&
      checkVisibilityConstraints(this.props.viewState || this.props, visibilityConstraints);

    const mapStyle = Object.assign({}, CONTAINER_STYLE, {
      visibility: visible ? 'inherit' : 'hidden'
    });

    return (
      <div
        key="map-container"
        ref={this._mapContainerRef}
        // @ts-ignore
        style={mapContainerStyle}
      >
        <div
          key="map-mapbox"
          ref={this._mapboxMapRef}
          // @ts-ignore
          style={mapStyle}
          className={className}
        />
        {this._renderOverlays()}
        {this._renderNoTokenWarning()}
      </div>
    );
  }
}
