import * as React from 'react';
import {render} from 'react-dom';
import DeckGL, {ArcLayer} from 'deck.gl';
import {StaticMap, MapContext, AttributionControl} from 'react-map-gl';

const TOKEN = ''; // Set your mapbox token here

export default function App() {
  const arcLayer = new ArcLayer({
    data: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/bart-segments.json',
    getSourcePosition: d => d.from.coordinates,
    getTargetPosition: d => d.to.coordinates,
    getSourceColor: [255, 200, 0],
    getTargetColor: [0, 140, 255],
    getWidth: 12
  });

  return (
    <DeckGL
      initialViewState={{
        longitude: -122.45,
        latitude: 37.75,
        zoom: 11,
        bearing: 0,
        pitch: 60
      }}
      controller={true}
      layers={[arcLayer]}
      // This is required when using react-map-gl controls as children
      ContextProvider={MapContext.Provider}
    >
      <StaticMap mapboxApiAccessToken={TOKEN} attributionControl={false} />
      <AttributionControl
        style={{
          fontFamily: 'sans-serif',
          fontSize: 14,
          right: 0,
          bottom: 0
        }}
      />
    </DeckGL>
  );
}

export function renderToDom(container) {
  render(<App />, container);
}
