import test from 'tape';
import {
  transformToViewState,
  applyViewStateToTransform,
  updateZoomConstraint
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

  // moving down. 5 - 10 -> 1 - 3
  currentMinZoom = 5
  currentMaxZoom = 10
  updateZoomConstraint(map, { min: 1, max: 3 }, { min: 5, max: 10 });
  t.equal(first, 'min', 'min first')
  first = null

  // moving up. 1 - 3 -> 5 - 10
  currentMinZoom = 1
  currentMaxZoom = 3
  updateZoomConstraint(map, { min: 5, max: 10 }, { min: 1, max: 3 });
  t.equal(first, 'max', 'max first')
  first = null

  // expanding. 5 - 18 -> 3 - 22
  currentMinZoom = 5
  currentMaxZoom = 18
  updateZoomConstraint(map, { min: 3, max: 22 }, { min: 5, max: 18 });
  t.equal(first, 'min', 'min first')
  first = null

  // expanding down. 5 - 18 -> 3 - 18
  currentMinZoom = 5
  currentMaxZoom = 18
  updateZoomConstraint(map, { min: 3, max: 18 }, { min: 5, max: 18 });
  t.equal(first, 'min', 'min first')
  first = null

  // contracting. 3 - 22 -> 5 - 18
  currentMinZoom = 5
  currentMaxZoom = 18
  updateZoomConstraint(map, { min: 5, max: 18 }, { min: 3, max: 22 });
  t.equal(first, 'max', 'max first')
  first = null

  // contracting down. 12 - 22 -> 5 - 10
  currentMinZoom = 12
  currentMaxZoom = 22
  updateZoomConstraint(map, { min: 5, max: 10 }, { min: 12, max: 22 });
  t.equal(first, 'min', 'min first')
  first = null

  t.end();
});
