import * as React from 'react';

function ControlPanel() {
  return (
    <div className="control-panel">
      <h3>Highlight Features Containing Similar Data</h3>
      <p>Hover over counties to highlight counties that share the same name.</p>
      <div className="source-link">
        <a
          href="https://github.com/visgl/react-map-gl/tree/5.3-release/examples/filter"
          target="_new"
        >
          View Code ↗
        </a>
      </div>
    </div>
  );
}

export default React.memo(ControlPanel);
