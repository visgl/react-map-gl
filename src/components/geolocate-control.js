// @flow

import * as React from 'react';
import {useRef, useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import {document} from '../utils/globals';
import mapboxgl from '../utils/mapboxgl';

import MapState from '../utils/map-state';
import TransitionManager from '../utils/transition-manager';
import {isGeolocationSupported} from '../utils/geolocate-utils';

import useMapControl, {mapControlDefaultProps, mapControlPropTypes} from './use-map-control';

import type {MapControlProps} from './use-map-control';

const LINEAR_TRANSITION_PROPS = Object.assign({}, TransitionManager.defaultProps, {
  transitionDuration: 500
});

const noop = () => {};

const propTypes = Object.assign({}, mapControlPropTypes, {
  // Custom className
  className: PropTypes.string,
  style: PropTypes.object,
  // Custom label assigned to the control
  label: PropTypes.string,
  // Auto trigger instead of waiting for click
  auto: PropTypes.bool,

  // mapbox geolocate options
  // https://docs.mapbox.com/mapbox-gl-js/api/#geolocatecontrol
  positionOptions: PropTypes.object,
  fitBoundsOptions: PropTypes.object,
  trackUserLocation: PropTypes.bool,
  showUserLocation: PropTypes.bool,
  showAccuracyCircle: PropTypes.bool,

  // Callbacks fired when the user interacted with the map. The object passed to the callbacks
  // contains viewport properties such as `longitude`, `latitude`, `zoom` etc.
  onViewStateChange: PropTypes.func,
  onViewportChange: PropTypes.func,

  onGeolocate: PropTypes.func
});

const defaultProps = Object.assign({}, mapControlDefaultProps, {
  className: '',
  style: {},
  label: 'Geolocate',
  auto: false,

  // mapbox geolocate options
  positionOptions: {enableHighAccuracy: false, timeout: 6000},
  fitBoundsOptions: {maxZoom: 15},
  trackUserLocation: false,
  showUserLocation: true,
  showAccuracyCircle: true,

  onGeolocate: () => {}
});

export type GeolocateControlProps = MapControlProps & {
  className: string,
  style: Object,
  label: string,
  auto: boolean,
  positionOptions: any,
  fitBoundsOptions: any,
  trackUserLocation: boolean,
  showUserLocation: boolean,
  showAccuracyCircle: boolean,
  onViewStateChange?: Function,
  onViewportChange?: Function,
  onGeolocate?: Function
};

type Coordinate = {
  longitude: number,
  latitude: number,
  accuracy: number
};
type Position = {
  coords: Coordinate
};

function getBounds(position: Position) {
  const center = new mapboxgl.LngLat(position.coords.longitude, position.coords.latitude);
  const radius = position.coords.accuracy;
  const bounds = center.toBounds(radius);

  return [[bounds._ne.lng, bounds._ne.lat], [bounds._sw.lng, bounds._sw.lat]];
}

function setupMapboxGeolocateControl(context, props, geolocateButton) {
  const control = new mapboxgl.GeolocateControl(props);

  /* the following re-implement MapboxGeolocateControl's _setupUI */

  // replace mapbox internal UI elements
  control._geolocateButton = geolocateButton;
  if (props.trackUserLocation) {
    control._watchState = 'OFF';
  }
  if (props.showUserLocation) {
    const dotElement = document.createElement('div');
    dotElement.className = 'mapboxgl-user-location-dot';
    control._dotElement = dotElement;

    const circleElement = document.createElement('div');
    circleElement.className = 'mapboxgl-user-location-accuracy-circle';
    control._circleElement = circleElement;

    control._userLocationDotMarker = new mapboxgl.Marker(dotElement);
    control._accuracyCircleMarker = new mapboxgl.Marker({
      element: circleElement,
      pitchAlignment: 'map'
    });
  }

  control._setup = true;

  // when the camera is changed (and it's not as a result of the Geolocation Control) change
  // the watch mode to background watch, so that the marker is updated but not the camera.
  const {eventManager} = context;
  if (control.options.trackUserLocation && eventManager) {
    eventManager.on('panstart', () => {
      if (control._watchState === 'ACTIVE_LOCK') {
        control._watchState = 'BACKGROUND';
        control._geolocateButton.classList.add('mapboxgl-ctrl-geolocate-background');
        control._geolocateButton.classList.remove('mapboxgl-ctrl-geolocate-active');
      }
    });
  }

  control.on('geolocate', props.onGeolocate);
  return control;
}

function triggerGeolocate(context, props, control) {
  if (control) {
    control._map = context.map;
    control.options = props;
    control.trigger();
  }
}

function updateCamera(position: Position, {context, props}) {
  const bounds = getBounds(position);
  const {longitude, latitude, zoom} = context.viewport.fitBounds(bounds);

  const newViewState = Object.assign({}, context.viewport, {
    longitude,
    latitude,
    zoom
  });
  const mapState = new MapState(newViewState);
  const viewState = Object.assign({}, mapState.getViewportProps(), LINEAR_TRANSITION_PROPS);

  const onViewportChange = props.onViewportChange || context.onViewportChange || noop;
  const onViewStateChange = props.onViewStateChange || context.onViewStateChange || noop;

  // Call new style callback
  onViewStateChange({viewState});

  // Call old style callback
  onViewportChange(viewState);
}

function GeolocateControl(props: GeolocateControlProps) {
  const thisRef = useMapControl(props);
  const {context, containerRef} = thisRef;
  const geolocateButtonRef = useRef<null | HTMLElement>(null);
  const [mapboxGeolocateControl, createMapboxGeolocateControl] = useState(null);
  const [supportsGeolocation, setSupportsGeolocation] = useState(false);

  useEffect(() => {
    let control;

    isGeolocationSupported().then(result => {
      setSupportsGeolocation(result);

      control = setupMapboxGeolocateControl(context, props, geolocateButtonRef.current);
      // Overwrite Mapbox's GeolocateControl internal method
      control._updateCamera = (position: Position) => updateCamera(position, thisRef);
      createMapboxGeolocateControl(control);
    });

    return () => {
      control._clearWatch();
    };
  }, []);

  useEffect(
    () => {
      if (props.auto) {
        triggerGeolocate(context, props, mapboxGeolocateControl);
      }
    },
    [mapboxGeolocateControl, props.auto]
  );

  const {className, style, label, trackUserLocation} = props;
  return (
    <div>
      <div
        key="geolocate-control"
        className={`mapboxgl-ctrl mapboxgl-ctrl-group ${className}`}
        ref={containerRef}
        style={style}
      >
        <button
          key="geolocate"
          className={`mapboxgl-ctrl-icon mapboxgl-ctrl-geolocate`}
          ref={geolocateButtonRef}
          disabled={!supportsGeolocation}
          aria-pressed={!trackUserLocation}
          type="button"
          title={label}
          onClick={() => triggerGeolocate(context, props, mapboxGeolocateControl)}
        >
          <span className="mapboxgl-ctrl-icon" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

GeolocateControl.propTypes = propTypes;
GeolocateControl.defaultProps = defaultProps;

export default GeolocateControl;
