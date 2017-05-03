import {PerspectiveMercatorViewport} from 'viewport-mercator-project';
import assert from 'assert';

function mod(value, divisor) {
  const modulus = value % divisor;
  return modulus < 0 ? divisor + modulus : modulus;
}

const defaultProps = {
  pitch: 0,
  bearing: 0,
  altitude: 1.5,

  // MAPBOX LIMITS
  maxZoom: 20,
  minZoom: 0,
  maxPitch: 60,
  minPitch: 0
};

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
    bearing,
    /** The pitch of the viewport in degrees */
    pitch,
    /**
    * Specify the altitude of the viewport camera
    * Unit: map heights, default 1.5
    * Non-public API, see https://github.com/mapbox/mapbox-gl-js/issues/1137
    */
    altitude,

    /** Viewport constraints */
    maxZoom,
    minZoom,
    maxPitch,
    minPitch,

    /** Interaction states, required to calculate change during transform */
    /* The point on map being grabbed when the operation first started */
    startPanLngLat,
    /* Center of the zoom when the operation first started */
    startZoomLngLat,
    /** Bearing when current perspective rotate operation started */
    startBearing,
    /** Pitch when current perspective rotate operation started */
    startPitch,
    /** Zoom when current zoom operation started */
    startZoom
  } = {}) {
    assert(Number.isFinite(width), '`width` must be supplied');
    assert(Number.isFinite(height), '`height` must be supplied');
    assert(Number.isFinite(longitude), '`longitude` must be supplied');
    assert(Number.isFinite(latitude), '`latitude` must be supplied');
    assert(Number.isFinite(zoom), '`zoom` must be supplied');

    this._props = this._applyConstraints({
      width,
      height,
      latitude,
      longitude,
      zoom,
      bearing: Number.isFinite(bearing) ? bearing : defaultProps.bearing,
      pitch: Number.isFinite(pitch) ? pitch : defaultProps.pitch,
      altitude: Number.isFinite(altitude) ? altitude : defaultProps.altitude,
      maxZoom: Number.isFinite(maxZoom) ? maxZoom : defaultProps.maxZoom,
      minZoom: Number.isFinite(minZoom) ? minZoom : defaultProps.minZoom,
      maxPitch: Number.isFinite(maxPitch) ? maxPitch : defaultProps.maxPitch,
      minPitch: Number.isFinite(minPitch) ? minPitch : defaultProps.minPitch,
      startPanLngLat,
      startZoomLngLat,
      startBearing,
      startPitch,
      startZoom
    });
  }

  /* Public API */

  getViewportProps() {
    return this._props;
  }

  /**
   * Start panning
   * @param {[Number, Number]} pos - position on screen where the pointer grabs
   */
  panStart({pos}) {
    return this._getUpdatedMapState({
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
    const startPanLngLat = this._props.startPanLngLat || this._unproject(startPos);

    // take the start lnglat and put it where the mouse is down.
    assert(startPanLngLat, '`startPanLngLat` prop is required ' +
      'for mouse pan behavior to calculate where to position the map.');

    const [longitude, latitude] = this._calculateNewLngLat({startPanLngLat, pos});

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
   * @param {[Number, Number]} pos - position on screen where the center is
   */
  rotateStart({pos}) {
    return this._getUpdatedMapState({
      startBearing: this._props.bearing,
      startPitch: this._props.pitch
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

    let {startBearing, startPitch} = this._props;

    if (!Number.isFinite(startBearing)) {
      startBearing = this._props.bearing;
    }
    if (!Number.isFinite(startPitch)) {
      startPitch = this._props.pitch;
    }

    const {pitch, bearing} = this._calculateNewPitchAndBearing({
      xDeltaScale,
      yDeltaScale,
      startBearing,
      startPitch
    });

    return this._getUpdatedMapState({
      bearing,
      pitch
    });
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
   * @param {[Number, Number]} pos - position on screen where the center is
   */
  zoomStart({pos}) {
    return this._getUpdatedMapState({
      startZoomLngLat: this._unproject(pos),
      startZoom: this._props.zoom
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
    const startZoomLngLat = this._props.startZoomLngLat ||
      this._unproject(startPos) || this._unproject(pos);
    let {startZoom} = this._props;

    if (!Number.isFinite(startZoom)) {
      startZoom = this._props.zoom;
    }

    // take the start lnglat and put it where the mouse is down.
    assert(startZoomLngLat, '`startZoomLngLat` prop is required ' +
      'for zoom behavior to calculate where to position the map.');

    const zoom = this._calculateNewZoom({scale, startZoom});

    const zoomedViewport = new PerspectiveMercatorViewport(Object.assign({}, this._props, {zoom}));
    const [longitude, latitude] = zoomedViewport.getLocationAtPoint({lngLat: startZoomLngLat, pos});

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
    // Update _props
    return new MapState(Object.assign({}, this._props, newProps));
  }

  // Apply any constraints (mathematical or defined by _props) to map state
  _applyConstraints(props) {
    // Normalize degrees
    props.longitude = mod(props.longitude + 180, 360) - 180;
    props.bearing = mod(props.bearing + 180, 360) - 180;

    // Ensure zoom is within specified range
    const {maxZoom, minZoom, zoom} = props;
    props.zoom = zoom > maxZoom ? maxZoom : zoom;
    props.zoom = zoom < minZoom ? minZoom : zoom;

    // Ensure pitch is within specified range
    const {maxPitch, minPitch, pitch} = props;

    props.pitch = pitch > maxPitch ? maxPitch : pitch;
    props.pitch = pitch < minPitch ? minPitch : pitch;

    return props;
  }

  _unproject(pos) {
    const viewport = new PerspectiveMercatorViewport(this._props);
    return pos && viewport.unproject(pos, {topLeft: false});
  }

  // Calculate a new lnglat based on pixel dragging position
  _calculateNewLngLat({startPanLngLat, pos}) {
    const viewport = new PerspectiveMercatorViewport(this._props);
    return viewport.getLocationAtPoint({lngLat: startPanLngLat, pos});
  }

  // Calculates new zoom
  _calculateNewZoom({scale, startZoom}) {
    const {maxZoom, minZoom} = this._props;
    let zoom = startZoom + Math.log2(scale);
    zoom = zoom > maxZoom ? maxZoom : zoom;
    zoom = zoom < minZoom ? minZoom : zoom;
    return zoom;
  }

  // Calculates a new pitch and bearing from a position (coming from an event)
  _calculateNewPitchAndBearing({xDeltaScale, yDeltaScale, startBearing, startPitch}) {
    const {minPitch, maxPitch} = this._props;

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

}
