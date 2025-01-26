import {transformToViewState, applyViewStateToTransform} from '../utils/transform';
import {normalizeStyle} from '../utils/style-utils';
import {deepEqual} from '../utils/deep-equal';

import type {TransformLike} from '../types/internal';
import type {
  ViewState,
  Point,
  PointLike,
  PaddingOptions,
  ImmutableLike,
  LngLatBoundsLike,
  MapGeoJSONFeature
} from '../types/common';
import type {
  StyleSpecification,
  SkySpecification,
  LightSpecification,
  TerrainSpecification,
  ProjectionSpecification
} from '../types/style-spec';
import type {MapInstance} from '../types/lib';
import type {
  MapCallbacks,
  ViewStateChangeEvent,
  MapEvent,
  ErrorEvent,
  MapMouseEvent
} from '../types/events';

export type MaplibreProps = Partial<ViewState> &
  MapCallbacks & {
    /** Camera options used when constructing the Map instance */
    initialViewState?: Partial<ViewState> & {
      /** The initial bounds of the map. If bounds is specified, it overrides longitude, latitude and zoom options. */
      bounds?: LngLatBoundsLike;
      /** A fitBounds options object to use only when setting the bounds option. */
      fitBoundsOptions?: {
        offset?: PointLike;
        minZoom?: number;
        maxZoom?: number;
        padding?: number | PaddingOptions;
      };
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
    mapStyle?: string | StyleSpecification | ImmutableLike<StyleSpecification>;
    /** Enable diffing when the map style changes
     * @default true
     */
    styleDiffing?: boolean;
    /** The projection property of the style. Must conform to the Projection Style Specification.
     * @default 'mercator'
     */
    projection?: ProjectionSpecification | 'mercator' | 'globe';
    /** Light properties of the map. */
    light?: LightSpecification;
    /** Terrain property of the style. Must conform to the Terrain Style Specification.
     * If `undefined` is provided, removes terrain from the map. */
    terrain?: TerrainSpecification;
    /** Sky properties of the map. Must conform to the Sky Style Specification. */
    sky?: SkySpecification;

    /** Default layers to query on pointer events */
    interactiveLayerIds?: string[];
    /** CSS cursor */
    cursor?: string;
  };

const DEFAULT_STYLE = {version: 8, sources: {}, layers: []} as StyleSpecification;

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
export default class Maplibre {
  private _MapClass: {new (options: any): MapInstance};
  // mapboxgl.Map instance
  private _map: MapInstance = null;
  // User-supplied props
  props: MaplibreProps;

  // Internal states
  private _internalUpdate: boolean = false;
  private _hoveredFeatures: MapGeoJSONFeature[] = null;
  private _propsedCameraUpdate: ViewState | null = null;
  private _styleComponents: {
    light?: LightSpecification;
    sky?: SkySpecification;
    projection?: ProjectionSpecification;
    terrain?: TerrainSpecification | null;
  } = {};

  static savedMaps: Maplibre[] = [];

  constructor(
    MapClass: {new (options: any): MapInstance},
    props: MaplibreProps,
    container: HTMLDivElement
  ) {
    this._MapClass = MapClass;
    this.props = props;
    this._initialize(container);
  }

  get map(): MapInstance {
    return this._map;
  }

  setProps(props: MaplibreProps) {
    const oldProps = this.props;
    this.props = props;

    const settingsChanged = this._updateSettings(props, oldProps);
    const sizeChanged = this._updateSize(props);
    const viewStateChanged = this._updateViewState(props);
    this._updateStyle(props, oldProps);
    this._updateStyleComponents(props);
    this._updateHandlers(props, oldProps);

    // If 1) view state has changed to match props and
    //    2) the props change is not triggered by map events,
    // it's driven by an external state change. Redraw immediately
    if (settingsChanged || sizeChanged || (viewStateChanged && !this._map.isMoving())) {
      this.redraw();
    }
  }

  static reuse(props: MaplibreProps, container: HTMLDivElement): Maplibre {
    const that = Maplibre.savedMaps.pop();
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
        that._updateViewState(initialViewState);
      }
    }

    // Simulate load event
    if (map.isStyleLoaded()) {
      map.fire('load');
    } else {
      map.once('style.load', () => map.fire('load'));
    }

    // Force reload
    // @ts-ignore
    map._update();
    return that;
  }

  /* eslint-disable complexity,max-statements */
  private _initialize(container: HTMLDivElement) {
    const {props} = this;
    const {mapStyle = DEFAULT_STYLE} = props;
    const mapOptions = {
      ...props,
      ...props.initialViewState,
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

    const map = new this._MapClass(mapOptions);
    // Props that are not part of constructor options
    if (viewState.padding) {
      map.setPadding(viewState.padding);
    }
    if (props.cursor) {
      map.getCanvas().style.cursor = props.cursor;
    }

    // add listeners
    map.transformCameraUpdate = this._onCameraUpdate;
    map.on('style.load', () => {
      // Map style has changed, this would have wiped out all settings from props
      this._styleComponents = {
        light: map.getLight(),
        sky: map.getSky(),
        // @ts-ignore getProjection() does not exist in v4
        projection: map.getProjection?.(),
        terrain: map.getTerrain()
      };
      this._updateStyleComponents(this.props);
    });
    map.on('sourcedata', () => {
      // Some sources have loaded, we may need them to attach terrain
      this._updateStyleComponents(this.props);
    });
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

    Maplibre.savedMaps.push(this);
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

  /* Trigger map resize if size is controlled
     @param {object} nextProps
     @returns {bool} true if size has changed
   */
  private _updateSize(nextProps: MaplibreProps): boolean {
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
  private _updateViewState(nextProps: MaplibreProps): boolean {
    const map = this._map;
    const tr = map.transform;
    const isMoving = map.isMoving();

    // Avoid manipulating the real transform when interaction/animation is ongoing
    // as it would interfere with Mapbox's handlers
    if (!isMoving) {
      const changes = applyViewStateToTransform(tr, nextProps);
      if (Object.keys(changes).length > 0) {
        this._internalUpdate = true;
        map.jumpTo(changes);
        this._internalUpdate = false;
        return true;
      }
    }

    return false;
  }

  /* Update camera constraints and projection settings to match props
     @param {object} nextProps
     @param {object} currProps
     @returns {bool} true if anything is changed
   */
  private _updateSettings(nextProps: MaplibreProps, currProps: MaplibreProps): boolean {
    const map = this._map;
    let changed = false;
    for (const propName of settingNames) {
      if (propName in nextProps && !deepEqual(nextProps[propName], currProps[propName])) {
        changed = true;
        const setter = map[`set${propName[0].toUpperCase()}${propName.slice(1)}`];
        setter?.call(map, nextProps[propName]);
      }
    }
    return changed;
  }

  /* Update map style to match props */
  private _updateStyle(nextProps: MaplibreProps, currProps: MaplibreProps): void {
    if (nextProps.cursor !== currProps.cursor) {
      this._map.getCanvas().style.cursor = nextProps.cursor || '';
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
    }
  }

  /* Update fog, light, projection and terrain to match props
   * These props are special because
   * 1. They can not be applied right away. Certain conditions (style loaded, source loaded, etc.) must be met
   * 2. They can be overwritten by mapStyle
   */
  private _updateStyleComponents({light, projection, sky, terrain}: MaplibreProps): void {
    const map = this._map;
    const currProps = this._styleComponents;
    // We can safely manipulate map style once it's loaded
    if (map.style._loaded) {
      if (light && !deepEqual(light, currProps.light)) {
        currProps.light = light;
        map.setLight(light);
      }
      if (
        projection &&
        !deepEqual(projection, currProps.projection) &&
        projection !== currProps.projection?.type
      ) {
        currProps.projection = typeof projection === 'string' ? {type: projection} : projection;
        // @ts-ignore setProjection does not exist in v4
        map.setProjection?.(currProps.projection);
      }
      if (sky && !deepEqual(sky, currProps.sky)) {
        currProps.sky = sky;
        map.setSky(sky);
      }
      if (terrain !== undefined && !deepEqual(terrain, currProps.terrain)) {
        if (!terrain || map.getSource(terrain.source)) {
          currProps.terrain = terrain;
          map.setTerrain(terrain);
        }
      }
    }
  }

  /* Update interaction handlers to match props */
  private _updateHandlers(nextProps: MaplibreProps, currProps: MaplibreProps): void {
    const map = this._map;
    for (const propName of handlerNames) {
      const newValue = nextProps[propName] ?? true;
      const oldValue = currProps[propName] ?? true;
      if (!deepEqual(newValue, oldValue)) {
        if (newValue) {
          map[propName].enable(newValue);
        } else {
          map[propName].disable();
        }
      }
    }
  }

  private _onEvent = (e: MapEvent) => {
    // @ts-ignore
    const cb = this.props[otherEvents[e.type]];
    if (cb) {
      cb(e);
    } else if (e.type === 'error') {
      console.error((e as ErrorEvent).error); // eslint-disable-line
    }
  };

  private _onCameraEvent = (e: ViewStateChangeEvent) => {
    if (this._internalUpdate) {
      return;
    }
    e.viewState = this._propsedCameraUpdate || transformToViewState(this._map.transform);
    // @ts-ignore
    const cb = this.props[cameraEvents[e.type]];
    if (cb) {
      cb(e);
    }
  };

  private _onCameraUpdate = (tr: TransformLike) => {
    if (this._internalUpdate) {
      return tr;
    }
    this._propsedCameraUpdate = transformToViewState(tr);
    return applyViewStateToTransform(tr, this.props);
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

  private _updateHover(e: MapMouseEvent) {
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

  private _onPointerEvent = (e: MapMouseEvent) => {
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
}
