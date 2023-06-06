/* global window */
import * as React from 'react';
import {useState, useCallback} from 'react';
import {createRoot} from 'react-dom/client';
import Map, {MapboxStyle} from 'react-map-gl';
import ControlPanel from './control-panel';
import MAP_STYLE from '../../map-style-basic-v8.json';

const MAPBOX_TOKEN = ''; // Set your mapbox token here

const initialViewState = {
  longitude: -122.48,
  latitude: 37.78,
  zoom: 15.5,
  bearing: 0,
  pitch: 0
};

export default function App() {
  const [cursor, setCursor] = useState<string>('auto');
  const [interactiveLayerIds, setInteractiveLayerIds] = useState<string[]>(['nonexist']);

  const onInteractiveLayersChange = useCallback(layerFilter => {
    setInteractiveLayerIds(MAP_STYLE.layers.map(layer => layer.id).filter(layerFilter));
  }, []);

  const onClick = useCallback(event => {
    const feature = event.features && event.features[0];

    if (feature) {
      window.alert(`Clicked layer ${feature.layer.id}`); // eslint-disable-line no-alert
    }
  }, []);

  const onMouseEnter = useCallback(() => setCursor('pointer'), []);
  const onMouseLeave = useCallback(() => setCursor('auto'), []);

  return (
    <>
      <Map
        initialViewState={initialViewState}
        mapStyle={MAP_STYLE as MapboxStyle}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        cursor={cursor}
        interactiveLayerIds={interactiveLayerIds}
        mapboxAccessToken={MAPBOX_TOKEN}
      />
      <ControlPanel onChange={onInteractiveLayersChange} />
    </>
  );
}

export function renderToDom(container) {
  createRoot(container).render(<App />);
}
