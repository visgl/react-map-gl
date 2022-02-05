/* global document */
import * as React from 'react';
import {render} from 'react-dom';
import Map, {Marker} from 'react-map-gl';
import maplibregl from 'maplibre-gl';

import 'maplibre-gl/dist/maplibre-gl.css';

function Root() {
  return (
    <Map
      initialViewState={{
        latitude: 37.8,
        longitude: -122.4,
        zoom: 14
      }}
      mapLib={maplibregl}
      style={{width: 800, height: 600}}
      mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
    >
      <Marker longitude={-122.4} latitude={37.8} color="red" />
    </Map>
  );
}

render(<Root />, document.body.appendChild(document.createElement('div')));
