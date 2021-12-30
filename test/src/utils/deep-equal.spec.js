import test from 'tape-promise/tape';
import {deepEqual, arePointsEqual} from 'react-map-gl/utils/deep-equal';

test('deepEqual', t => {
  const testCases = [
    {
      a: null,
      b: null,
      result: true
    },
    {
      a: undefined,
      b: 0,
      result: false
    },
    {
      a: [1, 2, 3],
      b: [1, 2, 3],
      result: true
    },
    {
      a: [1, 2],
      b: [1, 2, 3],
      result: false
    },
    {
      a: [1, 2],
      b: {0: 1, 1: 2},
      result: false
    },
    {
      a: {x: 0, y: 0, offset: [1, -1]},
      b: {x: 0, y: 0, offset: [1, -1]},
      result: true
    },
    {
      a: {x: 0, y: 0},
      b: {x: 0, y: 0, offset: [1, -1]},
      result: false
    },
    {
      a: {x: 0, y: 0, z: 0},
      b: {x: 0, y: 0, offset: [1, -1]},
      result: false
    }
  ];

  for (const {a, b, result} of testCases) {
    t.is(deepEqual(a, b), result, `${JSON.stringify(a)} vs ${JSON.stringify(b)}`);
    if (a !== b) {
      t.is(deepEqual(b, a), result, `${JSON.stringify(b)} vs ${JSON.stringify(a)}`);
    }
  }

  t.end();
});

test('arePointsEqual', t => {
  const testCases = [
    {
      a: undefined,
      b: undefined,
      result: true
    },
    {
      a: undefined,
      b: [0, 0],
      result: true
    },
    {
      a: undefined,
      b: [0, 1],
      result: false
    },
    {
      a: undefined,
      b: [1, 0],
      result: false
    },
    {
      a: {x: 1, y: 1},
      b: [1, 1],
      result: true
    }
  ];

  for (const {a, b, result} of testCases) {
    t.is(arePointsEqual(a, b), result, `${JSON.stringify(a)}, ${JSON.stringify(b)}`);
    if (a !== b) {
      t.is(arePointsEqual(b, a), result, `${JSON.stringify(b)}, ${JSON.stringify(a)}`);
    }
  }

  t.end();
});
