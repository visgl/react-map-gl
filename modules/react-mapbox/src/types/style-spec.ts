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
  SymbolLayerSpecification as SymbolLayer,
  GeoJSONSourceSpecification as GeoJSONSource,
  VideoSourceSpecification as VideoSource,
  ImageSourceSpecification as ImageSource,
  VectorSourceSpecification as VectorSource,
  RasterSourceSpecification as RasterSource,
  RasterDEMSourceSpecification as RasterDemSource,
  ProjectionSpecification
} from 'mapbox-gl';

type CanvasSource = {
  type: 'canvas';
  coordinates: [[number, number], [number, number], [number, number], [number, number]];
  animate?: boolean;
  canvas: string | HTMLCanvasElement;
};

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
  StyleSpecification as MapStyle,
  LightSpecification as Light,
  FogSpecification as Fog,
  TerrainSpecification as Terrain
} from 'mapbox-gl';

export type Projection = ProjectionSpecification | ProjectionSpecification['name'];
