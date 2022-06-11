import * as React from 'react';
import {createRoot} from 'react-dom/client';
import {ScatterplotLayer} from '@deck.gl/layers/typed';
import {DeckProps} from '@deck.gl/core/typed';
import {MapboxOverlay} from '@deck.gl/mapbox/typed';
import {useControl} from 'react-map-gl';

import Map, {NavigationControl} from 'react-map-gl';

const TOKEN = ''; // Set your mapbox token here

const initialViewState = {
  latitude: 37.78,
  longitude: -122.45,
  zoom: 12
};

function DeckGLOverlay(props: DeckProps) {
  const deck = useControl<MapboxOverlay>(() => new MapboxOverlay(props));

  deck.setProps(props);
  return null;
}

export default function App() {
  const scatterplotLayer = new ScatterplotLayer<{
    name: string;
    entries: number;
    exists: number;
    coordinates: [number, number];
  }>({
    data: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/bart-stations.json',
    getPosition: d => d.coordinates,
    getRadius: d => Math.sqrt(d.entries),
    getFillColor: [255, 0, 0],
    pickable: true,
    autoHighlight: true
  });

  return (
    <Map
      initialViewState={initialViewState}
      mapStyle="mapbox://styles/mapbox/light-v9"
      mapboxAccessToken={TOKEN}
    >
      <DeckGLOverlay layers={[scatterplotLayer]} />
      <NavigationControl />
    </Map>
  );
}

export function renderToDom(container) {
  createRoot(container).render(<App />);
}
