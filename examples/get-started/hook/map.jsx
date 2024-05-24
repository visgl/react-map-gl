import * as React from 'react';
import Map, {useMap} from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';
import Controls2 from './controls2';

const MAPBOX_TOKEN = ''; // Set your mapbox token here

export default function MapView() {
  /**
   * ## This is how `useMap` works:
   * ```
   * const demo = useMap();
   * console.log('MapView', {demo});
   * ```
   * ### First render:
   * ```
   * {
   *     "demo": {
   *         "current": undefined
   *     }
   * }
   * Second render:
   * {
   *     "demo": {
   *         "current": undefined,
   *         "mymap": {...} // See https://visgl.github.io/react-map-gl/docs/api-reference/types#mapref
   *     }
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
