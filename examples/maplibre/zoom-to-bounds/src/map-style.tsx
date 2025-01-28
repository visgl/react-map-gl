import type {GeoJSONSource, FillLayer, LineLayer} from 'react-map-gl/maplibre';

import MAP_STYLE from '../../../map-style-basic-v8.json';

const sfNeighborhoods: GeoJSONSource = {
  type: 'geojson',
  data: 'https://raw.githubusercontent.com/visgl/react-map-gl/master/examples/.data/feature-example-sf.json'
};

const fillLayer: FillLayer = {
  id: 'sf-neighborhoods-fill',
  source: 'sf-neighborhoods',
  type: 'fill',
  paint: {
    'fill-outline-color': '#0040c8',
    'fill-color': '#fff',
    'fill-opacity': 0
  }
};

const lineLayer: LineLayer = {
  id: 'sf-neighborhoods-outline',
  source: 'sf-neighborhoods',
  type: 'line',
  paint: {
    'line-width': 2,
    'line-color': '#0080ef'
  }
};

// Make a copy of the map style
export default {
  ...MAP_STYLE,
  sources: {
    ...MAP_STYLE.sources,
    ['sf-neighborhoods']: sfNeighborhoods
  },
  layers: [...MAP_STYLE.layers, fillLayer, lineLayer]
};
