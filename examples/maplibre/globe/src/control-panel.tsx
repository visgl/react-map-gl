import * as React from 'react';

function ControlPanel() {
  return (
    <div className="control-panel">
      <h3>Globe</h3>
      <p>Use globe projection.</p>

      <div className="source-link">
        <a
          href="https://github.com/visgl/react-maplibre/tree/1.0-release/examples/globe"
          target="_new"
        >
          View Code ↗
        </a>
      </div>
    </div>
  );
}

export default React.memo(ControlPanel);
