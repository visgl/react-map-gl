import type GeoJSON from 'geojson';
import type {AnyLayer} from './style-spec';

/* Data types */
export interface Point {
  x: number;
  y: number;
}
export type PointLike = Point | [number, number];

export interface LngLat {
  lng: number;
  lat: number;
}
export type LngLatLike =
  | [number, number]
  | LngLat
  | {lng: number; lat: number}
  | {lon: number; lat: number};

export interface LngLatBounds {
  sw: LngLatLike;
  ne: LngLatLike;

  contains(lnglat: LngLatLike): boolean;

  getCenter(): LngLat;
  getSouthWest(): LngLat;
  getNorthEast(): LngLat;
  getNorthWest(): LngLat;
  getSouthEast(): LngLat;

  getWest(): number;
  getSouth(): number;
  getEast(): number;
  getNorth(): number;
}
export type LngLatBoundsLike =
  | LngLatBounds
  | [LngLatLike, LngLatLike]
  | [number, number, number, number]
  | LngLatLike;

export type Anchor =
  | 'center'
  | 'left'
  | 'right'
  | 'top'
  | 'bottom'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

export type Alignment = 'map' | 'viewport' | 'auto';

export type PaddingOptions = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};

/** Describes the camera's state */
export type ViewState = {
  /** Longitude at map center */
  longitude: number;
  /** Latitude at map center */
  latitude: number;
  /** Map zoom level */
  zoom: number;
  /** Map rotation bearing in degrees counter-clockwise from north */
  bearing: number;
  /** Map angle in degrees at which the camera is looking at the ground */
  pitch: number;
  /** Dimensions in pixels applied on each side of the viewport for shifting the vanishing point. */
  padding: PaddingOptions;
};

export type ControlPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

export interface ImmutableLike<T> {
  toJS: () => T;
}

export type MapGeoJSONFeature = GeoJSON.Feature<GeoJSON.Geometry> & {
  layer: AnyLayer;
  source: string;
  sourceLayer: string;
  state: {[key: string]: any};
};
