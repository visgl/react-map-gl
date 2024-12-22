/*
 * Mapbox Style Specification types
 */
// Layers
import type {
  BackgroundLayerSpecification as BackgroundLayer,
  SkyLayerSpecification as SkyLayer,
  CircleLayerSpecification as CircleLayer,
  FillLayerSpecification as FillLayer,
  FillExtrusionLayerSpecification as FillExtrusionLayer,
  HeatmapLayerSpecification as HeatmapLayer,
  HillshadeLayerSpecification as HillshadeLayer,
  LineLayerSpecification as LineLayer,
  RasterLayerSpecification as RasterLayer,
  SymbolLayerSpecification as SymbolLayer
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
  GeoJSONSourceSpecification  as GeoJSONSourceRaw,
  VideoSourceSpecification as VideoSourceRaw,
  ImageSourceSpecification as ImageSourceRaw,
  VectorSourceSpecification as VectorSourceRaw,
  RasterSourceSpecification as RasterSource,
  CanvasSourceSpecification as CanvasSourceRaw,
  RasterDEMSourceSpecification as RasterDemSource
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
  StyleSpecification as MapStyle,
  LightsSpecification as Light,
  FogSpecification as Fog,
  TerrainSpecification as Terrain,
  ProjectionSpecification as Projection
} from 'mapbox-gl';
