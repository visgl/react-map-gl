import * as React from 'react';
import {useRef, useCallback} from 'react';
import {createRoot} from 'react-dom/client';
import {Map, MapRef} from 'react-map-gl/maplibre';

import ControlPanel from './control-panel';

const initialViewState = {
  latitude: 37.7751,
  longitude: -122.4193,
  zoom: 11,
  bearing: 0,
  pitch: 0
};

export default function App() {
  const mapRef = useRef<MapRef>();

  const onSelectCity = useCallback(({longitude, latitude}) => {
    mapRef.current?.flyTo({center: [longitude, latitude], duration: 2000});
  }, []);

  return (
    <>
      <Map
        ref={mapRef}
        initialViewState={initialViewState}
        mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
      />
      <ControlPanel onSelectCity={onSelectCity} />
    </>
  );
}

export function renderToDom(container) {
  createRoot(container).render(<App />);
}
