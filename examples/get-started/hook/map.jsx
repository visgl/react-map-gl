import * as React from 'react';
import Map from 'react-map-gl';
import mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = ''; // Set your mapbox token here

export default function MapView() {
  return (
    <Map
      id="mymap"
      mapLib={mapboxgl}
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14
      }}
      style={{width: 800, height: 600}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={MAPBOX_TOKEN}
    />
  );
}
