/* global document */
import * as React from 'react';
import {useEffect, memo} from 'react';
import {applyReactStyle} from '../utils/apply-react-style';
import useControl from './use-control';

import type {ControlPosition, FullscreenControlInstance} from '../types';

export type FullscreenControlProps<OptionsT> = Omit<OptionsT, 'container'> & {
  /** Id of the DOM element which should be made full screen. By default, the map container
   * element will be made full screen. */
  containerId?: string;
  /** Placement of the control relative to the map. */
  position?: ControlPosition;
  /** CSS style override, applied to the control's container */
  style?: React.CSSProperties;
};

function FullscreenControl<FullscreenControlOptions, ControlT extends FullscreenControlInstance>(
  props: FullscreenControlProps<FullscreenControlOptions>
): null {
  const ctrl = useControl<ControlT>(
    ({mapLib}) =>
      new mapLib.FullscreenControl({
        container: props.containerId && document.getElementById(props.containerId)
      }) as ControlT,
    {position: props.position}
  );

  useEffect(() => {
    applyReactStyle(ctrl._controlContainer, props.style);
  }, [props.style]);

  return null;
}

export default memo(FullscreenControl);
