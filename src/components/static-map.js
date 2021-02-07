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
import {useState, useRef, useContext, useImperativeHandle, forwardRef} from 'react';
import * as PropTypes from 'prop-types';

import WebMercatorViewport from 'viewport-mercator-project';
import ResizeObserver from 'resize-observer-polyfill';

import Mapbox from '../mapbox/mapbox';
import mapboxgl from '../utils/mapboxgl';
import {checkVisibilityConstraints} from '../utils/map-constraints';
import {MAPBOX_LIMITS} from '../utils/map-state';
import MapContext, {MapContextProvider} from './map-context';
import useIsomorphicLayoutEffect from '../utils/use-isomorphic-layout-effect';

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
  disableTokenWarning: false,
  visible: true,
  onResize: noop,
  className: '',
  style: null,
  visibilityConstraints: MAPBOX_LIMITS
});

function NoTokenWarning() {
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
      <h3 key="header">{NO_TOKEN_WARNING}</h3>
      <div key="text">For information on setting up your basemap, read</div>
      <a key="link" href={TOKEN_DOC_URL}>
        Note on Map Tokens
      </a>
    </div>
  );
}

function getRefHandles(mapboxRef) {
  return {
    getMap: () => mapboxRef.current && mapboxRef.current.getMap(),
    queryRenderedFeatures: (geometry, options = {}) => {
      const map = mapboxRef.current && mapboxRef.current.getMap();
      return map && map.queryRenderedFeatures(geometry, options);
    }
  };
}

function preventScroll(event) {
  event.target.scrollTo(0, 0);
}

const StaticMap = forwardRef((props, ref) => {
  const [accessTokenValid, setTokenState] = useState(true);
  const [size, setSize] = useState([0, 0]);
  const mapboxRef = useRef(null);
  const mapDivRef = useRef(null);
  const containerRef = useRef(null);
  const context = useContext(MapContext);

  useIsomorphicLayoutEffect(() => {
    if (!StaticMap.supported()) {
      return undefined;
    }

    // Initialize
    const mapbox = new Mapbox({
      ...props,
      mapboxgl, // Handle to mapbox-gl library
      width: size[0],
      height: size[1],
      container: mapDivRef.current,
      onError: evt => {
        const statusCode = (evt.error && evt.error.status) || evt.status;
        if (statusCode === UNAUTHORIZED_ERROR_CODE && accessTokenValid) {
          // Mapbox throws unauthorized error - invalid token
          console.error(NO_TOKEN_WARNING); // eslint-disable-line
          setTokenState(false);
        }
        props.onError(evt);
      }
    });
    mapboxRef.current = mapbox;

    if (context && context.setMap) {
      context.setMap(mapbox.getMap());
    }

    const resizeObserver = new ResizeObserver(entries => {
      if (entries[0].contentRect) {
        const {width, height} = entries[0].contentRect;
        setSize([width, height]);
        props.onResize({width, height});
      }
    });
    resizeObserver.observe(containerRef.current);

    // Clean up
    return () => {
      mapbox.finalize();
      mapboxRef.current = null;
      resizeObserver.disconnect();
    };
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (mapboxRef.current) {
      mapboxRef.current.setProps(
        Object.assign({}, props, {
          width: size[0],
          height: size[1]
        })
      );
    }
  });

  const map = mapboxRef.current && mapboxRef.current.getMap();

  // External apps can call methods via ref
  // Note: this is not a recommended pattern in React FC - Keeping for backward compatibility
  useImperativeHandle(ref, () => getRefHandles(mapboxRef), []);

  const overlays = map && (
    <MapContextProvider
      value={{
        ...context,
        viewport:
          context.viewport ||
          new WebMercatorViewport({
            ...props,
            ...props.viewState,
            width: size[0],
            height: size[1]
          }),
        map,
        container: context.container || containerRef.current
      }}
    >
      <div
        key="map-overlays"
        className="overlays"
        // @ts-ignore
        style={CONTAINER_STYLE}
        onScroll={preventScroll}
      >
        {props.children}
      </div>
    </MapContextProvider>
  );

  const {className, width, height, style, visibilityConstraints} = props;
  const mapContainerStyle = Object.assign({position: 'relative'}, style, {
    width,
    height
  });

  const visible =
    props.visible && checkVisibilityConstraints(props.viewState || props, visibilityConstraints);

  const mapStyle = Object.assign({}, CONTAINER_STYLE, {
    visibility: visible ? 'inherit' : 'hidden'
  });

  return (
    <div
      key="map-container"
      ref={containerRef}
      // @ts-ignore
      style={mapContainerStyle}
    >
      <div
        key="map-mapbox"
        ref={mapDivRef}
        // @ts-ignore
        style={mapStyle}
        className={className}
      />
      {overlays}
      {!accessTokenValid && !props.disableTokenWarning && <NoTokenWarning />}
    </div>
  );
});

StaticMap.supported = () => mapboxgl && mapboxgl.supported();
StaticMap.propTypes = propTypes;
StaticMap.defaultProps = defaultProps;

export default StaticMap;
