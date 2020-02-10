import React, {PureComponent} from 'react';

export default class ControlPanel extends PureComponent {
  render() {
    return (
      <div className="control-panel">
        <h3>Zoom to Bounding Box</h3>
        <p>Click on a San Fransisco Neighborhood to zoom in.</p>
        <div className="source-link">
          <a
            href="https://github.com/uber/react-map-gl/tree/5.2-release/examples/zoom-to-bounds"
            target="_new"
          >
            View Code ↗
          </a>
        </div>
      </div>
    );
  }
}
