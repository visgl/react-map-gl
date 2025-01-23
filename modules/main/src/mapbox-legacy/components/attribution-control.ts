import * as React from 'react';
import {useEffect, memo} from 'react';
import {applyReactStyle} from '../utils/apply-react-style';
import {useControl} from './use-control';

import type {ControlPosition, AttributionControlOptions} from '../types/lib';

export type AttributionControlProps = AttributionControlOptions & {
  /** Placement of the control relative to the map. */
  position?: ControlPosition;
  /** CSS style override, applied to the control's container */
  style?: React.CSSProperties;
};

function _AttributionControl(props: AttributionControlProps) {
  const ctrl = useControl(({mapLib}) => new mapLib.AttributionControl(props), {
    position: props.position
  });

  useEffect(() => {
    // @ts-expect-error accessing private member
    applyReactStyle(ctrl._container, props.style);
  }, [props.style]);

  return null;
}

export const AttributionControl = memo(_AttributionControl);
