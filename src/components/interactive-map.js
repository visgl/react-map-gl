import {PureComponent, createElement, createContext, createRef} from 'react';
import PropTypes from 'prop-types';

import StaticMap from './static-map';
import {MAPBOX_LIMITS} from '../utils/map-state';
import WebMercatorViewport from 'viewport-mercator-project';

import TransitionManager from '../utils/transition-manager';

import {EventManager} from 'mjolnir.js';
import MapController from '../utils/map-controller';
import config from '../config';
import deprecateWarn from '../utils/deprecate-warn';

export const InteractiveContext = createContext({
  eventManager: null,
  isDragging: false
});

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
  transitionDuration: PropTypes.number,
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
  // The object must expose one property: `events` as an array of subscribed
  // event names; and two methods: `setState(state)` and `handle(event)`
  controller: PropTypes.shape({
    events: PropTypes.arrayOf(PropTypes.string),
    handleEvent: PropTypes.func
  })
});

const getDefaultCursor = ({isDragging, isHovering}) => isDragging ?
  config.CURSOR.GRABBING :
  (isHovering ? config.CURSOR.POINTER : config.CURSOR.GRAB);

const defaultProps = Object.assign({},
  StaticMap.defaultProps, MAPBOX_LIMITS, TransitionManager.defaultProps,
  {
    onViewStateChange: null,
    onViewportChange: null,
    onClick: null,
    onHover: null,
    onContextMenu: event => event.preventDefault(),

    scrollZoom: true,
    dragPan: true,
    dragRotate: true,
    doubleClickZoom: true,

    touchAction: 'none',
    clickRadius: 0,
    getCursor: getDefaultCursor
  }
);

export default class InteractiveMap extends PureComponent {

  static supported() {
    return StaticMap.supported();
  }

  constructor(props) {
    super(props);
    // Check for deprecated props
    deprecateWarn(props);

    this.state = {
      // Whether the cursor is down
      isDragging: false,
      // Whether the cursor is over a clickable feature
      isHovering: false
    };

    // If props.controller is not provided, fallback to default MapController instance
    // Cannot use defaultProps here because it needs to be per map instance
    this._controller = props.controller || new MapController();

    this._eventManager = new EventManager(null, {
      legacyBlockScroll: false,
      touchAction: props.touchAction
    });
    this._width = 0;
    this._height = 0;
    this._eventCanvasRef = createRef();
    this._staticMapRef = createRef();
  }

  componentDidMount() {
    const eventManager = this._eventManager;

    eventManager.setElement(this._eventCanvasRef.current);
    // Register additional event handlers for click and hover
    eventManager.on({
      pointerdown: this._onPointerDown,
      pointermove: this._onPointerMove,
      pointerup: this._onPointerUp,
      pointerleave: this._onEvent.bind(this, 'onMouseOut'),
      click: this._onClick,
      dblclick: this._onEvent.bind(this, 'onDblClick'),
      wheel: this._onEvent.bind(this, 'onWheel'),
      contextmenu: this._onEvent.bind(this, 'onContextMenu')
    });

    this._setControllerProps(this.props);
  }

  componentWillUpdate(nextProps) {
    this._setControllerProps(nextProps);
  }

  getMap = () => {
    return this._staticMapRef.current ? this._staticMapRef.current.getMap() : null;
  }

  queryRenderedFeatures = (geometry, options) => {
    return this._map.queryRenderedFeatures(geometry, options);
  }

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

    if (this.props.interactiveLayerIds) {
      queryParams.layers = this.props.interactiveLayerIds;
    }

    if (radius) {
      // Radius enables point features, like marker symbols, to be clicked.
      const size = radius;
      const bbox = [[pos[0] - size, pos[1] + size], [pos[0] + size, pos[1] - size]];
      features = this._map.queryRenderedFeatures(bbox, queryParams);
    } else {
      features = this._map.queryRenderedFeatures(pos, queryParams);
    }
    return features;
  }

  _onInteractionStateChange = (interactionState) => {
    const {isDragging = false} = interactionState;
    if (isDragging !== this.state.isDragging) {
      this.setState({isDragging});
    }

    const {onInteractionStateChange} = this.props;
    if (onInteractionStateChange) {
      onInteractionStateChange(interactionState);
    }
  }

  _onResize = ({width, height}) => {
    this._width = width;
    this._height = height;
    this._setControllerProps(this.props);
    this.props.onResize({width, height});
  }

  _onViewportChange = (viewState, interactionState, oldViewState) => {
    const {onViewStateChange, onViewportChange} = this.props;

    if (onViewStateChange) {
      onViewStateChange({viewState, interactionState, oldViewState});
    }
    if (onViewportChange) {
      onViewportChange(viewState, interactionState, oldViewState);
    }
  }

  /* Generic event handling */
  _normalizeEvent(event) {
    if (event.lngLat) {
      // Already unprojected
      return event;
    }

    const {offsetCenter: {x, y}} = event;
    const pos = [x, y];

    const viewport = new WebMercatorViewport(Object.assign({}, this.props, {
      width: this._width,
      height: this._height
    }));

    event.point = pos;
    event.lngLat = viewport.unproject(pos);

    return event;
  }

  _onEvent = (callbackName, event) => {
    const func = this.props[callbackName];
    if (func) {
      func(this._normalizeEvent(event));
    }
  }

  /* Special case event handling */
  _onPointerDown = (event) => {
    switch (event.pointerType) {
    case 'touch':
      this._onEvent('onTouchStart', event);
      break;

    default:
      this._onEvent('onMouseDown', event);
    }
  }

  _onPointerUp = (event) => {
    switch (event.pointerType) {
    case 'touch':
      this._onEvent('onTouchEnd', event);
      break;

    default:
      this._onEvent('onMouseUp', event);
    }
  }

  _onPointerMove = (event) => {
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
      if (interactiveLayerIds || onHover) {
        event = this._normalizeEvent(event);
        features = this._getFeatures({pos: event.point, radius: this.props.clickRadius});
      }
      if (onHover) {
        // backward compatibility: v3 `onHover` interface
        event.features = features;
        onHover(event);
      }

      const isHovering = interactiveLayerIds && features && features.length > 0;
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
  }

  _onClick = (event) => {
    if (this.props.onClick) {
      event = this._normalizeEvent(event);
      // backward compatibility: v3 `onClick` interface
      event.features = this._getFeatures({pos: event.point, radius: this.props.clickRadius});
      this.props.onClick(event);
    }
  }

  render() {
    const {width, height, style, getCursor} = this.props;

    const eventCanvasStyle = Object.assign({position: 'relative'}, style, {
      width,
      height,
      cursor: getCursor(this.state)
    });
    const interactiveContext = {
      isDragging: this.state.isDragging,
      eventManager: this._eventManager
    };

    return createElement(InteractiveContext.Provider, {value: interactiveContext},
      createElement('div', {
        key: 'event-canvas',
        ref: this._eventCanvasRef,
        style: eventCanvasStyle
      },
        createElement(StaticMap, Object.assign({}, this.props,
          {
            width: '100%',
            height: '100%',
            style: null,
            onResize: this._onResize,
            ref: this._staticMapRef,
            children: this.props.children
          }
        ))
      )
    );
  }
}

InteractiveMap.displayName = 'InteractiveMap';
InteractiveMap.propTypes = propTypes;
InteractiveMap.defaultProps = defaultProps;
