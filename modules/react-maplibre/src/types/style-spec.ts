/*
 * Maplibre Style Specification types
 * Type names are aligned with mapbox
 */
import type {
  BackgroundLayerSpecification as BackgroundLayer,
  CircleLayerSpecification as CircleLayer,
  FillLayerSpecification as FillLayer,
  FillExtrusionLayerSpecification as FillExtrusionLayer,
  HeatmapLayerSpecification as HeatmapLayer,
  HillshadeLayerSpecification as HillshadeLayer,
  LineLayerSpecification as LineLayer,
  RasterLayerSpecification as RasterLayer,
  SymbolLayerSpecification as SymbolLayer,
  GeoJSONSourceSpecification as GeoJSONSourceRaw,
  VideoSourceSpecification as VideoSourceRaw,
  ImageSourceSpecification as ImageSourceRaw,
  VectorSourceSpecification as VectorSourceRaw,
  RasterSourceSpecification as RasterSource,
  RasterDEMSourceSpecification as RasterDemSource,
  CanvasSourceSpecification as CanvasSourceRaw,
  ProjectionSpecification
} from 'maplibre-gl';

// Layers
export type {
  BackgroundLayer,
  CircleLayer,
  FillLayer,
  FillExtrusionLayer,
  HeatmapLayer,
  HillshadeLayer,
  LineLayer,
  RasterLayer,
  SymbolLayer
};

export type AnyLayer =
  | BackgroundLayer
  | CircleLayer
  | FillLayer
  | FillExtrusionLayer
  | HeatmapLayer
  | HillshadeLayer
  | LineLayer
  | RasterLayer
  | SymbolLayer;

// Sources
export type {
  GeoJSONSourceRaw,
  VideoSourceRaw,
  ImageSourceRaw,
  CanvasSourceRaw,
  VectorSourceRaw,
  RasterSource,
  RasterDemSource
};

export type AnySource =
  | GeoJSONSourceRaw
  | VideoSourceRaw
  | ImageSourceRaw
  | CanvasSourceRaw
  | VectorSourceRaw
  | RasterSource
  | RasterDemSource;

// Other style types

export type {
  StyleSpecification as MapStyle,
  LightSpecification as Light,
  TerrainSpecification as Terrain,
  SkySpecification as Sky
} from 'maplibre-gl';

export type Projection = ProjectionSpecification | ProjectionSpecification['type'];
