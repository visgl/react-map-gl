import test from 'tape-promise/tape';
import * as legacyComponents from 'react-map-gl/mapbox-legacy';
import * as maplibreComponents from '@vis.gl/react-maplibre';
import * as mapboxComponents from '@vis.gl/react-mapbox';

const Components = [
  'Map',
  'Source',
  'Layer',
  'useControl',
  'useMap',
  'Marker',
  'Popup',
  'AttributionControl',
  'GeolocateControl',
  'FullscreenControl',
  'NavigationControl',
  'ScaleControl'
] as const;

function getMissingExports(module: any): null | string[] {
  const missingExports: string[] = [];
  for (const key of Components) {
    if (!legacyComponents[key]) {
      missingExports.push(key);
    }
  }
  return missingExports.length ? missingExports : null;
}

test('Consistent component names#legacy', t => {
  t.notOk(getMissingExports(legacyComponents), 'Legacy endpoint contains all components');
  t.notOk(getMissingExports(maplibreComponents), 'Maplibre endpoint contains all components');
  t.notOk(getMissingExports(mapboxComponents), 'Mapbox endpoint contains all components');
  t.end();
});
