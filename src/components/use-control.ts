import {useContext, useState, useEffect} from 'react';
import type {IControl, ControlPosition} from '../utils/types';
import MapContext from './map-context';

export default function useControl(onCreate: () => IControl, position?: ControlPosition) {
  const map = useContext(MapContext);
  const [ctrl] = useState(onCreate);

  useEffect(() => {
    map.addControl(ctrl, position);

    return () => {
      map.removeControl(ctrl);
    };
  }, []);

  return ctrl;
}
