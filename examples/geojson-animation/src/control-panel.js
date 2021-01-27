import * as React from 'react';

function ControlPanel() {
  return (
    <div className="control-panel">
      <h3>Animated GeoJSON</h3>
      <p>Render animation by updating GeoJSON data source.</p>
      <div className="source-link">
        <a
          href="https://github.com/visgl/react-map-gl/tree/6.1-release/examples/geojson-animation"
          target="_new"
        >
          View Code ↗
        </a>
      </div>
    </div>
  );
}

export default React.memo(ControlPanel);
