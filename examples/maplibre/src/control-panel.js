import * as React from 'react';

function ControlPanel() {
  return (
    <div className="control-panel">
      <h3>MapLibre</h3>
      <p>
        Example showing using react-map-gl with <a href="https://maplibre.org/">maplibre-gl</a>.
      </p>
      <p>
        Data license:{' '}
        <a href="http://www.openstreetmap.org/copyright" target="blank">
          OpenStreetMap
        </a>
      </p>
      <div className="source-link">
        <a href="https://github.com/visgl/react-map-gl/tree/master/examples/maplibre" target="_new">
          View Code ↗
        </a>
      </div>
    </div>
  );
}

export default React.memo(ControlPanel);
