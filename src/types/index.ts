import {PaddingOptions, LngLat, Point, LngLatBounds} from 'mapbox-gl';

export * from './external';

// re-export mapbox types
export type {
  AnyLayer,
  AnySourceData,
  AnySourceImpl,
  MapMouseEvent,
  Marker as MapboxMarker,
  Popup as MapboxPopup,
  AttributionControl as MapboxAttributionControl,
  FullscreenControl as MapboxFullscreenControl,
  GeolocateControl as MapboxGeolocateControl,
  NavigationControl as MapboxNavigationControl,
  ScaleControl as MapboxScaleControl
} from 'mapbox-gl';

/**
 * Stub for mapbox's Transform class
 * https://github.com/mapbox/mapbox-gl-js/blob/main/src/geo/transform.js
 */
export type Transform = {
  width: number;
  height: number;
  center: LngLat;
  zoom: number;
  bearing: number;
  pitch: number;
  padding: PaddingOptions;

  clone: () => Transform;
  resize: (width: number, height: number) => void;
  isPaddingEqual: (value: PaddingOptions) => boolean;
  getBounds: () => LngLatBounds;
  locationPoint: (lngLat: LngLat) => Point;
  pointLocation: (p: Point) => LngLat;
};
