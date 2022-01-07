import test from 'tape-promise/tape';
import {transformToViewState, applyViewStateToTransform} from 'react-map-gl/utils/transform';

import Transform from './mapbox-gl-mock/transform';

test('applyViewStateToTransform', t => {
  const tr = new Transform();

  let changed = applyViewStateToTransform(tr, {});
  t.notOk(changed, 'empty view state');

  changed = applyViewStateToTransform(tr, {longitude: -10, latitude: 5});
  t.ok(changed, 'center changed');
  t.deepEqual(
    transformToViewState(tr),
    {
      longitude: -10,
      latitude: 5,
      zoom: 0,
      pitch: 0,
      bearing: 0,
      padding: {left: 0, right: 0, top: 0, bottom: 0}
    },
    'view state is correct'
  );

  changed = applyViewStateToTransform(tr, {zoom: -1});
  t.notOk(changed, 'zoom is clamped');

  changed = applyViewStateToTransform(tr, {zoom: 10});
  t.ok(changed, 'zoom changed');
  t.deepEqual(
    transformToViewState(tr),
    {
      longitude: -10,
      latitude: 5,
      zoom: 10,
      pitch: 0,
      bearing: 0,
      padding: {left: 0, right: 0, top: 0, bottom: 0}
    },
    'view state is correct'
  );

  changed = applyViewStateToTransform(tr, {pitch: 30});
  t.ok(changed, 'pitch changed');
  t.deepEqual(
    transformToViewState(tr),
    {
      longitude: -10,
      latitude: 5,
      zoom: 10,
      pitch: 30,
      bearing: 0,
      padding: {left: 0, right: 0, top: 0, bottom: 0}
    },
    'view state is correct'
  );

  changed = applyViewStateToTransform(tr, {bearing: 270});
  t.ok(changed, 'bearing changed');
  t.deepEqual(
    transformToViewState(tr),
    {
      longitude: -10,
      latitude: 5,
      zoom: 10,
      pitch: 30,
      bearing: -90,
      padding: {left: 0, right: 0, top: 0, bottom: 0}
    },
    'view state is correct'
  );

  changed = applyViewStateToTransform(tr, {padding: {left: 10, right: 10, top: 10, bottom: 10}});
  t.ok(changed, 'padding changed');
  t.deepEqual(
    transformToViewState(tr),
    {
      longitude: -10,
      latitude: 5,
      zoom: 10,
      pitch: 30,
      bearing: -90,
      padding: {left: 10, right: 10, top: 10, bottom: 10}
    },
    'view state is correct'
  );

  changed = applyViewStateToTransform(tr, {viewState: {pitch: 30}});
  t.notOk(changed, 'nothing changed');

  t.end();
});
