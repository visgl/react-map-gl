/* global document */
import * as React from 'react';
import {createRoot} from 'react-dom/client';
// eslint-disable-next-line import/namespace
import {setWorkerUrl} from 'maplibre-gl';
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';
import Map, {Marker} from 'react-map-gl/maplibre';

import 'maplibre-gl/dist/maplibre-gl.css';

setWorkerUrl(workerUrl);

function Root() {
  return (
    <Map
      initialViewState={{
        latitude: 37.8,
        longitude: -122.4,
        zoom: 14
      }}
      style={{width: 800, height: 600}}
      mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
    >
      <Marker longitude={-122.4} latitude={37.8} color="red" />
    </Map>
  );
}

const root = createRoot(document.body.appendChild(document.createElement('div')));
root.render(<Root />);
