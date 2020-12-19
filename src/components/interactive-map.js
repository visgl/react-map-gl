import * as React from 'react';
import {useState, useRef, useEffect, forwardRef} from 'react';
import * as PropTypes from 'prop-types';

import StaticMap from './static-map';
import {MAPBOX_LIMITS} from '../utils/map-state';
import WebMercatorViewport from 'viewport-mercator-project';

import TransitionManager from '../utils/transition-manager';
import {MapContextProvider} from './map-context';

import {EventManager} from 'mjolnir.js';
import MapController from '../utils/map-controller';

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
    onContextMenu: (event) => event.preventDefault(),

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

/* Event handlers */
function normalizeEvent(event) {
  if (event.lngLat || !event.offsetCenter) {
    return event;
  }

  const {
    offsetCenter: {x, y}
  } = event;
  const pos = [x, y];

  const viewport = new WebMercatorViewport(
    Object.assign({}, this.props, {
      width: this.width,
      height: this.height
    })
  );

  event.point = pos;
  event.lngLat = viewport.unproject(pos);

  return event;
}

function getFeatures(pos) {
  const {map} = this;

  if (!map || !pos) {
    return null;
  }

  const queryParams = {};
  const size = this.props.clickRadius;

  if (this.props.interactiveLayerIds) {
    queryParams.layers = this.props.interactiveLayerIds;
  }

  if (size) {
    // Radius enables point features, like marker symbols, to be clicked.
    return map.queryRenderedFeatures(
      [
        [pos[0] - size, pos[1] + size],
        [pos[0] + size, pos[1] - size]
      ],
      queryParams
    );
  }
  try {
    // This may fail if map is still loading
    return map.queryRenderedFeatures(pos, queryParams);
  } catch {
    return null;
  }
}

function onEvent(callbackName, event) {
  const func = this.props[callbackName];
  if (func) {
    func(normalizeEvent.call(this, event));
  }
}

function onPointerDown(event) {
  onEvent.call(this, event.pointerType === 'touch' ? 'onTouchStart' : 'onMouseDown', event);
}

function onPointerUp(event) {
  onEvent.call(this, event.pointerType === 'touch' ? 'onTouchEnd' : 'onMouseUp', event);
}

// eslint-disable-next-line complexity
function onPointerMove(event) {
  onEvent.call(this, event.pointerType === 'touch' ? 'onTouchMove' : 'onMouseMove', event);

  if (!this.state.isDragging) {
    const {onHover, interactiveLayerIds} = this.props;
    let features;
    event = normalizeEvent.call(this, event);
    if (interactiveLayerIds || onHover) {
      features = getFeatures.call(this, event.point);
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
      onEvent.call(this, 'onMouseEnter', event);
    }
    if (isExiting) {
      onEvent.call(this, 'onMouseLeave', event);
    }
    if (isEntering || isExiting) {
      this.setState({isHovering});
    }
  }
}

function onPointerClick(event) {
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
    event = normalizeEvent.call(this, event);
    // backward compatibility: v3 `onClick` interface
    event.features = getFeatures.call(this, event.point);
    callbacks.forEach((cb) => cb(event));
  }
}
/* End of event handers */

const InteractiveMap = forwardRef((props, ref) => {
  const [controller] = useState(() => props.controller || new MapController());
  const [eventManager] = useState(() => new EventManager(null, {touchAction: props.touchAction}));
  const [context, setContext] = useState({
    eventManager,
    isDragging: false
  });
  const eventCanvasRef = useRef(null);
  const staticMapRef = ref || useRef(null);

  // Event handlers are registered once but need access to the latest props
  // This is an anti-pattern, though it maintains a persistent reference to the latest props/state of this component
  const _thisRef = useRef({
    width: 0,
    height: 0,
    state: {
      isHovering: false,
      isDragging: false
    }
  });
  const thisRef = _thisRef.current;
  thisRef.props = props;
  thisRef.map = staticMapRef.current && staticMapRef.current.getMap();
  thisRef.setState = (newState) => {
    const state = Object.assign(thisRef.state, newState);
    eventCanvasRef.current.style.cursor = props.getCursor(state);
  };

  const handleViewportChange = (viewState, interactionState, oldViewState) => {
    const {onViewStateChange, onViewportChange} = props;

    if (onViewStateChange) {
      onViewStateChange({viewState, interactionState, oldViewState});
    }
    if (onViewportChange) {
      onViewportChange(viewState, interactionState, oldViewState);
    }
  };
  context.onViewportChange = handleViewportChange;

  const handleInteractionStateChange = (interactionState) => {
    const {isDragging = false} = interactionState;
    if (isDragging !== thisRef.state.isDragging) {
      thisRef.setState({isDragging});
      setContext({...context, isDragging});
    }

    const {onInteractionStateChange} = props;
    if (onInteractionStateChange) {
      onInteractionStateChange(interactionState);
    }
  };

  const updateControllerOpts = () => {
    const opts = Object.assign({}, props, props.viewState, {
      isInteractive: Boolean(props.onViewStateChange || props.onViewportChange),
      onViewportChange: handleViewportChange,
      onStateChange: handleInteractionStateChange,
      eventManager,
      width: thisRef.width,
      height: thisRef.height
    });

    controller.setOptions(opts);
  };

  const onResize = ({width, height}) => {
    thisRef.width = width;
    thisRef.height = height;
    updateControllerOpts();
    props.onResize({width, height});
  };

  useEffect(() => {
    eventManager.setElement(eventCanvasRef.current);
    // Register event handlers
    eventManager.on({
      pointerdown: onPointerDown.bind(thisRef),
      pointermove: onPointerMove.bind(thisRef),
      pointerup: onPointerUp.bind(thisRef),
      pointerleave: onEvent.bind(thisRef, 'onMouseOut'),
      click: onPointerClick.bind(thisRef),
      anyclick: onPointerClick.bind(thisRef),
      dblclick: onEvent.bind(thisRef, 'onDblClick'),
      wheel: onEvent.bind(thisRef, 'onWheel'),
      contextmenu: onEvent.bind(thisRef, 'onContextMenu')
    });

    context.container = eventCanvasRef.current;

    // Clean up on unmount
    return () => {
      eventManager.destroy();
    };
  }, []);

  updateControllerOpts();

  const {width, height, style, getCursor} = props;

  const eventCanvasStyle = Object.assign({position: 'relative'}, style, {
    width,
    height,
    cursor: getCursor(thisRef.state)
  });

  return (
    <MapContextProvider value={context}>
      <div key="event-canvas" ref={eventCanvasRef} style={eventCanvasStyle}>
        <StaticMap
          {...props}
          width="100%"
          height="100%"
          style={null}
          onResize={onResize}
          ref={staticMapRef}
        />
      </div>
    </MapContextProvider>
  );
});

InteractiveMap.supported = StaticMap.supported;
InteractiveMap.propTypes = propTypes;
InteractiveMap.defaultProps = defaultProps;

export default InteractiveMap;
