import * as React from 'react';

function ControlPanel() {
  return (
    <div className="control-panel">
      <h3>Zoom to Bounding Box</h3>
      <p>Click on a San Fransisco Neighborhood to zoom in.</p>
      <div className="source-link">
        <a
          href="https://github.com/visgl/react-map-gl/tree/6.1-release/examples/zoom-to-bounds"
          target="_new"
        >
          View Code ↗
        </a>
      </div>
    </div>
  );
}

export default React.memo(ControlPanel);
