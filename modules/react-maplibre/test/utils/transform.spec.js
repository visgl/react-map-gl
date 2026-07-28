import test from 'tape-promise/tape';
import {
  getTransformLike,
  transformToViewState,
  applyViewStateToTransform,
  updateZoomConstraint,
  updatePitchConstraint
} from '@vis.gl/react-maplibre/utils/transform';
import {LngLat} from 'maplibre-gl';

test('getTransformLike', t => {
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

  t.is(tr.center, center, 'center retains its LngLat instance');
  t.is(tr.padding, padding, 'padding retains its identity');
  t.deepEqual(
    tr,
    {
      center,
      zoom: 10.5,
      bearing: -70,
      pitch: 30,
      elevation: 100,
      padding
    },
    'camera state is read from public getters'
  );

  t.end();
});

test('getTransformLike#pre-v5', t => {
  const center = new LngLat(-122.45, 37.78);
  const map = {
    getCenter: () => center,
    getZoom: () => 10.5,
    getBearing: () => -70,
    getPitch: () => 30,
    getPadding: () => ({top: 0, left: 0, right: 0, bottom: 0})
  };

  t.is(getTransformLike(map).elevation, 0, 'missing center elevation defaults to zero');

  t.end();
});

test('transformToViewState', t => {
  const tr = {
    center: new LngLat(-122.45, 37.78),
    zoom: 10.5,
    bearing: -70,
    pitch: 30,
    padding: {top: 0, left: 0, right: 0, bottom: 0}
  };

  t.deepEqual(transformToViewState(tr), {
    longitude: -122.45,
    latitude: 37.78,
    zoom: 10.5,
    bearing: -70,
    pitch: 30,
    padding: {top: 0, left: 0, right: 0, bottom: 0}
  });

  t.end();
});

test('applyViewStateToTransform', t => {
  const tr = {
    center: new LngLat(-122.45, 37.78),
    zoom: 10.5,
    bearing: -70,
    pitch: 30,
    padding: {top: 0, left: 0, right: 0, bottom: 0}
  };

  let changed = applyViewStateToTransform(tr, {});
  t.deepEqual(changed, {}, 'no changes detected');

  changed = applyViewStateToTransform(tr, {longitude: -10, latitude: 5});
  t.deepEqual(
    changed,
    {
      center: new LngLat(-10, 5)
    },
    'center changed'
  );

  changed = applyViewStateToTransform(tr, {zoom: 11, pitch: 30, bearing: -70});
  t.deepEqual(changed, {zoom: 11}, 'zoom changed');

  changed = applyViewStateToTransform(tr, {zoom: 10.5, pitch: 40, bearing: -70});
  t.deepEqual(changed, {pitch: 40}, 'pitch changed');

  changed = applyViewStateToTransform(tr, {zoom: 10.5, pitch: 30, bearing: 270});
  t.deepEqual(changed, {bearing: 270}, 'bearing changed');

  changed = applyViewStateToTransform(tr, {padding: {left: 10, right: 10, top: 10, bottom: 10}});
  t.deepEqual(changed, {padding: {left: 10, right: 10, top: 10, bottom: 10}}, 'bearing changed');

  changed = applyViewStateToTransform(tr, {viewState: {pitch: 30}});
  t.deepEqual(changed, {}, 'nothing changed');

  t.end();
});

function createConstraintMap(setMinName, setMaxName) {
  let first = null;
  let currentMin = 0;
  let currentMax = 0;
  const map = {
    [setMinName]: nextMin => {
      if (nextMin > currentMax) {
        throw new Error(`Setting ${setMinName} (${nextMin}) > current max (${currentMax})`);
      }
      currentMin = nextMin;
      if (!first) {
        first = 'min';
      }
    },
    [setMaxName]: nextMax => {
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

function testConstraintUpdate(t, updateFn, setMinName, setMaxName, label) {
  const helper = createConstraintMap(setMinName, setMaxName);

  // Range shifting down
  helper.reset(5, 10);
  updateFn(helper.map, {min: 1, max: 3}, {min: 5, max: 10});
  t.equal(helper.getFirst(), 'min', `${label}: 5 - 10 -> 1 - 3, update min first`);

  // Range shifting up
  helper.reset(1, 3);
  updateFn(helper.map, {min: 5, max: 10}, {min: 1, max: 3});
  t.equal(helper.getFirst(), 'max', `${label}: 1 - 3 -> 5 - 10, update max first`);

  // Range expanding
  helper.reset(5, 18);
  updateFn(helper.map, {min: 3, max: 22}, {min: 5, max: 18});
  t.equal(helper.getFirst(), 'min', `${label}: 5 - 18 -> 3 - 22, update min first`);

  // Only min changing (decreasing)
  helper.reset(5, 18);
  updateFn(helper.map, {min: 3, max: 18}, {min: 5, max: 18});
  t.equal(helper.getFirst(), 'min', `${label}: 5 - 18 -> 3 - 18, update min first`);

  // Range contracting
  helper.reset(3, 22);
  updateFn(helper.map, {min: 5, max: 18}, {min: 3, max: 22});
  t.equal(helper.getFirst(), 'max', `${label}: 3 - 22 -> 5 - 18, update max first`);

  // Range shifting down with high start
  helper.reset(12, 22);
  updateFn(helper.map, {min: 5, max: 10}, {min: 12, max: 22});
  t.equal(helper.getFirst(), 'min', `${label}: 12 - 22 -> 5 - 10, update min first`);

  // Locked to single value (min === max)
  helper.reset(3, 10);
  updateFn(helper.map, {min: 5, max: 5}, {min: 3, max: 10});
  t.equal(helper.getFirst(), 'max', `${label}: 3 - 10 -> 5 - 5, lock to single value`);

  // Unlock from single value
  helper.reset(5, 5);
  updateFn(helper.map, {min: 3, max: 10}, {min: 5, max: 5});
  t.equal(helper.getFirst(), 'min', `${label}: 5 - 5 -> 3 - 10, unlock from single value`);

  // Partial overlap (shifting up)
  helper.reset(3, 8);
  updateFn(helper.map, {min: 6, max: 10}, {min: 3, max: 8});
  t.equal(helper.getFirst(), 'max', `${label}: 3 - 8 -> 6 - 10, partial overlap shifting up`);

  // Partial overlap (shifting down)
  helper.reset(6, 10);
  updateFn(helper.map, {min: 3, max: 8}, {min: 6, max: 10});
  t.equal(helper.getFirst(), 'min', `${label}: 6 - 10 -> 3 - 8, partial overlap shifting down`);

  // No change returns false
  helper.reset(3, 10);
  const changed = updateFn(helper.map, {min: 3, max: 10}, {min: 3, max: 10});
  t.equal(changed, false, `${label}: no change returns false`);
}

test('updateZoomConstraint', t => {
  testConstraintUpdate(t, updateZoomConstraint, 'setMinZoom', 'setMaxZoom', 'zoom');
  t.end();
});

test('updatePitchConstraint', t => {
  testConstraintUpdate(t, updatePitchConstraint, 'setMinPitch', 'setMaxPitch', 'pitch');
  t.end();
});
