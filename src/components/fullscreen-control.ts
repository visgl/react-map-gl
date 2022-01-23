/* global document */
import * as React from 'react';
import {useEffect} from 'react';
import {applyReactStyle} from '../utils/apply-react-style';
import useControl from './use-control';

import type {ControlPosition, MapboxFullscreenControl} from '../types';

export type FullscreenControlProps = {
  /** Id of the DOM element which should be made full screen. By default, the map container
   * element will be made full screen. */
  containerId?: string;
  /** Placement of the control relative to the map. */
  position?: ControlPosition;
  /** CSS style override, applied to the control's container */
  style?: React.CSSProperties;
};

function FullscreenControl(props: FullscreenControlProps): null {
  const ctrl = useControl(
    ({mapLib}) =>
      new mapLib.FullscreenControl({
        container: props.containerId && document.getElementById(props.containerId)
      }),
    {position: props.position}
  ) as MapboxFullscreenControl;

  useEffect(() => {
    // @ts-ignore
    applyReactStyle(ctrl._controlContainer, props.style);
  }, [props.style]);

  return null;
}

export default React.memo(FullscreenControl);
