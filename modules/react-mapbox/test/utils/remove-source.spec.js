import test from 'tape-promise/tape';
import {removeSource} from '@vis.gl/react-mapbox/utils/remove-source';

test('removeSource', t => {
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
    t.doesNotThrow(
      () => removeSource(map, 'my-data'),
      'ignores removal failure while terrain properties are unevaluated'
    );
  } finally {
    console.error = originalConsoleError;
  }
  t.equal(loggedError, terrainError, 'logs the ignored terrain error');

  const unexpectedError = new Error('unexpected removal failure');
  map.removeSource = () => {
    throw unexpectedError;
  };
  t.throws(
    () => removeSource(map, 'my-data'),
    unexpectedError,
    'rethrows non-TypeError removal failures while terrain properties are unevaluated'
  );

  map.removeSource = () => {
    throw terrainError;
  };
  map.style.terrain.properties = {};
  t.throws(
    () => removeSource(map, 'my-data'),
    terrainError,
    'rethrows removal failure after terrain properties are evaluated'
  );

  map.style.terrain = null;
  t.throws(
    () => removeSource(map, 'my-data'),
    terrainError,
    'rethrows removal failure when terrain is disabled'
  );

  t.end();
});
