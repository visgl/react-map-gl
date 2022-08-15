import * as React from 'react';
import {useState, useMemo, useCallback} from 'react';
import {createRoot} from 'react-dom/client';
import Map, {Popup, Source, Layer} from 'react-map-gl';
import ControlPanel from './control-panel';

import {countiesLayer, highlightLayer} from './map-style';

const MAPBOX_TOKEN =
  'pk.eyJ1IjoidG9yZGFucyIsImEiOiJjamgzM3pmNGgwYXA5MnFvNDVhMWZ0ZG1nIn0.81lAz7ysD0LZU_eqa_hObg'; // Set your mapbox token here

export default function App() {
  const [hoverInfo, setHoverInfo] = useState(null);

  const onHover = useCallback(event => {
    const county = event.features && event.features[0];
    console.log('onHover', {event});
    setHoverInfo({
      longitude: event.lngLat.lng,
      latitude: event.lngLat.lat,
      countyName: 'ON HOVER'
    });
  }, []);

  const onEnter = useCallback(event => {
    const county = event.features && event.features[0];
    console.error('onEnter', {event});
    setHoverInfo({
      longitude: event.lngLat.lng + 1,
      latitude: event.lngLat.lat + 1,
      countyName: 'ON ENTER'
    });
  }, []);

  const selectedCounty = (hoverInfo && hoverInfo.countyName) || '';
  const filter = useMemo(() => ['in', 'COUNTY', selectedCounty], [selectedCounty]);

  return (
    <>
      <Map
        initialViewState={{
          latitude: 38.88,
          longitude: -98,
          zoom: 3
        }}
        minZoom={2}
        mapStyle="mapbox://styles/mapbox/light-v9"
        mapboxAccessToken={MAPBOX_TOKEN}
        onMouseMove={onHover}
        onMouseEnter={onEnter}
        interactiveLayerIds={['counties']}
      >
        <Source type="vector" url="mapbox://mapbox.82pkq93d">
          <Layer beforeId="waterway-label" {...countiesLayer} />
          <Layer beforeId="waterway-label" {...highlightLayer} filter={filter} />
        </Source>
        {selectedCounty && (
          <Popup
            longitude={hoverInfo.longitude}
            latitude={hoverInfo.latitude}
            offset={[0, -10]}
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
