/*
 * Mapbox Style Specification types
 */
export type CanvasSourceSpecification = {
  type: 'canvas';
  coordinates: [[number, number], [number, number], [number, number], [number, number]];
  animate?: boolean;
  canvas: string | HTMLCanvasElement;
};

export type {
  // Layers
  LayerSpecification,
  FillLayerSpecification,
  LineLayerSpecification,
  SymbolLayerSpecification,
  CircleLayerSpecification,
  HeatmapLayerSpecification,
  FillExtrusionLayerSpecification,
  RasterLayerSpecification,
  RasterParticleLayerSpecification,
  HillshadeLayerSpecification,
  ModelLayerSpecification,
  BackgroundLayerSpecification,
  SkyLayerSpecification,
  SlotLayerSpecification,
  ClipLayerSpecification,

  // Sources
  SourceSpecification,
  VectorSourceSpecification,
  RasterSourceSpecification,
  RasterDEMSourceSpecification,
  RasterArraySourceSpecification,
  GeoJSONSourceSpecification,
  VideoSourceSpecification,
  ImageSourceSpecification,
  ModelSourceSpecification,

  // Style
  StyleSpecification,
  LightSpecification,
  FogSpecification,
  TerrainSpecification,
  ProjectionSpecification
} from 'mapbox-gl';
