import * as React from 'react';
import {useState, useCallback} from 'react';
import {createRoot} from 'react-dom/client';
import {Map} from 'react-map-gl/maplibre';
import ControlPanel from './control-panel';

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
        mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
      />
      <ControlPanel settings={settings} onChange={updateSettings} />
    </>
  );
}

export function renderToDom(container) {
  createRoot(container).render(<App />);
}
