export * from './public';
export * from './events';

import type GeoJSON from 'geojson';
import type {CustomSourceImplementation} from './lib';

// Internal: source implementations

export interface ISource {
  type: string;
}

export interface ILayer {
  id: string;
  type: string;

  metadata?: any;
  source?: unknown;

  minzoom?: number;
  maxzoom?: number;

  filter?: any;
  layout?: {
    [property: string]: any;
  };
  paint?: {
    [property: string]: any;
  };
}

export interface MapStyle {
  name?: string;
  metadata?: unknown;
  version: number;
  layers: ILayer[];
  sources: {
    [sourceName: string]: object;
  };

  fog?: any;
  terrain?: any;
  light?: any;
}

export interface GeoJSONSourceImplementation {
  type: 'geojson';
  setData(
    data: GeoJSON.Feature<GeoJSON.Geometry> | GeoJSON.FeatureCollection<GeoJSON.Geometry> | String
  ): this;
}

export interface ImageSourceImplemtation {
  type: 'image';
  updateImage(options: {url?: string; coordinates?: number[][]}): this;
  setCoordinates(coordinates: number[][]): this;
}

export interface CanvasSourceImplemtation {
  type: 'canvas';
  play(): void;
  pause(): void;
  getCanvas(): HTMLCanvasElement;
  setCoordinates(coordinates: number[][]): this;
}

export interface VectorSourceImplementation {
  type: 'vector';
  setTiles(tiles: ReadonlyArray<string>): this;
  setUrl(url: string): this;
}

export interface RasterSourceImplementation {
  type: 'raster' | 'raster-dem';
  setTiles(tiles: ReadonlyArray<string>): this;
  setUrl(url: string): this;
}

export interface VideoSourceImplementation {
  type: 'video';
  getVideo(): HTMLVideoElement;
  setCoordinates(coordinates: number[][]): this;
}

export type AnySourceImplementation =
  | GeoJSONSourceImplementation
  | VideoSourceImplementation
  | ImageSourceImplemtation
  | CanvasSourceImplemtation
  | VectorSourceImplementation
  | RasterSourceImplementation
  | CustomSourceImplementation<HTMLImageElement | ImageData | ImageBitmap>;
