import * as React from 'react';
import mapboxgl from '../utils/mapboxgl';
import useControl from './use-control';

import type {ControlPosition} from '../utils/types';

export type NavigationControlProps = {
  /** If true the compass button is included. */
  showCompass?: boolean;
  /** If true the zoom-in and zoom-out buttons are included. */
  showZoom?: boolean;
  /** If true the pitch is visualized by rotating X-axis of compass. */
  visualizePitch?: boolean;
  /** Placement of the control relative to the map. */
  position?: ControlPosition;
};

function NavigationControl(props: NavigationControlProps): null {
  const ctrl = useControl(() => new mapboxgl.NavigationControl(props), props.position);

  return null;
}

export default React.memo(NavigationControl);
