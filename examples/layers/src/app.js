import * as React from 'react';
import {useState} from 'react';
import {render} from 'react-dom';
import MapGL from 'react-map-gl';
import ControlPanel from './control-panel';

const MAPBOX_TOKEN = ''; // Set your mapbox token here

export default function App() {
  const [viewport, setViewport] = useState({
    latitude: 37.805,
    longitude: -122.447,
    zoom: 15.5,
    bearing: 0,
    pitch: 0
  });
  const [mapStyle, setMapStyle] = useState('');

  return (
    <>
      <MapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle={mapStyle}
        onViewportChange={setViewport}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      />

      <ControlPanel onChange={setMapStyle} />
    </>
  );
}

export function renderToDom(container) {
  render(<App />, container);
}
