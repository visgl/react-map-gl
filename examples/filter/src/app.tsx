import * as React from 'react';
import {useState, useMemo, useCallback} from 'react';
import {createRoot} from 'react-dom/client';
import Map, {Popup, Source, Layer} from 'react-map-gl/maplibre';
import ControlPanel from './control-panel';
import 'maplibre-gl/dist/maplibre-gl.css';

import {countiesLayer, highlightLayer} from './map-style';

export default function App() {
  const [hoverInfo, setHoverInfo] = useState(null);

  const onHover = useCallback(event => {
    const county = event.features && event.features[0];
    setHoverInfo({
      longitude: event.lngLat.lng,
      latitude: event.lngLat.lat,
      stateId: county && county.properties.STATE_ID
    });
  }, []);

  const selectedStateId = hoverInfo?.stateId || '';

  return (
    <>
      <Map
        initialViewState={{
          latitude: 38.88,
          longitude: -98,
          zoom: 3
        }}
        minZoom={2}
        mapStyle={`https://api.maptiler.com/maps/streets/style.json?key=${
          import.meta.env.VITE_MAPTILER_TOKEN
        }`}
        onMouseMove={onHover}
        interactiveLayerIds={['counties']}
      >
        <Source
          type="geojson"
          // https://github.com/maplibre/maplibre-gl-js/tree/main/docs/assets
          data="https://maplibre.org/maplibre-gl-js/docs/assets/us_states.geojson"
        >
          <Layer {...countiesLayer} />
          <Layer {...highlightLayer} filter={['in', 'STATE_ID', selectedStateId]} />
        </Source>
        {selectedStateId && (
          <Popup
            longitude={hoverInfo.longitude}
            latitude={hoverInfo.latitude}
            offset={[0, -10] as [number, number]}
            closeButton={false}
          >
            {selectedStateId}
          </Popup>
        )}
      </Map>
      <ControlPanel />
    </>
  );
}

export function renderToDom(container) {
  createRoot(container).render(<App />);
}
