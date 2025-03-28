import test from 'tape-promise/tape';
import {
  transformToViewState,
  compareViewStateWithTransform,
  applyViewStateToTransform
} from '@vis.gl/react-mapbox/utils/transform';

import Transform from './mapbox-gl-mock/transform';

test('applyViewStateToTransform', t => {
  const tr = new Transform();
  let viewState = {};
  let changed = compareViewStateWithTransform(tr, viewState);
  applyViewStateToTransform(tr, viewState);
  t.notOk(changed, 'empty view state');

  viewState = {longitude: -10, latitude: 5};
  changed = compareViewStateWithTransform(tr, viewState);
  applyViewStateToTransform(tr, viewState);
  t.ok(changed, 'center changed');
  t.deepEqual(
    transformToViewState(tr),
    {
      longitude: -10,
      latitude: 5,
      zoom: 0,
      pitch: 0,
      bearing: 0,
      padding: {left: 0, right: 0, top: 0, bottom: 0},
      elevation: 0
    },
    'view state is correct'
  );

  viewState = {zoom: 10};
  changed = compareViewStateWithTransform(tr, viewState);
  applyViewStateToTransform(tr, viewState);
  t.ok(changed, 'zoom changed');
  t.deepEqual(
    transformToViewState(tr),
    {
      longitude: -10,
      latitude: 5,
      zoom: 10,
      pitch: 0,
      bearing: 0,
      padding: {left: 0, right: 0, top: 0, bottom: 0},
      elevation: 0
    },
    'view state is correct'
  );

  viewState = {pitch: 30};
  changed = compareViewStateWithTransform(tr, viewState);
  applyViewStateToTransform(tr, viewState);
  t.ok(changed, 'pitch changed');
  t.deepEqual(
    transformToViewState(tr),
    {
      longitude: -10,
      latitude: 5,
      zoom: 10,
      pitch: 30,
      bearing: 0,
      padding: {left: 0, right: 0, top: 0, bottom: 0},
      elevation: 0
    },
    'view state is correct'
  );

  viewState = {bearing: 270};
  changed = compareViewStateWithTransform(tr, viewState);
  applyViewStateToTransform(tr, viewState);
  t.ok(changed, 'bearing changed');
  t.deepEqual(
    transformToViewState(tr),
    {
      longitude: -10,
      latitude: 5,
      zoom: 10,
      pitch: 30,
      bearing: -90,
      padding: {left: 0, right: 0, top: 0, bottom: 0},
      elevation: 0
    },
    'view state is correct'
  );

  viewState = {padding: {left: 10, right: 10, top: 10, bottom: 10}};
  changed = compareViewStateWithTransform(tr, viewState);
  applyViewStateToTransform(tr, viewState);
  t.ok(changed, 'padding changed');
  t.deepEqual(
    transformToViewState(tr),
    {
      longitude: -10,
      latitude: 5,
      zoom: 10,
      pitch: 30,
      bearing: -90,
      padding: {left: 10, right: 10, top: 10, bottom: 10},
      elevation: 0
    },
    'view state is correct'
  );

  viewState = {pitch: 30};
  changed = compareViewStateWithTransform(tr, viewState);
  applyViewStateToTransform(tr, viewState);
  t.notOk(changed, 'nothing changed');

  applyViewStateToTransform(tr, {longitude: 0, latitude: 0, zoom: 0});

  viewState = {longitude: 12, latitude: 34, zoom: 15};
  changed = compareViewStateWithTransform(tr, viewState);
  applyViewStateToTransform(tr, viewState);
  t.ok(changed, 'center and zoom changed');
  t.equal(tr.zoom, 15, 'zoom is correct');
  t.equal(tr.center.lat, 34, 'center latitude is correct');

  t.end();
});
