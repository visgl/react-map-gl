import * as React from 'react';
import {useEffect, memo} from 'react';
import {applyReactStyle} from '../utils/apply-react-style';
import useControl from './use-control';

import type {ControlPosition, NavigationControlInstance} from '../types';

export type NavigationControlProps<OptionsT> = OptionsT & {
  /** Placement of the control relative to the map. */
  position?: ControlPosition;
  /** CSS style override, applied to the control's container */
  style?: React.CSSProperties;
};

function NavigationControl<NavigationControlOptions, ControlT extends NavigationControlInstance>(
  props: NavigationControlProps<NavigationControlOptions>
): null {
  const ctrl = useControl<ControlT>(({mapLib}) => new mapLib.NavigationControl(props) as ControlT, {
    position: props.position
  });

  useEffect(() => {
    applyReactStyle(ctrl._container, props.style);
  }, [props.style]);

  return null;
}

export default memo(NavigationControl);
