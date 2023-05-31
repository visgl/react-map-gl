import * as React from 'react';
import {useEffect, useRef, memo} from 'react';
import {applyReactStyle} from '../utils/apply-react-style';
import useControl from './use-control';

import type {ControlPosition, ScaleControlInstance} from '../types';

export type ScaleControlProps<OptionsT> = OptionsT & {
  // These props will be further constraint by OptionsT
  unit?: string;
  maxWidth?: number;

  /** Placement of the control relative to the map. */
  position?: ControlPosition;
  /** CSS style override, applied to the control's container */
  style?: React.CSSProperties;
};

function ScaleControl<ScaleControlOptions, ControlT extends ScaleControlInstance>(
  props: ScaleControlProps<ScaleControlOptions>
): null {
  const ctrl = useControl<ControlT>(({mapLib}) => new mapLib.ScaleControl(props) as ControlT, {
    position: props.position
  });
  const propsRef = useRef<ScaleControlProps<ScaleControlOptions>>(props);

  const prevProps = propsRef.current;
  propsRef.current = props;

  const {style} = props;

  if (props.maxWidth !== undefined && props.maxWidth !== prevProps.maxWidth) {
    ctrl.options.maxWidth = props.maxWidth;
  }
  if (props.unit !== undefined && props.unit !== prevProps.unit) {
    ctrl.setUnit(props.unit);
  }

  useEffect(() => {
    applyReactStyle(ctrl._container, style);
  }, [style]);

  return null;
}

export default memo(ScaleControl);
