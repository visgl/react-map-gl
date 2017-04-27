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
    * Required to calculate the mouse projection after the first click event
    * during dragging. Where the map is depends on where you first clicked on
    * the map.
    */
  startDragLngLat: PropTypes.arrayOf(PropTypes.number),
  /** Bearing when current perspective drag operation started */
  startBearing: PropTypes.number,
  /** Pitch when current perspective drag operation started */
  startPitch: PropTypes.number
};

export default class MapState {

  constructor({
    /** The width of the map */
    width,
    /** The height of the map */
    height,
    /** The latitude of the center of the map. */
    latitude,
    /** The longitude of the center of the map. */
    longitude,
    /** The tile zoom level of the map. */
    zoom,
    /** Specify the bearing of the viewport */
    bearing = 0,
    /** Specify the pitch of the viewport */
    pitch = 0,
    /**
      * Specify the altitude of the viewport camera
      * Unit: map heights, default 1.5
      * Non-public API, see https://github.com/mapbox/mapbox-gl-js/issues/1137
      */
    altitude = 1.5,

    /** Constraints */
    maxZoom = MAX_ZOOM,
    minZoom = 0,
    maxPitch = MAX_PITCH,
    minPitch = 0,

    /**
      * Required to calculate the mouse projection after the first click event
      * during dragging. Where the map is depends on where you first clicked on
      * the map.
      */
    startDragLngLat,
    /** Bearing when current perspective drag operation started */
    startBearing,
    /** Pitch when current perspective drag operation started */
    startPitch
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
      startDragLngLat,
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
    return viewport.unproject(pos, {topLeft: false});
  }

  // Calculate a new lnglat based on pixel dragging position
  _calculateNewLngLat({startDragLngLat, pos, startPos}) {
    const viewport = new PerspectiveMercatorViewport(this.props);
    return viewport.getLocationAtPoint({lngLat: startDragLngLat, pos});
  }

  // Calculates new zoom
  _calculateNewZoom({scale}) {
    return this.props.zoom + Math.log2(scale);
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

  panStart({pos}) {
    return this._updateViewport({
      startDragLngLat: this._unproject(pos)
    });
  }

  pan({pos, startPos}) {
    const startDragLngLat = this.props.startDragLngLat || this._unproject(startPos);

    // take the start lnglat and put it where the mouse is down.
    assert(startDragLngLat, '`startDragLngLat` prop is required ' +
      'for mouse drag behavior to calculate where to position the map.');

    const [longitude, latitude] = this._calculateNewLngLat({startDragLngLat, pos});

    return this._updateViewport({
      longitude,
      latitude
    });
  }

  panEnd() {
    return this._updateViewport({
      startDragLngLat: null
    });
  }

  rotateStart({pos}) {
    return this._updateViewport({
      startBearing: this.props.bearing,
      startPitch: this.props.pitch
    });
  }

  rotate({xDeltaScale, yDeltaScale}) {
    assert(xDeltaScale >= -1 && xDeltaScale <= 1 &&
      yDeltaScale >= -1 && yDeltaScale <= 1,
      '`xDeltaScale` and `yDeltaScale` must be numbers between [-1, 1]');

    const {startBearing, startPitch} = this.props;
    assert(typeof startBearing === 'number',
      '`startBearing` prop is required for mouse rotate behavior');
    assert(typeof startPitch === 'number',
      '`startPitch` prop is required for mouse rotate behavior');

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

  rotateEnd() {
    return this._updateViewport({
      startBearing: null,
      startPitch: null
    });
  }

  zoomStart() {
    return this;
  }

  zoom({pos, scale}) {
    assert(scale > 0, '`scale` must be a positive number');

    // Make sure we zoom around the current mouse position rather than map center
    const aroundLngLat = this._unproject(pos);

    const zoom = this._calculateNewZoom({scale});

    const zoomedViewport = new PerspectiveMercatorViewport(Object.assign({}, this.props, {zoom}));
    const [longitude, latitude] = zoomedViewport.getLocationAtPoint({lngLat: aroundLngLat, pos});

    return this._updateViewport({
      zoom,
      longitude,
      latitude
    });
  }

  zoomEnd() {
    return this;
  }

}

MapState.propTypes = propTypes;
