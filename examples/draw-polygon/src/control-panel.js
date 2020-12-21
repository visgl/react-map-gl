import * as React from 'react';
import area from '@turf/area';

function ControlPanel(props) {
  const polygon = props.polygon;
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
          href="https://github.com/visgl/react-map-gl/tree/6.0-release/examples/draw-polygon"
          target="_new"
        >
          View Code ↗
        </a>
      </div>
    </div>
  );
}

export default React.memo(ControlPanel);
