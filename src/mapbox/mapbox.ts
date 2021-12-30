import mapboxgl from '../utils/mapboxgl';
import {Transform, transformToViewState, applyViewStateToTransform} from '../utils/transform';
import {deepEqual} from '../utils/deep-equal';

import type {
  ProjectionSpecification,
  ViewState,
  ViewStateChangeEvent,
  MapboxOptions,
  Style,
  MapMouseEvent,
  MapLayerMouseEvent,
  MapLayerTouchEvent,
  MapWheelEvent,
  MapDataEvent,
  MapboxEvent,
  ErrorEvent,
  MapboxGeoJSONFeature
} from '../utils/types';

export type MapboxProps = Omit<
  MapboxOptions,
  'center' | 'accessToken' | 'container' | 'style' | 'bounds' | 'fitBoundsOptions'
> &
  ViewState & {
    mapboxAccessToken?: string;

    /** Camera options used when constructing the Map instance */
    initialViewState?: Pick<MapboxOptions, 'bounds' | 'fitBoundsOptions'> & ViewState;

    /** If provided, render into an external WebGL context */
    gl?: WebGLRenderingContext;

    /** Aternative way to specify camera state */
    viewState?: ViewState;

    /** Mapbox style */
    mapStyle?: string | Style;
    /** Enable diffing when the map style changes */
    styleDiffing?: boolean;
    /** Default layers to query on pointer events */
    interactiveLayerIds?: string[];
    /** The projection the map should be rendered in */
    projection?: ProjectionSpecification | string;
    /** CSS cursor */
    cursor?: string;

    // Callbacks
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
    onWheel?: (e: MapWheelEvent) => void;
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
    onBoxZoomStart?: (e: ViewStateChangeEvent) => void;
    onBoxZoomEnd?: (e: ViewStateChangeEvent) => void;
    onBoxZoomCancel?: (e: ViewStateChangeEvent) => void;

    onResize?: (e: MapboxEvent) => void;
    onLoad?: (e: MapboxEvent) => void;
    onRender?: (e: MapboxEvent) => void;
    onIdle?: (e: MapboxEvent) => void;
    onError?: (e: ErrorEvent) => void;
    onRemove?: (e: MapboxEvent) => void;
    onData?: (e: MapDataEvent) => void;
    onStyleData?: (e: MapDataEvent) => void;
    onSourceData?: (e: MapDataEvent) => void;
  };

const pointerEvents = {
  mousedown: 'onMouseDown',
  mouseup: 'onMouseUp',
  mouseover: 'onMouseOver',
  mousemove: 'onMouseMove',
  click: 'onClick',
  dblclick: 'onDblClick',
  mouseenter: 'onMouseEnter',
  mouseleave: 'onMouseLeave',
  mouseout: 'onMouseOut',
  contextmenu: 'onContextMenu',
  touchstart: 'onTouchStart',
  touchend: 'onTouchEnd',
  touchmove: 'onTouchMove',
  touchcancel: 'onTouchCancel'
};
const cameraEvents = {
  movestart: 'onMoveStart',
  move: 'onMove',
  moveend: 'onMoveEnd',
  dragstart: 'onDragStart',
  drag: 'onDrag',
  dragend: 'onDragEnd',
  zoomstart: 'onZoomStart',
  zoom: 'onZoom',
  zoomend: 'onZoomEnd',
  rotatestart: 'onRotateStart',
  rotate: 'onRotate',
  rotateend: 'onRotateEnd',
  pitchstart: 'onPitchStart',
  pitch: 'onPitch',
  pitchend: 'onPitchEnd',
  boxzoomstart: 'onBoxZoomStart',
  boxzoomend: 'onBoxZoomEnd',
  boxzoomcancel: 'onBoxZoomCancel'
};
const otherEvents = {
  wheel: 'onWheel',
  resize: 'onResize',
  load: 'onLoad',
  render: 'onRender',
  idle: 'onIdle',
  remove: 'onRemove',
  data: 'onData',
  styledata: 'onStyleData',
  sourcedata: 'onSourceData'
};
const settingNames: (keyof MapboxProps)[] = [
  'minZoom',
  'maxZoom',
  'minPitch',
  'maxPitch',
  'maxBounds',
  'projection',
  'renderWorldCopies'
];
const handlerNames: (keyof MapboxProps)[] = [
  'scrollZoom',
  'boxZoom',
  'dragRotate',
  'dragPan',
  'keyboard',
  'doubleClickZoom',
  'touchZoomRotate',
  'touchPitch'
];

/**
 * A wrapper for mapbox-gl's Map class
 */
export default class Mapbox {
  // mapboxgl.Map instance. Not using type here because we are accessing
  // private members and methods
  private _map: any = null;
  // User-supplied props
  props: MapboxProps;

  // Mapbox map is stateful.
  // During method calls/user interactions, map.transform is mutated and
  // deviate from user-supplied props.
  // In order to control the map reactively, we shadow the transform
  // with the one below, which reflects the view state resolved from
  // both user-supplied props and the underlying state
  private _renderTransform: Transform;

  // Internal states
  private _internalUpdate: boolean = false;
  private _inRender: boolean = false;
  private _hoveredFeatures: MapboxGeoJSONFeature[] = null;
  private _moved: boolean = false;
  private _zoomed: boolean = false;
  private _pitched: boolean = false;
  private _rotated: boolean = false;
  private _nextProps: MapboxProps | null;

  constructor(props: MapboxProps) {
    this.props = props;
  }

  getMap() {
    return this._map;
  }

  setProps(props: MapboxProps) {
    if (this._inRender) {
      this._nextProps = props;
      return;
    }

    const oldProps = this.props;
    this.props = props;

    const settingsChanged = this._updateSettings(props, oldProps);
    if (settingsChanged) {
      this._renderTransform = this._map.transform.clone();
    }
    const viewStateChanged = this._updateViewState(props, true);
    this._updateStyle(props, oldProps);
    this._updateHandlers(props, oldProps);

    // If 1) view state has changed to match props and
    //    2) the props change is not triggered by map events,
    // it's driven by an external state change. Redraw immediately
    if (settingsChanged || (viewStateChanged && !this._map.isMoving())) {
      this.redraw();
    }
  }

  initialize(container: HTMLDivElement) {
    const {props} = this;
    const mapOptions = {
      ...props,
      ...props.initialViewState,
      accessToken: props.mapboxAccessToken || getAccessTokenFromEnv() || null,
      container,
      style: props.mapStyle
    };

    const viewState = mapOptions.initialViewState || mapOptions.viewState || mapOptions;
    Object.assign(mapOptions, {
      center: [viewState.longitude || 0, viewState.latitude || 0],
      zoom: viewState.zoom || 0,
      pitch: viewState.pitch || 0,
      bearing: viewState.bearing || 0
    });

    if (props.gl) {
      // eslint-disable-next-line
      const getContext = HTMLCanvasElement.prototype.getContext;
      // Hijack canvas.getContext to return our own WebGLContext
      // This will be called inside the mapboxgl.Map constructor
      // @ts-expect-error
      HTMLCanvasElement.prototype.getContext = () => {
        // Unhijack immediately
        HTMLCanvasElement.prototype.getContext = getContext;
        return props.gl;
      };
    }

    const map: any = new mapboxgl.Map(mapOptions);
    if (viewState.padding) {
      map.setPadding(viewState.padding);
    }
    this._renderTransform = map.transform.clone();

    // Hack
    // Insert code into map's render cycle
    const renderMap = map._render;
    map._render = this._render.bind(this, renderMap);
    const runRenderTaskQueue = map._renderTaskQueue.run;
    map._renderTaskQueue.run = (arg: number) => {
      runRenderTaskQueue.call(map._renderTaskQueue, arg);
      this._onBeforeRepaint();
    };
    // Insert code into map's event pipeline
    const fireEvent = map.fire;
    map.fire = this._fireEvent.bind(this, fireEvent);

    // add listeners
    for (const eventName in pointerEvents) {
      map.on(eventName, this._onPointerEvent);
    }
    for (const eventName in cameraEvents) {
      map.on(eventName, this._onCameraEvent);
    }
    for (const eventName in otherEvents) {
      map.on(eventName, this._onEvent);
    }
    map.on('error', this._onError);
    this._map = map;
  }

  destroy() {
    this._map.remove();
  }

  // Force redraw the map now. Typically resize() and jumpTo() is reflected in the next
  // render cycle, which is managed by Mapbox's animation loop.
  // This removes the synchronization issue caused by requestAnimationFrame.
  redraw() {
    const map = this._map;
    // map._render will throw error if style does not exist
    // https://github.com/mapbox/mapbox-gl-js/blob/fb9fc316da14e99ff4368f3e4faa3888fb43c513
    //   /src/ui/map.js#L1834
    if (map.style) {
      // cancel the scheduled update
      if (map._frame) {
        map._frame.cancel();
        map._frame = null;
      }
      // the order is important - render() may schedule another update
      map._render();
    }
  }

  // Adapted from map.jumpTo
  /* Update camera to match props
     @param {object} nextProps
     @param {bool} triggerEvents - should fire camera events
     @returns {bool} true if anything is changed
   */
  _updateViewState(nextProps: MapboxProps, triggerEvents: boolean): boolean {
    if (this._internalUpdate) {
      return false;
    }
    const map = this._map;

    const tr = this._renderTransform;
    // Take a snapshot of the transform before mutation
    const {zoom, pitch, bearing} = tr;
    const changed = applyViewStateToTransform(tr, {
      ...transformToViewState(map.transform),
      ...nextProps
    });

    if (changed && triggerEvents) {
      // Delay DOM control updates to the next render cycle
      this._moved = true;
      this._zoomed = this._zoomed || zoom !== tr.zoom;
      this._rotated = this._rotated || bearing !== tr.bearing;
      this._pitched = this._pitched || pitch !== tr.pitch;
    }

    // Avoid manipulating the real transform when interaction/animation is ongoing
    // as it would interfere with Mapbox's handlers
    if (!map.isMoving()) {
      applyViewStateToTransform(map.transform, nextProps);
    }

    return changed;
  }

  /* Update camera constraints and projection settings to match props
     @param {object} nextProps
     @param {object} currProps
     @returns {bool} true if anything is changed
   */
  _updateSettings(nextProps: MapboxProps, currProps: MapboxProps): boolean {
    const map = this._map;
    let changed = false;
    for (const propName of settingNames) {
      if (!deepEqual(nextProps[propName], currProps[propName])) {
        changed = true;
        map[`set${propName[0].toUpperCase()}${propName.slice(1)}`]?.(nextProps[propName]);
      }
    }
    return changed;
  }

  /* Update map style to match props
     @param {object} nextProps
     @param {object} currProps
     @returns {bool} true if style is changed
   */
  _updateStyle(nextProps: MapboxProps, currProps: MapboxProps): boolean {
    if (nextProps.cursor !== currProps.cursor) {
      this._map.getCanvas().style.cursor = nextProps.cursor;
    }
    if (nextProps.mapStyle !== currProps.mapStyle) {
      const options: any = {
        diff: nextProps.styleDiffing
      };
      if ('localIdeographFontFamily' in nextProps) {
        options.localIdeographFontFamily = nextProps.localIdeographFontFamily;
      }
      this._map.setStyle(nextProps.mapStyle, options);
      return true;
    }
    return false;
  }

  /* Update interaction handlers to match props
     @param {object} nextProps
     @param {object} currProps
     @returns {bool} true if anything is changed
   */
  _updateHandlers(nextProps: MapboxProps, currProps: MapboxProps): boolean {
    const map = this._map;
    let changed = false;
    for (const propName of handlerNames) {
      const newValue = nextProps[propName];
      if (!deepEqual(newValue, currProps[propName])) {
        changed = true;
        if (newValue) {
          map[propName].enable(newValue);
        } else {
          map[propName].disable();
        }
      }
    }
    return changed;
  }

  _onEvent = (e: MapboxEvent) => {
    // @ts-ignore
    const cb = this.props[otherEvents[e.type]];
    if (cb) {
      cb(e);
    }
  };

  _onError = (e: ErrorEvent) => {
    if (this.props.onError) {
      this.props.onError(e);
    } else {
      console.error(e.error);
    }
  };

  _updateHover(e: MapMouseEvent) {
    const {props} = this;
    const shouldTrackHoveredFeatures =
      props.interactiveLayerIds && (props.onMouseMove || props.onMouseEnter || props.onMouseLeave);

    if (shouldTrackHoveredFeatures) {
      const eventType = e.type;
      const wasHovering = this._hoveredFeatures?.length > 0;
      let features;
      if (eventType === 'mousemove') {
        try {
          features = this._map.queryRenderedFeatures(e.point, {
            layers: props.interactiveLayerIds
          });
        } catch {
          features = [];
        }
      } else {
        features = [];
      }
      const isHovering = features.length > 0;

      if (!isHovering && wasHovering) {
        e.type = 'mouseleave';
        this._onPointerEvent(e);
      }
      this._hoveredFeatures = features;
      if (isHovering && !wasHovering) {
        e.type = 'mouseenter';
        this._onPointerEvent(e);
      }
      e.type = eventType;
    } else {
      this._hoveredFeatures = null;
    }
  }

  _onPointerEvent = (e: MapLayerMouseEvent | MapLayerTouchEvent) => {
    // @ts-ignore
    const cb = this.props[pointerEvents[e.type]];
    if (cb) {
      if (this.props.interactiveLayerIds && e.type !== 'mouseover' && e.type !== 'mouseout') {
        const features =
          this._hoveredFeatures ||
          this._map.queryRenderedFeatures(e.point, {
            layers: this.props.interactiveLayerIds
          });
        if (!features.length) {
          return;
        }
        e.features = features;
      }
      cb(e);
      delete e.features;
    }
  };

  _onCameraEvent = (e: ViewStateChangeEvent) => {
    if (this._internalUpdate) {
      return;
    }
    // @ts-ignore
    const cb = this.props[cameraEvents[e.type]];
    if (cb) {
      cb(e);
    }
  };

  _fireEvent(baseFire: Function, event: string | MapboxEvent, properties?: object) {
    const map = this._map;
    const tr = map.transform;

    const eventType = typeof event === 'string' ? event : event.type;
    switch (eventType) {
      case 'resize':
        this._renderTransform.resize(tr.width, tr.height);
        break;

      case 'move':
        this._updateViewState(this.props, false);
        break;

      case 'mousemove':
      case 'mouseout':
        // @ts-ignore
        this._updateHover(event);
        break;
    }
    if (typeof event === 'object' && event.type in cameraEvents) {
      (event as ViewStateChangeEvent).viewState = transformToViewState(tr);
    }
    // Replace map.transform with ours during the callbacks
    map.transform = this._renderTransform;
    baseFire.call(map, event, properties);
    map.transform = tr;

    return map;
  }

  _render(baseRender: Function, arg: number) {
    const map = this._map;
    this._inRender = true;

    if (this._moved) {
      this._internalUpdate = true;
      map.fire('move');

      if (this._zoomed) {
        map.fire('zoom');
        this._zoomed = false;
      }

      if (this._rotated) {
        map.fire('rotate');
        this._rotated = false;
      }

      if (this._pitched) {
        map.fire('pitch');
        this._pitched = false;
      }

      this._moved = false;
      this._internalUpdate = false;
    }

    // map.transform will be swapped out in _onBeforeRender
    const tr = map.transform;
    baseRender.call(map, arg);
    map.transform = tr;
    this._inRender = false;

    // We do not allow props to change during a render
    // When render is done, apply any pending changes
    if (this._nextProps) {
      this.setProps(this._nextProps);
      this._nextProps = null;
    }
  }

  _onBeforeRepaint() {
    // Make sure camera matches the current props
    this._map.transform = this._renderTransform;
  }
}

/**
 * Access token can be provided via one of:
 *   mapboxAccessToken prop
 *   access_token query parameter
 *   MapboxAccessToken environment variable
 *   REACT_APP_MAPBOX_ACCESS_TOKEN environment variable
 * @returns access token
 */
function getAccessTokenFromEnv(): string {
  let accessToken = null;

  /* global location, process */
  if (typeof location !== 'undefined') {
    const match = /access_token=([^&\/]*)/.exec(location.search);
    accessToken = match && match[1];
  }

  // Note: This depends on bundler plugins (e.g. webpack) importing environment correctly
  try {
    accessToken = accessToken || process.env.MapboxAccessToken;
  } catch {
    // ignore
  }

  try {
    accessToken = accessToken || process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
  } catch {
    // ignore
  }

  return accessToken;
}
