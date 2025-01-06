import type {MapboxProps} from '../mapbox/mapbox';
import type {Transform, ViewState} from '../types';
import {deepEqual} from './deep-equal';

/**
 * Make a copy of a transform
 * @param tr
 */
export function cloneTransform(tr: Transform): Transform {
  const newTransform = tr.clone();
  // Work around mapbox bug - this value is not assigned in clone(), only in resize()
  newTransform.pixelsToGLUnits = tr.pixelsToGLUnits;
  return newTransform;
}

/**
 * Copy projection from one transform to another. This only applies to mapbox-gl transforms
 * @param src the transform to copy projection settings from
 * @param dest to transform to copy projection settings to
 */
export function syncProjection(src: Transform, dest: Transform): void {
  if (!src.getProjection) {
    return;
  }
  const srcProjection = src.getProjection();
  const destProjection = dest.getProjection();

  if (!deepEqual(srcProjection, destProjection)) {
    dest.setProjection(srcProjection);
  }
}

/**
 * Capture a transform's current state
 * @param transform
 * @returns descriptor of the view state
 */
export function transformToViewState(tr: Transform): ViewState {
  return {
    longitude: tr.center.lng,
    latitude: tr.center.lat,
    zoom: tr.zoom,
    pitch: tr.pitch,
    bearing: tr.bearing,
    padding: tr.padding
  };
}

/* eslint-disable complexity */
/**
 * Mutate a transform to match the given view state
 * @param transform
 * @param viewState
 * @returns true if the transform has changed
 */
export function applyViewStateToTransform(tr: Transform, props: MapboxProps): boolean {
  const v: Partial<ViewState> = props.viewState || props;
  let changed = false;

  if ('zoom' in v) {
    const zoom = tr.zoom;
    tr.zoom = v.zoom;
    changed = changed || zoom !== tr.zoom;
  }
  if ('bearing' in v) {
    const bearing = tr.bearing;
    tr.bearing = v.bearing;
    changed = changed || bearing !== tr.bearing;
  }
  if ('pitch' in v) {
    const pitch = tr.pitch;
    tr.pitch = v.pitch;
    changed = changed || pitch !== tr.pitch;
  }
  if (v.padding && !tr.isPaddingEqual(v.padding)) {
    changed = true;
    tr.padding = v.padding;
  }
  if ('longitude' in v && 'latitude' in v) {
    const center = tr.center;
    // @ts-ignore
    tr.center = new center.constructor(v.longitude, v.latitude);
    changed = changed || center !== tr.center;
  }
  return changed;
}
