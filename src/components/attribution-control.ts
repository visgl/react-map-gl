import * as React from 'react';
import mapboxgl from '../utils/mapboxgl';
import useControl from './use-control';

import type {ControlPosition} from '../types';

export type AttributionControlProps = {
  /**
   * If true , force a compact attribution that shows the full attribution on mouse hover.
   * If false , force the full attribution control. The default is a responsive attribution
   * that collapses when the map is less than 640 pixels wide.  */
  compact?: boolean;
  /** String or strings to show in addition to any other attributions. */
  customAttributions?: string | string[];
  /** Placement of the control relative to the map. */
  position?: ControlPosition;
};

function AttributionControl(props: AttributionControlProps): null {
  useControl(() => new mapboxgl.AttributionControl(props), {position: props.position});

  return null;
}

export default React.memo(AttributionControl);
