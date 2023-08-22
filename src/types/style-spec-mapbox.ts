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
  GeoJSONSourceRaw,
  VideoSourceRaw,
  ImageSourceRaw,
  VectorSource as VectorSourceRaw,
  RasterSource,
  CanvasSourceRaw,
  RasterDemSource
} from 'mapbox-gl';

export type AnySource =
  | GeoJSONSourceRaw
  | VideoSourceRaw
  | ImageSourceRaw
  | CanvasSourceRaw
  | VectorSourceRaw
  | RasterSource
  | RasterDemSource;

export type {
  GeoJSONSourceRaw,
  VideoSourceRaw,
  ImageSourceRaw,
  CanvasSourceRaw,
  VectorSourceRaw,
  RasterSource,
  RasterDemSource
};

// Other
export type {
  Style as MapStyle,
  Light,
  Fog,
  TerrainSpecification as Terrain,
  Projection
} from 'mapbox-gl';
