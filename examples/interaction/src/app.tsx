import * as React from 'react';
import {useState, useCallback} from 'react';
import {createRoot} from 'react-dom/client';
import Map from 'react-map-gl';
import ControlPanel from './control-panel';

const MAPBOX_TOKEN = ''; // Set your mapbox token here

const initialViewState = {
  latitude: 37.729,
  longitude: -122.36,
  zoom: 11,
  bearing: 0,
  pitch: 50
};

export default function App() {
  const [settings, setSettings] = useState({
    scrollZoom: true,
    boxZoom: true,
    dragRotate: true,
    dragPan: true,
    keyboard: true,
    doubleClickZoom: true,
    touchZoomRotate: true,
    touchPitch: true,
    minZoom: 0,
    maxZoom: 20,
    minPitch: 0,
    maxPitch: 85
  });

  const updateSettings = useCallback(
    (name, value) =>
      setSettings(s => ({
        ...s,
        [name]: value
      })),
    []
  );

  return (
    <>
      <Map
        initialViewState={initialViewState}
        {...settings}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxAccessToken={MAPBOX_TOKEN}
      />
      <ControlPanel settings={settings} onChange={updateSettings} />
    </>
  );
}

export function renderToDom(container) {
  createRoot(container).render(<App />);
}
