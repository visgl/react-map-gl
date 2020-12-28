import * as React from 'react';
import {useState, useCallback} from 'react';
import {render} from 'react-dom';
import MapGL from 'react-map-gl';
import ControlPanel from './control-panel';

const MAPBOX_TOKEN = ''; // Set your mapbox token here

export default function App() {
  const [viewport, setViewport] = useState({
    latitude: 37.729,
    longitude: -122.36,
    zoom: 11,
    bearing: 0,
    pitch: 50
  });
  const [interactionState, setInteractionState] = useState({});
  const [settings, setSettings] = useState({
    dragPan: true,
    dragRotate: true,
    scrollZoom: true,
    touchZoom: true,
    touchRotate: true,
    keyboard: true,
    doubleClickZoom: true,
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
      <MapGL
        {...viewport}
        {...settings}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={setViewport}
        onInteractionStateChange={s => setInteractionState({...s})}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      />
      <ControlPanel
        settings={settings}
        interactionState={interactionState}
        onChange={updateSettings}
      />
    </>
  );
}

export function renderToDom(container) {
  render(<App />, container);
}
