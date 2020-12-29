// Copyright (c) 2015 Uber Technologies, Inc.

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

/* global document */
import * as React from 'react';
import {useState} from 'react';
import {render} from 'react-dom';
import MapGL from 'react-map-gl';

import ScatterplotOverlay from './scatterplot-overlay';
import ChoroplethOverlay from './choropleth-overlay';

import ZIPCODES_SF from '../../.data/feature-example-sf.json';
import CITIES from '../../.data/cities.json';

const MAPBOX_TOKEN = ''; // Set your mapbox token here

const ZIPCODES = ZIPCODES_SF.features.map(f => {
  f.properties.value = Math.random() * 1000;
  return f;
});

const CITY_LOCATIONS = CITIES.map(c => [c.longitude, c.latitude]);

export default function App() {
  const [viewport, setViewport] = useState({
    latitude: 37.785164,
    longitude: -122.41669,
    zoom: 8,
    bearing: 0,
    pitch: 0
  });

  return (
    <MapGL
      {...viewport}
      width="100vw"
      height="100vh"
      mapStyle="mapbox://styles/mapbox/dark-v9"
      onViewportChange={setViewport}
      mapboxApiAccessToken={MAPBOX_TOKEN}
    >
      <ChoroplethOverlay
        key="choropleth"
        globalOpacity={0.8}
        colorDomain={[0, 500, 1000]}
        colorRange={['#31a354', '#addd8e', '#f7fcb9']}
        features={ZIPCODES}
      />

      <ScatterplotOverlay
        key="scatterplot"
        locations={CITY_LOCATIONS}
        dotRadius={10}
        globalOpacity={0.8}
        compositeOperation="lighter"
        dotFill="#00a8fe"
      />
    </MapGL>
  );
}

render(<App />, document.body.appendChild(document.createElement('div')));
