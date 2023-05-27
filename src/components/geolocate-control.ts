import * as React from 'react';
import {useImperativeHandle, useRef, useEffect, forwardRef, memo} from 'react';
import {applyReactStyle} from '../utils/apply-react-style';
import useControl from './use-control';

import type {
  ControlPosition,
  GeolocateControlInstance,
  GeolocateEvent,
  GeolocateResultEvent,
  GeolocateErrorEvent
} from '../types';

export type GeolocateControlProps<
  OptionsT,
  ControlT extends GeolocateControlInstance
> = OptionsT & {
  /** Placement of the control relative to the map. */
  position?: ControlPosition;
  /** CSS style override, applied to the control's container */
  style?: React.CSSProperties;

  /** Called on each Geolocation API position update that returned as success. */
  onGeolocate?: (e: GeolocateResultEvent<ControlT>) => void;
  /** Called on each Geolocation API position update that returned as an error. */
  onError?: (e: GeolocateErrorEvent<ControlT>) => void;
  /** Called on each Geolocation API position update that returned as success but user position
   * is out of map `maxBounds`. */
  onOutOfMaxBounds?: (e: GeolocateResultEvent<ControlT>) => void;
  /** Called when the GeolocateControl changes to the active lock state. */
  onTrackUserLocationStart?: (e: GeolocateEvent<ControlT>) => void;
  /** Called when the GeolocateControl changes to the background state. */
  onTrackUserLocationEnd?: (e: GeolocateEvent<ControlT>) => void;
};

function GeolocateControl<GeolocateControlOptions, ControlT extends GeolocateControlInstance>(
  props: GeolocateControlProps<GeolocateControlOptions, ControlT>,
  ref: React.Ref<ControlT>
) {
  const thisRef = useRef({props});

  const ctrl = useControl<ControlT>(
    ({mapLib}) => {
      const gc = new mapLib.GeolocateControl(props) as ControlT;

      // Hack: fix GeolocateControl reuse
      // When using React strict mode, the component is mounted twice.
      // GeolocateControl's UI creation is asynchronous. Removing and adding it back causes the UI to be initialized twice.
      // @ts-expect-error private method
      const setupUI = gc._setupUI;
      // @ts-expect-error private method
      gc._setupUI = args => {
        if (!gc._container.hasChildNodes()) {
          setupUI(args);
        }
      };

      gc.on('geolocate', e => {
        thisRef.current.props.onGeolocate?.(e as GeolocateResultEvent<ControlT>);
      });
      gc.on('error', e => {
        thisRef.current.props.onError?.(e as GeolocateErrorEvent<ControlT>);
      });
      gc.on('outofmaxbounds', e => {
        thisRef.current.props.onOutOfMaxBounds?.(e as GeolocateResultEvent<ControlT>);
      });
      gc.on('trackuserlocationstart', e => {
        thisRef.current.props.onTrackUserLocationStart?.(e as GeolocateEvent<ControlT>);
      });
      gc.on('trackuserlocationend', e => {
        thisRef.current.props.onTrackUserLocationEnd?.(e as GeolocateEvent<ControlT>);
      });

      return gc;
    },
    {position: props.position}
  );

  thisRef.current.props = props;

  useImperativeHandle(ref, () => ctrl, []);

  useEffect(() => {
    applyReactStyle(ctrl._container, props.style);
  }, [props.style]);

  return null;
}

export default memo(forwardRef(GeolocateControl));
