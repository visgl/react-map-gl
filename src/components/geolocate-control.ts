import * as React from 'react';
import {forwardRef, useImperativeHandle, useRef} from 'react';
import mapboxgl from '../utils/mapboxgl';
import useControl from './use-control';

import type {
  ControlPosition,
  PositionOptions,
  FitBoundsOptions,
  MapboxEvent,
  GeolocateEvent,
  GeolocateErrorEvent
} from '../utils/types';

export type GeolocateControlRef = {
  /** Triggers a geolocate event */
  trigger: () => boolean;
};

export type GeolocateControlProps = {
  /** A Geolocation API PositionOptions object. */
  positionOptions?: PositionOptions;
  /** A Map#fitBounds options object to use when the map is panned and zoomed to the user's location.
   * The default is to use a maxZoom of 15 to limit how far the map will zoom in for very accurate locations.
   */
  fitBoundsOptions?: FitBoundsOptions;
  /** If true the GeolocateControl becomes a toggle button and when active the map will receive
   * updates to the user's location as it changes. Default false.
   */
  trackUserLocation?: boolean;
  /** Draw a transparent circle will be drawn around the user location indicating the accuracy
   * (95% confidence level) of the user's location. Set to false to disable.
   * This only has effect if `showUserLocation` is true. Default true.
   */
  showAccuracyCircle?: boolean;
  /** Show a dot on the map at the user's location. Set to false to disable. Default true. */
  showUserLocation?: boolean;
  /** If true an arrow will be drawn next to the user location dot indicating the device's heading.
   * This only has affect when `trackUserLocation` is true. Default false.
   */
  showUserHeading?: boolean;
  /** Placement of the control relative to the map. */
  position?: ControlPosition;

  /** Called on each Geolocation API position update that returned as success. */
  onGeolocate?: (e: GeolocateEvent) => void;
  /** Called on each Geolocation API position update that returned as an error. */
  onError?: (e: GeolocateErrorEvent) => void;
  /** Called on each Geolocation API position update that returned as success but user position
   * is out of map `maxBounds`. */
  onOutOfMaxBounds?: (e: GeolocateEvent) => void;
  /** Called when the GeolocateControl changes to the active lock state. */
  onTrackUserLocationStart?: (e: MapboxEvent) => void;
  /** Called when the GeolocateControl changes to the background state. */
  onTrackUserLocationEnd?: (e: MapboxEvent) => void;
};

const GeolocateControl = forwardRef<GeolocateControlRef, GeolocateControlProps>((props, ref) => {
  const thisRef = useRef({props});

  const ctrl = useControl(() => {
    const gc = new mapboxgl.GeolocateControl(props);

    gc.on('geolocate', e => {
      thisRef.current.props.onGeolocate?.(e as GeolocateEvent);
    });
    gc.on('error', e => {
      thisRef.current.props.onError?.(e as GeolocateErrorEvent);
    });
    gc.on('outofmaxbounds', e => {
      thisRef.current.props.onOutOfMaxBounds?.(e as GeolocateEvent);
    });
    gc.on('trackuserlocationstart', e => {
      thisRef.current.props.onTrackUserLocationStart?.(e as MapboxEvent);
    });
    gc.on('trackuserlocationend', e => {
      thisRef.current.props.onTrackUserLocationEnd?.(e as MapboxEvent);
    });

    return gc;
  }, props.position) as mapboxgl.GeolocateControl;

  thisRef.current.props = props;

  useImperativeHandle(
    ref,
    () => ({
      trigger: () => ctrl.trigger()
    }),
    []
  );

  return null;
});

export default React.memo(GeolocateControl);
