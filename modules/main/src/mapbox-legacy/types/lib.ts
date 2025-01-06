import type {PaddingOptions, LngLat, Point, LngLatLike, PointLike, ControlPosition} from './common';

export interface IControl<MapT extends MapInstance = MapInstance> {
  onAdd(map: MapT): HTMLElement;

  onRemove(map: MapT): void;

  getDefaultPosition?: (() => string) | undefined;
}

type Listener = (event?: any) => any;

export interface Evented {
  on(type: string, listener: Listener);

  off(type?: string | any, listener?: Listener);

  once(type: string, listener: Listener);
}

/**
 * A user-facing type that represents the minimal intersection between Mapbox.Map and Maplibre.Map
 * User provided `mapLib.Map` is supposed to implement this interface
 * Only losely typed for compatibility
 */
export interface MapInstance extends Evented {
  // https://github.com/mapbox/mapbox-gl-js/issues/6522
  fire(type: string, properties?: {[key: string]: any});

  addControl(control: IControl<this>, position?: ControlPosition);

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

  getCanvasContainer(): HTMLElement;

  remove(): void;

  triggerRepaint(): void;

  getCenter(): LngLat;

  getZoom(): number;

  getBearing(): number;

  getPitch(): number;

  getPadding(): PaddingOptions;

  getRenderWorldCopies(): boolean;

  setPadding(padding: PaddingOptions);

  fitBounds(bounds: any, options?: any);

  setFog?(fog: any);

  setLight?(options: any, lightOptions?: any);

  setTerrain?(terrain?: any);
}

export interface MarkerInstance extends Evented {
  addTo(map: MapInstance): this;
  remove(): this;

  getLngLat(): LngLat;
  setLngLat(lngLat: LngLatLike): this;

  getElement(): HTMLElement;

  setPopup(popup?: any): this;
  getPopup(): any;

  getOffset(): PointLike;
  setOffset(offset: PointLike): this;

  setDraggable(value: boolean): this;
  isDraggable(): boolean;

  getRotation(): number;
  setRotation(rotation: number): this;

  getRotationAlignment(): any;
  setRotationAlignment(alignment: any): this;

  getPitchAlignment(): any;
  setPitchAlignment(alignment: any): this;
}

export interface PopupInstance extends Evented {
  options?: any;

  addTo(map: MapInstance): this;
  remove(): this;

  isOpen(): boolean;

  getLngLat(): LngLat;
  setLngLat(lnglat: LngLatLike): this;

  getElement(): HTMLElement;

  setDOMContent(htmlNode: any): this;

  getMaxWidth(): any;
  setMaxWidth(maxWidth: any): this;

  addClassName(className: string): void;
  removeClassName(className: string): void;

  setOffset(offset?: any): this;
}

export interface AttributionControlInstance extends IControl {
  _container?: HTMLElement;
}

export interface FullscreenControlInstance extends IControl {
  _controlContainer?: HTMLElement;
}

export interface GeolocateControlInstance extends IControl, Evented {
  _container?: HTMLElement;
  trigger();
}

export interface NavigationControlInstance extends IControl {
  _container?: HTMLElement;
}

export interface ScaleControlInstance extends IControl {
  _container?: HTMLElement;
  options?: any;
  setUnit(unit: any): void;
}

/**
 * A user-facing type that represents the minimal intersection between Mapbox and Maplibre
 * User provided `mapLib` is supposed to implement this interface
 * Only loosely typed for compatibility
 */
export interface MapLib<MapT extends MapInstance> {
  supported?: (options: any) => boolean;

  Map: {new (options: any): MapT};

  Marker: {new (...options: any[]): MarkerInstance};

  Popup: {new (options: any): PopupInstance};

  AttributionControl: {new (options: any): AttributionControlInstance};

  FullscreenControl: {new (options: any): FullscreenControlInstance};

  GeolocateControl: {new (options: any): GeolocateControlInstance};

  NavigationControl: {new (options: any): NavigationControlInstance};

  ScaleControl: {new (options: any): ScaleControlInstance};
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

  // Mapbox only
  getProjection?: () => any;
  setProjection?: (projection: any) => void;
};

export type MapInstanceInternal<MapT extends MapInstance> = MapT & {
  transform: Transform;

  _render: Function;

  _renderTaskQueue: {
    run: Function;
  };
};

// Custom layer
export interface CustomLayerInterface {
  id: string;
  type: 'custom';
  renderingMode?: '2d' | '3d';

  onRemove?(map: MapInstance, gl: WebGLRenderingContext): void;
  onAdd?(map: MapInstance, gl: WebGLRenderingContext): void;

  prerender?(gl: WebGLRenderingContext, matrix: number[]): void;
  render(gl: WebGLRenderingContext, matrix: number[]): void;
}

// Custom source

export interface CustomSourceImplementation<TileDataT> {
  id: string;
  type: 'custom';
  dataType: 'raster';
  minzoom?: number;
  maxzoom?: number;
  scheme?: string;
  tileSize?: number;
  attribution?: string;
  bounds?: [number, number, number, number];
  hasTile?: (tileID: {z: number; x: number; y: number}) => boolean;
  loadTile: (
    tileID: {z: number; x: number; y: number},
    options: {signal: AbortSignal}
  ) => Promise<TileDataT>;
  prepareTile?: (tileID: {z: number; x: number; y: number}) => TileDataT | undefined;
  unloadTile?: (tileID: {z: number; x: number; y: number}) => void;
  onAdd?: (map: MapInstance) => void;
  onRemove?: (map: MapInstance) => void;
}

export interface CustomSource<TileDataT = unknown> {
  id: string;
  type: 'custom';
  scheme: string;
  minzoom: number;
  maxzoom: number;
  tileSize: number;
  attribution: string;

  _implementation: CustomSourceImplementation<TileDataT>;
}
