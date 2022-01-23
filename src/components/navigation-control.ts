import * as React from 'react';
import {useEffect} from 'react';
import {applyReactStyle} from '../utils/apply-react-style';
import useControl from './use-control';

import type {ControlPosition, MapboxNavigationControl} from '../types';

export type NavigationControlProps = {
  /** If true the compass button is included.
   * @default true
   */
  showCompass?: boolean;
  /** If true the zoom-in and zoom-out buttons are included.
   * @default true
   */
  showZoom?: boolean;
  /** If true the pitch is visualized by rotating X-axis of compass.
   * @default false
   */
  visualizePitch?: boolean;
  /** Placement of the control relative to the map. */
  position?: ControlPosition;
  /** CSS style override, applied to the control's container */
  style?: React.CSSProperties;
};

function NavigationControl(props: NavigationControlProps): null {
  const ctrl = useControl(({mapLib}) => new mapLib.NavigationControl(props), {
    position: props.position
  }) as MapboxNavigationControl;

  useEffect(() => {
    // @ts-ignore
    applyReactStyle(ctrl._container, props.style);
  }, [props.style]);

  return null;
}

export default React.memo(NavigationControl);
