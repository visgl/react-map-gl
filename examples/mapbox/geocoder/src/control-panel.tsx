import * as React from 'react';

function ControlPanel() {
  return (
    <div className="control-panel">
      <h3>Geocoder</h3>
      <div className="source-link">
        <a
          href="https://github.com/visgl/react-map-gl/tree/8.0-release/examples/mapbox/geocoder"
          target="_new"
        >
          View Code ↗
        </a>
      </div>
    </div>
  );
}

export default React.memo(ControlPanel);
