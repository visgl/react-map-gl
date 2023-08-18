import type {ViewState, Point, LngLat, MapGeoJSONFeature} from './common';
import type {
  MapInstance,
  Evented,
  MarkerInstance,
  PopupInstance,
  GeolocateControlInstance
} from './lib';

export interface Callbacks {
  [key: `on${string}`]: Function;
}

export interface MapEvent<SourceT extends Evented, OriginalEventT = undefined> {
  type: string;
  target: SourceT;
  originalEvent: OriginalEventT;
}

export type ErrorEvent<MapT extends MapInstance> = MapEvent<MapT> & {
  type: 'error';
  error: Error;
};

export type MapMouseEvent<MapT extends MapInstance> = MapEvent<MapT, MouseEvent> & {
  point: Point;
  lngLat: LngLat;
  features?: MapGeoJSONFeature[];
};

export type ViewStateChangeEvent<MapT extends MapInstance> =
  | (MapEvent<MapT, MouseEvent | TouchEvent | WheelEvent | undefined> & {
      type: 'movestart' | 'move' | 'moveend' | 'zoomstart' | 'zoom' | 'zoomend';
      viewState: ViewState;
    })
  | (MapEvent<MapT, MouseEvent | TouchEvent | undefined> & {
      type:
        | 'rotatestart'
        | 'rotate'
        | 'rotateend'
        | 'dragstart'
        | 'drag'
        | 'dragend'
        | 'pitchstart'
        | 'pitch'
        | 'pitchend';
      viewState: ViewState;
    });

export type PopupEvent<PopupT extends PopupInstance> = {
  type: 'open' | 'close';
  target: PopupT;
};

export type MarkerEvent<MarkerT extends MarkerInstance, OriginalEventT = undefined> = MapEvent<
  MarkerT,
  OriginalEventT
>;

export type MarkerDragEvent<MarkerT extends MarkerInstance> = MarkerEvent<MarkerT> & {
  type: 'dragstart' | 'drag' | 'dragend';
  target: MarkerT;
  lngLat: LngLat;
};

export type GeolocateEvent<GeolocateControlT extends GeolocateControlInstance> =
  MapEvent<GeolocateControlT>;

export type GeolocateResultEvent<GeolocateControlT extends GeolocateControlInstance> =
  GeolocateEvent<GeolocateControlT> & GeolocationPosition;

export type GeolocateErrorEvent<GeolocateControlT extends GeolocateControlInstance> =
  GeolocateEvent<GeolocateControlT> & GeolocationPositionError;
