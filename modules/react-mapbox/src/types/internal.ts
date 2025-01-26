// Internal types
import type {Map} from 'mapbox-gl';

export type Transform = Map['transform'];

export type {
  GeoJSONSource as GeoJSONSourceImplementation,
  ImageSource as ImageSourceImplementation,
  CanvasSource as CanvasSourceImplementation,
  VectorTileSource as VectorSourceImplementation,
  RasterTileSource as RasterSourceImplementation,
  RasterDemTileSource as RasterDemSourceImplementation,
  VideoSource as VideoSourceImplementation,
  Source as AnySourceImplementation
} from 'mapbox-gl';
