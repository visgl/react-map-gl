import {PaddingOptions, LngLat, Point, LngLatBounds} from 'mapbox-gl';

export * from './external';

// re-export mapbox types
export type {
  AnyLayer,
  AnySourceData,
  AnySourceImpl,
  MapMouseEvent,
  Popup as MapboxPopup
} from 'mapbox-gl';

/**
 * Stub for mapbox's Transform class
 * https://github.com/mapbox/mapbox-gl-js/blob/main/src/geo/transform.js
 */
export type Transform = {
  width: number;
  height: number;
  center: {lng: number; lat: number};
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
