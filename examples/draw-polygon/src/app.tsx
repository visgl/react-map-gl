import * as React from 'react';
import {useState, useCallback} from 'react';
import {render} from 'react-dom';
import Map from 'react-map-gl';

import DrawControl from './draw-control';
import ControlPanel from './control-panel';

const TOKEN = ''; // Set your mapbox token here

export default function App() {
  const [features, setFeatures] = useState({});

  const onUpdate = useCallback(
    e => {
      const newFeatures = {...features};
      for (const f of e.features) {
        newFeatures[f.id] = f;
      }
      setFeatures(newFeatures);
    },
    [features]
  );

  const onDelete = useCallback(e => {
    const newFeatures = {...features};
    for (const f of e.features) {
      delete newFeatures[f.id];
    }
    setFeatures(newFeatures);
  }, []);

  return (
    <>
      <Map
        initialViewState={{
          longitude: -91.874,
          latitude: 42.76,
          zoom: 12
        }}
        mapStyle="mapbox://styles/mapbox/satellite-v9"
        mapboxAccessToken={TOKEN}
      >
        <DrawControl
          position="top-left"
          displayControlsDefault={false}
          controls={{
            polygon: true,
            trash: true
          }}
          defaultMode="draw_polygon"
          onCreate={onUpdate}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      </Map>
      <ControlPanel polygons={Object.values(features)} />
    </>
  );
}

export function renderToDom(container) {
  render(<App />, container);
}
