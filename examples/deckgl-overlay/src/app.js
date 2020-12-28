import * as React from 'react';
import {useState} from 'react';
import {render} from 'react-dom';
import DeckGL, {ArcLayer} from 'deck.gl';
import MapGL from 'react-map-gl';

const TOKEN = ''; // Set your mapbox token here

export default function App() {
  const [viewport, setViewport] = useState({
    longitude: -122.45,
    latitude: 37.75,
    zoom: 11,
    bearing: 0,
    pitch: 60
  });

  const arcLayer = new ArcLayer({
    data: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/bart-segments.json',
    getSourcePosition: d => d.from.coordinates,
    getTargetPosition: d => d.to.coordinates,
    getSourceColor: [255, 200, 0],
    getTargetColor: [0, 140, 255],
    getWidth: 12
  });

  return (
    <MapGL
      {...viewport}
      width="100%"
      height="100%"
      maxPitch={85}
      onViewportChange={setViewport}
      mapboxApiAccessToken={TOKEN}
    >
      <DeckGL viewState={viewport} layers={[arcLayer]} />
    </MapGL>
  );
}

export function renderToDom(container) {
  render(<App />, container);
}
