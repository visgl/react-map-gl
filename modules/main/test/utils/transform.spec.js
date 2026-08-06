import {expect, test} from 'vitest';
import {
  transformToViewState,
  applyViewStateToTransform
} from 'react-map-gl/mapbox-legacy/utils/transform';

import Transform from './mapbox-gl-mock/transform';

test('applyViewStateToTransform', () => {
  const tr = new Transform();

  let changed = applyViewStateToTransform(tr, {});
  expect(changed, 'empty view state').toBeFalsy();

  changed = applyViewStateToTransform(tr, {longitude: -10, latitude: 5});
  expect(changed, 'center changed').toBeTruthy();
  expect(transformToViewState(tr), 'view state is correct').toEqual({
    longitude: -10,
    latitude: 5,
    zoom: 0,
    pitch: 0,
    bearing: 0,
    padding: {left: 0, right: 0, top: 0, bottom: 0}
  });

  changed = applyViewStateToTransform(tr, {zoom: -1});
  expect(changed, 'zoom is clamped').toBeFalsy();

  changed = applyViewStateToTransform(tr, {zoom: 10});
  expect(changed, 'zoom changed').toBeTruthy();
  expect(transformToViewState(tr), 'view state is correct').toEqual({
    longitude: -10,
    latitude: 5,
    zoom: 10,
    pitch: 0,
    bearing: 0,
    padding: {left: 0, right: 0, top: 0, bottom: 0}
  });

  changed = applyViewStateToTransform(tr, {pitch: 30});
  expect(changed, 'pitch changed').toBeTruthy();
  expect(transformToViewState(tr), 'view state is correct').toEqual({
    longitude: -10,
    latitude: 5,
    zoom: 10,
    pitch: 30,
    bearing: 0,
    padding: {left: 0, right: 0, top: 0, bottom: 0}
  });

  changed = applyViewStateToTransform(tr, {bearing: 270});
  expect(changed, 'bearing changed').toBeTruthy();
  expect(transformToViewState(tr), 'view state is correct').toEqual({
    longitude: -10,
    latitude: 5,
    zoom: 10,
    pitch: 30,
    bearing: -90,
    padding: {left: 0, right: 0, top: 0, bottom: 0}
  });

  changed = applyViewStateToTransform(tr, {padding: {left: 10, right: 10, top: 10, bottom: 10}});
  expect(changed, 'padding changed').toBeTruthy();
  expect(transformToViewState(tr), 'view state is correct').toEqual({
    longitude: -10,
    latitude: 5,
    zoom: 10,
    pitch: 30,
    bearing: -90,
    padding: {left: 10, right: 10, top: 10, bottom: 10}
  });

  changed = applyViewStateToTransform(tr, {viewState: {pitch: 30}});
  expect(changed, 'nothing changed').toBeFalsy();

  applyViewStateToTransform(tr, {longitude: 0, latitude: 0, zoom: 0});
  changed = applyViewStateToTransform(tr, {longitude: 12, latitude: 34, zoom: 15});
  expect(changed, 'center and zoom changed').toBeTruthy();
  expect(tr.zoom, 'zoom is correct').toBe(15);
  expect(tr.center.lat, 'center latitude is correct').toBe(34);
});
