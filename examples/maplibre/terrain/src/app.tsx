import * as React from 'react';
import {createRoot} from 'react-dom/client';
import {Map, Source, Layer, TerrainControl} from 'react-map-gl/maplibre';

import ControlPanel from './control-panel';

import type {Terrain, Sky} from 'react-map-gl/maplibre';

const sky: Sky = {
  'sky-color': '#80ccff',
  'sky-horizon-blend': 0.5,
  'horizon-color': '#ccddff',
  'horizon-fog-blend': 0.5,
  'fog-color': '#fcf0dd',
  'fog-ground-blend': 0.2
};

const terrain: Terrain = {source: 'terrain-dem', exaggeration: 1.5};

export default function App() {
  return (
    <>
      <Map
        initialViewState={{
          latitude: 47.27574,
          longitude: 11.39085,
          zoom: 12,
          pitch: 70
        }}
        maxPitch={85}
        mapStyle="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
        sky={sky}
        terrain={terrain}
      >
        <Source
          id="terrain-dem"
          type="raster-dem"
          url="https://demotiles.maplibre.org/terrain-tiles/tiles.json"
          tileSize={256}
        />
        <Source
          id="hillshade-dem"
          type="raster-dem"
          url="https://demotiles.maplibre.org/terrain-tiles/tiles.json"
          tileSize={256}
        >
          <Layer
            type="hillshade"
            layout={{visibility: 'visible'}}
            paint={{'hillshade-shadow-color': '#473B24'}}
          />
        </Source>

        <TerrainControl {...terrain} position="top-left" />
      </Map>
      <ControlPanel />
    </>
  );
}

export function renderToDom(container) {
  createRoot(container).render(<App />);
}
