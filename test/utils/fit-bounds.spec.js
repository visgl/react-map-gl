import test from 'tape-catch';
import {fitBounds} from 'react-map-gl';
import {toLowPrecision} from '../test-utils';

const FITBOUNDS_TEST_CASES = [
  [
    {
      viewport: {width: 100, height: 100},
      bounds: [[-73.9876, 40.7661], [-72.9876, 41.7661]],
      options: {}
    },
    {
      longitude: -73.48759999999997,
      latitude: 41.26801443944763,
      zoom: 5.723804361273887
    }
  ],
  [
    {
      viewport: {width: 600, height: 400},
      bounds: [[-23.407, 64.863], [-23.406, 64.874]],
      options: {padding: 20, offset: [0, -40]}
    },
    {
      longitude: -23.406499999999973,
      latitude: 64.86850056273362,
      zoom: 12.89199533073045
    }
  ]
];

test('fitBounds', (t) => {
  for (const [{viewport, bounds, options}, expected] of FITBOUNDS_TEST_CASES) {
    const result = fitBounds(viewport, bounds, options);

    t.ok(Number.isFinite(result.longitude), 'get valid longitude');
    t.ok(Number.isFinite(result.latitude), 'get valid latitude');
    t.ok(Number.isFinite(result.zoom), 'get valid zoom');
    t.deepEqual(
      toLowPrecision(result),
      toLowPrecision(expected),
      'valid viewport returned'
    );
  }
  t.end();
});
