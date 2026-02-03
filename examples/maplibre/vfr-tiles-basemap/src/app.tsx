import * as React from 'react';
import {useState, useCallback} from 'react';
import {createRoot} from 'react-dom/client';
import {Map, Source, Layer, NavigationControl, ScaleControl} from 'react-map-gl/maplibre';

import ControlPanel from './control-panel';

import type {RasterLayerSpecification} from 'react-map-gl/maplibre';

// VFR Sectional tiles from vfrmap.com
// These tiles show Visual Flight Rules (VFR) sectional charts used for aviation navigation
const VFR_TILE_URL = 'https://vfrmap.com/20250110/tiles/vfrc/{z}/{x}/{y}.jpg';

// Alternative tile sources you can try:
// Terminal Area Charts (TAC): 'https://vfrmap.com/20250110/tiles/tac/{z}/{x}/{y}.jpg'
// IFR Low Charts: 'https://vfrmap.com/20250110/tiles/ifrlc/{z}/{x}/{y}.jpg'
// IFR High Charts: 'https://vfrmap.com/20250110/tiles/ifrhc/{z}/{x}/{y}.jpg'

const vfrLayer: RasterLayerSpecification = {
  id: 'vfr-tiles',
  type: 'raster',
  source: 'vfr-source',
  paint: {
    'raster-opacity': 1.0,
    'raster-fade-duration': 0
  }
};

// Empty style with no base layers - VFR tiles will be the only basemap
const emptyStyle = {
  version: 8 as const,
  sources: {},
  layers: []
};

export default function App() {
  const [opacity, setOpacity] = useState(1.0);

  const onOpacityChange = useCallback((value: number) => {
    setOpacity(value);
  }, []);

  return (
    <>
      <Map
        initialViewState={{
          // Centered on Los Angeles area - good for seeing VFR sectional detail
          latitude: 34.0522,
          longitude: -118.2437,
          zoom: 8
        }}
        mapStyle={emptyStyle}
        maxZoom={11}
        minZoom={4}
      >
        <Source
          id="vfr-source"
          type="raster"
          tiles={[VFR_TILE_URL]}
          tileSize={256}
          attribution='&copy; <a href="https://vfrmap.com/">VFRMap.com</a>'
        >
          <Layer
            {...vfrLayer}
            paint={{
              ...vfrLayer.paint,
              'raster-opacity': opacity
            }}
          />
        </Source>

        <NavigationControl position="top-left" />
        <ScaleControl position="bottom-left" unit="nautical" />
      </Map>
      <ControlPanel opacity={opacity} onOpacityChange={onOpacityChange} />
    </>
  );
}

export function renderToDom(container: HTMLElement) {
  createRoot(container).render(<App />);
}
