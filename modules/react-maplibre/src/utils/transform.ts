import type {MaplibreProps} from '../maplibre/maplibre';
import type {ViewState} from '../types/common';
import type {TransformLike} from '../types/internal';
import type {MapInstance} from '../types/lib';
import {deepEqual} from './deep-equal';

/**
 * maplibre-gl v6 removed the public `map.transform` property in favor of
 * discrete getters. Reconstruct a TransformLike snapshot from those getters
 * so it works across maplibre-gl v4/v5/v6.
 */
export function getTransformLike(map: MapInstance): TransformLike {
  return {
    center: map.getCenter(),
    zoom: map.getZoom(),
    bearing: map.getBearing(),
    pitch: map.getPitch(),
    // @ts-ignore getCenterElevation does not exist before v5.0.0
    elevation: map.getCenterElevation?.() ?? 0,
    padding: map.getPadding()
  };
}

/**
 * Capture a transform's current state
 * @param transform
 * @returns descriptor of the view state
 */
export function transformToViewState(tr: TransformLike): ViewState {
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
 * Applies requested view state to a transform
 * @returns an object containing detected changes
 */
export function applyViewStateToTransform(
  /** An object that describes Maplibre's camera state */
  tr: TransformLike,
  /** Props from Map component */
  props: MaplibreProps
): Partial<TransformLike> {
  const v: Partial<ViewState> = props.viewState || props;
  const changes: Partial<TransformLike> = {};

  if (
    'longitude' in v &&
    'latitude' in v &&
    (v.longitude !== tr.center.lng || v.latitude !== tr.center.lat)
  ) {
    const LngLat = tr.center.constructor;
    // @ts-expect-error we should not import LngLat class from maplibre-gl because we don't know the source of mapLib
    changes.center = new LngLat(v.longitude, v.latitude);
  }
  if ('zoom' in v && v.zoom !== tr.zoom) {
    changes.zoom = v.zoom;
  }
  if ('bearing' in v && v.bearing !== tr.bearing) {
    changes.bearing = v.bearing;
  }
  if ('pitch' in v && v.pitch !== tr.pitch) {
    changes.pitch = v.pitch;
  }
  if (v.padding && tr.padding && !deepEqual(v.padding, tr.padding)) {
    changes.padding = v.padding;
  }
  return changes;
}

/**
 * Update a min/max constraint pair in the right order to avoid
 * temporarily setting min > max (which maplibre rejects).
 * @param nextRange - the desired constraint range
 * @param currentRange - the current constraint range
 * @param setMin - setter for the minimum value
 * @param setMax - setter for the maximum value
 */
function updateConstraint(
  nextRange: {min: number; max: number},
  currentRange: {min: number; max: number},
  setMin: (v: number) => void,
  setMax: (v: number) => void
): boolean {
  if (nextRange.min === currentRange.min && nextRange.max === currentRange.max) {
    return false;
  }

  // When moving up (min increasing), update max first to make room
  if (nextRange.min >= currentRange.min) {
    if (nextRange.max !== currentRange.max) {
      setMax(nextRange.max);
    }
    if (nextRange.min !== currentRange.min) {
      setMin(nextRange.min);
    }
  } else {
    // When moving down (min decreasing), update min first to make room
    if (nextRange.min !== currentRange.min) {
      setMin(nextRange.min);
    }
    if (nextRange.max !== currentRange.max) {
      setMax(nextRange.max);
    }
  }

  return true;
}

export function updateZoomConstraint(
  map: MapInstance,
  nextRange: {min: number; max: number},
  currentRange: {min: number; max: number}
): boolean {
  return updateConstraint(
    nextRange,
    currentRange,
    v => map.setMinZoom(v),
    v => map.setMaxZoom(v)
  );
}

export function updatePitchConstraint(
  map: MapInstance,
  nextRange: {min: number; max: number},
  currentRange: {min: number; max: number}
): boolean {
  return updateConstraint(
    nextRange,
    currentRange,
    v => map.setMinPitch(v),
    v => map.setMaxPitch(v)
  );
}
