/*
 * Mapbox Style Specification types
 */
export type {
  // Layers
  AnyLayer as LayerSpecification,
  BackgroundLayer as BackgroundLayerSpecification,
  SkyLayer as SkyLayerSpecification,
  CircleLayer as CircleLayerSpecification,
  FillLayer as FillLayerSpecification,
  FillExtrusionLayer as FillExtrusionLayerSpecification,
  HeatmapLayer as HeatmapLayerSpecification,
  HillshadeLayer as HillshadeLayerSpecification,
  LineLayer as LineLayerSpecification,
  RasterLayer as RasterLayerSpecification,
  SymbolLayer as SymbolLayerSpecification,

  // Sources
  AnySourceData as SourceSpecification,
  CanvasSourceRaw as CanvasSourceSpecification,
  GeoJSONSourceRaw as GeoJSONSourceSpecification,
  VideoSourceRaw as VideoSourceSpecification,
  ImageSourceRaw as ImageSourceSpecification,
  VectorSource as VectorSourceSpecification,
  RasterSource as RasterSourceSpecification,
  RasterDemSource as RasterDemSourceSpecification,

  // Style
  Style as StyleSpecification,
  Light as LightSpecification,
  Fog as FogSpecification,
  TerrainSpecification,
  Projection as ProjectionSpecification
} from 'mapbox-gl';
