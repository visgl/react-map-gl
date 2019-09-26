import test from 'tape-catch';

import deepEqual from 'react-map-gl/utils/deep-equal';

test('deepEqual', t => {
  const testCases = [
    {
      a: 0,
      b: 0,
      isEqual: true
    },
    {
      a: 'a',
      b: 'b',
      isEqual: false
    },
    {
      a: 0,
      b: null,
      isEqual: false
    },
    {
      a: {},
      b: undefined,
      isEqual: false
    },
    {
      a: [],
      b: {},
      isEqual: false
    },
    {
      a: [],
      b: [0],
      isEqual: false
    },
    {
      a: [0],
      b: [1],
      isEqual: false
    },
    {
      a: [{}],
      b: [{}],
      isEqual: true
    },
    {
      a: {x: 0},
      b: {x: 0},
      isEqual: true
    },
    {
      a: {x: 0},
      b: {x: 0, y: 1},
      isEqual: false
    },
    {
      a: {x: 0},
      b: {x: 1},
      isEqual: false
    },
    {
      a: {
        layout: {
          'line-cap': 'butt',
          'line-join': 'miter'
        },
        filter: ['all', ['==', '$type', 'LineString']],
        type: 'line',
        source: 'mapbox',
        id: 'tunnel_minor',
        paint: {
          'line-color': '#efefef',
          'line-width': {
            base: 1.55,
            stops: [[4, 0.25], [20, 30]]
          }
        },
        'source-layer': 'road'
      },
      b: {
        layout: {
          'line-cap': 'butt',
          'line-join': 'miter'
        },
        filter: ['all', ['==', '$type', 'LineString']],
        type: 'line',
        source: 'mapbox',
        id: 'tunnel_minor',
        paint: {
          'line-color': '#efefef',
          'line-width': {
            base: 1.55,
            stops: [[4, 0.25], [20, 30]]
          }
        },
        'source-layer': 'road'
      },
      isEqual: true
    }
  ];

  for (const testCase of testCases) {
    const aStr = JSON.stringify(testCase.a);
    const bStr = JSON.stringify(testCase.b);
    t.is(
      deepEqual(testCase.a, testCase.b),
      testCase.isEqual,
      `${aStr} is ${testCase.isEqual ? 'equal' : 'not equal'} to ${bStr}`
    );
    if (!testCase.isEqual) {
      t.is(
        deepEqual(testCase.b, testCase.a),
        testCase.isEqual,
        `${bStr} is ${testCase.isEqual ? 'equal' : 'not equal'} to ${aStr}`
      );
    }
  }

  t.end();
});
