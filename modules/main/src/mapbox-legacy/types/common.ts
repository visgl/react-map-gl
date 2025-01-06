import type GeoJSON from 'geojson';

/* Data types that are compatible with both mapbox and maplibre. Not exposed to the end user. */

/** @mapbox/point-geometry */
export interface Point {
  x: number;
  y: number;
}
export type PointLike = Point | [number, number];

export interface LngLat {
  lng: number;
  lat: number;

  wrap(): LngLat;
  /** Return a LngLat as an array */
  toArray(): number[];
  /** Return a LngLat as a string */
  toString(): string;
  /** Returns the approximate distance between a pair of coordinates in meters
   * Uses the Haversine Formula (from R.W. Sinnott, "Virtues of the Haversine", Sky and Telescope, vol. 68, no. 2, 1984, p. 159) */
  distanceTo(lngLat: LngLat): number;
}
export type LngLatLike =
  | [number, number]
  | LngLat
  | {lng: number; lat: number}
  | {lon: number; lat: number};

export interface LngLatBounds {
  contains(lnglat: LngLatLike): boolean;
  setNorthEast(ne: LngLatLike): this;
  setSouthWest(sw: LngLatLike): this;
  extend(obj: LngLatLike | LngLatBoundsLike): this;

  getCenter(): LngLat;
  getSouthWest(): LngLat;
  getNorthEast(): LngLat;
  getNorthWest(): LngLat;
  getSouthEast(): LngLat;

  getWest(): number;
  getSouth(): number;
  getEast(): number;
  getNorth(): number;

  toArray(): number[][];
  toString(): string;
  isEmpty(): boolean;
}
export type LngLatBoundsLike =
  | LngLatBounds
  | [LngLatLike, LngLatLike]
  | [number, number, number, number]
  | LngLatLike;

export type MapGeoJSONFeature = GeoJSON.Feature<GeoJSON.Geometry> & {
  layer: any;
  source: string;
  sourceLayer: string;
  state: {[key: string]: any};
};

export type PaddingOptions = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};

/* Public */

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
