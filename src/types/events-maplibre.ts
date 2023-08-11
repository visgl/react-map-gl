import {
  Map,
  MapLibreEvent as MapEvent,
  MapMouseEvent,
  MapLayerMouseEvent,
  MapTouchEvent,
  MapLayerTouchEvent,
  MapStyleDataEvent,
  MapSourceDataEvent,
  MapWheelEvent,
  MapLibreZoomEvent as MapBoxZoomEvent
} from 'maplibre-gl';
import {ErrorEvent as _ErrorEvent, ViewStateChangeEvent as _ViewStateChangeEvent} from './events';

export type {
  MapEvent,
  MapMouseEvent,
  MapLayerMouseEvent,
  MapTouchEvent,
  MapLayerTouchEvent,
  MapStyleDataEvent,
  MapSourceDataEvent,
  MapWheelEvent,
  MapBoxZoomEvent
};

export type ErrorEvent = _ErrorEvent<Map>;
export type ViewStateChangeEvent = _ViewStateChangeEvent<Map>;

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
