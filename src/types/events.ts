import type {ViewState, Point, LngLat, LngLatBounds, MapGeoJSONFeature} from './common';
import type {
  MapInstance,
  Evented,
  MarkerInstance,
  PopupInstance,
  GeolocateControlInstance
} from './lib';
import type {AnySource} from './style-spec';

export interface MapEvent<SourceT extends Evented, OriginalEventT = undefined> {
  type: string;
  target: SourceT;
  originalEvent: OriginalEventT;
}

export type ErrorEvent<MapT extends MapInstance> = MapEvent<MapT> & {
  type: 'error';
  error: Error;
};

export type MapStyleDataEvent<MapT extends MapInstance> = MapEvent<MapT> & {
  dataType: 'style';
};

export type MapSourceDataEvent<MapT extends MapInstance> = MapEvent<MapT> & {
  dataType: 'source';
  isSourceLoaded: boolean;
  source: AnySource;
  sourceId: string;
  sourceDataType: 'metadata' | 'content';
  tile: any;
  coord: {
    canonical: {
      x: number;
      y: number;
      z: number;
      key: number;
    };
    wrap: number;
    key: number;
  };
};

export type MapMouseEvent<MapT extends MapInstance> = MapEvent<MapT, MouseEvent> & {
  type:
    | 'mousedown'
    | 'mouseup'
    | 'click'
    | 'dblclick'
    | 'mousemove'
    | 'mouseover'
    | 'mouseenter'
    | 'mouseleave'
    | 'mouseout'
    | 'contextmenu';

  point: Point;
  lngLat: LngLat;

  preventDefault(): void;
  defaultPrevented: boolean;
};

export type MapLayerMouseEvent<MapT extends MapInstance> = MapMouseEvent<MapT> & {
  features?: MapGeoJSONFeature[] | undefined;
};

export type MapTouchEvent<MapT extends MapInstance> = MapEvent<MapT, TouchEvent> & {
  type: 'touchstart' | 'touchend' | 'touchcancel';

  point: Point;
  lngLat: LngLat;
  points: Point[];
  lngLats: LngLat[];

  preventDefault(): void;
  defaultPrevented: boolean;
};

export type MapLayerTouchEvent<MapT extends MapInstance> = MapTouchEvent<MapT> & {
  features?: MapGeoJSONFeature[] | undefined;
};

export type MapWheelEvent<MapT extends MapInstance> = MapEvent<MapT, WheelEvent> & {
  type: 'wheel';

  preventDefault(): void;
  defaultPrevented: boolean;
};

export type MapBoxZoomEvent<MapT extends MapInstance> = MapEvent<MapT, MouseEvent> & {
  type: 'boxzoomstart' | 'boxzoomend' | 'boxzoomcancel';

  boxZoomBounds: LngLatBounds;
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
