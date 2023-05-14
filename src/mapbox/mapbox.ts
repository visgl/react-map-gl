import {transformToViewState, applyViewStateToTransform, cloneTransform} from '../utils/transform';
import {normalizeStyle} from '../utils/style-utils';
import {deepEqual} from '../utils/deep-equal';

import type {
  Transform,
  ViewState,
  ViewStateChangeEvent,
  Point,
  Light,
  Fog,
  TerrainSpecification,
  MapboxStyle,
  ImmutableLike,
  LngLatBoundsLike,
  FitBoundsOptions,
  MapMouseEvent,
  MapLayerMouseEvent,
  MapLayerTouchEvent,
  MapWheelEvent,
  MapBoxZoomEvent,
  MapStyleDataEvent,
  MapSourceDataEvent,
  MapboxEvent,
  ErrorEvent,
  MapboxGeoJSONFeature,
  MapLib,
  MapInstanceInternal
} from '../types';

export type MapboxProps = Partial<ViewState> & {
  // Init options
  mapboxAccessToken?: string;

  /** Camera options used when constructing the Map instance */
  initialViewState?: Partial<ViewState> & {
    /** The initial bounds of the map. If bounds is specified, it overrides longitude, latitude and zoom options. */
    bounds?: LngLatBoundsLike;
    /** A fitBounds options object to use only when setting the bounds option. */
    fitBoundsOptions?: FitBoundsOptions;
  };

  /** If provided, render into an external WebGL context */
  gl?: WebGLRenderingContext;

  /** For external controller to override the camera state */
  viewState?: ViewState & {
    width: number;
    height: number;
  };

  // Styling

  /** Mapbox style */
  mapStyle?: string | MapboxStyle | ImmutableLike;
  /** Enable diffing when the map style changes
   * @default true
   */
  styleDiffing?: boolean;

  /** Default layers to query on pointer events */
  interactiveLayerIds?: string[];
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

  onResize?: (e: MapboxEvent) => void;
  onLoad?: (e: MapboxEvent) => void;
  onRender?: (e: MapboxEvent) => void;
  onIdle?: (e: MapboxEvent) => void;
  onError?: (e: ErrorEvent) => void;
  onRemove?: (e: MapboxEvent) => void;
  onData?: (e: MapStyleDataEvent | MapSourceDataEvent) => void;
  onStyleData?: (e: MapStyleDataEvent) => void;
  onSourceData?: (e: MapSourceDataEvent) => void;
};

const DEFAULT_STYLE = {version: 8, sources: {}, layers: []};

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
  pitchend: 'onPitchEnd'
};
const otherEvents = {
  wheel: 'onWheel',
  boxzoomstart: 'onBoxZoomStart',
  boxzoomend: 'onBoxZoomEnd',
  boxzoomcancel: 'onBoxZoomCancel',
  resize: 'onResize',
  load: 'onLoad',
  render: 'onRender',
  idle: 'onIdle',
  remove: 'onRemove',
  data: 'onData',
  styledata: 'onStyleData',
  sourcedata: 'onSourceData',
  error: 'onError'
};
const settingNames = [
  'minZoom',
  'maxZoom',
  'minPitch',
  'maxPitch',
  'maxBounds',
  'projection',
  'renderWorldCopies'
];
const handlerNames = [
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
export default class Mapbox<LibT extends MapLib = MapLib> {
  private _MapClass: LibT['Map'];
  // mapboxgl.Map instance
  private _map: MapInstanceInternal<InstanceType<LibT['Map']>> = null;
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
  private _deferredEvents: {
    move: boolean;
    zoom: boolean;
    pitch: boolean;
    rotate: boolean;
  } = {
    move: false,
    zoom: false,
    pitch: false,
    rotate: false
  };

  static savedMaps: Mapbox[] = [];

  constructor(MapClass: LibT['Map'], props: MapboxProps, container: HTMLDivElement) {
    this._MapClass = MapClass;
    this.props = props;
    this._initialize(container);
  }

  get map(): InstanceType<LibT['Map']> {
    return this._map;
  }

  get transform(): Transform {
    return this._renderTransform;
  }

  setProps(props: MapboxProps) {
    const oldProps = this.props;
    this.props = props;

    const settingsChanged = this._updateSettings(props, oldProps);
    if (settingsChanged) {
      this._createShadowTransform(this._map);
    }
    const sizeChanged = this._updateSize(props);
    const viewStateChanged = this._updateViewState(props, true);
    this._updateStyle(props, oldProps);
    this._updateStyleComponents(props, oldProps);
    this._updateHandlers(props, oldProps);

    // If 1) view state has changed to match props and
    //    2) the props change is not triggered by map events,
    // it's driven by an external state change. Redraw immediately
    if (settingsChanged || sizeChanged || (viewStateChanged && !this._map.isMoving())) {
      this.redraw();
    }
  }

  static reuse(props: MapboxProps, container: HTMLDivElement) {
    const that = Mapbox.savedMaps.pop();
    if (!that) {
      return null;
    }

    const map = that.map;
    // When reusing the saved map, we need to reparent the map(canvas) and other child nodes
    // intoto the new container from the props.
    // Step 1: reparenting child nodes from old container to new container
    const oldContainer = map.getContainer();
    container.className = oldContainer.className;
    while (oldContainer.childNodes.length > 0) {
      container.appendChild(oldContainer.childNodes[0]);
    }
    // Step 2: replace the internal container with new container from the react component
    // @ts-ignore
    map._container = container;

    // With maplibre-gl as mapLib, map uses ResizeObserver to observe when its container resizes.
    // When reusing the saved map, we need to disconnect the observer and observe the new container.
    // Step 3: telling the ResizeObserver to disconnect and observe the new container
    // @ts-ignore
    const resizeObserver = map._resizeObserver;
    if (resizeObserver) {
      resizeObserver.disconnect();
      resizeObserver.observe(container);
    }

    // Step 4: apply new props
    that.setProps({...props, styleDiffing: false});
    map.resize();
    const {initialViewState} = props;
    if (initialViewState) {
      if (initialViewState.bounds) {
        map.fitBounds(initialViewState.bounds, {...initialViewState.fitBoundsOptions, duration: 0});
      } else {
        that._updateViewState(initialViewState, false);
      }
    }

    // Simulate load event
    if (map.isStyleLoaded()) {
      map.fire('load');
    } else {
      map.once('styledata', () => map.fire('load'));
    }

    // Force reload
    // @ts-ignore
    map._update();
    return that;
  }

  /* eslint-disable complexity,max-statements */
  _initialize(container: HTMLDivElement) {
    const {props} = this;
    const {mapStyle = DEFAULT_STYLE} = props;
    const mapOptions = {
      ...props,
      ...props.initialViewState,
      accessToken: props.mapboxAccessToken || getAccessTokenFromEnv() || null,
      container,
      style: normalizeStyle(mapStyle)
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

    // @ts-expect-error (2450) calling new on ill-typed constructor
    const map: MapInstanceInternal<InstanceType<LibT['Map']>> = new this._MapClass(mapOptions);
    // Props that are not part of constructor options
    if (viewState.padding) {
      map.setPadding(viewState.padding);
    }
    if (props.cursor) {
      map.getCanvas().style.cursor = props.cursor;
    }
    this._createShadowTransform(map);

    // Hack
    // Insert code into map's render cycle
    const renderMap = map._render;
    map._render = (arg: number) => {
      this._inRender = true;
      renderMap.call(map, arg);
      this._inRender = false;
    };
    const runRenderTaskQueue = map._renderTaskQueue.run;
    map._renderTaskQueue.run = (arg: number) => {
      runRenderTaskQueue.call(map._renderTaskQueue, arg);
      this._onBeforeRepaint();
    };
    map.on('render', () => this._onAfterRepaint());
    // Insert code into map's event pipeline
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const fireEvent = map.fire;
    map.fire = this._fireEvent.bind(this, fireEvent);

    // add listeners
    map.on('resize', () => {
      this._renderTransform.resize(map.transform.width, map.transform.height);
    });
    map.on('styledata', () => this._updateStyleComponents(this.props, {}));
    map.on('sourcedata', () => this._updateStyleComponents(this.props, {}));
    for (const eventName in pointerEvents) {
      map.on(eventName, this._onPointerEvent);
    }
    for (const eventName in cameraEvents) {
      map.on(eventName, this._onCameraEvent);
    }
    for (const eventName in otherEvents) {
      map.on(eventName, this._onEvent);
    }
    this._map = map;
  }
  /* eslint-enable complexity,max-statements */

  recycle() {
    // Clean up unnecessary elements before storing for reuse.
    const container = this.map.getContainer();
    const children = container.querySelector('[mapboxgl-children]');
    children?.remove();

    Mapbox.savedMaps.push(this);
  }

  destroy() {
    this._map.remove();
  }

  // Force redraw the map now. Typically resize() and jumpTo() is reflected in the next
  // render cycle, which is managed by Mapbox's animation loop.
  // This removes the synchronization issue caused by requestAnimationFrame.
  redraw() {
    const map = this._map as any;
    // map._render will throw error if style does not exist
    // https://github.com/mapbox/mapbox-gl-js/blob/fb9fc316da14e99ff4368f3e4faa3888fb43c513
    //   /src/ui/map.js#L1834
    if (!this._inRender && map.style) {
      // cancel the scheduled update
      if (map._frame) {
        map._frame.cancel();
        map._frame = null;
      }
      // the order is important - render() may schedule another update
      map._render();
    }
  }

  _createShadowTransform(map: any) {
    const renderTransform = cloneTransform(map.transform);
    map.painter.transform = renderTransform;

    this._renderTransform = renderTransform;
  }

  /* Trigger map resize if size is controlled
     @param {object} nextProps
     @returns {bool} true if size has changed
   */
  _updateSize(nextProps: MapboxProps): boolean {
    // Check if size is controlled
    const {viewState} = nextProps;
    if (viewState) {
      const map = this._map;
      if (viewState.width !== map.transform.width || viewState.height !== map.transform.height) {
        map.resize();
        return true;
      }
    }
    return false;
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
    const isMoving = map.isMoving();

    if (isMoving) {
      // All movement of the camera is done relative to the sea level
      tr.cameraElevationReference = 'sea';
    }
    const changed = applyViewStateToTransform(tr, {
      ...transformToViewState(map.transform),
      ...nextProps
    });
    if (isMoving) {
      // Reset camera reference
      tr.cameraElevationReference = 'ground';
    }

    if (changed && triggerEvents) {
      const deferredEvents = this._deferredEvents;
      // Delay DOM control updates to the next render cycle
      deferredEvents.move = true;
      deferredEvents.zoom ||= zoom !== tr.zoom;
      deferredEvents.rotate ||= bearing !== tr.bearing;
      deferredEvents.pitch ||= pitch !== tr.pitch;
    }

    // Avoid manipulating the real transform when interaction/animation is ongoing
    // as it would interfere with Mapbox's handlers
    if (!isMoving) {
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
      if (propName in nextProps && !deepEqual(nextProps[propName], currProps[propName])) {
        changed = true;
        const setter = map[`set${propName[0].toUpperCase()}${propName.slice(1)}`];
        setter?.(nextProps[propName]);
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
      const {mapStyle = DEFAULT_STYLE, styleDiffing = true} = nextProps;
      const options: any = {
        diff: styleDiffing
      };
      if ('localIdeographFontFamily' in nextProps) {
        // @ts-ignore Mapbox specific prop
        options.localIdeographFontFamily = nextProps.localIdeographFontFamily;
      }
      this._map.setStyle(normalizeStyle(mapStyle), options);
      return true;
    }
    return false;
  }

  /* Update fog, light and terrain to match props
     @param {object} nextProps
     @param {object} currProps
     @returns {bool} true if anything is changed
   */
  _updateStyleComponents(
    nextProps: MapboxProps & {
      light?: Light;
      fog?: Fog;
      terrain?: TerrainSpecification;
    },
    currProps: MapboxProps & {
      light?: Light;
      fog?: Fog;
      terrain?: TerrainSpecification;
    }
  ): boolean {
    const map = this._map;
    let changed = false;
    if (map.isStyleLoaded()) {
      if ('light' in nextProps && map.setLight && !deepEqual(nextProps.light, currProps.light)) {
        changed = true;
        map.setLight(nextProps.light);
      }
      if ('fog' in nextProps && map.setFog && !deepEqual(nextProps.fog, currProps.fog)) {
        changed = true;
        map.setFog(nextProps.fog);
      }
      if (
        'terrain' in nextProps &&
        map.setTerrain &&
        !deepEqual(nextProps.terrain, currProps.terrain)
      ) {
        if (!nextProps.terrain || map.getSource(nextProps.terrain.source)) {
          changed = true;
          map.setTerrain(nextProps.terrain);
        }
      }
    }
    return changed;
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
      const newValue = nextProps[propName] ?? true;
      const oldValue = currProps[propName] ?? true;
      if (!deepEqual(newValue, oldValue)) {
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
    } else if (e.type === 'error') {
      console.error((e as ErrorEvent).error); // eslint-disable-line
    }
  };

  private _queryRenderedFeatures(point: Point) {
    const map = this._map;
    const {interactiveLayerIds = []} = this.props;
    try {
      return map.queryRenderedFeatures(point, {
        layers: interactiveLayerIds.filter(map.getLayer.bind(map))
      });
    } catch {
      // May fail if style is not loaded
      return [];
    }
  }

  _updateHover(e: MapMouseEvent) {
    const {props} = this;
    const shouldTrackHoveredFeatures =
      props.interactiveLayerIds && (props.onMouseMove || props.onMouseEnter || props.onMouseLeave);

    if (shouldTrackHoveredFeatures) {
      const eventType = e.type;
      const wasHovering = this._hoveredFeatures?.length > 0;
      const features = this._queryRenderedFeatures(e.point);
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
    if (e.type === 'mousemove' || e.type === 'mouseout') {
      this._updateHover(e);
    }

    // @ts-ignore
    const cb = this.props[pointerEvents[e.type]];
    if (cb) {
      if (this.props.interactiveLayerIds && e.type !== 'mouseover' && e.type !== 'mouseout') {
        e.features = this._hoveredFeatures || this._queryRenderedFeatures(e.point);
      }
      cb(e);
      delete e.features;
    }
  };

  _onCameraEvent = (e: ViewStateChangeEvent) => {
    if (!this._internalUpdate) {
      // @ts-ignore
      const cb = this.props[cameraEvents[e.type]];
      if (cb) {
        cb(e);
      }
    }
    if (e.type in this._deferredEvents) {
      this._deferredEvents[e.type] = false;
    }
  };

  _fireEvent(baseFire: Function, event: string | MapboxEvent, properties?: object) {
    const map = this._map;
    const tr = map.transform;

    const eventType = typeof event === 'string' ? event : event.type;
    if (eventType === 'move') {
      this._updateViewState(this.props, false);
    }
    if (eventType in cameraEvents) {
      if (typeof event === 'object') {
        (event as unknown as ViewStateChangeEvent).viewState = transformToViewState(tr);
      }
      if (this._map.isMoving()) {
        // Replace map.transform with ours during the callbacks
        map.transform = this._renderTransform;
        baseFire.call(map, event, properties);
        map.transform = tr;

        return map;
      }
    }
    baseFire.call(map, event, properties);

    return map;
  }

  // All camera manipulations are complete, ready to repaint
  _onBeforeRepaint() {
    const map = this._map;

    // If there are camera changes driven by props, invoke camera events so that DOM controls are synced
    this._internalUpdate = true;
    for (const eventType in this._deferredEvents) {
      if (this._deferredEvents[eventType]) {
        map.fire(eventType);
      }
    }
    this._internalUpdate = false;

    const tr = this._map.transform;
    // Make sure camera matches the current props
    this._map.transform = this._renderTransform;

    this._onAfterRepaint = () => {
      // Restores camera state before render/load events are fired
      this._map.transform = tr;
    };
  }

  _onAfterRepaint: () => void;
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
