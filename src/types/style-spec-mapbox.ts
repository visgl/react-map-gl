/*
 * Mapbox Style Specification types
 */
// Layers
import type {
  BackgroundLayer,
  SkyLayer,
  CircleLayer,
  FillLayer,
  FillExtrusionLayer,
  HeatmapLayer,
  HillshadeLayer,
  LineLayer,
  RasterLayer,
  SymbolLayer
} from 'mapbox-gl';

export type AnyLayer =
  | BackgroundLayer
  | CircleLayer
  | FillExtrusionLayer
  | FillLayer
  | HeatmapLayer
  | HillshadeLayer
  | LineLayer
  | RasterLayer
  | SymbolLayer
  | SkyLayer;

export type {
  BackgroundLayer,
  SkyLayer,
  CircleLayer,
  FillLayer,
  FillExtrusionLayer,
  HeatmapLayer,
  HillshadeLayer,
  LineLayer,
  RasterLayer,
  SymbolLayer
};

// Sources
import type {
  GeoJSONSourceRaw as GeoJSONSource,
  VideoSourceRaw as VideoSource,
  ImageSourceRaw as ImageSource,
  VectorSource,
  RasterSource,
  CanvasSourceRaw as CanvasSource,
  RasterDemSource
} from 'mapbox-gl';

export type AnySource =
  | GeoJSONSource
  | VideoSource
  | ImageSource
  | CanvasSource
  | VectorSource
  | RasterSource
  | RasterDemSource;

export type {
  GeoJSONSource,
  VideoSource,
  ImageSource,
  CanvasSource,
  VectorSource,
  RasterSource,
  RasterDemSource
};

// Other
export type {
  Style as MapboxStyle,
  Light,
  Fog,
  TerrainSpecification as Terrain,
  Projection
} from 'mapbox-gl';
