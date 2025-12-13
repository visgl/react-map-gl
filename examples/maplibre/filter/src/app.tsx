import * as React from 'react';
import {useState, useMemo, useCallback} from 'react';
import {createRoot} from 'react-dom/client';
import {Map, Popup, Source, Layer} from 'react-map-gl/maplibre';
import ControlPanel from './control-panel';
import {countiesLayer, highlightLayer} from './map-style';
import type {ExpressionSpecification} from 'maplibre-gl';

export default function App() {
  const [hoverInfo, setHoverInfo] = useState(null);

  const onHover = useCallback(event => {
    const county = event.features && event.features[0];
    setHoverInfo({
      longitude: event.lngLat.lng,
      latitude: event.lngLat.lat,
      countyName: county && county.properties.name.split(',')[0]
    });
  }, []);

  const selectedCounty = (hoverInfo && hoverInfo.countyName) || '';
  const filter: ExpressionSpecification = useMemo(
    () => ['in', selectedCounty || 'N/A', ['get', 'name']],
    [selectedCounty]
  );

  return (
    <>
      <Map
        initialViewState={{
          latitude: 38.88,
          longitude: -98,
          zoom: 3
        }}
        minZoom={2}
        mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
        onMouseMove={onHover}
        interactiveLayerIds={['counties']}
      >
        <Source
          type="geojson"
          data="https://raw.githubusercontent.com/visgl/deck.gl-data/refs/heads/master/examples/arc/counties.json"
        >
          <Layer beforeId="waterway_label" {...countiesLayer} />
          <Layer beforeId="waterway_label" {...highlightLayer} filter={filter} />
        </Source>
        {selectedCounty && (
          <Popup
            longitude={hoverInfo.longitude}
            latitude={hoverInfo.latitude}
            offset={[0, -10] as [number, number]}
            closeButton={false}
            className="county-info"
          >
            {selectedCounty}
          </Popup>
        )}
      </Map>
      <ControlPanel />
    </>
  );
}

export function renderToDom(container) {
  createRoot(container).render(<App />);
}
