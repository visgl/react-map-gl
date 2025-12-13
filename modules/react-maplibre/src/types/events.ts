import type {Point, LngLat, MapGeoJSONFeature, ViewState} from './common';

import type {
  Map,
  Marker,
  Popup,
  GeolocateControl,
  MapLibreEvent,
  MapMouseEvent as _MapMouseEvent,
  MapLayerMouseEvent,
  MapTouchEvent,
  MapLayerTouchEvent,
  MapStyleDataEvent,
  MapSourceDataEvent,
  MapWheelEvent,
  MapLibreZoomEvent as MapBoxZoomEvent
} from 'maplibre-gl';

export type {
  MapLibreEvent as MapEvent,
  MapLayerMouseEvent,
  MapTouchEvent,
  MapLayerTouchEvent,
  MapStyleDataEvent,
  MapSourceDataEvent,
  MapWheelEvent,
  MapBoxZoomEvent
};

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

  onResize?: (e: MapLibreEvent) => void;
  onLoad?: (e: MapLibreEvent) => void;
  onRender?: (e: MapLibreEvent) => void;
  onIdle?: (e: MapLibreEvent) => void;
  onError?: (e: ErrorEvent) => void;
  onRemove?: (e: MapLibreEvent) => void;
  onData?: (e: MapStyleDataEvent | MapSourceDataEvent) => void;
  onStyleData?: (e: MapStyleDataEvent) => void;
  onSourceData?: (e: MapSourceDataEvent) => void;
};

interface MapEvent<SourceT, OriginalEventT = undefined> {
  type: string;
  target: SourceT;
  originalEvent: OriginalEventT;
}

export type ErrorEvent = MapEvent<Map> & {
  type: 'error';
  error: Error;
};

export type MapMouseEvent = _MapMouseEvent & {
  point: Point;
  lngLat: LngLat;
  features?: MapGeoJSONFeature[];
};

export type ViewStateChangeEvent =
  | (MapEvent<Map, MouseEvent | TouchEvent | WheelEvent | undefined> & {
      type: 'movestart' | 'move' | 'moveend' | 'zoomstart' | 'zoom' | 'zoomend';
      viewState: ViewState;
    })
  | (MapEvent<Map, MouseEvent | TouchEvent | undefined> & {
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

export type PopupEvent = {
  type: 'open' | 'close';
  target: Popup;
};

export type MarkerEvent<OriginalEventT = undefined> = MapEvent<Marker, OriginalEventT>;

export type MarkerDragEvent = MarkerEvent & {
  type: 'dragstart' | 'drag' | 'dragend';
  lngLat: LngLat;
};

export type GeolocateEvent = MapEvent<GeolocateControl>;

export type GeolocateResultEvent = GeolocateEvent & GeolocationPosition;

export type GeolocateErrorEvent = GeolocateEvent & GeolocationPositionError;
