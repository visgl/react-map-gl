import * as React from 'react';
import {useRef} from 'react';
import {createRoot} from 'react-dom/client';
import Map from 'react-map-gl';
import bbox from '@turf/bbox';

import ControlPanel from './control-panel';
import MAP_STYLE from './map-style';

import type {MapboxStyle, MapRef, MapLayerMouseEvent} from 'react-map-gl';

const TOKEN = ''; // Set your mapbox token here

export default function App() {
  const mapRef = useRef<MapRef>();

  const onClick = (event: MapLayerMouseEvent) => {
    const feature = event.features[0];
    if (feature) {
      // calculate the bounding box of the feature
      const [minLng, minLat, maxLng, maxLat] = bbox(feature);

      mapRef.current.fitBounds(
        [
          [minLng, minLat],
          [maxLng, maxLat]
        ],
        {padding: 40, duration: 1000}
      );
    }
  };

  return (
    <>
      <Map
        ref={mapRef}
        initialViewState={{
          latitude: 37.78,
          longitude: -122.4,
          zoom: 11
        }}
        mapStyle={MAP_STYLE as MapboxStyle}
        interactiveLayerIds={['sf-neighborhoods-fill']}
        onClick={onClick}
        mapboxAccessToken={TOKEN}
      />
      <ControlPanel />
    </>
  );
}

export function renderToDom(container) {
  createRoot(container).render(<App />);
}
