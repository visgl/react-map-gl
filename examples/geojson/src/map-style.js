import MAP_STYLE from '../../map-style-basic-v8.json';

// For more information on data-driven styles, see https://www.mapbox.com/help/gl-dds-ref/
export const dataLayer = {
  id: 'data',
  source: 'incomeByState',
  type: 'fill',
  interactive: true,
  paint: {
    'fill-color': {
      property: 'percentile',
      stops: [
        [0, '#3288bd'],
        [1, '#66c2a5'],
        [2, '#abdda4'],
        [3, '#e6f598'],
        [4, '#ffffbf'],
        [5, '#fee08b'],
        [6, '#fdae61'],
        [7, '#f46d43'],
        [8, '#d53e4f']
      ]
    },
    'fill-opacity': 0.8
  }
};

export const defaultMapStyle = MAP_STYLE;
