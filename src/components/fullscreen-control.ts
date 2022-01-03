/* global document */
import * as React from 'react';
import mapboxgl from '../utils/mapboxgl';
import useControl from './use-control';

import type {ControlPosition} from '../utils/types';

export type FullscreenControlProps = {
  /** Id of the DOM element which should be made full screen. By default, the map container
   * element will be made full screen. */
  containerId?: string;
  /** Placement of the control relative to the map. */
  position?: ControlPosition;
};

function FullscreenControl(props: FullscreenControlProps): null {
  useControl(
    () =>
      new mapboxgl.FullscreenControl({
        container: props.containerId && document.getElementById(props.containerId)
      }),
    {position: props.position}
  );

  return null;
}

export default React.memo(FullscreenControl);
