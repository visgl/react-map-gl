import {expect, test} from 'vitest';
import {removeSource} from '@vis.gl/react-mapbox/utils/remove-source';

test('removeSource', () => {
  const terrainError = new TypeError("Cannot read properties of undefined (reading 'get')");
  let loggedError;
  const originalConsoleError = console.error;
  const map = {
    style: {terrain: {}},
    removeSource() {
      throw terrainError;
    }
  };

  console.error = error => {
    loggedError = error;
  };
  try {
    expect(
      () => removeSource(map, 'my-data'),
      'ignores removal failure while terrain properties are unevaluated'
    ).not.toThrow();
  } finally {
    console.error = originalConsoleError;
  }
  expect(loggedError, 'logs the ignored terrain error').toBe(terrainError);

  const unexpectedError = new Error('unexpected removal failure');
  map.removeSource = () => {
    throw unexpectedError;
  };
  expect(
    () => removeSource(map, 'my-data'),
    'rethrows non-TypeError removal failures while terrain properties are unevaluated'
  ).toThrow(unexpectedError);

  map.removeSource = () => {
    throw terrainError;
  };
  map.style.terrain.properties = {};
  expect(
    () => removeSource(map, 'my-data'),
    'rethrows removal failure after terrain properties are evaluated'
  ).toThrow(terrainError);

  map.style.terrain = null;
  expect(
    () => removeSource(map, 'my-data'),
    'rethrows removal failure when terrain is disabled'
  ).toThrow(terrainError);
});
