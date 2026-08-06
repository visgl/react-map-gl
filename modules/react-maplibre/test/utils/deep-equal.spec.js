import {expect, test} from 'vitest';
import {deepEqual, arePointsEqual} from '@vis.gl/react-maplibre/utils/deep-equal';

test('deepEqual', () => {
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
    expect(deepEqual(a, b), `${JSON.stringify(a)} vs ${JSON.stringify(b)}`).toBe(result);
    if (a !== b) {
      expect(deepEqual(b, a), `${JSON.stringify(b)} vs ${JSON.stringify(a)}`).toBe(result);
    }
  }
});

test('arePointsEqual', () => {
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
    expect(arePointsEqual(a, b), `${JSON.stringify(a)}, ${JSON.stringify(b)}`).toBe(result);
    if (a !== b) {
      expect(arePointsEqual(b, a), `${JSON.stringify(b)}, ${JSON.stringify(a)}`).toBe(result);
    }
  }
});
