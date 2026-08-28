import {expect, test} from 'vitest';
import {
  getTransformLike,
  transformToViewState,
  applyViewStateToTransform,
  updateZoomConstraint,
  updatePitchConstraint
} from '@vis.gl/react-maplibre/utils/transform';
import * as maplibregl from 'maplibre-gl';

const {LngLat} = maplibregl.default || maplibregl;

test('getTransformLike', () => {
  const center = new LngLat(-122.45, 37.78);
  const padding = {top: 1, left: 2, right: 3, bottom: 4};
  const map = {
    get transform() {
      throw new Error('map.transform should not be accessed');
    },
    getCenter: () => center,
    getZoom: () => 10.5,
    getBearing: () => -70,
    getPitch: () => 30,
    getCenterElevation: () => 100,
    getPadding: () => padding
  };

  const tr = getTransformLike(map);

  expect(tr.center, 'center retains its LngLat instance').toBe(center);
  expect(tr.padding, 'padding retains its identity').toBe(padding);
  expect(tr, 'camera state is read from public getters').toEqual({
    center,
    zoom: 10.5,
    bearing: -70,
    pitch: 30,
    elevation: 100,
    padding
  });
});

test('getTransformLike#pre-v5', () => {
  const center = new LngLat(-122.45, 37.78);
  const map = {
    getCenter: () => center,
    getZoom: () => 10.5,
    getBearing: () => -70,
    getPitch: () => 30,
    getPadding: () => ({top: 0, left: 0, right: 0, bottom: 0})
  };

  expect(getTransformLike(map).elevation, 'missing center elevation defaults to zero').toBe(0);
});

test('transformToViewState', () => {
  const tr = {
    center: new LngLat(-122.45, 37.78),
    zoom: 10.5,
    bearing: -70,
    pitch: 30,
    padding: {top: 0, left: 0, right: 0, bottom: 0}
  };

  expect(transformToViewState(tr)).toEqual({
    longitude: -122.45,
    latitude: 37.78,
    zoom: 10.5,
    bearing: -70,
    pitch: 30,
    padding: {top: 0, left: 0, right: 0, bottom: 0}
  });
});

test('applyViewStateToTransform', () => {
  const tr = {
    center: new LngLat(-122.45, 37.78),
    zoom: 10.5,
    bearing: -70,
    pitch: 30,
    padding: {top: 0, left: 0, right: 0, bottom: 0}
  };

  let changed = applyViewStateToTransform(tr, {});
  expect(changed, 'no changes detected').toEqual({});

  changed = applyViewStateToTransform(tr, {longitude: -10, latitude: 5});
  expect(changed, 'center changed').toEqual({
    center: new LngLat(-10, 5)
  });

  changed = applyViewStateToTransform(tr, {zoom: 11, pitch: 30, bearing: -70});
  expect(changed, 'zoom changed').toEqual({zoom: 11});

  changed = applyViewStateToTransform(tr, {zoom: 10.5, pitch: 40, bearing: -70});
  expect(changed, 'pitch changed').toEqual({pitch: 40});

  changed = applyViewStateToTransform(tr, {zoom: 10.5, pitch: 30, bearing: 270});
  expect(changed, 'bearing changed').toEqual({bearing: 270});

  changed = applyViewStateToTransform(tr, {padding: {left: 10, right: 10, top: 10, bottom: 10}});
  expect(changed, 'bearing changed').toEqual({padding: {left: 10, right: 10, top: 10, bottom: 10}});

  changed = applyViewStateToTransform(tr, {viewState: {pitch: 30}});
  expect(changed, 'nothing changed').toEqual({});
});

function createConstraintMap(setMinName, setMaxName, defaultRange) {
  let first = null;
  let currentMin = 0;
  let currentMax = 0;
  const getMinName = setMinName.replace('set', 'get');
  const map = {
    [getMinName]: () => currentMin,
    [setMinName]: nextMin => {
      nextMin ??= defaultRange.min;
      if (nextMin > currentMax) {
        throw new Error(`Setting ${setMinName} (${nextMin}) > current max (${currentMax})`);
      }
      currentMin = nextMin;
      if (!first) {
        first = 'min';
      }
    },
    [setMaxName]: nextMax => {
      nextMax ??= defaultRange.max;
      if (nextMax < currentMin) {
        throw new Error(`Setting ${setMaxName} (${nextMax}) < current min (${currentMin})`);
      }
      currentMax = nextMax;
      if (!first) {
        first = 'max';
      }
    }
  };
  return {
    map,
    reset(min, max) {
      currentMin = min;
      currentMax = max;
      first = null;
    },
    getFirst() {
      return first;
    }
  };
}

function testConstraintUpdate(updateFn, setMinName, setMaxName, label, defaultRange) {
  const helper = createConstraintMap(setMinName, setMaxName, defaultRange);

  // Range shifting down
  helper.reset(5, 10);
  updateFn(helper.map, {min: 1, max: 3}, {min: 5, max: 10});
  expect(helper.getFirst(), `${label}: 5 - 10 -> 1 - 3, update min first`).toBe('min');

  // Range shifting up
  helper.reset(1, 3);
  updateFn(helper.map, {min: 5, max: 10}, {min: 1, max: 3});
  expect(helper.getFirst(), `${label}: 1 - 3 -> 5 - 10, update max first`).toBe('max');

  // Range expanding
  helper.reset(5, 18);
  updateFn(helper.map, {min: 3, max: 22}, {min: 5, max: 18});
  expect(helper.getFirst(), `${label}: 5 - 18 -> 3 - 22, update min first`).toBe('min');

  // Only min changing (decreasing)
  helper.reset(5, 18);
  updateFn(helper.map, {min: 3, max: 18}, {min: 5, max: 18});
  expect(helper.getFirst(), `${label}: 5 - 18 -> 3 - 18, update min first`).toBe('min');

  // Range contracting
  helper.reset(3, 22);
  updateFn(helper.map, {min: 5, max: 18}, {min: 3, max: 22});
  expect(helper.getFirst(), `${label}: 3 - 22 -> 5 - 18, update max first`).toBe('max');

  // Range shifting down with high start
  helper.reset(12, 22);
  updateFn(helper.map, {min: 5, max: 10}, {min: 12, max: 22});
  expect(helper.getFirst(), `${label}: 12 - 22 -> 5 - 10, update min first`).toBe('min');

  // Locked to single value (min === max)
  helper.reset(3, 10);
  updateFn(helper.map, {min: 5, max: 5}, {min: 3, max: 10});
  expect(helper.getFirst(), `${label}: 3 - 10 -> 5 - 5, lock to single value`).toBe('max');

  // Unlock from single value
  helper.reset(5, 5);
  updateFn(helper.map, {min: 3, max: 10}, {min: 5, max: 5});
  expect(helper.getFirst(), `${label}: 5 - 5 -> 3 - 10, unlock from single value`).toBe('min');

  // Partial overlap (shifting up)
  helper.reset(3, 8);
  updateFn(helper.map, {min: 6, max: 10}, {min: 3, max: 8});
  expect(helper.getFirst(), `${label}: 3 - 8 -> 6 - 10, partial overlap shifting up`).toBe('max');

  // Partial overlap (shifting down)
  helper.reset(6, 10);
  updateFn(helper.map, {min: 3, max: 8}, {min: 6, max: 10});
  expect(helper.getFirst(), `${label}: 6 - 10 -> 3 - 8, partial overlap shifting down`).toBe('min');

  // Resetting max may lower it below the current min
  helper.reset(defaultRange.max + 1, defaultRange.max + 2);
  updateFn(
    helper.map,
    {min: defaultRange.max - 2, max: undefined},
    {min: defaultRange.max + 1, max: defaultRange.max + 2}
  );
  expect(helper.getFirst(), `${label}: lower min before resetting max`).toBe('min');

  // All nullable forms represent the same native reset
  helper.reset(defaultRange.min, defaultRange.max);
  const nullableChanged = updateFn(
    helper.map,
    {min: null, max: undefined},
    {min: undefined, max: null}
  );
  expect(nullableChanged, `${label}: nullable reset forms are equivalent`).toBe(false);
  expect(helper.getFirst(), `${label}: nullable reset forms do not call setters`).toBe(null);

  // No change returns false
  helper.reset(3, 10);
  const changed = updateFn(helper.map, {min: 3, max: 10}, {min: 3, max: 10});
  expect(changed, `${label}: no change returns false`).toBe(false);
}

test('updateZoomConstraint', () => {
  testConstraintUpdate(updateZoomConstraint, 'setMinZoom', 'setMaxZoom', 'zoom', {
    min: -2,
    max: 22
  });
});

test('updatePitchConstraint', () => {
  testConstraintUpdate(updatePitchConstraint, 'setMinPitch', 'setMaxPitch', 'pitch', {
    min: 0,
    max: 60
  });
});
