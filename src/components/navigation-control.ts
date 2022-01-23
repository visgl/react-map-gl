import * as React from 'react';
import useControl from './use-control';

import type {ControlPosition} from '../types';

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
};

function NavigationControl(props: NavigationControlProps): null {
  useControl(({mapLib}) => new mapLib.NavigationControl(props), {position: props.position});

  return null;
}

export default React.memo(NavigationControl);
