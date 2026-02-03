import * as React from 'react';
import {useState, useCallback} from 'react';
import {createRoot} from 'react-dom/client';
import {Map, Source, Layer, NavigationControl, ScaleControl} from 'react-map-gl/maplibre';

import ControlPanel from './control-panel';

import type {RasterLayerSpecification} from 'react-map-gl/maplibre';

// FAA Official ArcGIS Tile Servers
// These are the official FAA aeronautical chart tiles served via ArcGIS
// Data is updated every 28 days following the AIRAC (Aeronautical Information Regulation And Control) cycle
export const CHART_SOURCES = {
  'VFR Sectional': {
    url: 'https://tiles.arcgis.com/tiles/ssFJjBXIUyZDrSYZ/arcgis/rest/services/VFR_Sectional/MapServer/tile/{z}/{y}/{x}',
    description: 'VFR Sectional Charts - Primary navigation charts for visual flight rules operations'
  },
  'VFR Terminal (TAC)': {
    url: 'https://tiles.arcgis.com/tiles/ssFJjBXIUyZDrSYZ/arcgis/rest/services/VFR_Terminal/MapServer/tile/{z}/{y}/{x}',
    description: 'Terminal Area Charts - Detailed charts for busy airspace around major airports'
  },
  'IFR Low': {
    url: 'https://tiles.arcgis.com/tiles/ssFJjBXIUyZDrSYZ/arcgis/rest/services/IFR_AreaLow/MapServer/tile/{z}/{y}/{x}',
    description: 'IFR Low Altitude Enroute Charts - For instrument flight below 18,000 ft MSL'
  },
  'IFR High': {
    url: 'https://tiles.arcgis.com/tiles/ssFJjBXIUyZDrSYZ/arcgis/rest/services/IFR_High/MapServer/tile/{z}/{y}/{x}',
    description: 'IFR High Altitude Enroute Charts - For instrument flight at and above 18,000 ft MSL'
  }
} as const;

export type ChartType = keyof typeof CHART_SOURCES;

const chartLayer: RasterLayerSpecification = {
  id: 'chart-tiles',
  type: 'raster',
  source: 'chart-source',
  paint: {
    'raster-opacity': 1.0,
    'raster-fade-duration': 0
  }
};

// Empty style with no base layers - chart tiles will be the only basemap
const emptyStyle = {
  version: 8 as const,
  sources: {},
  layers: []
};

export default function App() {
  const [chartType, setChartType] = useState<ChartType>('VFR Sectional');
  const [opacity, setOpacity] = useState(1.0);

  const onChartTypeChange = useCallback((value: ChartType) => {
    setChartType(value);
  }, []);

  const onOpacityChange = useCallback((value: number) => {
    setOpacity(value);
  }, []);

  const tileUrl = CHART_SOURCES[chartType].url;

  return (
    <>
      <Map
        initialViewState={{
          // Centered on Los Angeles area - good for seeing chart detail
          latitude: 34.0522,
          longitude: -118.2437,
          zoom: 8
        }}
        mapStyle={emptyStyle}
        maxZoom={11}
        minZoom={4}
      >
        <Source
          key={chartType} // Force re-mount when chart type changes
          id="chart-source"
          type="raster"
          tiles={[tileUrl]}
          tileSize={256}
          attribution='&copy; <a href="https://www.faa.gov/">FAA</a> | <a href="https://adds-faa.opendata.arcgis.com/">FAA AIS Open Data</a>'
        >
          <Layer
            {...chartLayer}
            paint={{
              ...chartLayer.paint,
              'raster-opacity': opacity
            }}
          />
        </Source>

        <NavigationControl position="top-left" />
        <ScaleControl position="bottom-left" unit="nautical" />
      </Map>
      <ControlPanel
        chartType={chartType}
        opacity={opacity}
        onChartTypeChange={onChartTypeChange}
        onOpacityChange={onOpacityChange}
      />
    </>
  );
}

export function renderToDom(container: HTMLElement) {
  createRoot(container).render(<App />);
}
