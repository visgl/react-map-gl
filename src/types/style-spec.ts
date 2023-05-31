/*
 * Mapbox Style Specification types
 * Note that these are NOT base map specific - all compatible map libraries implement the same spec
 */
import type {
  FilterSpecification,
  PropertyValueSpecification,
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

/**
 * @deprecated use `fog` instead
 */
export type SkyLayer = {
  id: string;
  type: 'sky';
  metadata?: unknown;
  minzoom?: number;
  maxzoom?: number;
  filter?: FilterSpecification;
  layout?: {
    visibility?: 'visible' | 'none';
  };
  paint?: {
    'sky-atmosphere-color'?: PropertyValueSpecification<string>;
    'sky-atmosphere-halo-color'?: PropertyValueSpecification<string>;
    'sky-atmosphere-sun'?: PropertyValueSpecification<number[]>;
    'sky-atmosphere-sun-intensity'?: PropertyValueSpecification<number>;
    'sky-gradient'?: PropertyValueSpecification<string>;
    'sky-gradient-center'?: PropertyValueSpecification<number[]>;
    'sky-gradient-radius'?: PropertyValueSpecification<number>;
    'sky-opacity'?: PropertyValueSpecification<number>;
    'sky-type'?: 'gradient' | 'atmosphere';
  };
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
  | SymbolLayer
  | SkyLayer;

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
export interface Fog {
  color?: PropertyValueSpecification<string>;
  'horizon-blend'?: PropertyValueSpecification<number>;
  range?: PropertyValueSpecification<number[]>;
}

type ProjectionNames =
  | 'albers'
  | 'equalEarth'
  | 'equirectangular'
  | 'lambertConformalConic'
  | 'mercator'
  | 'naturalEarth'
  | 'winkelTripel'
  | 'globe';

export type Projection =
  | ProjectionNames
  | {
      name: ProjectionNames;
      center?: [number, number];
      parallels?: [number, number];
    };
