/* global window */
import * as React from 'react';
import {useState, useEffect} from 'react';
import {render} from 'react-dom';
import MapGL, {Source, Layer} from 'react-map-gl';

import ControlPanel from './control-panel';

const MAPBOX_TOKEN = ''; // Set your mapbox token here

const pointLayer = {
  type: 'circle',
  paint: {
    'circle-radius': 10,
    'circle-color': '#007cbf'
  }
};

function pointOnCircle({center, angle, radius}) {
  return {
    type: 'Point',
    coordinates: [center[0] + Math.cos(angle) * radius, center[1] + Math.sin(angle) * radius]
  };
}

export default function App() {
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: -100,
    zoom: 3,
    bearing: 0,
    pitch: 0
  });
  const [pointData, setPointData] = useState(null);

  useEffect(() => {
    const animation = window.requestAnimationFrame(() =>
      setPointData(pointOnCircle({center: [-100, 0], angle: Date.now() / 1000, radius: 20}))
    );
    return () => window.cancelAnimationFrame(animation);
  });

  return (
    <>
      <MapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/mapbox/light-v9"
        onViewportChange={setViewport}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      >
        {pointData && (
          <Source type="geojson" data={pointData}>
            <Layer {...pointLayer} />
          </Source>
        )}
      </MapGL>
      <ControlPanel />
    </>
  );
}

export function renderToDom(container) {
  render(<App />, container);
}
