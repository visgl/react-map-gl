import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import * as React from 'react';
import { PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';
import StaticMap from './static-map';
import { MAPBOX_LIMITS } from '../utils/map-state';
import WebMercatorViewport from 'viewport-mercator-project';
import TransitionManager from '../utils/transition-manager';
import MapContext from './map-context';
import { EventManager } from 'mjolnir.js';
import MapController from '../utils/map-controller';
import deprecateWarn from '../utils/deprecate-warn';
const propTypes = Object.assign({}, StaticMap.propTypes, {
  maxZoom: PropTypes.number,
  minZoom: PropTypes.number,
  maxPitch: PropTypes.number,
  minPitch: PropTypes.number,
  onViewStateChange: PropTypes.func,
  onViewportChange: PropTypes.func,
  onInteractionStateChange: PropTypes.func,
  transitionDuration: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  transitionInterpolator: PropTypes.object,
  transitionInterruption: PropTypes.number,
  transitionEasing: PropTypes.func,
  onTransitionStart: PropTypes.func,
  onTransitionInterrupt: PropTypes.func,
  onTransitionEnd: PropTypes.func,
  scrollZoom: PropTypes.bool,
  dragPan: PropTypes.bool,
  dragRotate: PropTypes.bool,
  doubleClickZoom: PropTypes.bool,
  touchZoom: PropTypes.bool,
  touchRotate: PropTypes.bool,
  keyboard: PropTypes.bool,
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
  touchAction: PropTypes.string,
  clickRadius: PropTypes.number,
  interactiveLayerIds: PropTypes.array,
  getCursor: PropTypes.func,
  controller: PropTypes.instanceOf(MapController)
});

const getDefaultCursor = ({
  isDragging,
  isHovering
}) => isDragging ? 'grabbing' : isHovering ? 'pointer' : 'grab';

const defaultProps = Object.assign({}, StaticMap.defaultProps, MAPBOX_LIMITS, TransitionManager.defaultProps, {
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
});
export default class InteractiveMap extends PureComponent {
  static supported() {
    return StaticMap.supported();
  }

  constructor(props) {
    super(props);

    _defineProperty(this, "state", {
      isLoaded: false,
      isDragging: false,
      isHovering: false
    });

    _defineProperty(this, "_controller", void 0);

    _defineProperty(this, "_eventManager", void 0);

    _defineProperty(this, "_interactiveContext", void 0);

    _defineProperty(this, "_width", 0);

    _defineProperty(this, "_height", 0);

    _defineProperty(this, "_eventCanvasRef", createRef());

    _defineProperty(this, "_staticMapRef", createRef());

    _defineProperty(this, "getMap", () => {
      return this._staticMapRef.current ? this._staticMapRef.current.getMap() : null;
    });

    _defineProperty(this, "queryRenderedFeatures", (geometry, options = {}) => {
      const map = this.getMap();
      return map && map.queryRenderedFeatures(geometry, options);
    });

    _defineProperty(this, "_onInteractionStateChange", interactionState => {
      const {
        isDragging = false
      } = interactionState;

      if (isDragging !== this.state.isDragging) {
        this._updateInteractiveContext({
          isDragging
        });

        this.setState({
          isDragging
        });
      }

      const {
        onInteractionStateChange
      } = this.props;

      if (onInteractionStateChange) {
        onInteractionStateChange(interactionState);
      }
    });

    _defineProperty(this, "_onResize", ({
      width,
      height
    }) => {
      this._width = width;
      this._height = height;

      this._setControllerProps(this.props);

      this.props.onResize({
        width,
        height
      });
    });

    _defineProperty(this, "_onViewportChange", (viewState, interactionState, oldViewState) => {
      const {
        onViewStateChange,
        onViewportChange
      } = this.props;

      if (onViewStateChange) {
        onViewStateChange({
          viewState,
          interactionState,
          oldViewState
        });
      }

      if (onViewportChange) {
        onViewportChange(viewState, interactionState, oldViewState);
      }
    });

    _defineProperty(this, "_onLoad", event => {
      this.setState({
        isLoaded: true
      });
      this.props.onLoad(event);
    });

    _defineProperty(this, "_onEvent", (callbackName, event) => {
      const func = this.props[callbackName];

      if (func) {
        func(this._normalizeEvent(event));
      }
    });

    _defineProperty(this, "_onPointerDown", event => {
      switch (event.pointerType) {
        case 'touch':
          this._onEvent('onTouchStart', event);

          break;

        default:
          this._onEvent('onMouseDown', event);

      }
    });

    _defineProperty(this, "_onPointerUp", event => {
      switch (event.pointerType) {
        case 'touch':
          this._onEvent('onTouchEnd', event);

          break;

        default:
          this._onEvent('onMouseUp', event);

      }
    });

    _defineProperty(this, "_onPointerMove", event => {
      switch (event.pointerType) {
        case 'touch':
          this._onEvent('onTouchMove', event);

          break;

        default:
          this._onEvent('onMouseMove', event);

      }

      if (!this.state.isDragging) {
        const {
          onHover,
          interactiveLayerIds
        } = this.props;
        let features;
        event = this._normalizeEvent(event);

        if (this.state.isLoaded && (interactiveLayerIds || onHover)) {
          features = this._getFeatures({
            pos: event.point,
            radius: this.props.clickRadius
          });
        }

        if (onHover) {
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
          this.setState({
            isHovering
          });
        }
      }
    });

    _defineProperty(this, "_onClick", event => {
      const {
        onClick,
        onNativeClick,
        onDblClick,
        doubleClickZoom
      } = this.props;
      let callbacks = [];
      const isDoubleClickEnabled = onDblClick || doubleClickZoom;

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
        event.features = this._getFeatures({
          pos: event.point,
          radius: this.props.clickRadius
        });
        callbacks.forEach(cb => cb(event));
      }
    });

    deprecateWarn(props);
    this._controller = props.controller || new MapController();
    this._eventManager = new EventManager(null, {
      touchAction: props.touchAction
    });

    this._updateInteractiveContext({
      isDragging: false,
      eventManager: this._eventManager
    });
  }

  componentDidMount() {
    const eventManager = this._eventManager;
    const mapContainer = this._eventCanvasRef.current;
    eventManager.setElement(mapContainer);
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

    this._updateInteractiveContext({
      mapContainer
    });
  }

  componentDidUpdate() {
    this._setControllerProps(this.props);
  }

  componentWillUnmount() {
    this._eventManager.destroy();
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

    const context = this._interactiveContext;
    context.onViewportChange = props.onViewportChange;
    context.onViewStateChange = props.onViewStateChange;
  }

  _getFeatures({
    pos,
    radius
  }) {
    let features;
    const queryParams = {};
    const map = this.getMap();

    if (this.props.interactiveLayerIds) {
      queryParams.layers = this.props.interactiveLayerIds;
    }

    if (radius) {
      const size = radius;
      const bbox = [[pos[0] - size, pos[1] + size], [pos[0] + size, pos[1] - size]];
      features = map && map.queryRenderedFeatures(bbox, queryParams);
    } else {
      features = map && map.queryRenderedFeatures(pos, queryParams);
    }

    return features;
  }

  _updateInteractiveContext(updatedContext) {
    this._interactiveContext = Object.assign({}, this._interactiveContext, updatedContext);
  }

  _normalizeEvent(event) {
    if (event.lngLat) {
      return event;
    }

    const {
      offsetCenter: {
        x,
        y
      }
    } = event;
    const pos = [x, y];
    const viewport = new WebMercatorViewport(Object.assign({}, this.props, {
      width: this._width,
      height: this._height
    }));
    event.point = pos;
    event.lngLat = viewport.unproject(pos);
    return event;
  }

  render() {
    const {
      width,
      height,
      style,
      getCursor
    } = this.props;
    const eventCanvasStyle = Object.assign({
      position: 'relative'
    }, style, {
      width,
      height,
      cursor: getCursor(this.state)
    });
    return React.createElement(MapContext.Provider, {
      value: this._interactiveContext
    }, React.createElement("div", {
      key: "event-canvas",
      ref: this._eventCanvasRef,
      style: eventCanvasStyle
    }, React.createElement(StaticMap, _extends({}, this.props, {
      width: "100%",
      height: "100%",
      style: null,
      onResize: this._onResize,
      onLoad: this._onLoad,
      ref: this._staticMapRef
    }), this.props.children)));
  }

}

_defineProperty(InteractiveMap, "propTypes", propTypes);

_defineProperty(InteractiveMap, "defaultProps", defaultProps);
//# sourceMappingURL=interactive-map.js.map