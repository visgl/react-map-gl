// @flow

import {useContext} from 'react';
import Mapbox from '../mapbox/mapbox';
import MapContext from './map-context';

/**
 * Hook to access underlying Mapbox instance. Use only available
 * inside a child component of InteractiveMap or StaticMap.
 */
export const useMapRef = (): Mapbox | null => {
  const context = useContext(MapContext);
  if (!context) throw Error('Trying to useMapRef outside of MapContext.');
  return context.map;
};
