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
type ConstraintValue = number | null | undefined;

type ConstraintRange = {min: ConstraintValue; max: ConstraintValue};

function isConstraintReset(value: ConstraintValue): value is null | undefined {
  return value === null || value === undefined;
}

function sameConstraintValue(a: ConstraintValue, b: ConstraintValue): boolean {
  return (isConstraintReset(a) && isConstraintReset(b)) || a === b;
}

function updateConstraint(
  nextRange: ConstraintRange,
  currentRange: ConstraintRange,
  getCurrentMin: () => number,
  setMin: (v?: number | null) => void,
  setMax: (v?: number | null) => void
): boolean {
  const minChanged = !sameConstraintValue(nextRange.min, currentRange.min);
  const maxChanged = !sameConstraintValue(nextRange.max, currentRange.max);

  if (!minChanged && !maxChanged) {
    return false;
  }

  // When lowering or resetting min, update it first to make room.
  // Otherwise update max first before raising min.
  if (isConstraintReset(nextRange.min) || nextRange.min < getCurrentMin()) {
    if (minChanged) {
      setMin(nextRange.min);
    }
    if (maxChanged) {
      setMax(nextRange.max);
    }
  } else {
    if (maxChanged) {
      setMax(nextRange.max);
    }
    if (minChanged) {
      setMin(nextRange.min);
    }
  }

  return true;
}

export function updateZoomConstraint(
  map: MapInstance,
  nextRange: ConstraintRange,
  currentRange: ConstraintRange
): boolean {
  return updateConstraint(
    nextRange,
    currentRange,
    () => map.getMinZoom(),
    v => map.setMinZoom(v),
    v => map.setMaxZoom(v)
  );
}

export function updatePitchConstraint(
  map: MapInstance,
  nextRange: ConstraintRange,
  currentRange: ConstraintRange
): boolean {
  return updateConstraint(
    nextRange,
    currentRange,
    () => map.getMinPitch(),
    v => map.setMinPitch(v),
    v => map.setMaxPitch(v)
  );
}
