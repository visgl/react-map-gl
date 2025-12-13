import * as React from 'react';
import {useEffect, memo} from 'react';
import {applyReactStyle} from '../utils/apply-react-style';
import {useControl} from './use-control';

import type {ControlPosition} from '../types/lib';
import type {TerrainSpecification} from '../types/style-spec';

export type TerrainControlProps = TerrainSpecification & {
  /** Placement of the control relative to the map. */
  position?: ControlPosition;
  /** CSS style override, applied to the control's container */
  style?: React.CSSProperties;
};

function _TerrainControl(props: TerrainControlProps) {
  const ctrl = useControl(({mapLib}) => new mapLib.TerrainControl(props), {
    position: props.position
  });

  useEffect(() => {
    applyReactStyle(ctrl._container, props.style);
  }, [props.style]);

  return null;
}

export const TerrainControl = memo(_TerrainControl);
