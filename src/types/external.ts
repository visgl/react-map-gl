import type {PaddingOptions, MapboxEvent, LngLat} from 'mapbox-gl';

/** Defines the projection that the map should be rendered in */
export type ProjectionSpecification = {
  name:
    | 'albers'
    | 'equalEarth'
    | 'equirectangular'
    | 'lambertConformalConic'
    | 'mercator'
    | 'naturalEarth'
    | 'winkelTripel';
  center?: [number, number];
  parallels?: [number, number];
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

export interface ImmutableLike {
  toJS: () => any;
}

/* Events */

export type ViewStateChangeEvent = MapboxEvent & {
  viewState: ViewState;
};

export type MarkerDragEvent = MapboxEvent & {
  lngLat: LngLat;
};

export type GeolocateEvent = MapboxEvent & GeolocationPosition;

export type GeolocateErrorEvent = MapboxEvent & GeolocationPositionError;

/* re-export mapbox types */

export type {
  Point,
  PointLike,
  LngLat,
  LngLatLike,
  LngLatBounds,
  LngLatBoundsLike,
  Anchor,
  Alignment,
  PaddingOptions,
  PositionOptions,
  FitBoundsOptions,
  DragPanOptions,
  InteractiveOptions,
  TransformRequestFunction,
  Light,
  Fog,
  TerrainSpecification,
  Style as MapboxStyle,
  BackgroundLayer,
  CircleLayer,
  FillExtrusionLayer,
  FillLayer,
  HeatmapLayer,
  HillshadeLayer,
  LineLayer,
  RasterLayer,
  SymbolLayer,
  CustomLayerInterface,
  SkyLayer,
  GeoJSONSourceRaw,
  VideoSourceRaw,
  ImageSourceRaw,
  CanvasSourceRaw,
  GeoJSONSource,
  VideoSource,
  ImageSource,
  CanvasSource,
  VectorSourceImpl,
  VectorSource,
  RasterSource,
  RasterDemSource,
  MapMouseEvent,
  MapLayerMouseEvent,
  MapLayerTouchEvent,
  MapWheelEvent,
  MapDataEvent,
  MapboxEvent,
  ErrorEvent,
  MapboxGeoJSONFeature,
  IControl,
  Map as MapboxMap
} from 'mapbox-gl';
