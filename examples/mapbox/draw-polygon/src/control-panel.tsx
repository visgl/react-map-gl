import * as React from 'react';
import area from '@turf/area';

function ControlPanel(props) {
  let polygonArea = 0;
  for (const polygon of props.polygons) {
    polygonArea += area(polygon);
  }

  return (
    <div className="control-panel">
      <h3>Draw Polygon</h3>
      {polygonArea > 0 && (
        <p>
          {Math.round(polygonArea * 100) / 100} <br />
          square meters
        </p>
      )}
      <div className="source-link">
        <a
          href="https://github.com/visgl/react-map-gl/tree/8.0-release/examples/mapbox/draw-polygon"
          target="_new"
        >
          View Code ↗
        </a>
      </div>
    </div>
  );
}

export default React.memo(ControlPanel);
