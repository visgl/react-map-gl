import {expect, test} from 'vitest';
import {
  transformToViewState,
  compareViewStateWithTransform,
  applyViewStateToTransform
} from '@vis.gl/react-mapbox/utils/transform';

import Transform from './mapbox-gl-mock/transform';

test('applyViewStateToTransform', () => {
  const tr = new Transform();
  let viewState = {};
  let changed = compareViewStateWithTransform(tr, viewState);
  applyViewStateToTransform(tr, viewState);
  expect(changed, 'empty view state').toBeFalsy();

  viewState = {longitude: -10, latitude: 5};
  changed = compareViewStateWithTransform(tr, viewState);
  applyViewStateToTransform(tr, viewState);
  expect(changed, 'center changed').toBeTruthy();
  expect(transformToViewState(tr), 'view state is correct').toEqual({
    longitude: -10,
    latitude: 5,
    zoom: 0,
    pitch: 0,
    bearing: 0,
    padding: {left: 0, right: 0, top: 0, bottom: 0},
    elevation: 0
  });

  viewState = {zoom: 10};
  changed = compareViewStateWithTransform(tr, viewState);
  applyViewStateToTransform(tr, viewState);
  expect(changed, 'zoom changed').toBeTruthy();
  expect(transformToViewState(tr), 'view state is correct').toEqual({
    longitude: -10,
    latitude: 5,
    zoom: 10,
    pitch: 0,
    bearing: 0,
    padding: {left: 0, right: 0, top: 0, bottom: 0},
    elevation: 0
  });

  viewState = {pitch: 30};
  changed = compareViewStateWithTransform(tr, viewState);
  applyViewStateToTransform(tr, viewState);
  expect(changed, 'pitch changed').toBeTruthy();
  expect(transformToViewState(tr), 'view state is correct').toEqual({
    longitude: -10,
    latitude: 5,
    zoom: 10,
    pitch: 30,
    bearing: 0,
    padding: {left: 0, right: 0, top: 0, bottom: 0},
    elevation: 0
  });

  viewState = {bearing: 270};
  changed = compareViewStateWithTransform(tr, viewState);
  applyViewStateToTransform(tr, viewState);
  expect(changed, 'bearing changed').toBeTruthy();
  expect(transformToViewState(tr), 'view state is correct').toEqual({
    longitude: -10,
    latitude: 5,
    zoom: 10,
    pitch: 30,
    bearing: -90,
    padding: {left: 0, right: 0, top: 0, bottom: 0},
    elevation: 0
  });

  viewState = {padding: {left: 10, right: 10, top: 10, bottom: 10}};
  changed = compareViewStateWithTransform(tr, viewState);
  applyViewStateToTransform(tr, viewState);
  expect(changed, 'padding changed').toBeTruthy();
  expect(transformToViewState(tr), 'view state is correct').toEqual({
    longitude: -10,
    latitude: 5,
    zoom: 10,
    pitch: 30,
    bearing: -90,
    padding: {left: 10, right: 10, top: 10, bottom: 10},
    elevation: 0
  });

  viewState = {pitch: 30};
  changed = compareViewStateWithTransform(tr, viewState);
  applyViewStateToTransform(tr, viewState);
  expect(changed, 'nothing changed').toBeFalsy();

  applyViewStateToTransform(tr, {longitude: 0, latitude: 0, zoom: 0});

  viewState = {longitude: 12, latitude: 34, zoom: 15};
  changed = compareViewStateWithTransform(tr, viewState);
  applyViewStateToTransform(tr, viewState);
  expect(changed, 'center and zoom changed').toBeTruthy();
  expect(tr.zoom, 'zoom is correct').toBe(15);
  expect(tr.center.lat, 'center latitude is correct').toBe(34);
});
