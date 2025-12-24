import type {MaplibreProps} from '../maplibre/maplibre';
import type {ViewState} from '../types/common';
import type {TransformLike} from '../types/internal';
import { MapInstance } from '../types/lib';
import {deepEqual} from './deep-equal';

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
 * Update zoom constraints to match props by calling
 * `setMinZoom` and `setMaxZoom` in the right order
 * @param {object} nextRange
 * @param {object} currRange
 **/
export function updateZoomConstraint(map: MapInstance, nextRange: { min: number; max: number}, currentRange: { min: number; max: number }): void {
    if (nextRange.min === currentRange.min && nextRange.max === currentRange.max) {
      return
    }
  
    // if moving up ie. 1 - 3 -> 5 - 10
    if (nextRange.min >= currentRange.min) {
      if (nextRange.max !== currentRange.max) {
        map.setMaxZoom(nextRange.max)
      }
      if (nextRange.min !== currentRange.min) {
        map.setMinZoom(nextRange.min)
      }
    }

    // if moving down ie. 5 - 10 -> 1 - 3
    if (nextRange.min < currentRange.min) {
      if (nextRange.min !== currentRange.min) {
        map.setMinZoom(nextRange.min)
      }
      if (nextRange.max !== currentRange.max) {
        map.setMaxZoom(nextRange.max)
      }
    }
  }