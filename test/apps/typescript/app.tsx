// @flow
import * as React from 'react';
import {useState} from 'react';
import {render} from 'react-dom';
import MapGL, {NavigationControl} from 'react-map-gl';

import {ViewportProps} from 'react-map-gl';

const MAPBOX_TOKEN = ''; // Set your mapbox token here

function Root() {
  const [viewport, setViewport] = useState<ViewportProps>({
    // width: '100vw', // should generate error
    latitude: 37.8,
    longitude: -122.4,
    zoom: 14,
    bearing: 0,
    pitch: 0
  });

  return (
    <MapGL
      {...viewport}
      width="100vw"
      height="100vh"
      mapStyle="mapbox://styles/mapbox/dark-v9"
      onViewportChange={(nextViewport: ViewportProps) => setViewport(nextViewport)}
      mapboxApiAccessToken={MAPBOX_TOKEN}
    >
      <NavigationControl
      // showCompass="true" // should generate error
      />
    </MapGL>
  );
}

/* global document */
if (document.body) {
  document.body.style.margin = '0';
  render(<Root />, document.body.appendChild(document.createElement('div')));
}
