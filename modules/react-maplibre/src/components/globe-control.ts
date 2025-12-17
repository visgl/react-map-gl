import * as React from "react";
import { useEffect, memo } from "react";
import { applyReactStyle } from "../utils/apply-react-style";
import { useControl } from "./use-control";
import { ControlPosition } from "../types/lib";

export type GlobeControlProps = {
  /** Placement of the control relative to the map. */
  position?: ControlPosition;
  /** CSS style override, applied to the control's container */
  style?: React.CSSProperties;
};

function _GlobeControl(props: GlobeControlProps) {
  const ctrl = useControl(({ mapLib }) => new mapLib.GlobeControl(props), {
    position: props.position,
  });

  useEffect(() => {
    applyReactStyle(ctrl._container, props.style);
  }, [props.style]);

  return null;
}

export const GlobeControl = memo(_GlobeControl);
