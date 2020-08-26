"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cropEasingFunction = cropEasingFunction;
exports["default"] = exports.TRANSITION_EVENTS = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _assert = _interopRequireDefault(require("./assert"));

var _transition = require("./transition");

var _mapState = _interopRequireDefault(require("./map-state"));

var noop = function noop() {};

function cropEasingFunction(easing, x0) {
  var y0 = easing(x0);
  return function (t) {
    return 1 / (1 - y0) * (easing(t * (1 - x0) + x0) - y0);
  };
}

var TRANSITION_EVENTS = {
  BREAK: 1,
  SNAP_TO_END: 2,
  IGNORE: 3,
  UPDATE: 4
};
exports.TRANSITION_EVENTS = TRANSITION_EVENTS;
var DEFAULT_PROPS = {
  transitionDuration: 0,
  transitionEasing: function transitionEasing(t) {
    return t;
  },
  transitionInterpolator: new _transition.LinearInterpolator(),
  transitionInterruption: TRANSITION_EVENTS.BREAK,
  onTransitionStart: noop,
  onTransitionInterrupt: noop,
  onTransitionEnd: noop,
  onViewportChange: noop,
  onStateChange: noop
};

var TransitionManager = function () {
  function TransitionManager(props, getTime) {
    var _this = this;

    (0, _classCallCheck2["default"])(this, TransitionManager);
    (0, _defineProperty2["default"])(this, "props", void 0);
    (0, _defineProperty2["default"])(this, "state", void 0);
    (0, _defineProperty2["default"])(this, "time", void 0);
    (0, _defineProperty2["default"])(this, "_animationFrame", null);
    (0, _defineProperty2["default"])(this, "_onTransitionFrame", function () {
      _this._animationFrame = requestAnimationFrame(_this._onTransitionFrame);

      _this._updateViewport();
    });

    if (props) {
      this.props = props;
    }

    this.time = getTime || Date.now;
  }

  (0, _createClass2["default"])(TransitionManager, [{
    key: "getViewportInTransition",
    value: function getViewportInTransition() {
      return this._animationFrame ? this.state.propsInTransition : null;
    }
  }, {
    key: "processViewportChange",
    value: function processViewportChange(nextProps) {
      var currentProps = this.props;
      this.props = nextProps;

      if (this._shouldIgnoreViewportChange(currentProps, nextProps)) {
        return false;
      }

      if (this._isTransitionEnabled(nextProps)) {
        var startProps = Object.assign({}, currentProps);
        var endProps = Object.assign({}, nextProps);

        if (this._isTransitionInProgress()) {
          currentProps.onTransitionInterrupt();

          if (this.state.interruption === TRANSITION_EVENTS.SNAP_TO_END) {
            Object.assign(startProps, this.state.endProps);
          } else {
            Object.assign(startProps, this.state.propsInTransition);
          }

          if (this.state.interruption === TRANSITION_EVENTS.UPDATE) {
            var currentTime = this.time();
            var x0 = (currentTime - this.state.startTime) / this.state.duration;
            endProps.transitionDuration = this.state.duration - (currentTime - this.state.startTime);
            endProps.transitionEasing = cropEasingFunction(this.state.easing, x0);
            endProps.transitionInterpolator = startProps.transitionInterpolator;
          }
        }

        endProps.onTransitionStart();

        this._triggerTransition(startProps, endProps);

        return true;
      }

      if (this._isTransitionInProgress()) {
        currentProps.onTransitionInterrupt();

        this._endTransition();
      }

      return false;
    }
  }, {
    key: "_isTransitionInProgress",
    value: function _isTransitionInProgress() {
      return Boolean(this._animationFrame);
    }
  }, {
    key: "_isTransitionEnabled",
    value: function _isTransitionEnabled(props) {
      var transitionDuration = props.transitionDuration,
          transitionInterpolator = props.transitionInterpolator;
      return (transitionDuration > 0 || transitionDuration === 'auto') && Boolean(transitionInterpolator);
    }
  }, {
    key: "_isUpdateDueToCurrentTransition",
    value: function _isUpdateDueToCurrentTransition(props) {
      if (this.state.propsInTransition) {
        return this.state.interpolator.arePropsEqual(props, this.state.propsInTransition);
      }

      return false;
    }
  }, {
    key: "_shouldIgnoreViewportChange",
    value: function _shouldIgnoreViewportChange(currentProps, nextProps) {
      if (!currentProps) {
        return true;
      }

      if (this._isTransitionInProgress()) {
        return this.state.interruption === TRANSITION_EVENTS.IGNORE || this._isUpdateDueToCurrentTransition(nextProps);
      }

      if (this._isTransitionEnabled(nextProps)) {
        return nextProps.transitionInterpolator.arePropsEqual(currentProps, nextProps);
      }

      return true;
    }
  }, {
    key: "_triggerTransition",
    value: function _triggerTransition(startProps, endProps) {
      (0, _assert["default"])(this._isTransitionEnabled(endProps));

      if (this._animationFrame) {
        cancelAnimationFrame(this._animationFrame);
      }

      var transitionInterpolator = endProps.transitionInterpolator;
      var duration = transitionInterpolator.getDuration ? transitionInterpolator.getDuration(startProps, endProps) : endProps.transitionDuration;

      if (duration === 0) {
        return;
      }

      var initialProps = endProps.transitionInterpolator.initializeProps(startProps, endProps);
      var interactionState = {
        inTransition: true,
        isZooming: startProps.zoom !== endProps.zoom,
        isPanning: startProps.longitude !== endProps.longitude || startProps.latitude !== endProps.latitude,
        isRotating: startProps.bearing !== endProps.bearing || startProps.pitch !== endProps.pitch
      };
      this.state = {
        duration: duration,
        easing: endProps.transitionEasing,
        interpolator: endProps.transitionInterpolator,
        interruption: endProps.transitionInterruption,
        startTime: this.time(),
        startProps: initialProps.start,
        endProps: initialProps.end,
        animation: null,
        propsInTransition: {},
        interactionState: interactionState
      };

      this._onTransitionFrame();

      this.props.onStateChange(interactionState);
    }
  }, {
    key: "_endTransition",
    value: function _endTransition() {
      if (this._animationFrame) {
        cancelAnimationFrame(this._animationFrame);
        this._animationFrame = null;
      }

      this.props.onStateChange({
        inTransition: false,
        isZooming: false,
        isPanning: false,
        isRotating: false
      });
    }
  }, {
    key: "_updateViewport",
    value: function _updateViewport() {
      var currentTime = this.time();
      var _this$state = this.state,
          startTime = _this$state.startTime,
          duration = _this$state.duration,
          easing = _this$state.easing,
          interpolator = _this$state.interpolator,
          startProps = _this$state.startProps,
          endProps = _this$state.endProps;
      var shouldEnd = false;
      var t = (currentTime - startTime) / duration;

      if (t >= 1) {
        t = 1;
        shouldEnd = true;
      }

      t = easing(t);
      var viewport = interpolator.interpolateProps(startProps, endProps, t);
      var mapState = new _mapState["default"](Object.assign({}, this.props, viewport));
      this.state.propsInTransition = mapState.getViewportProps();
      this.props.onViewportChange(this.state.propsInTransition, this.state.interactionState, this.props);

      if (shouldEnd) {
        this._endTransition();

        this.props.onTransitionEnd();
      }
    }
  }]);
  return TransitionManager;
}();

exports["default"] = TransitionManager;
(0, _defineProperty2["default"])(TransitionManager, "defaultProps", DEFAULT_PROPS);
//# sourceMappingURL=transition-manager.js.map