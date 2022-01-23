import {useContext, useMemo, useEffect} from 'react';
import type {IControl, ControlPosition} from '../types';
import {MapContext} from './map';
import type {MapContextValue} from './map';

type ControlOptions = {
  position?: ControlPosition;
};

export default function useControl(
  onCreate: (context: MapContextValue) => IControl,
  onRemove?: ((context: MapContextValue) => void) | ControlOptions,
  opts?: ControlOptions
) {
  const context = useContext(MapContext);
  const ctrl = useMemo(() => onCreate(context), []);

  useEffect(() => {
    const {map} = context;
    if (!map.hasControl(ctrl)) {
      map.addControl(ctrl, (opts || (onRemove as ControlOptions))?.position);
    }

    return () => {
      if (typeof onRemove === 'function') {
        onRemove(context);
      }
      // Map might have been removed (parent effects are destroyed before child ones)
      if (map.hasControl(ctrl)) {
        map.removeControl(ctrl);
      }
    };
  }, []);

  return ctrl;
}
