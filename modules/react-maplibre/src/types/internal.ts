// Internal types
import type {LngLat, PaddingOptions} from 'maplibre-gl';

/**
 * maplibre's Transform interface / CameraUpdateTransformFunction argument
 */
export type TransformLike = {
  center: LngLat;
  zoom: number;
  roll?: number;
  pitch: number;
  bearing: number;
  elevation: number;
  padding?: PaddingOptions;
};

export type {
  GeoJSONSource as GeoJSONSourceImplementation,
  ImageSource as ImageSourceImplementation,
  CanvasSource as CanvasSourceImplementation,
  VectorTileSource as VectorSourceImplementation,
  RasterTileSource as RasterSourceImplementation,
  RasterDEMTileSource as RasterDemSourceImplementation,
  VideoSource as VideoSourceImplementation,
  Source as AnySourceImplementation
} from 'maplibre-gl';
