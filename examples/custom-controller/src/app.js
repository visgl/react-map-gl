/* global window */
import * as React from 'react';
import {useState, useCallback} from 'react';
import {render} from 'react-dom';
import MapGL from 'react-map-gl';

import ControlPanel from './control-panel';
import MapController from './map-controller';
const customController = new MapController();

const MAPBOX_TOKEN = ''; // Set your mapbox token here

export default function App() {
  const [viewport, setViewport] = useState({
    longitude: -122.45,
    latitude: 37.78,
    zoom: 15.5,
    bearing: 0,
    pitch: 0
  });
  const [settings, setSettings] = useState({
    invertZoom: false,
    invertPan: false,
    longPress: false
  });

  const onSettingsChange = useCallback((name, value) => {
    setSettings(s => ({...s, [name]: value}));
  }, []);

  return (
    <>
      <MapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/mapbox/dark-v9"
        controller={customController}
        invertZoom={settings.invertZoom}
        invertPan={settings.invertPan}
        onPress={settings.longPress ? () => window.alert('pressed') : null} // eslint-disable-line no-alert
        onViewportChange={setViewport}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      />
      <ControlPanel settings={settings} onChange={onSettingsChange} />
    </>
  );
}

export function renderToDom(container) {
  render(<App />, container);
}
