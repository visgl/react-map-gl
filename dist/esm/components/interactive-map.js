import _extends from "@babel/runtime/helpers/esm/extends";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

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
var propTypes = Object.assign({}, StaticMap.propTypes, {
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

var getDefaultCursor = function getDefaultCursor(_ref) {
  var isDragging = _ref.isDragging,
      isHovering = _ref.isHovering;
  return isDragging ? 'grabbing' : isHovering ? 'pointer' : 'grab';
};

var defaultProps = Object.assign({}, StaticMap.defaultProps, MAPBOX_LIMITS, TransitionManager.defaultProps, {
  onViewStateChange: null,
  onViewportChange: null,
  onClick: null,
  onNativeClick: null,
  onHover: null,
  onContextMenu: function onContextMenu(event) {
    return event.preventDefault();
  },
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

var InteractiveMap = function (_PureComponent) {
  _inherits(InteractiveMap, _PureComponent);

  var _super = _createSuper(InteractiveMap);

  _createClass(InteractiveMap, null, [{
    key: "supported",
    value: function supported() {
      return StaticMap.supported();
    }
  }]);

  function InteractiveMap(props) {
    var _this;

    _classCallCheck(this, InteractiveMap);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "state", {
      isLoaded: false,
      isDragging: false,
      isHovering: false
    });

    _defineProperty(_assertThisInitialized(_this), "_controller", void 0);

    _defineProperty(_assertThisInitialized(_this), "_eventManager", void 0);

    _defineProperty(_assertThisInitialized(_this), "_interactiveContext", void 0);

    _defineProperty(_assertThisInitialized(_this), "_width", 0);

    _defineProperty(_assertThisInitialized(_this), "_height", 0);

    _defineProperty(_assertThisInitialized(_this), "_eventCanvasRef", createRef());

    _defineProperty(_assertThisInitialized(_this), "_staticMapRef", createRef());

    _defineProperty(_assertThisInitialized(_this), "getMap", function () {
      return _this._staticMapRef.current ? _this._staticMapRef.current.getMap() : null;
    });

    _defineProperty(_assertThisInitialized(_this), "queryRenderedFeatures", function (geometry) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var map = _this.getMap();

      return map && map.queryRenderedFeatures(geometry, options);
    });

    _defineProperty(_assertThisInitialized(_this), "_onInteractionStateChange", function (interactionState) {
      var _interactionState$isD = interactionState.isDragging,
          isDragging = _interactionState$isD === void 0 ? false : _interactionState$isD;

      if (isDragging !== _this.state.isDragging) {
        _this._updateInteractiveContext({
          isDragging: isDragging
        });

        _this.setState({
          isDragging: isDragging
        });
      }

      var onInteractionStateChange = _this.props.onInteractionStateChange;

      if (onInteractionStateChange) {
        onInteractionStateChange(interactionState);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_onResize", function (_ref2) {
      var width = _ref2.width,
          height = _ref2.height;
      _this._width = width;
      _this._height = height;

      _this._setControllerProps(_this.props);

      _this.props.onResize({
        width: width,
        height: height
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_onViewportChange", function (viewState, interactionState, oldViewState) {
      var _this$props = _this.props,
          onViewStateChange = _this$props.onViewStateChange,
          onViewportChange = _this$props.onViewportChange;

      if (onViewStateChange) {
        onViewStateChange({
          viewState: viewState,
          interactionState: interactionState,
          oldViewState: oldViewState
        });
      }

      if (onViewportChange) {
        onViewportChange(viewState, interactionState, oldViewState);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_onLoad", function (event) {
      _this.setState({
        isLoaded: true
      });

      _this.props.onLoad(event);
    });

    _defineProperty(_assertThisInitialized(_this), "_onEvent", function (callbackName, event) {
      var func = _this.props[callbackName];

      if (func) {
        func(_this._normalizeEvent(event));
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_onPointerDown", function (event) {
      switch (event.pointerType) {
        case 'touch':
          _this._onEvent('onTouchStart', event);

          break;

        default:
          _this._onEvent('onMouseDown', event);

      }
    });

    _defineProperty(_assertThisInitialized(_this), "_onPointerUp", function (event) {
      switch (event.pointerType) {
        case 'touch':
          _this._onEvent('onTouchEnd', event);

          break;

        default:
          _this._onEvent('onMouseUp', event);

      }
    });

    _defineProperty(_assertThisInitialized(_this), "_onPointerMove", function (event) {
      switch (event.pointerType) {
        case 'touch':
          _this._onEvent('onTouchMove', event);

          break;

        default:
          _this._onEvent('onMouseMove', event);

      }

      if (!_this.state.isDragging) {
        var _this$props2 = _this.props,
            onHover = _this$props2.onHover,
            interactiveLayerIds = _this$props2.interactiveLayerIds;
        var features;
        event = _this._normalizeEvent(event);

        if (_this.state.isLoaded && (interactiveLayerIds || onHover)) {
          features = _this._getFeatures({
            pos: event.point,
            radius: _this.props.clickRadius
          });
        }

        if (onHover) {
          event.features = features;
          onHover(event);
        }

        var isHovering = Boolean(interactiveLayerIds && features && features.length > 0);
        var isEntering = isHovering && !_this.state.isHovering;
        var isExiting = !isHovering && _this.state.isHovering;

        if (isEntering) {
          _this._onEvent('onMouseEnter', event);
        }

        if (isExiting) {
          _this._onEvent('onMouseLeave', event);
        }

        if (isEntering || isExiting) {
          _this.setState({
            isHovering: isHovering
          });
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_onClick", function (event) {
      var _this$props3 = _this.props,
          onClick = _this$props3.onClick,
          onNativeClick = _this$props3.onNativeClick,
          onDblClick = _this$props3.onDblClick,
          doubleClickZoom = _this$props3.doubleClickZoom;
      var callbacks = [];
      var isDoubleClickEnabled = onDblClick || doubleClickZoom;

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
        event = _this._normalizeEvent(event);
        event.features = _this._getFeatures({
          pos: event.point,
          radius: _this.props.clickRadius
        });
        callbacks.forEach(function (cb) {
          return cb(event);
        });
      }
    });

    deprecateWarn(props);
    _this._controller = props.controller || new MapController();
    _this._eventManager = new EventManager(null, {
      touchAction: props.touchAction
    });

    _this._updateInteractiveContext({
      isDragging: false,
      eventManager: _this._eventManager
    });

    return _this;
  }

  _createClass(InteractiveMap, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var eventManager = this._eventManager;
      var mapContainer = this._eventCanvasRef.current;
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
        mapContainer: mapContainer
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this._setControllerProps(this.props);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._eventManager.destroy();
    }
  }, {
    key: "_setControllerProps",
    value: function _setControllerProps(props) {
      props = Object.assign({}, props, props.viewState, {
        isInteractive: Boolean(props.onViewStateChange || props.onViewportChange),
        onViewportChange: this._onViewportChange,
        onStateChange: this._onInteractionStateChange,
        eventManager: this._eventManager,
        width: this._width,
        height: this._height
      });

      this._controller.setOptions(props);

      var context = this._interactiveContext;
      context.onViewportChange = props.onViewportChange;
      context.onViewStateChange = props.onViewStateChange;
    }
  }, {
    key: "_getFeatures",
    value: function _getFeatures(_ref3) {
      var pos = _ref3.pos,
          radius = _ref3.radius;
      var features;
      var queryParams = {};
      var map = this.getMap();

      if (this.props.interactiveLayerIds) {
        queryParams.layers = this.props.interactiveLayerIds;
      }

      if (radius) {
        var size = radius;
        var bbox = [[pos[0] - size, pos[1] + size], [pos[0] + size, pos[1] - size]];
        features = map && map.queryRenderedFeatures(bbox, queryParams);
      } else {
        features = map && map.queryRenderedFeatures(pos, queryParams);
      }

      return features;
    }
  }, {
    key: "_updateInteractiveContext",
    value: function _updateInteractiveContext(updatedContext) {
      this._interactiveContext = Object.assign({}, this._interactiveContext, updatedContext);
    }
  }, {
    key: "_normalizeEvent",
    value: function _normalizeEvent(event) {
      if (event.lngLat) {
        return event;
      }

      var _event$offsetCenter = event.offsetCenter,
          x = _event$offsetCenter.x,
          y = _event$offsetCenter.y;
      var pos = [x, y];
      var viewport = new WebMercatorViewport(Object.assign({}, this.props, {
        width: this._width,
        height: this._height
      }));
      event.point = pos;
      event.lngLat = viewport.unproject(pos);
      return event;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          width = _this$props4.width,
          height = _this$props4.height,
          style = _this$props4.style,
          getCursor = _this$props4.getCursor;
      var eventCanvasStyle = Object.assign({
        position: 'relative'
      }, style, {
        width: width,
        height: height,
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
  }]);

  return InteractiveMap;
}(PureComponent);

_defineProperty(InteractiveMap, "propTypes", propTypes);

_defineProperty(InteractiveMap, "defaultProps", defaultProps);

export { InteractiveMap as default };
//# sourceMappingURL=interactive-map.js.map