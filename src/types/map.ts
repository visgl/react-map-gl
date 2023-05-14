/*
 * This file intentionally does not import any type from vender modules
 */

export interface IControl<MapT extends MapInstance = MapInstance> {
  onAdd(map: MapT): HTMLElement;

  onRemove(map: MapT): void;

  getDefaultPosition?: (() => string) | undefined;
}

type Listener = (event?: any) => any;

declare class Evented {
  on(type: string, listener: Listener);

  off(type?: string | any, listener?: Listener);

  once(type: string, listener: Listener);
}

/**
 * A user-facing type that represents the minimal intersection between Mapbox.Map and Maplibre.Map
 * User provided `mapLib.Map` is supposed to implement this interface
 * Only losely typed for compatibility
 */
export declare abstract class MapInstance extends Evented {
  // https://github.com/mapbox/mapbox-gl-js/issues/6522
  fire(type: string, properties?: {[key: string]: any});

  addControl(
    control: IControl<this>,
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  );

  removeControl(control: IControl<this>);

  hasControl(control: IControl<this>): boolean;

  resize(): this;

  queryRenderedFeatures(geometry?: any, options?: any): any[];

  setStyle(style: any, options?: any);

  isMoving(): boolean;

  getStyle(): any;

  isStyleLoaded(): boolean | void;

  addSource(id: string, source: any);

  removeSource(id: string): this;

  getSource(id: string): any;

  addLayer(layer: any, before?: string);

  moveLayer(id: string, beforeId?: string);

  removeLayer(id: string);

  getLayer(id: string): any;

  setFilter(layer: string, filter?: any[] | boolean | null);

  setLayerZoomRange(layerId: string, minzoom: number, maxzoom: number);

  setPaintProperty(layer: string, name: string, value: any);

  setLayoutProperty(layer: string, name: string, value: any);

  project(lnglat: any): Point;

  unproject(point: any): LngLat;

  queryTerrainElevation?(lngLat: any, options?: any): number | null;

  getContainer(): HTMLElement;

  getCanvas(): HTMLCanvasElement;

  remove(): void;

  triggerRepaint(): void;

  setPadding(padding: PaddingOptions);

  fitBounds(bounds: any, options?: any);

  setFog?(fog: any);

  setLight?(options: any, lightOptions?: any);

  setTerrain?(terrain?: any);
}

type PaddingOptions = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};

type LngLat = {lng: number; lat: number};

type Point = {x: number; y: number};

/**
 * A user-facing type that represents the minimal intersection between Mapbox and Maplibre
 * User provided `mapLib` is supposed to implement this interface
 * Only losely typed for compatibility
 */
export interface MapLib {
  supported?: (options: any) => boolean;

  Map: {new (options: any): MapInstance};

  Marker: {new (options: any): Evented};

  Popup: {new (options: any): Evented};

  AttributionControl: {new (options: any): IControl};

  FullscreenControl: {new (options: any): IControl};

  GeolocateControl: {new (options: any): IControl};

  NavigationControl: {new (options: any): IControl};

  ScaleControl: {new (options: any): IControl};
}

/**
 * Stub for mapbox's Transform class
 * https://github.com/mapbox/mapbox-gl-js/blob/main/src/geo/transform.js
 */
export type Transform = {
  width: number;
  height: number;
  center: LngLat;
  zoom: number;
  bearing: number;
  pitch: number;
  padding: PaddingOptions;
  elevation: any;
  pixelsToGLUnits: [number, number];
  cameraElevationReference: 'ground' | 'sea';

  clone: () => Transform;
  resize: (width: number, height: number) => void;
  isPaddingEqual: (value: PaddingOptions) => boolean;
  getBounds: () => any;
  locationPoint: (lngLat: LngLat) => Point;
  pointLocation: (p: Point) => LngLat;
};

export type MapInstanceInternal<MapT extends MapInstance> = MapT & {
  transform: Transform;

  _render: Function;

  _renderTaskQueue: {
    run: Function;
  };
};
