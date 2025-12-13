/*
 * Maplibre Style Specification types
 * Type names are aligned with mapbox
 */
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
  HillshadeLayerSpecification,
  BackgroundLayerSpecification,

  // Sources
  SourceSpecification,
  VectorSourceSpecification,
  RasterSourceSpecification,
  RasterDEMSourceSpecification,
  GeoJSONSourceSpecification,
  VideoSourceSpecification,
  ImageSourceSpecification,
  CanvasSourceSpecification,

  // Style
  StyleSpecification,
  SkySpecification,
  LightSpecification,
  TerrainSpecification,
  ProjectionSpecification
} from 'maplibre-gl';
