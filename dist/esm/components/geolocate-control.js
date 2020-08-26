import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import * as React from 'react';
import { createRef } from 'react';
import PropTypes from 'prop-types';
import WebMercatorViewport from 'viewport-mercator-project';
import mapboxgl from '../utils/mapboxgl';
import BaseControl from './base-control';
import Marker from './marker';
import MapState from '../utils/map-state';
import TransitionManager from '../utils/transition-manager';
import { isGeolocationSupported } from '../utils/geolocate-utils';
var LINEAR_TRANSITION_PROPS = Object.assign({}, TransitionManager.defaultProps, {
  transitionDuration: 500
});

var noop = function noop() {};

var propTypes = Object.assign({}, BaseControl.propTypes, {
  className: PropTypes.string,
  style: PropTypes.object,
  label: PropTypes.string,
  auto: PropTypes.bool,
  positionOptions: PropTypes.object,
  fitBoundsOptions: PropTypes.object,
  trackUserLocation: PropTypes.bool,
  showUserLocation: PropTypes.bool,
  onViewStateChange: PropTypes.func,
  onViewportChange: PropTypes.func,
  onGeolocate: PropTypes.func
});
var defaultProps = Object.assign({}, BaseControl.defaultProps, {
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
  _inherits(GeolocateControl, _BaseControl);

  var _super = _createSuper(GeolocateControl);

  function GeolocateControl() {
    var _this;

    _classCallCheck(this, GeolocateControl);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      supportsGeolocation: false,
      markerPosition: null
    });

    _defineProperty(_assertThisInitialized(_this), "_mapboxGeolocateControl", null);

    _defineProperty(_assertThisInitialized(_this), "_geolocateButtonRef", createRef());

    _defineProperty(_assertThisInitialized(_this), "_setupMapboxGeolocateControl", function (supportsGeolocation) {
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
      var control = new mapboxgl.GeolocateControl(controlOptions);
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

    _defineProperty(_assertThisInitialized(_this), "_triggerGeolocate", function () {
      var control = _this._mapboxGeolocateControl;
      control._map = _this._context.map;

      if (_this.props.showUserLocation) {
        control.on('geolocate', _this._updateMarker);
        control.on('trackuserlocationend', _this._updateMarker);
      }

      return _this._mapboxGeolocateControl.trigger();
    });

    _defineProperty(_assertThisInitialized(_this), "_updateMarker", function (position) {
      if (position) {
        _this.setState({
          markerPosition: position.coords
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_getBounds", function (position) {
      var center = new mapboxgl.LngLat(position.coords.longitude, position.coords.latitude);
      var radius = position.coords.accuracy;
      var bounds = center.toBounds(radius);
      return [[bounds._ne.lng, bounds._ne.lat], [bounds._sw.lng, bounds._sw.lat]];
    });

    _defineProperty(_assertThisInitialized(_this), "_updateCamera", function (position) {
      var viewport = _this._context.viewport;

      var bounds = _this._getBounds(position);

      var _WebMercatorViewport$ = new WebMercatorViewport(viewport).fitBounds(bounds),
          longitude = _WebMercatorViewport$.longitude,
          latitude = _WebMercatorViewport$.latitude,
          zoom = _WebMercatorViewport$.zoom;

      var newViewState = Object.assign({}, viewport, {
        longitude: longitude,
        latitude: latitude,
        zoom: zoom
      });
      var mapState = new MapState(newViewState);
      var viewState = Object.assign({}, mapState.getViewportProps(), LINEAR_TRANSITION_PROPS);
      var onViewportChange = _this.props.onViewportChange || _this._context.onViewportChange || noop;
      var onViewStateChange = _this.props.onViewStateChange || _this._context.onViewStateChange || noop;
      onViewStateChange({
        viewState: viewState
      });
      onViewportChange(viewState);
    });

    _defineProperty(_assertThisInitialized(_this), "_renderButton", function (type, label, callback) {
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

    _defineProperty(_assertThisInitialized(_this), "_renderMarker", function () {
      var markerPosition = _this.state.markerPosition;
      var showUserLocation = _this.props.showUserLocation;

      if (!markerPosition || !showUserLocation) {
        return null;
      }

      return React.createElement(Marker, {
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

  _createClass(GeolocateControl, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      isGeolocationSupported().then(function (result) {
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
}(BaseControl);

_defineProperty(GeolocateControl, "propTypes", propTypes);

_defineProperty(GeolocateControl, "defaultProps", defaultProps);

export { GeolocateControl as default };
//# sourceMappingURL=geolocate-control.js.map