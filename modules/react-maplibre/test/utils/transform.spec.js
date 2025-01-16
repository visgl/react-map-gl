import test from 'tape-promise/tape';
import {
  transformToViewState,
  applyViewStateToTransform
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
