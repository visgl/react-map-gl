import * as React from 'react';
import {useState} from 'react';
import {createRoot} from 'react-dom/client';
import Map from 'react-map-gl';
import ControlPanel from './control-panel';

const MAPBOX_TOKEN = ''; // Set your mapbox token here

export default function App() {
  const [mapStyle, setMapStyle] = useState(null);

  return (
    <>
      <Map
        initialViewState={{
          latitude: 37.805,
          longitude: -122.447,
          zoom: 15.5
        }}
        mapStyle={mapStyle && mapStyle.toJS()}
        styleDiffing
        mapboxAccessToken={MAPBOX_TOKEN}
      />

      <ControlPanel onChange={setMapStyle} />
    </>
  );
}

export function renderToDom(container) {
  createRoot(container).render(<App />);
}
