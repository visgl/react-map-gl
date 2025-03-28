import type {ViewState} from '../types/common';
import type {Transform} from '../types/internal';

/**
 * Capture a transform's current state
 * @param transform
 * @returns descriptor of the view state
 */
export function transformToViewState(tr: Transform): ViewState {
  return {
    longitude: tr.center.lng,
    latitude: tr.center.lat,
    zoom: tr._seaLevelZoom ?? tr.zoom,
    pitch: tr.pitch,
    bearing: tr.bearing,
    padding: tr.padding,
    elevation: tr._centerAltitude
  };
}

/** Returns `true` if the given props can potentially override view state updates */
export function isViewStateControlled(v: Partial<ViewState>): boolean {
  return (
    Number.isFinite(v.longitude) ||
    Number.isFinite(v.latitude) ||
    Number.isFinite(v.zoom) ||
    Number.isFinite(v.pitch) ||
    Number.isFinite(v.bearing)
  );
}

/**
 * Returns `true` if transform needs to be updated to match view state
 */
export function compareViewStateWithTransform(tr: Transform, v: Partial<ViewState>): boolean {
  if (Number.isFinite(v.longitude) && tr.center.lng !== v.longitude) {
    return true;
  }
  if (Number.isFinite(v.latitude) && tr.center.lat !== v.latitude) {
    return true;
  }
  if (Number.isFinite(v.bearing) && tr.bearing !== v.bearing) {
    return true;
  }
  if (Number.isFinite(v.pitch) && tr.pitch !== v.pitch) {
    return true;
  }
  if (Number.isFinite(v.zoom) && (tr._seaLevelZoom ?? tr.zoom) !== v.zoom) {
    return true;
  }
  if (v.padding && !tr.isPaddingEqual(v.padding)) {
    return true;
  }
  return false;
}

function noOp() {}

/* eslint-disable complexity */
/**
 * Mutate a transform to match the given view state. Should reverse `transformToViewState`
 * @param transform
 * @param viewState
 */
export function applyViewStateToTransform(tr: Transform, v: Partial<ViewState>) {
  // prevent constrain from running until all properties are set
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const constrain = tr._constrain;
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const calcMatrices = tr._calcMatrices;
  tr._constrain = noOp;
  tr._calcMatrices = noOp;

  if (Number.isFinite(v.bearing)) {
    tr.bearing = v.bearing;
  }
  if (Number.isFinite(v.pitch)) {
    tr.pitch = v.pitch;
  }
  if (v.padding && !tr.isPaddingEqual(v.padding)) {
    tr.padding = v.padding;
  }
  if (Number.isFinite(v.longitude) || Number.isFinite(v.latitude)) {
    const center = tr.center;
    // @ts-expect-error LngLat constructor is not typed
    tr._center = new center.constructor(v.longitude ?? center.lng, v.latitude ?? center.lat);
  }
  if (Number.isFinite(v.zoom)) {
    tr._centerAltitude = v.elevation ?? 0;
    if (tr.elevation) {
      tr._seaLevelZoom = v.zoom;
      const mercatorElevation = (tr.pixelsPerMeter / tr.worldSize) * tr._centerAltitude;
      const altitude = tr._mercatorZfromZoom(v.zoom);
      const minHeight = tr._mercatorZfromZoom(tr._maxZoom);
      const height = Math.max(altitude - mercatorElevation, minHeight);
      tr._setZoom(tr._zoomFromMercatorZ(height));
    } else {
      tr._seaLevelZoom = null;
      tr.zoom = v.zoom;
    }
  }

  // restore methods
  tr._constrain = constrain;
  tr._calcMatrices = calcMatrices;
  if (!tr._unmodified) {
    tr._constrain();
    tr._calcMatrices();
  }
}
