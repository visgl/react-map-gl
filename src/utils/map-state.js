import WebMercatorViewport, {normalizeViewportProps} from 'viewport-mercator-project';
import {clamp} from './math-utils';
import assert from './assert';

// MAPBOX LIMITS
export const MAPBOX_LIMITS = {
  minZoom: 0,
  maxZoom: 24,
  minPitch: 0,
  maxPitch: 60
};

const DEFAULT_STATE = {
  pitch: 0,
  bearing: 0,
  altitude: 1.5
};

const PITCH_MOUSE_THRESHOLD = 5;
const PITCH_ACCEL = 1.2;

export default class MapState {
  constructor({
    /** Mapbox viewport properties */
    /** The width of the viewport */
    width,
    /** The height of the viewport */
    height,
    /** The latitude at the center of the viewport */
    latitude,
    /** The longitude at the center of the viewport */
    longitude,
    /** The tile zoom level of the map. */
    zoom,
    /** The bearing of the viewport in degrees */
    bearing = DEFAULT_STATE.bearing,
    /** The pitch of the viewport in degrees */
    pitch = DEFAULT_STATE.pitch,
    /**
     * Specify the altitude of the viewport camera
     * Unit: map heights, default 1.5
     * Non-public API, see https://github.com/mapbox/mapbox-gl-js/issues/1137
     */
    altitude = DEFAULT_STATE.altitude,

    /** Viewport constraints */
    maxZoom = MAPBOX_LIMITS.maxZoom,
    minZoom = MAPBOX_LIMITS.minZoom,
    maxPitch = MAPBOX_LIMITS.maxPitch,
    minPitch = MAPBOX_LIMITS.minPitch,

    /** Transition props */
    transitionDuration,
    transitionEasing,
    transitionInterpolator,
    transitionInterruption,

    /** Interaction states, required to calculate change during transform */
    /* The point on map being grabbed when the operation first started */
    startPanLngLat,
    /* Center of the zoom when the operation first started */
    startZoomLngLat,
    /* Cursor position when the rotate operation started */
    startRotatePos,
    /** Bearing when current perspective rotate operation started */
    startBearing,
    /** Pitch when current perspective rotate operation started */
    startPitch,
    /** Zoom when current zoom operation started */
    startZoom
  }) {
    assert(Number.isFinite(width), '`width` must be supplied');
    assert(Number.isFinite(height), '`height` must be supplied');
    assert(Number.isFinite(longitude), '`longitude` must be supplied');
    assert(Number.isFinite(latitude), '`latitude` must be supplied');
    assert(Number.isFinite(zoom), '`zoom` must be supplied');

    this._viewportProps = this._applyConstraints({
      width,
      height,
      latitude,
      longitude,
      zoom,
      bearing,
      pitch,
      altitude,
      maxZoom,
      minZoom,
      maxPitch,
      minPitch,
      transitionDuration,
      transitionEasing,
      transitionInterpolator,
      transitionInterruption
    });

    this._state = {
      startPanLngLat,
      startZoomLngLat,
      startRotatePos,
      startBearing,
      startPitch,
      startZoom
    };
  }

  /* Public API */

  getViewportProps() {
    return this._viewportProps;
  }

  getState() {
    return this._state;
  }

  /**
   * Start panning
   * @param {Object} params
   * @param {[Number, Number]} params.pos - position on screen where the pointer grabs
   */
  panStart({pos}) {
    return this._getUpdatedMapState({
      startPanLngLat: this._unproject(pos)
    });
  }

  /**
   * Pan
   * @param {Object} params
   * @param {[Number, Number]} params.pos - position on screen where the pointer is
   * @param {[Number, Number]} [params.startPos] - where the pointer grabbed at
   *   the start of the operation. Must be supplied of `panStart()` was not called
   */
  pan({pos, startPos}) {
    const startPanLngLat = this._state.startPanLngLat || this._unproject(startPos);

    if (!startPanLngLat) {
      return this;
    }

    const [longitude, latitude] = this._calculateNewLngLat({
      startPanLngLat,
      pos
    });

    return this._getUpdatedMapState({
      longitude,
      latitude
    });
  }

  /**
   * End panning
   * Must call if `panStart()` was called
   */
  panEnd() {
    return this._getUpdatedMapState({
      startPanLngLat: null
    });
  }

  /**
   * Start rotating
   * @param {Object} params
   * @param {[Number, Number]} params.pos - position on screen where the center is
   */
  rotateStart({pos}) {
    return this._getUpdatedMapState({
      startRotatePos: pos,
      startBearing: this._viewportProps.bearing,
      startPitch: this._viewportProps.pitch
    });
  }

  /**
   * Rotate
   * @param {Object} params
   * @param {[Number, Number]} params.pos - position on screen where the center is
   * @param {Number} params.deltaAngleX - the change to bearing.
   * @param {Number} params.deltaAngleY - the change to pitch.
   */
  rotate({pos, deltaAngleX = 0, deltaAngleY = 0}) {
    const {startRotatePos, startBearing, startPitch} = this._state;

    if (!Number.isFinite(startBearing) || !Number.isFinite(startPitch)) {
      return this;
    }

    let newRotation;
    if (pos) {
      newRotation = this._calculateNewPitchAndBearing({
        ...this._getRotationParams(pos, startRotatePos),
        startBearing,
        startPitch
      });
    } else {
      newRotation = {
        bearing: startBearing + deltaAngleX,
        pitch: startPitch + deltaAngleY
      };
    }

    return this._getUpdatedMapState(newRotation);
  }

  /**
   * End rotating
   * Must call if `rotateStart()` was called
   */
  rotateEnd() {
    return this._getUpdatedMapState({
      startBearing: null,
      startPitch: null
    });
  }

  /**
   * Start zooming
   * @param {Object} params
   * @param {[Number, Number]} params.pos - position on screen where the center is
   */
  zoomStart({pos}) {
    return this._getUpdatedMapState({
      startZoomLngLat: this._unproject(pos),
      startZoom: this._viewportProps.zoom
    });
  }

  /**
   * Zoom
   * @param {Object} params
   * @param {[Number, Number]} params.pos - position on screen where the current center is
   * @param {[Number, Number]} [params.startPos] - the center position at
   *   the start of the operation. Must be supplied of `zoomStart()` was not called
   * @param {Number} params.scale - a number between [0, 1] specifying the accumulated
   *   relative scale.
   */
  zoom({pos, startPos, scale}) {
    assert(scale > 0, '`scale` must be a positive number');

    // Make sure we zoom around the current mouse position rather than map center
    let {startZoom, startZoomLngLat} = this._state;

    if (!Number.isFinite(startZoom)) {
      // We have two modes of zoom:
      // scroll zoom that are discrete events (transform from the current zoom level),
      // and pinch zoom that are continuous events (transform from the zoom level when
      // pinch started).
      // If startZoom state is defined, then use the startZoom state;
      // otherwise assume discrete zooming
      startZoom = this._viewportProps.zoom;
      startZoomLngLat = this._unproject(startPos) || this._unproject(pos);
    }

    // take the start lnglat and put it where the mouse is down.
    assert(
      startZoomLngLat,
      '`startZoomLngLat` prop is required ' +
        'for zoom behavior to calculate where to position the map.'
    );

    const zoom = this._calculateNewZoom({scale, startZoom: startZoom || 0});

    const zoomedViewport = new WebMercatorViewport(Object.assign({}, this._viewportProps, {zoom}));
    const [longitude, latitude] = zoomedViewport.getMapCenterByLngLatPosition({
      lngLat: startZoomLngLat,
      pos
    });

    return this._getUpdatedMapState({
      zoom,
      longitude,
      latitude
    });
  }

  /**
   * End zooming
   * Must call if `zoomStart()` was called
   */
  zoomEnd() {
    return this._getUpdatedMapState({
      startZoomLngLat: null,
      startZoom: null
    });
  }

  /* Private methods */

  _getUpdatedMapState(newProps) {
    // Update _viewportProps
    return new MapState(Object.assign({}, this._viewportProps, this._state, newProps));
  }

  // Apply any constraints (mathematical or defined by _viewportProps) to map state
  _applyConstraints(props) {
    // Ensure zoom is within specified range
    const {maxZoom, minZoom, zoom} = props;
    props.zoom = clamp(zoom, minZoom, maxZoom);

    // Ensure pitch is within specified range
    const {maxPitch, minPitch, pitch} = props;
    props.pitch = clamp(pitch, minPitch, maxPitch);

    Object.assign(props, normalizeViewportProps(props));

    return props;
  }

  _unproject(pos) {
    const viewport = new WebMercatorViewport(this._viewportProps);
    return pos && viewport.unproject(pos);
  }

  // Calculate a new lnglat based on pixel dragging position
  _calculateNewLngLat({startPanLngLat, pos}) {
    const viewport = new WebMercatorViewport(this._viewportProps);
    return viewport.getMapCenterByLngLatPosition({
      lngLat: startPanLngLat,
      pos
    });
  }

  // Calculates new zoom
  _calculateNewZoom({scale, startZoom}) {
    const {maxZoom, minZoom} = this._viewportProps;
    const zoom = startZoom + Math.log2(scale);
    return clamp(zoom, minZoom, maxZoom);
  }

  // Calculates a new pitch and bearing from a position (coming from an event)
  _calculateNewPitchAndBearing({deltaScaleX, deltaScaleY, startBearing, startPitch}) {
    // clamp deltaScaleY to [-1, 1] so that rotation is constrained between minPitch and maxPitch.
    // deltaScaleX does not need to be clamped as bearing does not have constraints.
    deltaScaleY = clamp(deltaScaleY, -1, 1);

    const {minPitch, maxPitch} = this._viewportProps;

    const bearing = startBearing + 180 * deltaScaleX;
    let pitch = startPitch;
    if (deltaScaleY > 0) {
      // Gradually increase pitch
      pitch = startPitch + deltaScaleY * (maxPitch - startPitch);
    } else if (deltaScaleY < 0) {
      // Gradually decrease pitch
      pitch = startPitch - deltaScaleY * (minPitch - startPitch);
    }

    return {
      pitch,
      bearing
    };
  }

  _getRotationParams(pos, startPos) {
    const deltaX = pos[0] - startPos[0];
    const deltaY = pos[1] - startPos[1];
    const centerY = pos[1];
    const startY = startPos[1];
    const {width, height} = this._viewportProps;

    const deltaScaleX = deltaX / width;
    let deltaScaleY = 0;

    if (deltaY > 0) {
      if (Math.abs(height - startY) > PITCH_MOUSE_THRESHOLD) {
        // Move from 0 to -1 as we drag upwards
        deltaScaleY = (deltaY / (startY - height)) * PITCH_ACCEL;
      }
    } else if (deltaY < 0) {
      if (startY > PITCH_MOUSE_THRESHOLD) {
        // Move from 0 to 1 as we drag upwards
        deltaScaleY = 1 - centerY / startY;
      }
    }
    deltaScaleY = Math.min(1, Math.max(-1, deltaScaleY));
    return {deltaScaleX, deltaScaleY};
  }
}
