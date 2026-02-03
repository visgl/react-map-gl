import * as React from 'react';
import {CHART_SOURCES, type ChartType} from './app';

type ControlPanelProps = {
  chartType: ChartType;
  opacity: number;
  onChartTypeChange: (value: ChartType) => void;
  onOpacityChange: (value: number) => void;
};

const chartTypes = Object.keys(CHART_SOURCES) as ChartType[];

function ControlPanel({chartType, opacity, onChartTypeChange, onOpacityChange}: ControlPanelProps) {
  const currentChart = CHART_SOURCES[chartType];

  return (
    <div className="control-panel">
      <h3>FAA Aeronautical Charts</h3>
      <p>
        Official FAA aeronautical chart tiles served via{' '}
        <a href="https://adds-faa.opendata.arcgis.com/" target="_blank" rel="noopener noreferrer">
          FAA AIS Open Data
        </a>
        .
      </p>

      <div>
        <label>
          Chart Type:
          <br />
          <select
            value={chartType}
            onChange={e => onChartTypeChange(e.target.value as ChartType)}
            style={{width: '100%', padding: '4px'}}
          >
            {chartTypes.map(type => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
        <p style={{fontSize: '11px', marginTop: '4px'}}>{currentChart.description}</p>
      </div>

      <div>
        <label>
          Opacity: {Math.round(opacity * 100)}%
          <br />
          <input
            type="range"
            min={0}
            max={1}
            step={0.1}
            value={opacity}
            onChange={e => onOpacityChange(Number(e.target.value))}
            style={{width: '100%'}}
          />
        </label>
      </div>

      <hr />

      <details>
        <summary style={{cursor: 'pointer', fontWeight: 'bold'}}>About FAA Chart Data</summary>
        <div style={{fontSize: '11px', marginTop: '8px'}}>
          <p>
            Charts are updated every <strong>28 days</strong> following the AIRAC cycle.
          </p>
          <p>
            <strong>Vector Data:</strong> For data-driven mapping (vs raster charts), the FAA
            provides vector GIS data including airports, airspace, navaids, and more at:
          </p>
          <ul style={{paddingLeft: '16px', margin: '4px 0'}}>
            <li>
              <a href="https://adds-faa.opendata.arcgis.com/" target="_blank" rel="noopener noreferrer">
                FAA AIS Open Data
              </a>
            </li>
            <li>
              <a href="https://ais-faa.opendata.arcgis.com/" target="_blank" rel="noopener noreferrer">
                Legacy AIS Data (GeoJSON, KML, WFS)
              </a>
            </li>
          </ul>
          <p>
            <strong>Offline/EFB:</strong> For offline use in Electronic Flight Bags, consider
            GeoPackage or MBTiles formats with vector tiles for full spatial analysis capabilities.
          </p>
        </div>
      </details>

      <div className="source-link" style={{marginTop: '12px'}}>
        <a
          href="https://github.com/visgl/react-map-gl/tree/8.0-release/examples/maplibre/vfr-tiles-basemap"
          target="_new"
        >
          View Code ↗
        </a>
      </div>
    </div>
  );
}

export default React.memo(ControlPanel);
