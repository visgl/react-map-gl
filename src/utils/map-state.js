import PropTypes from 'prop-types';
import {PerspectiveMercatorViewport} from 'viewport-mercator-project';
import assert from 'assert';

// MAPBOX LIMITS
const MAX_PITCH = 60;
const MAX_ZOOM = 20;

function mod(value, divisor) {
  const modulus = value % divisor;
  return modulus < 0 ? divisor + modulus : modulus;
}

const propTypes = {
  /** The width of the map */
  width: PropTypes.number.isRequired,
  /** The height of the map */
  height: PropTypes.number.isRequired,
  /** The latitude of the center of the map. */
  latitude: PropTypes.number.isRequired,
  /** The longitude of the center of the map. */
  longitude: PropTypes.number.isRequired,
  /** The tile zoom level of the map. */
  zoom: PropTypes.number.isRequired,
  /** Specify the bearing of the viewport */
  bearing: PropTypes.number,
  /** Specify the pitch of the viewport */
  pitch: PropTypes.number,
  /**
    * Specify the altitude of the viewport camera
    * Unit: map heights, default 1.5
    * Non-public API, see https://github.com/mapbox/mapbox-gl-js/issues/1137
    */
  altitude: PropTypes.number,

  /** Constraints */
  maxZoom: PropTypes.number,
  minZoom: PropTypes.number,
  maxPitch: PropTypes.number,
  minPitch: PropTypes.number,

  /**
    * Required to calculate the mouse projection during panning.
    * The point on map being grabbed when the operation first started.
    */
  startPanLngLat: PropTypes.arrayOf(PropTypes.number),
  /**
    * Required to calculate the mouse projection during zooming.
    * Center of the zoom when the operation first started.
    */
  startZoomLngLat: PropTypes.arrayOf(PropTypes.number),
  /** Bearing when current perspective rotate operation started */
  startBearing: PropTypes.number,
  /** Pitch when current perspective rotate operation started */
  startPitch: PropTypes.number,
  /** Zoom when current zoom operation started */
  startZoom: PropTypes.number
};

export default class MapState {

  constructor({
    /** Mapbox viewport properties */
    width,
    height,
    latitude,
    longitude,
    zoom,
    bearing = 0,
    pitch = 0,
    altitude = 1.5,

    /** Viewport constraints */
    maxZoom = MAX_ZOOM,
    minZoom = 0,
    maxPitch = MAX_PITCH,
    minPitch = 0,

    /** Interaction states */
    startPanLngLat,
    startZoomLngLat,
    startBearing,
    startPitch,
    startZoom
  } = {}) {
    this.props = {
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
      startPanLngLat,
      startBearing,
      startPitch
    };
  }

  _updateViewport(opts) {
    // Update props
    Object.assign(this.props, opts);
    this._applyConstraints();
    return this;
  }

  // Apply any constraints (mathematical or defined by props) to viewport params
  _applyConstraints() {
    const viewport = this.props;
    // Normalize degrees
    viewport.longitude = mod(viewport.longitude + 180, 360) - 180;
    viewport.bearing = mod(viewport.bearing + 180, 360) - 180;

    // Ensure zoom is within specified range
    const {maxZoom, minZoom} = this.props;
    viewport.zoom = viewport.zoom > maxZoom ? maxZoom : viewport.zoom;
    viewport.zoom = viewport.zoom < minZoom ? minZoom : viewport.zoom;

    // Ensure pitch is within specified range
    const {maxPitch, minPitch} = this.props;

    viewport.pitch = viewport.pitch > maxPitch ? maxPitch : viewport.pitch;
    viewport.pitch = viewport.pitch < minPitch ? minPitch : viewport.pitch;

    return viewport;
  }

  _unproject(pos) {
    const viewport = new PerspectiveMercatorViewport(this.props);
    return pos && viewport.unproject(pos, {topLeft: false});
  }

  // Calculate a new lnglat based on pixel dragging position
  _calculateNewLngLat({startPanLngLat, pos}) {
    const viewport = new PerspectiveMercatorViewport(this.props);
    return viewport.getLocationAtPoint({lngLat: startPanLngLat, pos});
  }

  // Calculates new zoom
  _calculateNewZoom({scale, startZoom}) {
    const {maxZoom, minZoom} = this.props;
    let zoom = startZoom + Math.log2(scale);
    zoom = zoom > maxZoom ? maxZoom : zoom;
    zoom = zoom < minZoom ? minZoom : zoom;
    return zoom;
  }

  // Calculates a new pitch and bearing from a position (coming from an event)
  _calculateNewPitchAndBearing({xDeltaScale, yDeltaScale, startBearing, startPitch}) {
    const {minPitch, maxPitch} = this.props;

    const bearing = startBearing + 180 * xDeltaScale;
    let pitch = startPitch;
    if (yDeltaScale > 0) {
      // Gradually increase pitch
      pitch = startPitch + yDeltaScale * (maxPitch - startPitch);
    } else if (yDeltaScale < 0) {
      // Gradually decrease pitch
      pitch = startPitch - yDeltaScale * (minPitch - startPitch);
    }

    return {
      pitch,
      bearing
    };
  }

  /* Public API */

  /**
   * Start panning
   * @param {[Number, Number]} pos - position on screen where the pointer grabs
   */
  panStart({pos}) {
    return this._updateViewport({
      startPanLngLat: this._unproject(pos)
    });
  }

  /**
   * Pan
   * @param {[Number, Number]} pos - position on screen where the pointer is
   * @param {[Number, Number], optional} startPos - where the pointer grabbed at
   *   the start of the operation. Must be supplied of `panStart()` was not called
   */
  pan({pos, startPos}) {
    const startPanLngLat = this.props.startPanLngLat || this._unproject(startPos);

    // take the start lnglat and put it where the mouse is down.
    assert(startPanLngLat, '`startPanLngLat` prop is required ' +
      'for mouse pan behavior to calculate where to position the map.');

    const [longitude, latitude] = this._calculateNewLngLat({startPanLngLat, pos});

    return this._updateViewport({
      longitude,
      latitude
    });
  }

  /**
   * End panning
   * Must call if `panStart()` was called
   */
  panEnd() {
    return this._updateViewport({
      startPanLngLat: null
    });
  }

  /**
   * Start rotating
   * @param {[Number, Number]} pos - position on screen where the center is
   */
  rotateStart({pos}) {
    return this._updateViewport({
      startBearing: this.props.bearing,
      startPitch: this.props.pitch
    });
  }

  /**
   * Rotate
   * @param {Number} xDeltaScale - a number between [-1, 1] specifying the
   *   change to bearing.
   * @param {Number} yDeltaScale - a number between [-1, 1] specifying the
   *   change to pitch. -1 sets to minPitch and 1 sets to maxPitch.
   */
  rotate({xDeltaScale, yDeltaScale}) {
    assert(xDeltaScale >= -1 && xDeltaScale <= 1,
      '`xDeltaScale` must be a number between [-1, 1]');
    assert(yDeltaScale >= -1 && yDeltaScale <= 1,
      '`yDeltaScale` must be a number between [-1, 1]');

    let {startBearing, startPitch} = this.props;

    if (!Number.isFinite(startBearing)) {
      startBearing = this.props.bearing;
    }
    if (!Number.isFinite(startPitch)) {
      startPitch = this.props.pitch;
    }

    const {pitch, bearing} = this._calculateNewPitchAndBearing({
      xDeltaScale,
      yDeltaScale,
      startBearing,
      startPitch
    });

    return this._updateViewport({
      bearing,
      pitch
    });
  }

  /**
   * End rotating
   * Must call if `rotateStart()` was called
   */
  rotateEnd() {
    return this._updateViewport({
      startBearing: null,
      startPitch: null
    });
  }

  /**
   * Start zooming
   * @param {[Number, Number]} pos - position on screen where the center is
   */
  zoomStart({pos}) {
    return this._updateViewport({
      startZoomLngLat: this._unproject(pos),
      startZoom: this.props.zoom
    });
  }

  /**
   * Zoom
   * @param {[Number, Number]} pos - position on screen where the current center is
   * @param {[Number, Number]} startPos - the center position at
   *   the start of the operation. Must be supplied of `zoomStart()` was not called
   * @param {Number} scale - a number between [0, 1] specifying the accumulated
   *   relative scale.
   */
  zoom({pos, startPos, scale}) {
    assert(scale > 0, '`scale` must be a positive number');

    // Make sure we zoom around the current mouse position rather than map center
    const startZoomLngLat = this.props.startZoomLngLat || this._unproject(startPos);
    let {startZoom} = this.props;

    if (!Number.isFinite(startZoom)) {
      startZoom = this.props.zoom;
    }

    // take the start lnglat and put it where the mouse is down.
    assert(startZoomLngLat, '`startZoomLngLat` prop is required ' +
      'for zoom behavior to calculate where to position the map.');

    const zoom = this._calculateNewZoom({scale, startZoom});

    const zoomedViewport = new PerspectiveMercatorViewport(Object.assign({}, this.props, {zoom}));
    const [longitude, latitude] = zoomedViewport.getLocationAtPoint({lngLat: startZoomLngLat, pos});

    return this._updateViewport({
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
    return this._updateViewport({
      startZoomLngLat: null,
      startZoom: null
    });
  }

}

MapState.propTypes = propTypes;
