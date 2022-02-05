import * as React from 'react';

export const COLORS = ['#2b83ba', '#c7191c', '#c8c8cf'];

const legendStyle = {
  display: 'inline-block',
  width: 16,
  height: 8,
  marginRight: 4
};

function ControlPanel() {
  return (
    <div className="control-panel">
      <h3>US Presidential Election 2016 By County</h3>
      <div>
        <div>
          <div style={{background: COLORS[0], ...legendStyle}} />
          <span>Democrat</span>
        </div>
        <div>
          <div style={{background: COLORS[1], ...legendStyle}} />
          <span>Republican</span>
        </div>
        <div>
          <div style={{background: COLORS[2], ...legendStyle}} />
          <span>Independent</span>
        </div>
      </div>
      <p>
        Data source: <a href="http://dataverse.harvard.edu/">Harvard Dataverse</a>
      </p>
      <div className="source-link">
        <a
          href="https://github.com/visgl/react-map-gl/tree/7.0-release/examples/custom-overlay"
          target="_new"
        >
          View Code ↗
        </a>
      </div>
    </div>
  );
}

export default React.memo(ControlPanel);
