"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _viewportMercatorProject = _interopRequireDefault(require("viewport-mercator-project"));

var _mapboxgl = _interopRequireDefault(require("../utils/mapboxgl"));

var _baseControl = _interopRequireDefault(require("./base-control"));

var _marker = _interopRequireDefault(require("./marker"));

var _mapState = _interopRequireDefault(require("../utils/map-state"));

var _transitionManager = _interopRequireDefault(require("../utils/transition-manager"));

var _geolocateUtils = require("../utils/geolocate-utils");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var LINEAR_TRANSITION_PROPS = Object.assign({}, _transitionManager["default"].defaultProps, {
  transitionDuration: 500
});

var noop = function noop() {};

var propTypes = Object.assign({}, _baseControl["default"].propTypes, {
  className: _propTypes["default"].string,
  style: _propTypes["default"].object,
  label: _propTypes["default"].string,
  auto: _propTypes["default"].bool,
  positionOptions: _propTypes["default"].object,
  fitBoundsOptions: _propTypes["default"].object,
  trackUserLocation: _propTypes["default"].bool,
  showUserLocation: _propTypes["default"].bool,
  onViewStateChange: _propTypes["default"].func,
  onViewportChange: _propTypes["default"].func,
  onGeolocate: _propTypes["default"].func
});
var defaultProps = Object.assign({}, _baseControl["default"].defaultProps, {
  className: '',
  style: {},
  label: 'Geolocate',
  auto: false,
  positionOptions: null,
  fitBoundsOptions: null,
  trackUserLocation: false,
  showUserLocation: true,
  onGeolocate: function onGeolocate() {}
});

var GeolocateControl = function (_BaseControl) {
  (0, _inherits2["default"])(GeolocateControl, _BaseControl);

  var _super = _createSuper(GeolocateControl);

  function GeolocateControl() {
    var _this;

    (0, _classCallCheck2["default"])(this, GeolocateControl);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
      supportsGeolocation: false,
      markerPosition: null
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_mapboxGeolocateControl", null);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_geolocateButtonRef", (0, React.createRef)());
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_setupMapboxGeolocateControl", function (supportsGeolocation) {
      if (!supportsGeolocation) {
        console.warn('Geolocation support is not available, the GeolocateControl will not be visible.');
        return;
      }

      var controlOptions = {
        showUserLocation: false
      };
      ['positionOptions', 'fitBoundsOptions', 'trackUserLocation'].forEach(function (prop) {
        if (prop in _this.props && _this.props[prop] !== null) {
          controlOptions[prop] = _this.props[prop];
        }
      });
      var control = new _mapboxgl["default"].GeolocateControl(controlOptions);
      _this._mapboxGeolocateControl = control;
      control._watchState = 'OFF';
      control._geolocateButton = _this._geolocateButtonRef.current;

      if (control.options.trackUserLocation && control._geolocateButton) {
        control._geolocateButton.setAttribute('aria-pressed', 'false');
      }

      control._updateMarker = _this._updateMarker;
      control._updateCamera = _this._updateCamera;
      control._setup = true;
      var eventManager = _this._context.eventManager;

      if (control.options.trackUserLocation && eventManager) {
        eventManager.on('panstart', function () {
          if (control._watchState === 'ACTIVE_LOCK') {
            control._watchState = 'BACKGROUND';

            control._geolocateButton.classList.add('mapboxgl-ctrl-geolocate-background');

            control._geolocateButton.classList.remove('mapboxgl-ctrl-geolocate-active');
          }
        });
      }

      control.on('geolocate', _this.props.onGeolocate);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_triggerGeolocate", function () {
      var control = _this._mapboxGeolocateControl;
      control._map = _this._context.map;

      if (_this.props.showUserLocation) {
        control.on('geolocate', _this._updateMarker);
        control.on('trackuserlocationend', _this._updateMarker);
      }

      return _this._mapboxGeolocateControl.trigger();
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_updateMarker", function (position) {
      if (position) {
        _this.setState({
          markerPosition: position.coords
        });
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_getBounds", function (position) {
      var center = new _mapboxgl["default"].LngLat(position.coords.longitude, position.coords.latitude);
      var radius = position.coords.accuracy;
      var bounds = center.toBounds(radius);
      return [[bounds._ne.lng, bounds._ne.lat], [bounds._sw.lng, bounds._sw.lat]];
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_updateCamera", function (position) {
      var viewport = _this._context.viewport;

      var bounds = _this._getBounds(position);

      var _WebMercatorViewport$ = new _viewportMercatorProject["default"](viewport).fitBounds(bounds),
          longitude = _WebMercatorViewport$.longitude,
          latitude = _WebMercatorViewport$.latitude,
          zoom = _WebMercatorViewport$.zoom;

      var newViewState = Object.assign({}, viewport, {
        longitude: longitude,
        latitude: latitude,
        zoom: zoom
      });
      var mapState = new _mapState["default"](newViewState);
      var viewState = Object.assign({}, mapState.getViewportProps(), LINEAR_TRANSITION_PROPS);
      var onViewportChange = _this.props.onViewportChange || _this._context.onViewportChange || noop;
      var onViewStateChange = _this.props.onViewStateChange || _this._context.onViewStateChange || noop;
      onViewStateChange({
        viewState: viewState
      });
      onViewportChange(viewState);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_renderButton", function (type, label, callback) {
      return React.createElement("button", {
        key: type,
        className: "mapboxgl-ctrl-icon mapboxgl-ctrl-".concat(type),
        ref: _this._geolocateButtonRef,
        type: "button",
        title: label,
        onClick: callback
      }, React.createElement("span", {
        className: "mapboxgl-ctrl-icon",
        "aria-hidden": "true"
      }));
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_renderMarker", function () {
      var markerPosition = _this.state.markerPosition;
      var showUserLocation = _this.props.showUserLocation;

      if (!markerPosition || !showUserLocation) {
        return null;
      }

      return React.createElement(_marker["default"], {
        key: "location-maker",
        className: "mapboxgl-user-location-dot",
        longitude: markerPosition.longitude,
        latitude: markerPosition.latitude,
        onContextMenu: function onContextMenu(e) {
          return e.preventDefault();
        },
        captureDrag: false,
        captureDoubleClick: false
      });
    });
    return _this;
  }

  (0, _createClass2["default"])(GeolocateControl, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      (0, _geolocateUtils.isGeolocationSupported)().then(function (result) {
        _this2.setState({
          supportsGeolocation: result
        });

        _this2._setupMapboxGeolocateControl(result);

        if (result && _this2.props.auto) {
          _this2._triggerGeolocate();
        }
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.state.supportsGeolocation && !prevProps.auto && this.props.auto) {
        this._triggerGeolocate();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this._mapboxGeolocateControl) {
        var geolocationWatchID = this._mapboxGeolocateControl._geolocationWatchID;

        if (geolocationWatchID !== undefined) {
          window.navigator.geolocation.clearWatch(geolocationWatchID);
          this._mapboxGeolocateControl._geolocationWatchID = undefined;
        }
      }
    }
  }, {
    key: "_render",
    value: function _render() {
      if (!this.state.supportsGeolocation) {
        return null;
      }

      var _this$props = this.props,
          className = _this$props.className,
          style = _this$props.style,
          label = _this$props.label;
      return React.createElement("div", null, this._renderMarker(), React.createElement("div", {
        key: "geolocate-control",
        className: "mapboxgl-ctrl mapboxgl-ctrl-group ".concat(className),
        ref: this._containerRef,
        style: style,
        onContextMenu: function onContextMenu(e) {
          return e.preventDefault();
        }
      }, this._renderButton('geolocate', label, this._triggerGeolocate)));
    }
  }]);
  return GeolocateControl;
}(_baseControl["default"]);

exports["default"] = GeolocateControl;
(0, _defineProperty2["default"])(GeolocateControl, "propTypes", propTypes);
(0, _defineProperty2["default"])(GeolocateControl, "defaultProps", defaultProps);
//# sourceMappingURL=geolocate-control.js.map