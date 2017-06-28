import {fromJS} from 'immutable';
import MAP_STYLE from '../../map-style-basic-v8.json';

export const pointLayer = fromJS({
  id: 'point',
  source: 'point',
  type: 'circle',
  paint: {
    'circle-radius': 10,
    'circle-color': '#007cbf'
  }
});

export const defaultMapStyle = fromJS(MAP_STYLE);
