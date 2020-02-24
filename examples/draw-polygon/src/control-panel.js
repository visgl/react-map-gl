import * as React from 'react';
import {PureComponent} from 'react';
import area from '@turf/area';

export default class ControlPanel extends PureComponent {
  render() {
    const polygon = this.props.polygon;
    const polygonArea = polygon && area(polygon);
    return (
      <div className="control-panel">
        <h3>Draw Polygon</h3>
        {polygon && (
          <p>
            {polygonArea} <br />
            square meters
          </p>
        )}
        <div className="source-link">
          <a
            href="https://github.com/uber/react-map-gl/tree/5.2-release/examples/draw-polygon"
            target="_new"
          >
            View Code ↗
          </a>
        </div>
      </div>
    );
  }
}
