/* global window */
import {createElement, createRef} from 'react';
import PropTypes from 'prop-types';
import WebMercatorViewport from 'viewport-mercator-project';

import mapboxgl from '../utils/mapboxgl';

import BaseControl from './base-control';
import Marker from './marker';
import MapState from '../utils/map-state';
import TransitionManager from '../utils/transition-manager';
import {isGeolocationSupported} from '../utils/geolocate-utils';

const LINEAR_TRANSITION_PROPS = Object.assign(
  {},
  TransitionManager.defaultProps,
  {
    transitionDuration: 500
  }
);

const propTypes = Object.assign({}, BaseControl.propTypes, {
  // Custom className
  className: PropTypes.string,
  style: PropTypes.object,

  // mapbox geolocate options
  // https://docs.mapbox.com/mapbox-gl-js/api/#geolocatecontrol
  positionOptions: PropTypes.object,
  fitBoundsOptions: PropTypes.object,
  trackUserLocation: PropTypes.bool,
  showUserLocation: PropTypes.bool,

  // Callbacks fired when the user interacted with the map. The object passed to the callbacks
  // contains viewport properties such as `longitude`, `latitude`, `zoom` etc.
  onViewStateChange: PropTypes.func,
  onViewportChange: PropTypes.func
});

const defaultProps = Object.assign({}, BaseControl.defaultProps, {
  className: '',
  style: {},

  // mapbox geolocate options
  positionOptions: null,
  fitBoundsOptions: null,
  trackUserLocation: false,
  showUserLocation: true,

  // viewport handlers
  onViewStateChange: () => {},
  onViewportChange: () => {}
});

export default class GeolocateControl extends BaseControl {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  constructor(props) {
    super(props);

    this.state = {
      supportsGeolocation: null,
      markerPosition: null
    };
  }

  _containerRef: { current: null | HTMLDivElement } = createRef();
  _geolocateButtonRef: { current: null | HTMLDivElement } = createRef();
  _markerRef: { current: null | HTMLDivElement } = createRef();

  componentDidMount() {
    isGeolocationSupported().then(result => {
      this.setState({supportsGeolocation: result});
      this._setupMapboxGeolocateControl(result);
    });
  }

  componentDidUpdate() {
    // MapboxGeolocateControl needs manipulate the style of Marker's container
    const markerRef = this._markerRef.current;
    if (this._mapboxGeolocateControl && markerRef) {
      this._mapboxGeolocateControl._dotElement = markerRef._containerRef.current;
    }
  }

  componentWillUnmount() {
    // re-implement MapboxGeolocateControl's _onRemove
    // clear the geolocation watch if exists
    const geolocationWatchID = this._mapboxGeolocateControl._geolocationWatchID;
    if (geolocationWatchID !== undefined) {
      window.navigator.geolocation.clearWatch(geolocationWatchID);
      this._mapboxGeolocateControl._geolocationWatchID = undefined;
    }
  }

  _setupMapboxGeolocateControl = (supportsGeolocation) => {
    if (!supportsGeolocation) {
      /* eslint-disable no-console, no-undef */
      console.warn(
        'Geolocation support is not available, the GeolocateControl will not be visible.'
      );
      /* eslint-enable no-console, no-undef */
      return;
    }

    const controlOptions = {};
    ['positionOptions', 'fitBoundsOptions', 'trackUserLocation', 'showUserLocation'].forEach(
      prop => {
        // For null option, use Mapbox default value
        if (prop in this.props && this.props[prop] !== null) {
          controlOptions[prop] = this.props[prop];
        }
      }
    );

    this._mapboxGeolocateControl = new mapboxgl.GeolocateControl(controlOptions);

    // the following re-implement MapboxGeolocateControl's _setupUI
    // replace mapbox internal prop
    this._mapboxGeolocateControl._watchState = 'OFF';

    // replace mapbox internal UI elements
    this._mapboxGeolocateControl._geolocateButton = this._geolocateButtonRef.current;

    // replace mapbox internal methods
    this._mapboxGeolocateControl._updateMarker = this._updateMarker;
    this._mapboxGeolocateControl._updateCamera = this._updateCamera;

    this._mapboxGeolocateControl._setup = true;
  };

  _onClickGeolocate = () => {
    return this._mapboxGeolocateControl.trigger();
  };

  _updateMarker = position => {
    if (position) {
      this.setState({markerPosition: position.coords});
    }
  };

  _getBounds = position => {
    const center = new mapboxgl.LngLat(
      position.coords.longitude,
      position.coords.latitude
    );
    const radius = position.coords.accuracy;
    const bounds = center.toBounds(radius);

    return [
      [bounds._ne.lng, bounds._ne.lat],
      [bounds._sw.lng, bounds._sw.lat]
    ];
  };

  _updateCamera = position => {
    const {viewport} = this._context;

    const bounds = this._getBounds(position);
    const {longitude, latitude, zoom} = new WebMercatorViewport(viewport).fitBounds(bounds);

    const newViewState = Object.assign({}, viewport, {longitude, latitude, zoom});
    const mapState = new MapState(newViewState);
    const viewState = Object.assign(
      {},
      mapState.getViewportProps(),
      LINEAR_TRANSITION_PROPS
    );

    // Call new style callback
    this.props.onViewStateChange({viewState});

    // Call old style callback
    this.props.onViewportChange(viewState);
  };

  _renderButton = (type, label, callback, children) => {
    return createElement('button', {
      key: type,
      className: `mapboxgl-ctrl-icon mapboxgl-ctrl-${type}`,
      ref: this._geolocateButtonRef,
      type: 'button',
      title: label,
      onClick: callback,
      children
    });
  };

  _renderMarker = () => {
    const {showUserLocation} = this.props;
    const {markerPosition} = this.state;
    if (!showUserLocation || !markerPosition) {
      return null;
    }

    return createElement(Marker, {
      key: 'location-maker',
      ref: this._markerRef,
      className: 'mapboxgl-user-location-dot',
      longitude: markerPosition.longitude,
      latitude: markerPosition.latitude,
      onContextMenu: e => e.preventDefault(),
      captureDrag: false,
      captureDoubleClick: false
    });
  };

  _render() {
    if (!this.state.supportsGeolocation) {
      return null;
    }

    const {className, style} = this.props;
    return createElement('div', null, [
      this._renderMarker(),
      createElement('div', {
        className: `mapboxgl-ctrl mapboxgl-ctrl-group ${className}`,
        ref: this._containerRef,
        style,
        onContextMenu: e => e.preventDefault()
      }, this._renderButton('geolocate', 'Geolocate', this._onClickGeolocate)
    )]
    );
  }
}
