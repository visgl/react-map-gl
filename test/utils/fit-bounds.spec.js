import test from 'tape-catch';
import {fitBounds} from 'react-map-gl';

const FITBOUNDS_TEST_CASES = [
  {
    width: 100,
    height: 100,
    bounds: [[-73.9876, 40.7661], [-72.9876, 41.7661]]
  }
];

test('fitBounds', t => {
  for (const testCase of FITBOUNDS_TEST_CASES) {
    const result = fitBounds(testCase.width, testCase.height, testCase.bounds);
    t.equal(Number.isFinite(result.latitude), true, 'got expected latitude');
    t.equal(Number.isFinite(result.longitude), true, 'got expected latitude');
    t.equal(Number.isFinite(result.zoom), true, 'got expected zoom');
  }
  t.end();
});
