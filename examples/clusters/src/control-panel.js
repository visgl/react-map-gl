import * as React from 'react';

function ControlPanel() {
  return (
    <div className="control-panel">
      <h3>Create and Style Clusters</h3>
      <p>Use Mapbox GL JS' built-in functions to visualize points as clusters.</p>
      <div className="source-link">
        <a
          href="https://github.com/visgl/react-map-gl/tree/6.0-release/examples/clusters"
          target="_new"
        >
          View Code ↗
        </a>
      </div>
    </div>
  );
}

export default React.memo(ControlPanel);
