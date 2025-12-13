import * as React from 'react';
import Map from 'react-map-gl/mapbox';
// import {useMap} from 'react-map-gl/mapbox';

import 'mapbox-gl/dist/mapbox-gl.css';
import Controls2 from './controls2';

const MAPBOX_TOKEN = ''; // Set your mapbox token here

export default function MapView() {
  /**
   * ## This is how `useMap` works:
   * ```
   * const maps = useMap();
   * console.log('MapView useMap()', maps);
   * ```
   * ### First render:
   * ```
   * {
   *     "current": undefined
   * }
   * Second render:
   * {
   *     "current": undefined,
   *     "mymap": {...} // See https://visgl.github.io/react-map-gl/docs/api-reference/types#mapref
   * }
   * ```
   */

  return (
    <Map
      id="mymap" // relevant for `useMap`, see control.js, controls2.js
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14
      }}
      style={{width: 800, height: 600}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={MAPBOX_TOKEN}
    >
      <Controls2 />
    </Map>
  );
}
