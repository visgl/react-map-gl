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
import {PureComponent, createElement} from 'react';
import PropTypes from 'prop-types';

import {getInteractiveLayerIds, setDiffStyle} from '../utils/style-utils';
import isImmutableMap from '../utils/is-immutable-map';

import WebMercatorViewport from 'viewport-mercator-project';

import Mapbox from '../mapbox/mapbox';

/* eslint-disable max-len */
const TOKEN_DOC_URL = 'https://uber.github.io/react-map-gl/#/Documentation/getting-started/about-mapbox-tokens';
const NO_TOKEN_WARNING = 'A valid API access token is required to use Mapbox data';
/* eslint-disable max-len */

function noop() {}

const UNAUTHORIZED_ERROR_CODE = 401;

const propTypes = Object.assign({}, Mapbox.propTypes, {
  /** The Mapbox style. A string url or a MapboxGL style Immutable.Map object. */
  mapStyle: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  /** There are known issues with style diffing. As stopgap, add option to prevent style diffing. */
  preventStyleDiffing: PropTypes.bool,
  /** Whether the map is visible */
  visible: PropTypes.bool
});

const defaultProps = Object.assign({}, Mapbox.defaultProps, {
  mapStyle: 'mapbox://styles/mapbox/light-v8',
  preventStyleDiffing: false,
  visible: true
});

const childContextTypes = {
  viewport: PropTypes.instanceOf(WebMercatorViewport)
};

export default class StaticMap extends PureComponent {
  static supported() {
    return Mapbox && Mapbox.supported();
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

    this.getMap = this.getMap.bind(this);
    this.queryRenderedFeatures = this.queryRenderedFeatures.bind(this);
    this._updateQueryParams = this._updateQueryParams.bind(this);
    this._updateMapSize = this._updateMapSize.bind(this);
    this._updateMapStyle = this._updateMapStyle.bind(this);
    this._mapboxMapLoaded = this._mapboxMapLoaded.bind(this);
    this._mapboxMapError = this._mapboxMapError.bind(this);
    this._renderNoTokenWarning = this._renderNoTokenWarning.bind(this);
  }

  getChildContext() {
    return {
      viewport: new WebMercatorViewport(this.props)
    };
  }

  componentDidMount() {
    const {mapStyle} = this.props;

    this._mapbox = new Mapbox(Object.assign({}, this.props, {
      container: this._mapboxMap,
      onError: this._mapboxMapError,
      mapStyle: isImmutableMap(mapStyle) ? mapStyle.toJS() : mapStyle
    }));
    this._map = this._mapbox.getMap();
    this._updateQueryParams(mapStyle);
  }

  componentWillReceiveProps(newProps) {
    this._mapbox.setProps(newProps);
    this._updateMapStyle(this.props, newProps);

    // this._updateMapViewport(this.props, newProps);

    // Save width/height so that we can check them in componentDidUpdate
    this.setState({
      width: this.props.width,
      height: this.props.height
    });
  }

  componentDidUpdate() {
    // Since Mapbox's map.resize() reads size from DOM
    // we must wait to read size until after render (i.e. here in "didUpdate")
    this._updateMapSize(this.state, this.props);
  }

  componentWillUnmount() {
    this._mapbox.finalize();
    this._mapbox = null;
    this._map = null;
  }

  // External apps can access map this way
  getMap() {
    return this._map;
  }

  /** Uses Mapbox's
    * queryRenderedFeatures API to find features at point or in a bounding box.
    * https://www.mapbox.com/mapbox-gl-js/api/#Map#queryRenderedFeatures
    * To query only some of the layers, set the `interactive` property in the
    * layer style to `true`.
    * @param {[Number, Number]|[[Number, Number], [Number, Number]]} geometry -
    *   Point or an array of two points defining the bounding box
    * @param {Object} parameters - query options
    */
  queryRenderedFeatures(geometry, parameters) {
    const queryParams = parameters || this._queryParams;
    if (queryParams.layers && queryParams.layers.length === 0) {
      return [];
    }
    return this._map.queryRenderedFeatures(geometry, queryParams);
  }

  // Hover and click only query layers whose interactive property is true
  _updateQueryParams(mapStyle) {
    const interactiveLayerIds = getInteractiveLayerIds(mapStyle);
    this._queryParams = {layers: interactiveLayerIds};
  }

  // Note: needs to be called after render (e.g. in componentDidUpdate)
  _updateMapSize(oldProps, newProps) {
    const sizeChanged =
      oldProps.width !== newProps.width || oldProps.height !== newProps.height;

    if (sizeChanged) {
      this._map.resize();
      // this._callOnChangeViewport(this._map.transform);
    }
  }

  _updateMapStyle(oldProps, newProps) {
    const mapStyle = newProps.mapStyle;
    const oldMapStyle = oldProps.mapStyle;
    if (mapStyle !== oldMapStyle) {
      if (isImmutableMap(mapStyle)) {
        if (this.props.preventStyleDiffing) {
          this._map.setStyle(mapStyle.toJS());
        } else {
          setDiffStyle(oldMapStyle, mapStyle, this._map);
        }
      } else {
        this._map.setStyle(mapStyle);
      }
      this._updateQueryParams(mapStyle);
    }
  }

  _mapboxMapLoaded(ref) {
    this._mapboxMap = ref;
  }

  // Handle map error
  _mapboxMapError(evt) {
    const statusCode = evt.error && evt.error.status || evt.status;
    if (statusCode === UNAUTHORIZED_ERROR_CODE && !this.state.accessTokenInvalid) {
      // Mapbox throws unauthorized error - invalid token
      console.error(NO_TOKEN_WARNING); // eslint-disable-line
      this.setState({accessTokenInvalid: true});
    }
  }

  _renderNoTokenWarning() {
    if (this.state.accessTokenInvalid) {
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

  render() {
    const {className, width, height, style, visible} = this.props;
    const mapContainerStyle = Object.assign({}, style, {width, height, position: 'relative'});
    const mapStyle = Object.assign({}, style, {
      width,
      height,
      visibility: visible ? 'visible' : 'hidden'
    });
    const overlayContainerStyle = {
      position: 'absolute',
      left: 0,
      top: 0,
      width,
      height,
      overflow: 'hidden'
    };

    // Note: a static map still handles clicks and hover events
    return (
      createElement('div', {
        key: 'map-container',
        style: mapContainerStyle,
        children: [
          createElement('div', {
            key: 'map-mapbox',
            ref: this._mapboxMapLoaded,
            style: mapStyle,
            className
          }),
          createElement('div', {
            key: 'map-overlays',
            // Same as interactive map's overlay container
            className: 'overlays',
            style: overlayContainerStyle,
            children: this.props.children
          }),
          this._renderNoTokenWarning()
        ]
      })
    );
  }
}

StaticMap.displayName = 'StaticMap';
StaticMap.propTypes = propTypes;
StaticMap.defaultProps = defaultProps;
StaticMap.childContextTypes = childContextTypes;
