import test from 'tape-promise/tape';
import {
  getTransformLike,
  transformToViewState,
  applyViewStateToTransform
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
