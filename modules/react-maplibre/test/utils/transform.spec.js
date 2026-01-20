import test from 'tape-promise/tape';
import {
  transformToViewState,
  applyViewStateToTransform,
  updateZoomConstraint,
  updatePitchConstraint,
} from '@vis.gl/react-maplibre/utils/transform';
import maplibregl from 'maplibre-gl';

test('transformToViewState', t => {
  const tr = {
    center: new maplibregl.LngLat(-122.45, 37.78),
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
    center: new maplibregl.LngLat(-122.45, 37.78),
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
      center: new maplibregl.LngLat(-10, 5)
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

test('updateZoomConstraint', t => {
  let first = null
  let currentMinZoom = 0
  let currentMaxZoom = 0
  const map = {
    setMinZoom: (nextMinZoom) => {
      if (nextMinZoom > currentMaxZoom) {
        throw new Error('Setting minZoom > maxZoom')
      }
      currentMinZoom = nextMinZoom
      if (!first) {
        first = 'min'
      }
    },
    setMaxZoom: (nextMaxZoom) => {
      if (nextMaxZoom < currentMinZoom) {
        throw new Error('Setting maxZoom < minZoom')
      }
      currentMaxZoom = nextMaxZoom
      if (!first) {
        first = 'max'
      }
    }
  }

  currentMinZoom = 5
  currentMaxZoom = 10
  updateZoomConstraint(map, { min: 1, max: 3 }, { min: currentMinZoom, max: currentMaxZoom });
  t.equal(first, 'min', '5 - 10 -> 1 - 3, update min first')
  first = null

  currentMinZoom = 1
  currentMaxZoom = 3
  updateZoomConstraint(map, { min: 5, max: 10 }, { min: currentMinZoom, max: currentMaxZoom });
  t.equal(first, 'max', '1 - 3 -> 5 - 10, update max first')
  first = null

  currentMinZoom = 5
  currentMaxZoom = 18
  updateZoomConstraint(map, { min: 3, max: 22 }, { min: currentMinZoom, max: currentMaxZoom });
  t.equal(first, 'min', '5 - 18 -> 3 - 22, update min first')
  first = null

  currentMinZoom = 5
  currentMaxZoom = 18
  updateZoomConstraint(map, { min: 3, max: 18 }, { min: currentMinZoom, max: currentMaxZoom });
  t.equal(first, 'min', '5 - 18 -> 3 - 18, update min first')
  first = null

  currentMinZoom = 3
  currentMaxZoom = 22
  updateZoomConstraint(map, { min: 5, max: 18 }, { min: currentMinZoom, max: currentMaxZoom });
  t.equal(first, 'max', '3 - 22 -> 5 - 18, update max first')
  first = null

  currentMinZoom = 12
  currentMaxZoom = 22
  updateZoomConstraint(map, { min: 5, max: 10 }, { min: currentMinZoom, max: currentMaxZoom });
  t.equal(first, 'min', '12 - 22 -> 5 - 10, update min first')
  first = null

  t.end();
});

test('updatePitchConstraint', t => {
  let first = null
  let currentMinPitch = 0
  let currentMaxPitch = 0
  const map = {
    setMinPitch: (nextMinPitch) => {
      if (nextMinPitch > currentMaxPitch) {
        throw new Error('Setting minPitch > maxPitch')
      }
      currentMinPitch = nextMinPitch
      if (!first) {
        first = 'min'
      }
    },
    setMaxPitch: (nextMaxPitch) => {
      if (nextMaxPitch < currentMinPitch) {
        throw new Error('Setting maxPitch < minPitch')
      }
      currentMaxPitch = nextMaxPitch
      if (!first) {
        first = 'max'
      }
    }
  }

  currentMinPitch = 5
  currentMaxPitch = 10
  updatePitchConstraint(map, { min: 1, max: 3 }, { min: currentMinPitch, max: currentMaxPitch });
  t.equal(first, 'min', '5 - 10 -> 1 - 3, update min first')
  first = null

  currentMinPitch = 1
  currentMaxPitch = 3
  updatePitchConstraint(map, { min: 5, max: 10 }, { min: currentMinPitch, max: currentMaxPitch });
  t.equal(first, 'max', '1 - 3 -> 5 - 10, update max first')
  first = null

  currentMinPitch = 5
  currentMaxPitch = 18
  updatePitchConstraint(map, { min: 3, max: 22 }, { min: currentMinPitch, max: currentMaxPitch });
  t.equal(first, 'min', '5 - 18 -> 3 - 22, update min first')
  first = null

  currentMinPitch = 5
  currentMaxPitch = 18
  updatePitchConstraint(map, { min: 3, max: 18 }, { min: currentMinPitch, max: currentMaxPitch });
  t.equal(first, 'min', '5 - 18 -> 3 - 18, update min first')
  first = null

  currentMinPitch = 3
  currentMaxPitch = 22
  updatePitchConstraint(map, { min: 5, max: 18 }, { min: currentMinPitch, max: currentMaxPitch });
  t.equal(first, 'max', '3 - 22 -> 5 - 18, update max first')
  first = null

  currentMinPitch = 12
  currentMaxPitch = 22
  updatePitchConstraint(map, { min: 5, max: 10 }, { min: currentMinPitch, max: currentMaxPitch });
  t.equal(first, 'min', '12 - 22 -> 5 - 10, update min first')
  first = null

  t.end();
});
