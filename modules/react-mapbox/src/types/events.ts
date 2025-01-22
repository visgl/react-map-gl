import type {ViewState, LngLat} from './common';
import {
  Marker,
  Popup,
  GeolocateControl,
  MapEvent,
  MapEventOf,
  ErrorEvent,
  MapMouseEvent,
  MapTouchEvent,
  MapStyleDataEvent,
  MapSourceDataEvent,
  MapWheelEvent
} from 'mapbox-gl';

export type {
  MapEvent,
  ErrorEvent,
  MapMouseEvent,
  MapTouchEvent,
  MapStyleDataEvent,
  MapSourceDataEvent,
  MapWheelEvent
};

export type MapBoxZoomEvent =
  | MapEventOf<'boxzoomstart'>
  | MapEventOf<'boxzoomend'>
  | MapEventOf<'boxzoomcancel'>;

export type MapCallbacks = {
  onMouseDown?: (e: MapMouseEvent) => void;
  onMouseUp?: (e: MapMouseEvent) => void;
  onMouseOver?: (e: MapMouseEvent) => void;
  onMouseMove?: (e: MapMouseEvent) => void;
  onClick?: (e: MapMouseEvent) => void;
  onDblClick?: (e: MapMouseEvent) => void;
  onMouseEnter?: (e: MapMouseEvent) => void;
  onMouseLeave?: (e: MapMouseEvent) => void;
  onMouseOut?: (e: MapMouseEvent) => void;
  onContextMenu?: (e: MapMouseEvent) => void;
  onTouchStart?: (e: MapTouchEvent) => void;
  onTouchEnd?: (e: MapTouchEvent) => void;
  onTouchMove?: (e: MapTouchEvent) => void;
  onTouchCancel?: (e: MapTouchEvent) => void;

  onMoveStart?: (e: ViewStateChangeEvent) => void;
  onMove?: (e: ViewStateChangeEvent) => void;
  onMoveEnd?: (e: ViewStateChangeEvent) => void;
  onDragStart?: (e: ViewStateChangeEvent) => void;
  onDrag?: (e: ViewStateChangeEvent) => void;
  onDragEnd?: (e: ViewStateChangeEvent) => void;
  onZoomStart?: (e: ViewStateChangeEvent) => void;
  onZoom?: (e: ViewStateChangeEvent) => void;
  onZoomEnd?: (e: ViewStateChangeEvent) => void;
  onRotateStart?: (e: ViewStateChangeEvent) => void;
  onRotate?: (e: ViewStateChangeEvent) => void;
  onRotateEnd?: (e: ViewStateChangeEvent) => void;
  onPitchStart?: (e: ViewStateChangeEvent) => void;
  onPitch?: (e: ViewStateChangeEvent) => void;
  onPitchEnd?: (e: ViewStateChangeEvent) => void;

  onWheel?: (e: MapWheelEvent) => void;
  onBoxZoomStart?: (e: MapBoxZoomEvent) => void;
  onBoxZoomEnd?: (e: MapBoxZoomEvent) => void;
  onBoxZoomCancel?: (e: MapBoxZoomEvent) => void;

  onResize?: (e: MapEvent) => void;
  onLoad?: (e: MapEvent) => void;
  onRender?: (e: MapEvent) => void;
  onIdle?: (e: MapEvent) => void;
  onError?: (e: ErrorEvent) => void;
  onRemove?: (e: MapEvent) => void;
  onData?: (e: MapStyleDataEvent | MapSourceDataEvent) => void;
  onStyleData?: (e: MapStyleDataEvent) => void;
  onSourceData?: (e: MapSourceDataEvent) => void;
};

interface IMapEvent<SourceT, OriginalEventT = undefined> {
  type: string;
  target: SourceT;
  originalEvent: OriginalEventT;
}

export interface Callbacks {
  [key: `on${string}`]: Function;
}

export type ViewStateChangeEvent = MapEventOf<
  | 'movestart'
  | 'move'
  | 'moveend'
  | 'zoomstart'
  | 'zoom'
  | 'zoomend'
  | 'rotatestart'
  | 'rotate'
  | 'rotateend'
  | 'dragstart'
  | 'drag'
  | 'dragend'
  | 'pitchstart'
  | 'pitch'
  | 'pitchend'
> & {
  viewState: ViewState;
};

export type PopupEvent = {
  type: 'open' | 'close';
  target: Popup;
};

export type MarkerEvent<OriginalEventT = undefined> = IMapEvent<Marker, OriginalEventT>;

export type MarkerDragEvent = MarkerEvent & {
  type: 'dragstart' | 'drag' | 'dragend';
  lngLat: LngLat;
};

export type GeolocateEvent = IMapEvent<GeolocateControl>;

export type GeolocateResultEvent = GeolocateEvent & GeolocationPosition;

export type GeolocateErrorEvent = GeolocateEvent & GeolocationPositionError;
