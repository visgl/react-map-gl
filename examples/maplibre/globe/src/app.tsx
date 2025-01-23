import * as React from 'react';
import {createRoot} from 'react-dom/client';
import {Map} from 'react-map-gl/maplibre';

import ControlPanel from './control-panel';

export default function App() {
  return (
    <>
      <Map
        initialViewState={{
          latitude: 0,
          longitude: 0,
          zoom: 0
        }}
        maxPitch={85}
        mapStyle="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
        projection="globe"
      />
      <ControlPanel />
    </>
  );
}

export function renderToDom(container) {
  createRoot(container).render(<App />);
}
