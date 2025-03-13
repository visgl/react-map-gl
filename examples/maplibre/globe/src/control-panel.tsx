import * as React from 'react';

function ControlPanel() {
  return (
    <div className="control-panel">
      <h3>Globe</h3>
      <p>Use globe projection.</p>

      <div className="source-link">
        <a
          href="https://github.com/visgl/react-map-gl/tree/8.0-release/examples/maplibre/globe"
          target="_new"
        >
          View Code ↗
        </a>
      </div>
    </div>
  );
}

export default React.memo(ControlPanel);
