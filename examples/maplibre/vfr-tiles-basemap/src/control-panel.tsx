import * as React from 'react';

type ControlPanelProps = {
  opacity: number;
  onOpacityChange: (value: number) => void;
};

function ControlPanel({opacity, onOpacityChange}: ControlPanelProps) {
  return (
    <div className="control-panel">
      <h3>VFR Tiles Basemap</h3>
      <p>
        Display VFR (Visual Flight Rules) sectional charts from{' '}
        <a href="https://vfrmap.com/" target="_blank" rel="noopener noreferrer">
          vfrmap.com
        </a>{' '}
        as a custom raster tile basemap.
      </p>

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

      <p style={{fontSize: '11px'}}>
        VFR sectional charts are used by pilots for visual navigation. They show terrain, airspace
        boundaries, airports, and navigation aids.
      </p>

      <div className="source-link">
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
