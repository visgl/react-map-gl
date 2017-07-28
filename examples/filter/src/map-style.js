import {fromJS} from 'immutable';
import MAP_STYLE from '../../map-style-basic-v8.json';

// Add the vector tile source for counties
Object.assign(MAP_STYLE.sources, {
  counties: {
    type: 'vector',
    url: 'mapbox://mapbox.82pkq93d'
  }
});

// Insert custom layers before city labels
MAP_STYLE.layers.splice(
  MAP_STYLE.layers.findIndex(layer => layer.id === 'place_label_city'), 0,
  // Counties polygons
  {
    id: 'counties',
    interactive: true,
    type: 'fill',
    source: 'counties',
    'source-layer': 'original',
    paint: {
        'fill-outline-color': 'rgba(0,0,0,0.1)',
        'fill-color': 'rgba(0,0,0,0.1)'
    }
  },
  // Highlighted county polygons
  {
    id: 'counties-highlighted',
    type: 'fill',
    source: 'counties',
    'source-layer': 'original',
    paint: {
        'fill-outline-color': '#484896',
        'fill-color': '#6e599f',
        'fill-opacity': 0.75
    },
    filter: ['in', 'COUNTY', '']
  }
);

export const highlightLayerIndex = MAP_STYLE.layers.findIndex(layer => layer.id === 'counties-highlighted');

export const defaultMapStyle = fromJS(MAP_STYLE);
