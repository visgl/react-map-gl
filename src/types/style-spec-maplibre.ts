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
  RasterDEMSourceSpecification as RasterDemSource
} from '@maplibre/maplibre-gl-style-spec';

import {CanvasSourceSpecification as CanvasSourceRaw} from 'maplibre-gl';

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
export {
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
  TerrainSpecification as Terrain
} from '@maplibre/maplibre-gl-style-spec';

// The following types are not yet supported by maplibre
export type Fog = never;
export type Projection = never;
