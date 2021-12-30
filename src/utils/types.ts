import type {PaddingOptions, MapboxEvent} from 'mapbox-gl';

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
  longitude?: number;
  /** Latitude at map center */
  latitude?: number;
  /** Map zoom level */
  zoom?: number;
  /** Map rotation bearing in degrees counter-clockwise from north */
  bearing?: number;
  /** Map angle in degrees at which the camera is looking at the ground */
  pitch?: number;
  /** Dimensions in pixels applied on each side of the viewport for shifting the vanishing point. */
  padding?: PaddingOptions;
};

export type ViewStateChangeEvent = MapboxEvent & {
  viewState: ViewState;
};

// re-export mapbox types
export type {
  MapboxOptions,
  Style,
  PaddingOptions,
  MapMouseEvent,
  MapLayerMouseEvent,
  MapLayerTouchEvent,
  MapWheelEvent,
  MapDataEvent,
  MapboxEvent,
  ErrorEvent,
  MapboxGeoJSONFeature,
  Map as MapboxMap
} from 'mapbox-gl';
