import * as React from 'react';
import {createRoot} from 'react-dom/client';
import Map from 'react-map-gl';

import GeocoderControl from './geocoder-control';
import ControlPanel from './control-panel';

// eslint-disable-next-line
const TOKEN = process.env.MapboxAccessToken; // Set your mapbox token here

export default function App() {
  return (
    <>
      <Map
        initialViewState={{
          longitude: -79.4512,
          latitude: 43.6568,
          zoom: 13
        }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={TOKEN}
      >
        <GeocoderControl mapboxAccessToken={TOKEN} position="top-left" />
      </Map>
      <ControlPanel />
    </>
  );
}

export function renderToDom(container) {
  createRoot(container).render(<App />);
}
