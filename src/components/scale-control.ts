import * as React from 'react';
import {useEffect} from 'react';
import {applyReactStyle} from '../utils/apply-react-style';
import useControl from './use-control';

import type {ControlPosition, MapboxScaleControl} from '../types';

export type ScaleControlProps = {
  /** Unit of the distance.
   * @default "metric"
   */
  unit?: 'imperial' | 'metric' | 'nautical';
  /** The maximum length of the scale control in pixels.
   * @default 100
   */
  maxWidth?: number;
  /** Placement of the control relative to the map. */
  position?: ControlPosition;
  /** CSS style override, applied to the control's container */
  style?: React.CSSProperties;
};

function ScaleControl(props: ScaleControlProps): null {
  const ctrl = useControl<MapboxScaleControl>(
    ({mapLib}) => new mapLib.ScaleControl(props) as MapboxScaleControl,
    {
      position: props.position
    }
  );

  const {style, unit = 'metric', maxWidth = 100} = props;

  // @ts-ignore
  if (ctrl.options.unit !== unit || ctrl.options.maxWidth !== maxWidth) {
    // @ts-ignore
    ctrl.options.maxWidth = maxWidth;
    // This method will trigger an update
    ctrl.setUnit(unit);
  }

  useEffect(() => {
    // @ts-ignore
    applyReactStyle(ctrl._container, style);
  }, [style]);

  return null;
}

export default React.memo(ScaleControl);
