import * as React from 'react';
import {useEffect, useRef, memo} from 'react';
import {applyReactStyle} from '../utils/apply-react-style';
import {useControl} from './use-control';

import type {ControlPosition, ScaleControlOptions} from '../types/lib';

export type ScaleControlProps = ScaleControlOptions & {
  /** Placement of the control relative to the map. */
  position?: ControlPosition;
  /** CSS style override, applied to the control's container */
  style?: React.CSSProperties;
};

function _ScaleControl(props: ScaleControlProps) {
  const ctrl = useControl(({mapLib}) => new mapLib.ScaleControl(props), {
    position: props.position
  });
  const propsRef = useRef<ScaleControlProps>(props);

  const prevProps = propsRef.current;
  propsRef.current = props;

  const {style} = props;

  if (props.maxWidth !== undefined && props.maxWidth !== prevProps.maxWidth) {
    // @ts-expect-error accessing private member
    ctrl.options.maxWidth = props.maxWidth;
  }
  if (props.unit !== undefined && props.unit !== prevProps.unit) {
    ctrl.setUnit(props.unit as any);
  }

  useEffect(() => {
    // @ts-expect-error accessing private member
    applyReactStyle(ctrl._container, style);
  }, [style]);

  return null;
}

export const ScaleControl = memo(_ScaleControl);
