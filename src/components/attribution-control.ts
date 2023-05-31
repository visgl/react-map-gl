import * as React from 'react';
import {useEffect, memo} from 'react';
import {applyReactStyle} from '../utils/apply-react-style';
import useControl from './use-control';

import type {ControlPosition, AttributionControlInstance} from '../types';

export type AttributionControlProps<OptionsT> = OptionsT & {
  /** Placement of the control relative to the map. */
  position?: ControlPosition;
  /** CSS style override, applied to the control's container */
  style?: React.CSSProperties;
};

function AttributionControl<AttributionControlOptions, ControlT extends AttributionControlInstance>(
  props: AttributionControlProps<AttributionControlOptions>
): null {
  const ctrl = useControl<ControlT>(
    ({mapLib}) => new mapLib.AttributionControl(props) as ControlT,
    {
      position: props.position
    }
  );

  useEffect(() => {
    applyReactStyle(ctrl._container, props.style);
  }, [props.style]);

  return null;
}

export default memo(AttributionControl);
