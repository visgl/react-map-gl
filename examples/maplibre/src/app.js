import * as React from 'react';
import {useState} from 'react';
import {render} from 'react-dom';
import MapGL, {NavigationControl} from 'react-map-gl';

import ControlPanel from './control-panel';

// / maplibre-gl.css is included by tag in index.html
// / Alternatively, use CSS loader with the following line:
// import 'maplibre-gl/dist/maplibre-gl.css';

const OSM_MAP = {
  version: 8,
  sources: {
    osm: {
      type: 'raster',
      tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'],
      tileSize: 256,
      attribution: '&copy; OpenStreetMap Contributors',
      maxzoom: 19
    }
  },
  layers: [
    {
      id: 'osm',
      type: 'raster',
      source: 'osm'
    }
  ]
};

export default function App() {
  const [viewport, setViewport] = useState({
    latitude: 40,
    longitude: -100,
    zoom: 3.5,
    bearing: 0,
    pitch: 0
  });

  return (
    <>
      <MapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle={OSM_MAP}
        onViewportChange={setViewport}
      >
        <NavigationControl style={{padding: 20}} />
      </MapGL>

      <ControlPanel />
    </>
  );
}

export function renderToDom(container) {
  render(<App />, container);
}
