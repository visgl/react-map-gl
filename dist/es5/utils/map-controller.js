"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.LINEAR_TRANSITION_PROPS = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _mapState = _interopRequireDefault(require("./map-state"));

var _transition = require("./transition");

var _transitionManager = _interopRequireWildcard(require("./transition-manager"));

var _debounce = _interopRequireDefault(require("./debounce"));

var NO_TRANSITION_PROPS = {
  transitionDuration: 0
};
var LINEAR_TRANSITION_PROPS = {
  transitionDuration: 300,
  transitionEasing: function transitionEasing(t) {
    return t;
  },
  transitionInterpolator: new _transition.LinearInterpolator(),
  transitionInterruption: _transitionManager.TRANSITION_EVENTS.BREAK
};
exports.LINEAR_TRANSITION_PROPS = LINEAR_TRANSITION_PROPS;
var PITCH_MOUSE_THRESHOLD = 5;
var PITCH_ACCEL = 1.2;
var ZOOM_ACCEL = 0.01;
var EVENT_TYPES = {
  WHEEL: ['wheel'],
  PAN: ['panstart', 'panmove', 'panend'],
  PINCH: ['pinchstart', 'pinchmove', 'pinchend', 'pinchcancel'],
  DOUBLE_TAP: ['doubletap'],
  KEYBOARD: ['keydown']
};

var MapController = function () {
  function MapController() {
    var _this = this;

    (0, _classCallCheck2["default"])(this, MapController);
    (0, _defineProperty2["default"])(this, "events", []);
    (0, _defineProperty2["default"])(this, "mapState", void 0);
    (0, _defineProperty2["default"])(this, "onViewportChange", void 0);
    (0, _defineProperty2["default"])(this, "onStateChange", void 0);
    (0, _defineProperty2["default"])(this, "mapStateProps", void 0);
    (0, _defineProperty2["default"])(this, "eventManager", void 0);
    (0, _defineProperty2["default"])(this, "scrollZoom", true);
    (0, _defineProperty2["default"])(this, "dragPan", true);
    (0, _defineProperty2["default"])(this, "dragRotate", true);
    (0, _defineProperty2["default"])(this, "doubleClickZoom", true);
    (0, _defineProperty2["default"])(this, "touchZoom", true);
    (0, _defineProperty2["default"])(this, "touchRotate", false);
    (0, _defineProperty2["default"])(this, "keyboard", true);
    (0, _defineProperty2["default"])(this, "_state", {
      isDragging: false
    });
    (0, _defineProperty2["default"])(this, "_events", {});
    (0, _defineProperty2["default"])(this, "_transitionManager", new _transitionManager["default"]());
    (0, _defineProperty2["default"])(this, "setState", function (newState) {
      Object.assign(_this._state, newState);

      if (_this.onStateChange) {
        _this.onStateChange(_this._state);
      }
    });
    this.handleEvent = this.handleEvent.bind(this);
    this._onWheelEnd = (0, _debounce["default"])(this._onWheelEnd, 100);
  }

  (0, _createClass2["default"])(MapController, [{
    key: "handleEvent",
    value: function handleEvent(event) {
      this.mapState = this.getMapState();

      switch (event.type) {
        case 'panstart':
          return this._onPanStart(event);

        case 'panmove':
          return this._onPan(event);

        case 'panend':
          return this._onPanEnd(event);

        case 'pinchstart':
          return this._onPinchStart(event);

        case 'pinchmove':
          return this._onPinch(event);

        case 'pinchcancel':
        case 'pinchend':
          return this._onPinchEnd(event);

        case 'doubletap':
          return this._onDoubleTap(event);

        case 'wheel':
          return this._onWheel(event);

        case 'keydown':
          return this._onKeyDown(event);

        default:
          return false;
      }
    }
  }, {
    key: "getCenter",
    value: function getCenter(event) {
      var _event$offsetCenter = event.offsetCenter,
          x = _event$offsetCenter.x,
          y = _event$offsetCenter.y;
      return [x, y];
    }
  }, {
    key: "isFunctionKeyPressed",
    value: function isFunctionKeyPressed(event) {
      var srcEvent = event.srcEvent;
      return Boolean(srcEvent.metaKey || srcEvent.altKey || srcEvent.ctrlKey || srcEvent.shiftKey);
    }
  }, {
    key: "updateViewport",
    value: function updateViewport(newMapState) {
      var extraProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var extraState = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var oldViewport = this.mapState ? this.mapState.getViewportProps() : {};
      var newViewport = Object.assign({}, newMapState.getViewportProps(), extraProps);
      var viewStateChanged = Object.keys(newViewport).some(function (key) {
        return oldViewport[key] !== newViewport[key];
      });

      if (viewStateChanged) {
        this.onViewportChange(newViewport, extraState, oldViewport);
      }

      this.setState(Object.assign({}, newMapState.getInteractiveState(), extraState));
    }
  }, {
    key: "getMapState",
    value: function getMapState(overrides) {
      return new _mapState["default"](Object.assign({}, this.mapStateProps, this._state, overrides));
    }
  }, {
    key: "setOptions",
    value: function setOptions(options) {
      var onViewportChange = options.onViewportChange,
          onStateChange = options.onStateChange,
          _options$eventManager = options.eventManager,
          eventManager = _options$eventManager === void 0 ? this.eventManager : _options$eventManager,
          _options$isInteractiv = options.isInteractive,
          isInteractive = _options$isInteractiv === void 0 ? true : _options$isInteractiv,
          _options$scrollZoom = options.scrollZoom,
          scrollZoom = _options$scrollZoom === void 0 ? this.scrollZoom : _options$scrollZoom,
          _options$dragPan = options.dragPan,
          dragPan = _options$dragPan === void 0 ? this.dragPan : _options$dragPan,
          _options$dragRotate = options.dragRotate,
          dragRotate = _options$dragRotate === void 0 ? this.dragRotate : _options$dragRotate,
          _options$doubleClickZ = options.doubleClickZoom,
          doubleClickZoom = _options$doubleClickZ === void 0 ? this.doubleClickZoom : _options$doubleClickZ,
          _options$touchZoom = options.touchZoom,
          touchZoom = _options$touchZoom === void 0 ? this.touchZoom : _options$touchZoom,
          _options$touchRotate = options.touchRotate,
          touchRotate = _options$touchRotate === void 0 ? this.touchRotate : _options$touchRotate,
          _options$keyboard = options.keyboard,
          keyboard = _options$keyboard === void 0 ? this.keyboard : _options$keyboard;
      this.onViewportChange = onViewportChange;
      this.onStateChange = onStateChange;
      var dimensionChanged = !this.mapStateProps || this.mapStateProps.height !== options.height;
      this.mapStateProps = options;

      if (dimensionChanged) {
        this.updateViewport(new _mapState["default"](options));
      }

      this._transitionManager.processViewportChange(Object.assign({}, options, {
        onStateChange: this.setState
      }));

      if (this.eventManager !== eventManager) {
        this.eventManager = eventManager;
        this._events = {};
        this.toggleEvents(this.events, true);
      }

      this.toggleEvents(EVENT_TYPES.WHEEL, isInteractive && scrollZoom);
      this.toggleEvents(EVENT_TYPES.PAN, isInteractive && (dragPan || dragRotate));
      this.toggleEvents(EVENT_TYPES.PINCH, isInteractive && (touchZoom || touchRotate));
      this.toggleEvents(EVENT_TYPES.DOUBLE_TAP, isInteractive && doubleClickZoom);
      this.toggleEvents(EVENT_TYPES.KEYBOARD, isInteractive && keyboard);
      this.scrollZoom = scrollZoom;
      this.dragPan = dragPan;
      this.dragRotate = dragRotate;
      this.doubleClickZoom = doubleClickZoom;
      this.touchZoom = touchZoom;
      this.touchRotate = touchRotate;
      this.keyboard = keyboard;
    }
  }, {
    key: "toggleEvents",
    value: function toggleEvents(eventNames, enabled) {
      var _this2 = this;

      if (this.eventManager) {
        eventNames.forEach(function (eventName) {
          if (_this2._events[eventName] !== enabled) {
            _this2._events[eventName] = enabled;

            if (enabled) {
              _this2.eventManager.on(eventName, _this2.handleEvent);
            } else {
              _this2.eventManager.off(eventName, _this2.handleEvent);
            }
          }
        });
      }
    }
  }, {
    key: "_onPanStart",
    value: function _onPanStart(event) {
      var pos = this.getCenter(event);
      var newMapState = this.mapState.panStart({
        pos: pos
      }).rotateStart({
        pos: pos
      });
      this.updateViewport(newMapState, NO_TRANSITION_PROPS, {
        isDragging: true
      });
      return true;
    }
  }, {
    key: "_onPan",
    value: function _onPan(event) {
      return this.isFunctionKeyPressed(event) || event.rightButton ? this._onPanRotate(event) : this._onPanMove(event);
    }
  }, {
    key: "_onPanEnd",
    value: function _onPanEnd(event) {
      var newMapState = this.mapState.panEnd().rotateEnd();
      this.updateViewport(newMapState, null, {
        isDragging: false,
        isPanning: false,
        isRotating: false
      });
      return true;
    }
  }, {
    key: "_onPanMove",
    value: function _onPanMove(event) {
      if (!this.dragPan) {
        return false;
      }

      var pos = this.getCenter(event);
      var newMapState = this.mapState.pan({
        pos: pos
      });
      this.updateViewport(newMapState, NO_TRANSITION_PROPS, {
        isPanning: true
      });
      return true;
    }
  }, {
    key: "_onPanRotate",
    value: function _onPanRotate(event) {
      if (!this.dragRotate) {
        return false;
      }

      var deltaX = event.deltaX,
          deltaY = event.deltaY;

      var _this$getCenter = this.getCenter(event),
          _this$getCenter2 = (0, _slicedToArray2["default"])(_this$getCenter, 2),
          centerY = _this$getCenter2[1];

      var startY = centerY - deltaY;

      var _this$mapState$getVie = this.mapState.getViewportProps(),
          width = _this$mapState$getVie.width,
          height = _this$mapState$getVie.height;

      var deltaScaleX = deltaX / width;
      var deltaScaleY = 0;

      if (deltaY > 0) {
        if (Math.abs(height - startY) > PITCH_MOUSE_THRESHOLD) {
          deltaScaleY = deltaY / (startY - height) * PITCH_ACCEL;
        }
      } else if (deltaY < 0) {
        if (startY > PITCH_MOUSE_THRESHOLD) {
          deltaScaleY = 1 - centerY / startY;
        }
      }

      deltaScaleY = Math.min(1, Math.max(-1, deltaScaleY));
      var newMapState = this.mapState.rotate({
        deltaScaleX: deltaScaleX,
        deltaScaleY: deltaScaleY
      });
      this.updateViewport(newMapState, NO_TRANSITION_PROPS, {
        isRotating: true
      });
      return true;
    }
  }, {
    key: "_onWheel",
    value: function _onWheel(event) {
      if (!this.scrollZoom) {
        return false;
      }

      event.preventDefault();
      var pos = this.getCenter(event);
      var delta = event.delta;
      var scale = 2 / (1 + Math.exp(-Math.abs(delta * ZOOM_ACCEL)));

      if (delta < 0 && scale !== 0) {
        scale = 1 / scale;
      }

      var newMapState = this.mapState.zoom({
        pos: pos,
        scale: scale
      });
      this.updateViewport(newMapState, NO_TRANSITION_PROPS, {
        isZooming: true
      });

      this._onWheelEnd();

      return true;
    }
  }, {
    key: "_onWheelEnd",
    value: function _onWheelEnd() {
      this.setState({
        isZooming: false
      });
    }
  }, {
    key: "_onPinchStart",
    value: function _onPinchStart(event) {
      var pos = this.getCenter(event);
      var newMapState = this.mapState.zoomStart({
        pos: pos
      }).rotateStart({
        pos: pos
      });
      this._state.startPinchRotation = event.rotation;
      this.updateViewport(newMapState, NO_TRANSITION_PROPS, {
        isDragging: true
      });
      return true;
    }
  }, {
    key: "_onPinch",
    value: function _onPinch(event) {
      if (!this.touchZoom && !this.touchRotate) {
        return false;
      }

      var newMapState = this.mapState;

      if (this.touchZoom) {
        var scale = event.scale;
        var pos = this.getCenter(event);
        newMapState = newMapState.zoom({
          pos: pos,
          scale: scale
        });
      }

      if (this.touchRotate) {
        var rotation = event.rotation;
        var startPinchRotation = this._state.startPinchRotation;
        newMapState = newMapState.rotate({
          deltaScaleX: -(rotation - startPinchRotation) / 180
        });
      }

      this.updateViewport(newMapState, NO_TRANSITION_PROPS, {
        isDragging: true,
        isPanning: this.touchZoom,
        isZooming: this.touchZoom,
        isRotating: this.touchRotate
      });
      return true;
    }
  }, {
    key: "_onPinchEnd",
    value: function _onPinchEnd(event) {
      var newMapState = this.mapState.zoomEnd().rotateEnd();
      this._state.startPinchRotation = 0;
      this.updateViewport(newMapState, null, {
        isDragging: false,
        isPanning: false,
        isZooming: false,
        isRotating: false
      });
      return true;
    }
  }, {
    key: "_onDoubleTap",
    value: function _onDoubleTap(event) {
      if (!this.doubleClickZoom) {
        return false;
      }

      var pos = this.getCenter(event);
      var isZoomOut = this.isFunctionKeyPressed(event);
      var newMapState = this.mapState.zoom({
        pos: pos,
        scale: isZoomOut ? 0.5 : 2
      });
      this.updateViewport(newMapState, Object.assign({}, LINEAR_TRANSITION_PROPS, {
        transitionInterpolator: new _transition.LinearInterpolator({
          around: pos
        })
      }), {
        isZooming: true
      });
      return true;
    }
  }, {
    key: "_onKeyDown",
    value: function _onKeyDown(event) {
      if (!this.keyboard) {
        return false;
      }

      var funcKey = this.isFunctionKeyPressed(event);
      var mapStateProps = this.mapStateProps;
      var newMapState;

      switch (event.srcEvent.keyCode) {
        case 189:
          if (funcKey) {
            newMapState = this.getMapState({
              zoom: mapStateProps.zoom - 2
            });
          } else {
            newMapState = this.getMapState({
              zoom: mapStateProps.zoom - 1
            });
          }

          break;

        case 187:
          if (funcKey) {
            newMapState = this.getMapState({
              zoom: mapStateProps.zoom + 2
            });
          } else {
            newMapState = this.getMapState({
              zoom: mapStateProps.zoom + 1
            });
          }

          break;

        case 37:
          if (funcKey) {
            newMapState = this.getMapState({
              bearing: mapStateProps.bearing - 15
            });
          } else {
            newMapState = this.mapState.pan({
              pos: [100, 0],
              startPos: [0, 0]
            });
          }

          break;

        case 39:
          if (funcKey) {
            newMapState = this.getMapState({
              bearing: mapStateProps.bearing + 15
            });
          } else {
            newMapState = this.mapState.pan({
              pos: [-100, 0],
              startPos: [0, 0]
            });
          }

          break;

        case 38:
          if (funcKey) {
            newMapState = this.getMapState({
              pitch: mapStateProps.pitch + 10
            });
          } else {
            newMapState = this.mapState.pan({
              pos: [0, 100],
              startPos: [0, 0]
            });
          }

          break;

        case 40:
          if (funcKey) {
            newMapState = this.getMapState({
              pitch: mapStateProps.pitch - 10
            });
          } else {
            newMapState = this.mapState.pan({
              pos: [0, -100],
              startPos: [0, 0]
            });
          }

          break;

        default:
          return false;
      }

      return this.updateViewport(newMapState, LINEAR_TRANSITION_PROPS);
    }
  }]);
  return MapController;
}();

exports["default"] = MapController;
//# sourceMappingURL=map-controller.js.map