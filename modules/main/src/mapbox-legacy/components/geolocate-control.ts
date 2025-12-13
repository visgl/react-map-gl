import * as React from 'react';
import {useImperativeHandle, useRef, useEffect, forwardRef, memo} from 'react';
import {applyReactStyle} from '../utils/apply-react-style';
import {useControl} from './use-control';

import type {
  ControlPosition,
  GeolocateControlInstance,
  GeolocateControlOptions
} from '../types/lib';
import type {GeolocateEvent, GeolocateResultEvent, GeolocateErrorEvent} from '../types/events';

export type GeolocateControlProps = GeolocateControlOptions & {
  /** Placement of the control relative to the map. */
  position?: ControlPosition;
  /** CSS style override, applied to the control's container */
  style?: React.CSSProperties;

  /** Called on each Geolocation API position update that returned as success. */
  onGeolocate?: (e: GeolocateResultEvent) => void;
  /** Called on each Geolocation API position update that returned as an error. */
  onError?: (e: GeolocateErrorEvent) => void;
  /** Called on each Geolocation API position update that returned as success but user position
   * is out of map `maxBounds`. */
  onOutOfMaxBounds?: (e: GeolocateResultEvent) => void;
  /** Called when the GeolocateControl changes to the active lock state. */
  onTrackUserLocationStart?: (e: GeolocateEvent) => void;
  /** Called when the GeolocateControl changes to the background state. */
  onTrackUserLocationEnd?: (e: GeolocateEvent) => void;
};

function _GeolocateControl(props: GeolocateControlProps, ref: React.Ref<GeolocateControlInstance>) {
  const thisRef = useRef({props});

  const ctrl = useControl(
    ({mapLib}) => {
      const gc = new mapLib.GeolocateControl(props);

      // Hack: fix GeolocateControl reuse
      // When using React strict mode, the component is mounted twice.
      // GeolocateControl's UI creation is asynchronous. Removing and adding it back causes the UI to be initialized twice.
      // @ts-expect-error accessing private method
      const setupUI = gc._setupUI.bind(gc);
      // @ts-expect-error overriding private method
      gc._setupUI = args => {
        // @ts-expect-error accessing private member
        if (!gc._container.hasChildNodes()) {
          setupUI(args);
        }
      };

      gc.on('geolocate', e => {
        thisRef.current.props.onGeolocate?.(e as GeolocateResultEvent);
      });
      gc.on('error', e => {
        thisRef.current.props.onError?.(e as GeolocateErrorEvent);
      });
      gc.on('outofmaxbounds', e => {
        thisRef.current.props.onOutOfMaxBounds?.(e as GeolocateResultEvent);
      });
      gc.on('trackuserlocationstart', e => {
        thisRef.current.props.onTrackUserLocationStart?.(e as GeolocateEvent);
      });
      gc.on('trackuserlocationend', e => {
        thisRef.current.props.onTrackUserLocationEnd?.(e as GeolocateEvent);
      });

      return gc;
    },
    {position: props.position}
  );

  thisRef.current.props = props;

  useImperativeHandle(ref, () => ctrl, []);

  useEffect(() => {
    // @ts-expect-error accessing private member
    applyReactStyle(ctrl._container, props.style);
  }, [props.style]);

  return null;
}

export const GeolocateControl = memo(forwardRef(_GeolocateControl));
