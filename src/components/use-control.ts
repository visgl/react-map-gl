import {useContext, useMemo, useEffect} from 'react';
import type {IControl, ControlPosition} from '../types';
import {MapContext} from './map';
import type {MapContextValue} from './map';

type ControlOptions = {
  position?: ControlPosition;
};

function useControl<T extends IControl>(
  onCreate: (context: MapContextValue) => T,
  opts?: ControlOptions
);

function useControl<T extends IControl>(
  onCreate: (context: MapContextValue) => T,
  onRemove: (context: MapContextValue) => void,
  opts?: ControlOptions
);

function useControl<T extends IControl>(
  onCreate: (context: MapContextValue) => T,
  onAdd: (context: MapContextValue) => void,
  onRemove: (context: MapContextValue) => void,
  opts?: ControlOptions
);

function useControl<T extends IControl>(
  onCreate: (context: MapContextValue) => T,
  arg1?: ((context: MapContextValue) => void) | ControlOptions,
  arg2?: ((context: MapContextValue) => void) | ControlOptions,
  arg3?: ControlOptions
) {
  const context = useContext(MapContext);
  const ctrl = useMemo(() => onCreate(context), []);

  useEffect(() => {
    const opts = (arg3 || arg2 || arg1) as ControlOptions;
    const onAdd = typeof arg1 === 'function' && typeof arg2 === 'function' ? arg1 : null;
    const onRemove = typeof arg2 === 'function' ? arg2 : typeof arg1 === 'function' ? arg1 : null;

    const {map} = context;
    if (!map.hasControl(ctrl)) {
      map.addControl(ctrl, opts?.position);
      if (onAdd) {
        onAdd(context);
      }
    }

    return () => {
      if (onRemove) {
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

export default useControl;
