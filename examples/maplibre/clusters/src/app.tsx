import * as React from 'react';
import {useRef} from 'react';
import {createRoot} from 'react-dom/client';
import {Map, Source, Layer} from 'react-map-gl/maplibre';

import ControlPanel from './control-panel';
import {clusterLayer, clusterCountLayer, unclusteredPointLayer} from './layers';

import type {MapRef, MapMouseEvent} from 'react-map-gl/maplibre';
import type {GeoJSONSource} from 'maplibre-gl';

export default function App() {
  const mapRef = useRef<MapRef>(null);

  const onClick = async (event: MapMouseEvent) => {
    const feature = event.features[0];
    if (!feature) {
      return;
    }
    const clusterId = feature.properties.cluster_id;

    const geojsonSource: GeoJSONSource = mapRef.current.getSource('earthquakes');

    const zoom = await geojsonSource.getClusterExpansionZoom(clusterId);

    mapRef.current.easeTo({
      center: feature.geometry.coordinates,
      zoom,
      duration: 500
    });
  };

  return (
    <>
      <Map
        initialViewState={{
          latitude: 40.67,
          longitude: -103.59,
          zoom: 3
        }}
        mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
        interactiveLayerIds={[clusterLayer.id]}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick={onClick}
        ref={mapRef}
      >
        <Source
          id="earthquakes"
          type="geojson"
          data="https://maplibre.org/maplibre-gl-js/docs/assets/earthquakes.geojson"
          cluster={true}
          clusterMaxZoom={14}
          clusterRadius={50}
        >
          <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} />
          <Layer {...unclusteredPointLayer} />
        </Source>
      </Map>
      <ControlPanel />
    </>
  );
}

export function renderToDom(container) {
  createRoot(container).render(<App />);
}
