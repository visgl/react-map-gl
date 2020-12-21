import * as React from 'react';
import {useState} from 'react';
import {render} from 'react-dom';
import MapGL, {GeolocateControl} from 'react-map-gl';

const MAPBOX_TOKEN = ''; // Set your mapbox token here

const geolocateStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  margin: 10
};

export default function App() {
  const [viewport, setViewport] = useState({
    latitude: 37.8,
    longitude: 96,
    zoom: 3,
    bearing: 0,
    pitch: 0
  });

  return (
    <MapGL
      {...viewport}
      width="100%"
      height="100%"
      mapStyle="mapbox://styles/mapbox/dark-v9"
      onViewportChange={v => setViewport(v)}
      mapboxApiAccessToken={MAPBOX_TOKEN}
    >
      <GeolocateControl
        style={geolocateStyle}
        positionOptions={{enableHighAccuracy: true}}
        trackUserLocation
        auto
      />
    </MapGL>
  );
}

export function renderToDom(container) {
  render(<App />, container);
}
