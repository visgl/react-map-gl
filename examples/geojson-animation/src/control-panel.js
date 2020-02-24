import * as React from 'react';
import {PureComponent} from 'react';

export default class ControlPanel extends PureComponent {
  render() {
    return (
      <div className="control-panel">
        <h3>Animated GeoJSON</h3>
        <p>Render animation by updating GeoJSON data source.</p>
        <div className="source-link">
          <a
            href="https://github.com/uber/react-map-gl/tree/5.2-release/examples/geojson-animation"
            target="_new"
          >
            View Code ↗
          </a>
        </div>
      </div>
    );
  }
}
