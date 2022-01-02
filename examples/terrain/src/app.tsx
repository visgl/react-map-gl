import * as React from 'react';
import {useCallback} from 'react';
import {render} from 'react-dom';
import Map, {Source, Layer} from 'react-map-gl';

import ControlPanel from './control-panel';

import type {SkyLayer} from 'react-map-gl';

const TOKEN = ''; // Set your mapbox token here

const skyLayer: SkyLayer = {
  id: 'sky',
  type: 'sky',
  paint: {
    'sky-type': 'atmosphere',
    'sky-atmosphere-sun': [0.0, 0.0],
    'sky-atmosphere-sun-intensity': 15
  }
};

export default function App() {
  const onMapLoad = useCallback(evt => {
    const map = evt.target;
    map.setTerrain({source: 'mapbox-dem', exaggeration: 1.5});
  }, []);

  return (
    <>
      <Map
        initialViewState={{
          latitude: 32.6141,
          longitude: -114.34411,
          zoom: 14,
          bearing: 80,
          pitch: 80
        }}
        mapStyle="mapbox://styles/mapbox/satellite-v9"
        mapboxAccessToken={TOKEN}
        onLoad={onMapLoad}
      >
        <Source
          id="mapbox-dem"
          type="raster-dem"
          url="mapbox://mapbox.mapbox-terrain-dem-v1"
          tileSize={512}
          maxzoom={14}
        />
        <Layer {...skyLayer} />
      </Map>
      <ControlPanel />
    </>
  );
}

export function renderToDom(container) {
  render(<App />, container);
}
