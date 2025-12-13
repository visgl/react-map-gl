import type {FillLayerSpecification} from 'react-map-gl/maplibre';

export const countiesLayer: FillLayerSpecification = {
  id: 'counties',
  source: '',
  type: 'fill',
  paint: {
    'fill-outline-color': 'rgba(0,0,0,0.1)',
    'fill-color': 'rgba(0,0,0,0.1)'
  }
};
// Highlighted county polygons
export const highlightLayer: FillLayerSpecification = {
  id: 'counties-highlighted',
  type: 'fill',
  source: 'counties',
  paint: {
    'fill-outline-color': '#484896',
    'fill-color': '#6e599f',
    'fill-opacity': 0.75
  }
};
