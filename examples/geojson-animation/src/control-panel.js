import React, {PureComponent} from 'react';

export default class ControlPanel extends PureComponent {
  render() {
    return (
      <div className="options-panel" tabIndex="0">
        <h3>Animated GeoJSON</h3>
        <p>Render animation by updating GeoJSON data source.</p>
        <div className="source-link">
          <a href="https://github.com/uber/react-map-gl/tree/master/examples/geojson-animation" target="_new">View Code ↗</a>
        </div>
      </div>
    );
  }
}
