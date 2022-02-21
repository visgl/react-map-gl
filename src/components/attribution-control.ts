import * as React from 'react';
import {useEffect} from 'react';
import {applyReactStyle} from '../utils/apply-react-style';
import useControl from './use-control';

import type {ControlPosition, MapboxAttributionControl} from '../types';

export type AttributionControlProps = {
  /**
   * If true , force a compact attribution that shows the full attribution on mouse hover.
   * If false , force the full attribution control. The default is a responsive attribution
   * that collapses when the map is less than 640 pixels wide.  */
  compact?: boolean;
  /** String or strings to show in addition to any other attributions. */
  customAttribution?: string | string[];
  /** Placement of the control relative to the map. */
  position?: ControlPosition;
  /** CSS style override, applied to the control's container */
  style?: React.CSSProperties;
};

function AttributionControl(props: AttributionControlProps): null {
  const ctrl = useControl<MapboxAttributionControl>(
    ({mapLib}) => new mapLib.AttributionControl(props),
    {
      position: props.position
    }
  );

  useEffect(() => {
    // @ts-ignore
    applyReactStyle(ctrl._container, props.style);
  }, [props.style]);

  return null;
}

export default React.memo(AttributionControl);
