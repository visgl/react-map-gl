import * as React from 'react';
import {useState, useCallback} from 'react';
import {render} from 'react-dom';
import MapGL, {Source, Layer} from 'react-map-gl';

import ControlPanel from './control-panel';

const TOKEN = ''; // Set your mapbox token here

const skyLayer = {
  id: 'sky',
  type: 'sky',
  paint: {
    'sky-type': 'atmosphere',
    'sky-atmosphere-sun': [0.0, 0.0],
    'sky-atmosphere-sun-intensity': 15
  }
};

export default function App() {
  const [viewport, setViewport] = useState({
    latitude: 32.6141,
    longitude: -114.34411,
    zoom: 14,
    bearing: 80,
    pitch: 80
  });

  const onMapLoad = useCallback(evt => {
    const map = evt.target;
    map.setTerrain({source: 'mapbox-dem', exaggeration: 1.5});
  }, []);

  return (
    <>
      <MapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/mapbox/satellite-v9"
        onViewportChange={setViewport}
        mapboxApiAccessToken={TOKEN}
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
      </MapGL>
      <ControlPanel />
    </>
  );
}

export function renderToDom(container) {
  render(<App />, container);
}
