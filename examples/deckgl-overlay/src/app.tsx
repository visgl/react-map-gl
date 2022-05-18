import * as React from 'react';
import {render} from 'react-dom';
import {ArcLayer} from 'deck.gl';
import {MapboxLayer} from '@deck.gl/mapbox';
import Map, {Layer, MapboxMap} from 'react-map-gl';
import ControlPanel from './control-panel';

const TOKEN = ''; // Set your mapbox token here

export default function App() {
  const [overLabels, setOverLabels] = React.useState(true);
  const layer = React.useMemo(() => {
    return new MapboxLayer({
      id: 'arcs',
      type: ArcLayer,
      data: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/bart-segments.json',
      getSourcePosition: d => d.from.coordinates,
      getTargetPosition: d => d.to.coordinates,
      getSourceColor: [255, 200, 0],
      getTargetColor: [0, 140, 255],
      getWidth: 12
    });
  }, []);

  return (
    <>
      <ControlPanel overLabels={overLabels} setOverLabels={setOverLabels} />
      <Map
        initialViewState={{
          zoom: 9,
          longitude: -122.431297,
          latitude: 37.787994
        }}
        mapStyle="mapbox://styles/mapbox/light-v9"
        mapboxAccessToken={TOKEN}
      >
        <Layer layer={layer} beforeId={overLabels ? 'water-label' : 'country-label-lg'} />
      </Map>
    </>
  );
}

export function renderToDom(container) {
  render(<App />, container);
}
