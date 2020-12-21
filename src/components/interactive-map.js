import * as React from 'react';
import {PureComponent, createRef} from 'react';
import * as PropTypes from 'prop-types';

import StaticMap from './static-map';
import {MAPBOX_LIMITS} from '../utils/map-state';
import WebMercatorViewport from 'viewport-mercator-project';

import TransitionManager from '../utils/transition-manager';
import MapContext from './map-context';

import {EventManager} from 'mjolnir.js';
import MapController from '../utils/map-controller';
import deprecateWarn from '../utils/deprecate-warn';

const propTypes = Object.assign({}, StaticMap.propTypes, {
  // Additional props on top of StaticMap

  /** Viewport constraints */
  // Max zoom level
  maxZoom: PropTypes.number,
  // Min zoom level
  minZoom: PropTypes.number,
  // Max pitch in degrees
  maxPitch: PropTypes.number,
  // Min pitch in degrees
  minPitch: PropTypes.number,

  // Callbacks fired when the user interacted with the map. The object passed to the callbacks
  // contains viewport properties such as `longitude`, `latitude`, `zoom` etc.
  onViewStateChange: PropTypes.func,
  onViewportChange: PropTypes.func,
  onInteractionStateChange: PropTypes.func,

  /** Viewport transition **/
  // transition duration for viewport change
  transitionDuration: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  // TransitionInterpolator instance, can be used to perform custom transitions.
  transitionInterpolator: PropTypes.object,
  // type of interruption of current transition on update.
  transitionInterruption: PropTypes.number,
  // easing function
  transitionEasing: PropTypes.func,
  // transition status update functions
  onTransitionStart: PropTypes.func,
  onTransitionInterrupt: PropTypes.func,
  onTransitionEnd: PropTypes.func,

  /** Enables control event handling */
  // Scroll to zoom
  scrollZoom: PropTypes.bool,
  // Drag to pan
  dragPan: PropTypes.bool,
  // Drag to rotate
  dragRotate: PropTypes.bool,
  // Double click to zoom
  doubleClickZoom: PropTypes.bool,
  // Multitouch zoom
  touchZoom: PropTypes.bool,
  // Multitouch rotate
  touchRotate: PropTypes.bool,
  // Keyboard
  keyboard: PropTypes.bool,

  /** Event callbacks */
  onHover: PropTypes.func,
  onClick: PropTypes.func,
  onDblClick: PropTypes.func,
  onContextMenu: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseMove: PropTypes.func,
  onMouseUp: PropTypes.func,
  onTouchStart: PropTypes.func,
  onTouchMove: PropTypes.func,
  onTouchEnd: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onMouseOut: PropTypes.func,
  onWheel: PropTypes.func,

  /** Custom touch-action CSS for the event canvas. Defaults to 'none' */
  touchAction: PropTypes.string,

  /** Radius to detect features around a clicked point. Defaults to 0. */
  clickRadius: PropTypes.number,

  /** List of layers that are interactive */
  interactiveLayerIds: PropTypes.array,

  /** Accessor that returns a cursor style to show interactive state */
  getCursor: PropTypes.func,

  // A map control instance to replace the default map controller
  // The object must expose a method: `setOptions(opts)`
  controller: PropTypes.instanceOf(MapController)
});

const getDefaultCursor = ({isDragging, isHovering}) =>
  isDragging ? 'grabbing' : isHovering ? 'pointer' : 'grab';

const defaultProps = Object.assign(
  {},
  StaticMap.defaultProps,
  MAPBOX_LIMITS,
  TransitionManager.defaultProps,
  {
    onViewStateChange: null,
    onViewportChange: null,
    onClick: null,
    onNativeClick: null,
    onHover: null,
    onContextMenu: event => event.preventDefault(),

    scrollZoom: true,
    dragPan: true,
    dragRotate: true,
    doubleClickZoom: true,
    touchZoom: true,
    touchRotate: false,
    keyboard: true,

    touchAction: 'none',
    clickRadius: 0,
    getCursor: getDefaultCursor
  }
);

export default class InteractiveMap extends PureComponent {
  static supported() {
    return StaticMap.supported();
  }

  static propTypes = propTypes;
  static defaultProps = defaultProps;

  constructor(props) {
    super(props);
    // Check for deprecated props
    deprecateWarn(props);

    // If props.controller is not provided, fallback to default MapController instance
    // Cannot use defaultProps here because it needs to be per map instance
    this._controller = props.controller || new MapController();

    this._eventManager = new EventManager(null, {
      touchAction: props.touchAction
    });

    this._updateInteractiveContext({
      isDragging: false,
      eventManager: this._eventManager,
      onViewportChange: this._onViewportChange
    });
  }

  state = {
    // Whether mapbox styles have finished loading
    isLoaded: false,
    // Whether the cursor is down
    isDragging: false,
    // Whether the cursor is over a clickable feature
    isHovering: false
  };

  componentDidMount() {
    const eventManager = this._eventManager;

    const container = this._eventCanvasRef.current;
    eventManager.setElement(container);
    // Register additional event handlers for click and hover
    eventManager.on({
      pointerdown: this._onPointerDown,
      pointermove: this._onPointerMove,
      pointerup: this._onPointerUp,
      pointerleave: this._onEvent.bind(this, 'onMouseOut'),
      click: this._onClick,
      anyclick: this._onClick,
      dblclick: this._onEvent.bind(this, 'onDblClick'),
      wheel: this._onEvent.bind(this, 'onWheel'),
      contextmenu: this._onEvent.bind(this, 'onContextMenu')
    });

    this._setControllerProps(this.props);

    this._updateInteractiveContext({container});
  }

  componentDidUpdate() {
    this._setControllerProps(this.props);
  }

  componentWillUnmount() {
    this._eventManager.destroy();
  }

  _controller;
  _eventManager;
  _interactiveContext;
  _width = 0;
  _height = 0;
  _eventCanvasRef = createRef();
  _staticMapRef = createRef();

  getMap = () => {
    return this._staticMapRef.current ? this._staticMapRef.current.getMap() : null;
  };

  queryRenderedFeatures = (geometry, options = {}) => {
    const map = this.getMap();
    return map && map.queryRenderedFeatures(geometry, options);
  };

  _setControllerProps(props) {
    props = Object.assign({}, props, props.viewState, {
      isInteractive: Boolean(props.onViewStateChange || props.onViewportChange),
      onViewportChange: this._onViewportChange,
      onStateChange: this._onInteractionStateChange,
      eventManager: this._eventManager,
      width: this._width,
      height: this._height
    });

    this._controller.setOptions(props);
  }

  _getFeatures({pos, radius}) {
    let features;
    const queryParams = {};
    const map = this.getMap();

    if (this.props.interactiveLayerIds) {
      queryParams.layers = this.props.interactiveLayerIds;
    }

    if (radius) {
      // Radius enables point features, like marker symbols, to be clicked.
      const size = radius;
      const bbox = [[pos[0] - size, pos[1] + size], [pos[0] + size, pos[1] - size]];
      features = map && map.queryRenderedFeatures(bbox, queryParams);
    } else {
      features = map && map.queryRenderedFeatures(pos, queryParams);
    }
    return features;
  }

  _onInteractionStateChange = interactionState => {
    const {isDragging = false} = interactionState;
    if (isDragging !== this.state.isDragging) {
      this._updateInteractiveContext({isDragging});
      this.setState({isDragging});
    }

    const {onInteractionStateChange} = this.props;
    if (onInteractionStateChange) {
      onInteractionStateChange(interactionState);
    }
  };

  _updateInteractiveContext(updatedContext) {
    this._interactiveContext = Object.assign({}, this._interactiveContext, updatedContext);
  }

  _onResize = ({width, height}) => {
    this._width = width;
    this._height = height;
    this._setControllerProps(this.props);
    this.props.onResize({width, height});
  };

  _onViewportChange = (viewState, interactionState, oldViewState) => {
    const {onViewStateChange, onViewportChange} = this.props;

    if (onViewStateChange) {
      onViewStateChange({viewState, interactionState, oldViewState});
    }
    if (onViewportChange) {
      onViewportChange(viewState, interactionState, oldViewState);
    }
  };

  /* Generic event handling */
  _normalizeEvent(event) {
    if (event.lngLat) {
      // Already unprojected
      return event;
    }

    const {
      offsetCenter: {x, y}
    } = event;
    const pos = [x, y];

    const viewport = new WebMercatorViewport(
      Object.assign({}, this.props, {
        width: this._width,
        height: this._height
      })
    );

    event.point = pos;
    event.lngLat = viewport.unproject(pos);

    return event;
  }

  _onLoad = event => {
    this.setState({isLoaded: true});
    this.props.onLoad(event);
  };

  _onEvent = (callbackName, event) => {
    const func = this.props[callbackName];
    if (func) {
      func(this._normalizeEvent(event));
    }
  };

  /* Special case event handling */
  _onPointerDown = event => {
    switch (event.pointerType) {
      case 'touch':
        this._onEvent('onTouchStart', event);
        break;

      default:
        this._onEvent('onMouseDown', event);
    }
  };

  _onPointerUp = event => {
    switch (event.pointerType) {
      case 'touch':
        this._onEvent('onTouchEnd', event);
        break;

      default:
        this._onEvent('onMouseUp', event);
    }
  };

  // eslint-disable-next-line complexity
  _onPointerMove = event => {
    switch (event.pointerType) {
      case 'touch':
        this._onEvent('onTouchMove', event);
        break;

      default:
        this._onEvent('onMouseMove', event);
    }

    if (!this.state.isDragging) {
      const {onHover, interactiveLayerIds} = this.props;
      let features;
      event = this._normalizeEvent(event);
      if (this.state.isLoaded && (interactiveLayerIds || onHover)) {
        features = this._getFeatures({
          pos: event.point,
          radius: this.props.clickRadius
        });
      }
      if (onHover) {
        // backward compatibility: v3 `onHover` interface
        event.features = features;
        onHover(event);
      }

      const isHovering = Boolean(interactiveLayerIds && features && features.length > 0);
      const isEntering = isHovering && !this.state.isHovering;
      const isExiting = !isHovering && this.state.isHovering;

      if (isEntering) {
        this._onEvent('onMouseEnter', event);
      }
      if (isExiting) {
        this._onEvent('onMouseLeave', event);
      }
      if (isEntering || isExiting) {
        this.setState({isHovering});
      }
    }
  };

  _onClick = event => {
    const {onClick, onNativeClick, onDblClick, doubleClickZoom} = this.props;
    let callbacks = [];
    const isDoubleClickEnabled = onDblClick || doubleClickZoom;

    // `click` is only fired on single click. `anyclick` is fired twice if double clicking.
    // `click` has a delay period after pointer up that prevents it from firing when
    // double clicking. `anyclick` is always fired immediately after pointer up.
    // If double click is turned off by the user, we want to immediately fire the
    // onClick event. Otherwise, we wait to make sure it's a single click.
    switch (event.type) {
      case 'anyclick':
        callbacks.push(onNativeClick);
        if (!isDoubleClickEnabled) {
          callbacks.push(onClick);
        }
        break;

      case 'click':
        if (isDoubleClickEnabled) {
          callbacks.push(onClick);
        }
        break;

      default:
    }

    callbacks = callbacks.filter(Boolean);

    if (callbacks.length) {
      event = this._normalizeEvent(event);
      // backward compatibility: v3 `onClick` interface
      event.features = this._getFeatures({
        pos: event.point,
        radius: this.props.clickRadius
      });
      callbacks.forEach(cb => cb(event));
    }
  };

  render() {
    const {width, height, style, getCursor} = this.props;

    const eventCanvasStyle = Object.assign({position: 'relative'}, style, {
      width,
      height,
      cursor: getCursor(this.state)
    });

    return (
      <MapContext.Provider value={this._interactiveContext}>
        <div key="event-canvas" ref={this._eventCanvasRef} style={eventCanvasStyle}>
          <StaticMap
            {...this.props}
            width="100%"
            height="100%"
            style={null}
            onResize={this._onResize}
            onLoad={this._onLoad}
            ref={this._staticMapRef}
          >
            {this.props.children}
          </StaticMap>
        </div>
      </MapContext.Provider>
    );
  }
}
