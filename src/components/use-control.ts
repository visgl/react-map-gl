import {useContext, useMemo, useEffect} from 'react';
import type {IControl, ControlPosition, MapboxMap} from '../types';
import {MapContext} from './map';

export default function useControl(
  onCreate: () => IControl,
  opts?: {
    position?: ControlPosition;
    onAdd?: (map: MapboxMap) => void;
    onRemove?: (map: MapboxMap) => void;
  }
) {
  const map = useContext(MapContext);
  const ctrl = useMemo(onCreate, []);

  useEffect(() => {
    if (map) {
      map.addControl(ctrl, opts?.position);
      opts?.onAdd?.(map);

      return () => {
        opts?.onRemove?.(map);
        // Map might have been removed (parent effects are destroyed before child ones)
        if (map.hasControl(ctrl)) {
          map.removeControl(ctrl);
        }
      };
    }
    return undefined;
  }, [map]);

  return ctrl;
}
