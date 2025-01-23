// Internal types
import type {Map, LngLat, PaddingOptions, Point} from 'mapbox-gl';

export type {
  AnySourceImpl as AnySourceImplementation,
  GeoJSONSource as GeoJSONSourceImplementation,
  ImageSource as ImageSourceImplemtation,
  CanvasSource as CanvasSourceImplemtation,
  VectorSourceImpl as VectorSourceImplementation,
  RasterSourceImpl as RasterSourceImplementation,
  VideoSource as VideoSourceImplementation
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
  elevation: any;
  pixelsToGLUnits: [number, number];
  cameraElevationReference: 'ground' | 'sea';

  clone: () => Transform;
  resize: (width: number, height: number) => void;
  isPaddingEqual: (value: PaddingOptions) => boolean;
  getBounds: () => any;
  locationPoint: (lngLat: LngLat) => Point;
  pointLocation: (p: Point) => LngLat;

  // Mapbox only
  getProjection?: () => any;
  setProjection?: (projection: any) => void;
};

export type MapInstanceInternal = Map & {
  transform: Transform;

  _render: Function;

  _renderTaskQueue: {
    run: Function;
  };
};
