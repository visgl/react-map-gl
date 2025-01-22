// Internal types
import type {
  Map,
  GeoJSONSource as GeoJSONSourceImplementation,
  ImageSource as ImageSourceImplemtation,
  CanvasSource as CanvasSourceImplemtation,
  VectorTileSource as VectorSourceImplementation,
  RasterTileSource as RasterSourceImplementation,
  RasterDemTileSource as RasterDemSourceImplementation,
  VideoSource as VideoSourceImplementation,
  Source
} from 'mapbox-gl';

export type Transform = Map['transform'];

export type {
  GeoJSONSourceImplementation,
  ImageSourceImplemtation,
  CanvasSourceImplemtation,
  VectorSourceImplementation,
  RasterDemSourceImplementation,
  RasterSourceImplementation,
  VideoSourceImplementation
};

export type AnySourceImplementation =
  | GeoJSONSourceImplementation
  | VideoSourceImplementation
  | ImageSourceImplemtation
  | CanvasSourceImplemtation
  | VectorSourceImplementation
  | RasterSourceImplementation
  | RasterDemSourceImplementation
  | Source;
