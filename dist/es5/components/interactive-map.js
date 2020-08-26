"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _staticMap = _interopRequireDefault(require("./static-map"));

var _mapState = require("../utils/map-state");

var _viewportMercatorProject = _interopRequireDefault(require("viewport-mercator-project"));

var _transitionManager = _interopRequireDefault(require("../utils/transition-manager"));

var _mapContext = _interopRequireDefault(require("./map-context"));

var _mjolnir = require("mjolnir.js");

var _mapController = _interopRequireDefault(require("../utils/map-controller"));

var _deprecateWarn = _interopRequireDefault(require("../utils/deprecate-warn"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var propTypes = Object.assign({}, _staticMap["default"].propTypes, {
  maxZoom: _propTypes["default"].number,
  minZoom: _propTypes["default"].number,
  maxPitch: _propTypes["default"].number,
  minPitch: _propTypes["default"].number,
  onViewStateChange: _propTypes["default"].func,
  onViewportChange: _propTypes["default"].func,
  onInteractionStateChange: _propTypes["default"].func,
  transitionDuration: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  transitionInterpolator: _propTypes["default"].object,
  transitionInterruption: _propTypes["default"].number,
  transitionEasing: _propTypes["default"].func,
  onTransitionStart: _propTypes["default"].func,
  onTransitionInterrupt: _propTypes["default"].func,
  onTransitionEnd: _propTypes["default"].func,
  scrollZoom: _propTypes["default"].bool,
  dragPan: _propTypes["default"].bool,
  dragRotate: _propTypes["default"].bool,
  doubleClickZoom: _propTypes["default"].bool,
  touchZoom: _propTypes["default"].bool,
  touchRotate: _propTypes["default"].bool,
  keyboard: _propTypes["default"].bool,
  onHover: _propTypes["default"].func,
  onClick: _propTypes["default"].func,
  onDblClick: _propTypes["default"].func,
  onContextMenu: _propTypes["default"].func,
  onMouseDown: _propTypes["default"].func,
  onMouseMove: _propTypes["default"].func,
  onMouseUp: _propTypes["default"].func,
  onTouchStart: _propTypes["default"].func,
  onTouchMove: _propTypes["default"].func,
  onTouchEnd: _propTypes["default"].func,
  onMouseEnter: _propTypes["default"].func,
  onMouseLeave: _propTypes["default"].func,
  onMouseOut: _propTypes["default"].func,
  onWheel: _propTypes["default"].func,
  touchAction: _propTypes["default"].string,
  clickRadius: _propTypes["default"].number,
  interactiveLayerIds: _propTypes["default"].array,
  getCursor: _propTypes["default"].func,
  controller: _propTypes["default"].instanceOf(_mapController["default"])
});

var getDefaultCursor = function getDefaultCursor(_ref) {
  var isDragging = _ref.isDragging,
      isHovering = _ref.isHovering;
  return isDragging ? 'grabbing' : isHovering ? 'pointer' : 'grab';
};

var defaultProps = Object.assign({}, _staticMap["default"].defaultProps, _mapState.MAPBOX_LIMITS, _transitionManager["default"].defaultProps, {
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
  (0, _inherits2["default"])(InteractiveMap, _PureComponent);

  var _super = _createSuper(InteractiveMap);

  (0, _createClass2["default"])(InteractiveMap, null, [{
    key: "supported",
    value: function supported() {
      return _staticMap["default"].supported();
    }
  }]);

  function InteractiveMap(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, InteractiveMap);
    _this = _super.call(this, props);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
      isLoaded: false,
      isDragging: false,
      isHovering: false
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_controller", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_eventManager", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_interactiveContext", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_width", 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_height", 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_eventCanvasRef", (0, React.createRef)());
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_staticMapRef", (0, React.createRef)());
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "getMap", function () {
      return _this._staticMapRef.current ? _this._staticMapRef.current.getMap() : null;
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "queryRenderedFeatures", function (geometry) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var map = _this.getMap();

      return map && map.queryRenderedFeatures(geometry, options);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onInteractionStateChange", function (interactionState) {
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
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onResize", function (_ref2) {
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
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onViewportChange", function (viewState, interactionState, oldViewState) {
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
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onLoad", function (event) {
      _this.setState({
        isLoaded: true
      });

      _this.props.onLoad(event);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onEvent", function (callbackName, event) {
      var func = _this.props[callbackName];

      if (func) {
        func(_this._normalizeEvent(event));
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onPointerDown", function (event) {
      switch (event.pointerType) {
        case 'touch':
          _this._onEvent('onTouchStart', event);

          break;

        default:
          _this._onEvent('onMouseDown', event);

      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onPointerUp", function (event) {
      switch (event.pointerType) {
        case 'touch':
          _this._onEvent('onTouchEnd', event);

          break;

        default:
          _this._onEvent('onMouseUp', event);

      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onPointerMove", function (event) {
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
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onClick", function (event) {
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
    (0, _deprecateWarn["default"])(props);
    _this._controller = props.controller || new _mapController["default"]();
    _this._eventManager = new _mjolnir.EventManager(null, {
      touchAction: props.touchAction
    });

    _this._updateInteractiveContext({
      isDragging: false,
      eventManager: _this._eventManager
    });

    return _this;
  }

  (0, _createClass2["default"])(InteractiveMap, [{
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
      var viewport = new _viewportMercatorProject["default"](Object.assign({}, this.props, {
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
      return React.createElement(_mapContext["default"].Provider, {
        value: this._interactiveContext
      }, React.createElement("div", {
        key: "event-canvas",
        ref: this._eventCanvasRef,
        style: eventCanvasStyle
      }, React.createElement(_staticMap["default"], (0, _extends2["default"])({}, this.props, {
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
}(React.PureComponent);

exports["default"] = InteractiveMap;
(0, _defineProperty2["default"])(InteractiveMap, "propTypes", propTypes);
(0, _defineProperty2["default"])(InteractiveMap, "defaultProps", defaultProps);
//# sourceMappingURL=interactive-map.js.map