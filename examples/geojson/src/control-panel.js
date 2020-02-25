import * as React from 'react';
import {PureComponent} from 'react';

export default class ControlPanel extends PureComponent {
  render() {
    const {settings} = this.props;

    return (
      <div className="control-panel">
        <h3>Interactive GeoJSON</h3>
        <p>
          Map showing median household income by state in year <b>{settings.year}</b>. Hover over a
          state to see details.
        </p>
        <p>
          Data source: <a href="www.census.gov">US Census Bureau</a>
        </p>
        <div className="source-link">
          <a
            href="https://github.com/uber/react-map-gl/tree/5.2-release/examples/geojson"
            target="_new"
          >
            View Code ↗
          </a>
        </div>
        <hr />

        <div key={'year'} className="input">
          <label>Year</label>
          <input
            type="range"
            value={settings.year}
            min={1995}
            max={2015}
            step={1}
            onChange={evt => this.props.onChange('year', evt.target.value)}
          />
        </div>
      </div>
    );
  }
}
