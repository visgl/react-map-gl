import test from 'tape-catch';
import {LinearInterpolator} from '../../../src/utils/transition';

const TEST_CASES = [
  {
    title: 'extract transition props',
    transitionProps: ['longitude', 'latitude', 'zoom'],
    startProps: {longitude: -122.45, latitude: 37.78, zoom: 12, pitch: 0, bearing: 0},
    endProps: {longitude: -74, latitude: 40.7, zoom: 11, pitch: 0, bearing: 0},
    expect: {
      start: {longitude: -122.45, latitude: 37.78, zoom: 12},
      end: {longitude: -74, latitude: 40.7, zoom: 11}
    },
    transition: {
      0.5: {longitude: -98.225, latitude: 39.24, zoom: 11.5}
    }
  }, {
    title: 'throw for missing prop',
    startProps: {longitude: -122.45, latitude: 37.78, zoom: 12},
    endProps: {longitude: -74, latitude: 40.7, zoom: 11},
    shouldThrow: true
  }, {
    title: 'find shortest path',
    transitionProps: ['longitude', 'latitude'],
    startProps: {longitude: -122.45, latitude: 37.78},
    endProps: {longitude: 179, latitude: 40.7},
    expect: {
      start: {longitude: -122.45, latitude: 37.78},
      end: {longitude: -181, latitude: 40.7}
    },
    transition: {
      0.5: {longitude: -151.725, latitude: 39.24}
    }
  }, {
    title: 'array prop',
    transitionProps: ['position'],
    startProps: {position: [0, 0, 0]},
    endProps: {position: [1, 1, 1]},
    expect: {
      start: {position: [0, 0, 0]},
      end: {position: [1, 1, 1]}
    },
    transition: {
      0.5: {position: [0.5, 0.5, 0.5]}
    }
  }
];

test('LinearInterpolator#constructor', t => {

  const interpolator = new LinearInterpolator(['width', 'height']);
  t.ok(interpolator, 'constructor does not throw error');
  t.deepEqual(interpolator.propNames, ['width', 'height'], 'propNames is set');

  t.end();
});

test('LinearInterpolator#initializeProps', t => {

  TEST_CASES.forEach(testCase => {
    const interpolator = new LinearInterpolator(testCase.transitionProps);
    const getResult = () => interpolator.initializeProps(testCase.startProps, testCase.endProps);

    if (testCase.shouldThrow) {
      t.throws(getResult, testCase.title);
    } else {
      t.deepEqual(getResult(), testCase.expect, testCase.title);
    }
  });

  t.end();
});

test('LinearInterpolator#interpolateProps', t => {

  TEST_CASES
  .filter(testCase => testCase.transition)
  .forEach(testCase => {
    const interpolator = new LinearInterpolator(testCase.transitionProps);
    Object.keys(testCase.transition).forEach(time => {
      const propsInTransition = interpolator.interpolateProps(
        testCase.expect.start, testCase.expect.end, Number(time));
      t.deepEqual(propsInTransition, testCase.transition[time], time);
    });
  });

  t.end();
});
