import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
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
const LINEAR_TRANSITION_PROPS = Object.assign({}, TransitionManager.defaultProps, {
  transitionDuration: 500
});

const noop = () => {};

const propTypes = Object.assign({}, BaseControl.propTypes, {
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
const defaultProps = Object.assign({}, BaseControl.defaultProps, {
  className: '',
  style: {},
  label: 'Geolocate',
  auto: false,
  positionOptions: null,
  fitBoundsOptions: null,
  trackUserLocation: false,
  showUserLocation: true,
  onGeolocate: () => {}
});
export default class GeolocateControl extends BaseControl {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      supportsGeolocation: false,
      markerPosition: null
    });

    _defineProperty(this, "_mapboxGeolocateControl", null);

    _defineProperty(this, "_geolocateButtonRef", createRef());

    _defineProperty(this, "_setupMapboxGeolocateControl", supportsGeolocation => {
      if (!supportsGeolocation) {
        console.warn('Geolocation support is not available, the GeolocateControl will not be visible.');
        return;
      }

      const controlOptions = {
        showUserLocation: false
      };
      ['positionOptions', 'fitBoundsOptions', 'trackUserLocation'].forEach(prop => {
        if (prop in this.props && this.props[prop] !== null) {
          controlOptions[prop] = this.props[prop];
        }
      });
      const control = new mapboxgl.GeolocateControl(controlOptions);
      this._mapboxGeolocateControl = control;
      control._watchState = 'OFF';
      control._geolocateButton = this._geolocateButtonRef.current;

      if (control.options.trackUserLocation && control._geolocateButton) {
        control._geolocateButton.setAttribute('aria-pressed', 'false');
      }

      control._updateMarker = this._updateMarker;
      control._updateCamera = this._updateCamera;
      control._setup = true;
      const {
        eventManager
      } = this._context;

      if (control.options.trackUserLocation && eventManager) {
        eventManager.on('panstart', () => {
          if (control._watchState === 'ACTIVE_LOCK') {
            control._watchState = 'BACKGROUND';

            control._geolocateButton.classList.add('mapboxgl-ctrl-geolocate-background');

            control._geolocateButton.classList.remove('mapboxgl-ctrl-geolocate-active');
          }
        });
      }

      control.on('geolocate', this.props.onGeolocate);
    });

    _defineProperty(this, "_triggerGeolocate", () => {
      const control = this._mapboxGeolocateControl;
      control._map = this._context.map;

      if (this.props.showUserLocation) {
        control.on('geolocate', this._updateMarker);
        control.on('trackuserlocationend', this._updateMarker);
      }

      return this._mapboxGeolocateControl.trigger();
    });

    _defineProperty(this, "_updateMarker", position => {
      if (position) {
        this.setState({
          markerPosition: position.coords
        });
      }
    });

    _defineProperty(this, "_getBounds", position => {
      const center = new mapboxgl.LngLat(position.coords.longitude, position.coords.latitude);
      const radius = position.coords.accuracy;
      const bounds = center.toBounds(radius);
      return [[bounds._ne.lng, bounds._ne.lat], [bounds._sw.lng, bounds._sw.lat]];
    });

    _defineProperty(this, "_updateCamera", position => {
      const {
        viewport
      } = this._context;

      const bounds = this._getBounds(position);

      const {
        longitude,
        latitude,
        zoom
      } = new WebMercatorViewport(viewport).fitBounds(bounds);
      const newViewState = Object.assign({}, viewport, {
        longitude,
        latitude,
        zoom
      });
      const mapState = new MapState(newViewState);
      const viewState = Object.assign({}, mapState.getViewportProps(), LINEAR_TRANSITION_PROPS);
      const onViewportChange = this.props.onViewportChange || this._context.onViewportChange || noop;
      const onViewStateChange = this.props.onViewStateChange || this._context.onViewStateChange || noop;
      onViewStateChange({
        viewState
      });
      onViewportChange(viewState);
    });

    _defineProperty(this, "_renderButton", (type, label, callback) => {
      return React.createElement("button", {
        key: type,
        className: "mapboxgl-ctrl-icon mapboxgl-ctrl-".concat(type),
        ref: this._geolocateButtonRef,
        type: "button",
        title: label,
        onClick: callback
      }, React.createElement("span", {
        className: "mapboxgl-ctrl-icon",
        "aria-hidden": "true"
      }));
    });

    _defineProperty(this, "_renderMarker", () => {
      const {
        markerPosition
      } = this.state;
      const {
        showUserLocation
      } = this.props;

      if (!markerPosition || !showUserLocation) {
        return null;
      }

      return React.createElement(Marker, {
        key: "location-maker",
        className: "mapboxgl-user-location-dot",
        longitude: markerPosition.longitude,
        latitude: markerPosition.latitude,
        onContextMenu: e => e.preventDefault(),
        captureDrag: false,
        captureDoubleClick: false
      });
    });
  }

  componentDidMount() {
    isGeolocationSupported().then(result => {
      this.setState({
        supportsGeolocation: result
      });

      this._setupMapboxGeolocateControl(result);

      if (result && this.props.auto) {
        this._triggerGeolocate();
      }
    });
  }

  componentDidUpdate(prevProps) {
    if (this.state.supportsGeolocation && !prevProps.auto && this.props.auto) {
      this._triggerGeolocate();
    }
  }

  componentWillUnmount() {
    if (this._mapboxGeolocateControl) {
      const geolocationWatchID = this._mapboxGeolocateControl._geolocationWatchID;

      if (geolocationWatchID !== undefined) {
        window.navigator.geolocation.clearWatch(geolocationWatchID);
        this._mapboxGeolocateControl._geolocationWatchID = undefined;
      }
    }
  }

  _render() {
    if (!this.state.supportsGeolocation) {
      return null;
    }

    const {
      className,
      style,
      label
    } = this.props;
    return React.createElement("div", null, this._renderMarker(), React.createElement("div", {
      key: "geolocate-control",
      className: "mapboxgl-ctrl mapboxgl-ctrl-group ".concat(className),
      ref: this._containerRef,
      style: style,
      onContextMenu: e => e.preventDefault()
    }, this._renderButton('geolocate', label, this._triggerGeolocate)));
  }

}

_defineProperty(GeolocateControl, "propTypes", propTypes);

_defineProperty(GeolocateControl, "defaultProps", defaultProps);
//# sourceMappingURL=geolocate-control.js.map