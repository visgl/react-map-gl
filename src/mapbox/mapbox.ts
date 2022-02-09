import {transformToViewState, applyViewStateToTransform} from '../utils/transform';
import {normalizeStyle} from '../utils/style-utils';
import {deepEqual} from '../utils/deep-equal';

import type {
  Transform,
  ProjectionSpecification,
  ViewState,
  ViewStateChangeEvent,
  DragPanOptions,
  ZoomRotateOptions,
  TransformRequestFunction,
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
  MapboxMap
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

  /**
   * If true, the gl context will be created with MSA antialiasing, which can be useful for antialiasing custom layers.
   * This is false by default as a performance optimization.
   * @default false
   */
  antialias?: boolean;
  /**
   * If true, an attribution control will be added to the map.
   * @default true
   */
  attributionControl?: boolean;
  /**
   * Snap to north threshold in degrees.
   * @default 7
   */
  bearingSnap?: number;
  /**
   * The max number of pixels a user can shift the mouse pointer during a click for it to be
   * considered a valid click (as opposed to a mouse drag).
   * @default 3
   */
  clickTolerance?: number;
  /**
   * If `true`, Resource Timing API information will be collected for requests made by GeoJSON
   * and Vector Tile web workers (this information is normally inaccessible from the main
   * Javascript thread). Information will be returned in a `resourceTiming` property of
   * relevant `data` events.
   * @default false
   */
  collectResourceTiming?: boolean;
  /**
   * If `true` , scroll zoom will require pressing the ctrl or ⌘ key while scrolling to zoom map,
   * and touch pan will require using two fingers while panning to move the map.
   * Touch pitch will require three fingers to activate if enabled.
   */
  cooperativeGestures?: boolean;
  /**
   * If `true`, symbols from multiple sources can collide with each other during collision
   * detection. If `false`, collision detection is run separately for the symbols in each source.
   * @default true
   */
  crossSourceCollisions?: boolean;
  /** String or strings to show in an AttributionControl.
   * Only applicable if options.attributionControl is `true`. */
  customAttribution?: string | string[];
  /**
   * Controls the duration of the fade-in/fade-out animation for label collisions, in milliseconds.
   * This setting affects all symbol layers. This setting does not affect the duration of runtime
   * styling transitions or raster tile cross-fading.
   * @default 300
   */
  fadeDuration?: number;
  /** If true, map creation will fail if the implementation determines that the performance of the created WebGL context would be dramatically lower than expected.
   * @default false
   */
  failIfMajorPerformanceCaveat?: boolean;
  /** If `true`, the map's position (zoom, center latitude, center longitude, bearing, and pitch) will be synced with the hash fragment of the page's URL.
   * For example, `http://path/to/my/page.html#2.59/39.26/53.07/-24.1/60`.
   * An additional string may optionally be provided to indicate a parameter-styled hash,
   * e.g. http://path/to/my/page.html#map=2.59/39.26/53.07/-24.1/60&foo=bar, where foo
   * is a custom parameter and bar is an arbitrary hash distinct from the map hash.
   */
  hash?: boolean | string;
  /** If false, no mouse, touch, or keyboard listeners are attached to the map, so it will not respond to input
   * @default true
   */
  interactive?: boolean;
  /** A patch to apply to the default localization table for UI strings, e.g. control tooltips.
   * The `locale` object maps namespaced UI string IDs to translated strings in the target language;
   * see `src/ui/default_locale.js` for an example with all supported string IDs.
   * The object may specify all UI strings (thereby adding support for a new translation) or
   * only a subset of strings (thereby patching the default translation table).
   */
  locale?: {[key: string]: string};
  /**
   * Overrides the generation of all glyphs and font settings except font-weight keywords
   * Also overrides localIdeographFontFamily
   * @default null
   */
  localFontFamily?: string;
  /**
   * If specified, defines a CSS font-family for locally overriding generation of glyphs in the
   * 'CJK Unified Ideographs' and 'Hangul Syllables' ranges. In these ranges, font settings from
   * the map's style will be ignored, except for font-weight keywords (light/regular/medium/bold).
   * The purpose of this option is to avoid bandwidth-intensive glyph server requests.
   * @default "sans-serif"
   */
  localIdeographFontFamily?: string;
  /**
   * A string representing the position of the Mapbox wordmark on the map.
   * @default "bottom-left"
   */
  logoPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  /**
   * The maximum number of tiles stored in the tile cache for a given source. If omitted, the
   * cache will be dynamically sized based on the current viewport.
   * @default null
   */
  maxTileCacheSize?: number;
  /**
   * If true, map will prioritize rendering for performance by reordering layers
   * If false, layers will always be drawn in the specified order
   * @default true
   */
  optimizeForTerrain?: boolean;
  /**
   * If `false`, the map's pitch (tilt) control with "drag to rotate" interaction will be disabled.
   * @default true
   */
  pitchWithRotate?: boolean;
  /** If true, The maps canvas can be exported to a PNG using map.getCanvas().toDataURL();. This is false by default as a performance optimization.
   * @default false
   */
  preserveDrawingBuffer?: boolean;
  /**
   * If `false`, the map won't attempt to re-request tiles once they expire per their HTTP
   * `cacheControl`/`expires` headers.
   * @default true
   */
  refreshExpiredTiles?: boolean;
  /**
   * Allows for the usage of the map in automated tests without an accessToken with custom self-hosted test fixtures.
   * @default null
   */
  testMode?: boolean;
  /**
   * If  true, the map will automatically resize when the browser window resizes
   * @default true
   */
  trackResize?: boolean;
  /**
   * A callback run before the Map makes a request for an external URL. The callback can be
   * used to modify the url, set headers, or set the credentials property for cross-origin requests.
   * @default null
   */
  transformRequest?: TransformRequestFunction;

  // Handlers

  /**
   * If true, enable the "box zoom" interaction (see BoxZoomHandler)
   * @default true
   */
  boxZoom?: boolean;
  /**
   * If true, enable the "double click to zoom" interaction (see DoubleClickZoomHandler).
   * @default true
   */
  doubleClickZoom?: boolean;
  /**
   * If `true`, the "drag to pan" interaction is enabled.
   * An `Object` value is passed as options to {@link DragPanHandler#enable}.
   * @default true
   */
  dragPan?: boolean | DragPanOptions;
  /**
   * If true, enable the "drag to rotate" interaction (see DragRotateHandler).
   * @default true
   */
  dragRotate?: boolean;
  /**
   * If true, enable keyboard shortcuts (see KeyboardHandler).
   * @default true
   */
  keyboard?: boolean;
  /**
   * If `true`, the "scroll to zoom" interaction is enabled.
   * An `Object` value is passed as options to {@link ScrollZoomHandler#enable}.
   * @default true
   */
  scrollZoom?: boolean | ZoomRotateOptions;
  /**
   * If `true`, the "drag to pitch" interaction is enabled.
   * An `Object` value is passed as options to {@link TouchPitchHandler#enable}.
   * @default true
   */
  touchPitch?: boolean;
  /**
   * If `true`, the "pinch to rotate and zoom" interaction is enabled.
   * An `Object` value is passed as options to {@link TouchZoomRotateHandler#enable}.
   * @default true
   */
  touchZoomRotate?: boolean | ZoomRotateOptions;

  // Constraints

  /** If set, the map is constrained to the given bounds. */
  maxBounds?: LngLatBoundsLike;
  /** Maximum pitch of the map. */
  maxPitch?: number;
  /** Maximum zoom of the map. */
  maxZoom?: number;
  /** Minimum pitch of the map. */
  minPitch?: number;
  /** Minimum zoom of the map. */
  minZoom?: number;

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
  /** The fog property of the style. Must conform to the Fog Style Specification .
   * If `null` is provided, removes the fog from the map. */
  fog?: Fog | null;
  /** Light properties of the map. */
  light?: Light;
  /** Terrain property of the style. Must conform to the Terrain Style Specification .
   * If `null` is provided, removes terrain from the map. */
  terrain?: TerrainSpecification | null;
  /** Default layers to query on pointer events */
  interactiveLayerIds?: string[];
  /** The projection the map should be rendered in
   * @default "mercator"
   */
  projection?: ProjectionSpecification | string;
  /**
   * If `true`, multiple copies of the world will be rendered, when zoomed out.
   * @default true
   */
  renderWorldCopies?: boolean;
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
  private _MapClass: typeof MapboxMap;
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

  constructor(MapClass: typeof MapboxMap, props: MapboxProps, container: HTMLDivElement) {
    this._MapClass = MapClass;
    this.props = props;
    this._initialize(container);
  }

  get map(): MapboxMap {
    return this._map as MapboxMap;
  }

  get transform(): Transform {
    return this._renderTransform;
  }

  setProps(props: MapboxProps) {
    const oldProps = this.props;
    this.props = props;

    const settingsChanged = this._updateSettings(props, oldProps);
    if (settingsChanged) {
      this._renderTransform = this._map.transform.clone();
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
    // Step1: reparenting child nodes from old container to new container
    const oldContainer = map.getContainer();
    container.className = oldContainer.className;
    while (oldContainer.childNodes.length > 0) {
      container.appendChild(oldContainer.childNodes[0]);
    }
    // Step2: replace the internal container with new container from the react component
    // @ts-ignore
    map._container = container;

    // Step 3: apply new props
    if (props.initialViewState) {
      that._updateViewState(props.initialViewState, false);
    }
    map.resize();
    that.setProps({...props, styleDiffing: false});

    // Simulate load event
    if (map.isStyleLoaded()) {
      map.fire('load');
    } else {
      map.once('styledata', () => map.fire('load'));
    }
    return that;
  }

  /* eslint-disable complexity,max-statements */
  _initialize(container: HTMLDivElement) {
    const {props} = this;
    const mapOptions = {
      ...props,
      ...props.initialViewState,
      accessToken: props.mapboxAccessToken || getAccessTokenFromEnv() || null,
      container,
      style: normalizeStyle(props.mapStyle)
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

    const map: any = new this._MapClass(mapOptions);
    // Props that are not part of constructor options
    if (viewState.padding) {
      map.setPadding(viewState.padding);
    }
    if (props.cursor) {
      map.getCanvas().style.cursor = props.cursor;
    }
    this._renderTransform = map.transform.clone();

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
    Mapbox.savedMaps.push(this);
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
    const changed = applyViewStateToTransform(tr, {
      ...transformToViewState(map.transform),
      ...nextProps
    });

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
      if (propName in nextProps && !deepEqual(nextProps[propName], currProps[propName])) {
        changed = true;
        map[`set${propName[0].toUpperCase()}${propName.slice(1)}`](nextProps[propName]);
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
      this._map.setStyle(normalizeStyle(nextProps.mapStyle), options);
      return true;
    }
    return false;
  }

  /* Update fog, light and terrain to match props
     @param {object} nextProps
     @param {object} currProps
     @returns {bool} true if anything is changed
   */
  _updateStyleComponents(nextProps: MapboxProps, currProps: MapboxProps): boolean {
    const map = this._map;
    let changed = false;
    if (map.style.loaded()) {
      if ('light' in nextProps && !deepEqual(nextProps.light, currProps.light)) {
        changed = true;
        map.setLight(nextProps.light);
      }
      if ('fog' in nextProps && !deepEqual(nextProps.fog, currProps.fog)) {
        changed = true;
        map.setFog(nextProps.fog);
      }
      if ('terrain' in nextProps && !deepEqual(nextProps.terrain, currProps.terrain)) {
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
    if (e.type === 'mousemove' || e.type === 'mouseout') {
      this._updateHover(e);
    }

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
        (event as ViewStateChangeEvent).viewState = transformToViewState(tr);
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
