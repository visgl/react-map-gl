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
  GeoJSONSourceSpecification as GeoJSONSource,
  VideoSourceSpecification as VideoSource,
  ImageSourceSpecification as ImageSource,
  VectorSourceSpecification as VectorSource,
  RasterSourceSpecification as RasterSource,
  RasterDEMSourceSpecification as RasterDemSource
} from '@maplibre/maplibre-gl-style-spec';

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
export {GeoJSONSource, VideoSource, ImageSource, VectorSource, RasterSource, RasterDemSource};

// Not part of the style spec but a valid source
export interface CanvasSource {
  type: 'canvas';
  coordinates: number[][];
  animate?: boolean;
  canvas: string | HTMLCanvasElement;
}

export type AnySource =
  | GeoJSONSource
  | VideoSource
  | ImageSource
  | VectorSource
  | RasterSource
  | RasterDemSource
  | CanvasSource;

// Other style types

export type {
  StyleSpecification as MapboxStyle,
  LightSpecification as Light,
  TerrainSpecification as Terrain
} from '@maplibre/maplibre-gl-style-spec';

// The following types are not yet supported by maplibre
export type Fog = never;
export type Projection = never;
