import React, {PureComponent} from 'react';

export default class ControlPanel extends PureComponent {
  render() {
    return (
      <div className="control-panel">
        <h3>Highlight Features Containing Similar Data</h3>
        <p>Hover over counties to highlight counties that share the same name.</p>
        <div className="source-link">
          <a
            href="https://github.com/uber/react-map-gl/tree/5.2-release/examples/filter"
            target="_new"
          >
            View Code ↗
          </a>
        </div>
      </div>
    );
  }
}
