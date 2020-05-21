import MapContext from './map-context';
import {useContext} from 'react';

/**
 * Hook to access underlying Mapbox instance. Use only available
 * inside a child component of InteractiveMap or StaticMap.
 */
export const useMapRef = () => {
  const context = useContext(MapContext);
  if (!context) throw Error('Trying to useMapRef outside of MapContext.');
  return context.map;
};
