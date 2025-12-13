import type {ViewState, LngLat} from './common';
import {
  MapboxEvent as MapEvent,
  MapLayerMouseEvent,
  MapLayerTouchEvent,
  MapStyleDataEvent,
  MapSourceDataEvent,
  MapWheelEvent,
  MapBoxZoomEvent,
  ErrorEvent,
  Marker,
  Popup,
  GeolocateControl
} from 'mapbox-gl';

export type MapCallbacks = {
  onMouseDown?: (e: MapLayerMouseEvent) => void;
  onMouseUp?: (e: MapLayerMouseEvent) => void;
  onMouseOver?: (e: MapLayerMouseEvent) => void;
  onMouseMove?: (e: MapLayerMouseEvent) => void;
  onClick?: (e: MapLayerMouseEvent) => void;
  onDblClick?: (e: MapLayerMouseEvent) => void;
  onMouseEnter?: (e: MapLayerMouseEvent) => void;
  onMouseLeave?: (e: MapLayerMouseEvent) => void;
  onMouseOut?: (e: MapLayerMouseEvent) => void;
  onContextMenu?: (e: MapLayerMouseEvent) => void;
  onTouchStart?: (e: MapLayerTouchEvent) => void;
  onTouchEnd?: (e: MapLayerTouchEvent) => void;
  onTouchMove?: (e: MapLayerTouchEvent) => void;
  onTouchCancel?: (e: MapLayerTouchEvent) => void;

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

export type {
  MapEvent,
  ErrorEvent,
  MapLayerMouseEvent as MapMouseEvent,
  MapLayerTouchEvent as MapTouchEvent,
  MapStyleDataEvent,
  MapSourceDataEvent,
  MapWheelEvent,
  MapBoxZoomEvent
};

interface IMapEvent<SourceT, OriginalEventT = undefined> {
  type: string;
  target: SourceT;
  originalEvent: OriginalEventT;
}

export type ViewStateChangeEvent = MapEvent<MouseEvent | TouchEvent | WheelEvent | undefined> & {
  type:
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
    | 'pitchend';
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
