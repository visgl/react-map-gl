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

const defaultProps: ScaleControlProps = {
  unit: 'metric',
  maxWidth: 100
};

function ScaleControl(props: ScaleControlProps): null {
  const ctrl = useControl(({mapLib}) => new mapLib.ScaleControl(props), {
    position: props.position
  }) as MapboxScaleControl;

  // @ts-ignore
  if (ctrl.options.unit !== props.unit || ctrl.options.maxWidth !== props.maxWidth) {
    // @ts-ignore
    ctrl.options.maxWidth = props.maxWidth;
    // This method will trigger an update
    ctrl.setUnit(props.unit);
  }

  useEffect(() => {
    // @ts-ignore
    applyReactStyle(ctrl._container, props.style);
  }, [props.style]);

  return null;
}

ScaleControl.defaultProps = defaultProps;

export default React.memo(ScaleControl);
