import * as React from 'react';

function ControlPanel(props) {
  return (
    <div className="control-panel">
      <h3>3D Terrain</h3>
      <p>Add 3D terrain and sky to a map.</p>

      <div className="source-link">
        <a
          href="https://github.com/visgl/react-map-gl/tree/6.1-release/examples/terrain"
          target="_new"
        >
          View Code ↗
        </a>
      </div>
    </div>
  );
}

export default React.memo(ControlPanel);
