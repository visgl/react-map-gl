import test from 'tape-catch';
import {ViewportFlyToInterpolator} from 'react-map-gl/utils/transition';
import {toLowPrecision} from 'react-map-gl/test/test-utils';

const START_PROPS = {
  width: 800,
  height: 600,
  longitude: -122.45,
  latitude: 37.78,
  zoom: 12
};

const END_PROPS = {
  width: 800,
  height: 600,
  longitude: -74,
  latitude: 40.7,
  zoom: 11
};
/* eslint-disable max-len */
const TEST_CASES = [
  {
    title: 'throw for missing prop',
    startProps: {longitude: -122.45, latitude: 37.78, zoom: 12},
    endProps: {longitude: -74, latitude: 40.7, zoom: 11},
    shouldThrow: true
  },
  {
    title: 'optional prop fallback',
    startProps: START_PROPS,
    endProps: END_PROPS,
    expect: {
      start: {
        width: 800,
        height: 600,
        longitude: -122.45,
        latitude: 37.78,
        zoom: 12,
        pitch: 0,
        bearing: 0
      },
      end: {
        width: 800,
        height: 600,
        longitude: -74,
        latitude: 40.7,
        zoom: 11,
        pitch: 0,
        bearing: 0
      }
    },
    transition: {
      0.25: {
        bearing: 0,
        pitch: 0,
        longitude: -122.4017,
        latitude: 37.78297,
        zoom: 7.518116
      },
      0.5: {
        bearing: 0,
        pitch: 0,
        longitude: -106.3,
        latitude: 38.76683,
        zoom: 3.618313
      },
      0.75: {
        bearing: 0,
        pitch: 0,
        longitude: -74.19253,
        latitude: 40.68864,
        zoom: 6.522422
      }
    }
  },
  {
    title: 'find shortest path',
    startProps: {
      width: 800,
      height: 600,
      longitude: -122.45,
      latitude: 37.78,
      zoom: 12,
      pitch: 0,
      bearing: -120
    },
    endProps: {
      width: 800,
      height: 600,
      longitude: 179,
      latitude: 40.7,
      zoom: 11,
      bearing: 120
    },
    expect: {
      start: {
        width: 800,
        height: 600,
        longitude: -122.45,
        latitude: 37.78,
        zoom: 12,
        pitch: 0,
        bearing: -120
      },
      end: {
        width: 800,
        height: 600,
        longitude: -181,
        latitude: 40.7,
        zoom: 11,
        pitch: 0,
        bearing: -240
      }
    },
    transition: {
      0.25: {
        bearing: -150,
        pitch: 0,
        longitude: -122.4983,
        latitude: 37.78246,
        zoom: 7.38197
      },
      0.5: {
        bearing: -180,
        pitch: 0,
        longitude: -141.9667,
        latitude: 38.76683,
        zoom: 3.346515
      },
      0.75: {
        bearing: -210,
        pitch: 0,
        longitude: -180.8071,
        latitude: 40.69058,
        zoom: 6.38554
      }
    }
  }
];
/* eslint-enable max-len */

const DURATION_TEST_CASES = [
  {
    title: 'fixed duration',
    endProps: {transitionDuration: 100},
    expected: 100
  },
  {
    title: 'auto duration',
    endProps: {transitionDuration: 'auto'},
    expected: 7325.794
  },
  {
    title: 'high speed',
    opts: {speed: 10},
    endProps: {transitionDuration: 'auto'},
    expected: 879.0953
  },
  {
    title: 'high curve',
    opts: {curve: 8},
    endProps: {transitionDuration: 'auto'},
    expected: 2016.924
  }
];

test('ViewportFlyToInterpolator#initializeProps', t => {
  const interpolator = new ViewportFlyToInterpolator();

  TEST_CASES.forEach(testCase => {
    const getResult = () => interpolator.initializeProps(testCase.startProps, testCase.endProps);

    if (testCase.shouldThrow) {
      t.throws(getResult, testCase.title);
    } else {
      t.deepEqual(getResult(), testCase.expect, testCase.title);
    }
  });

  t.end();
});

test('ViewportFlyToInterpolator#interpolateProps', t => {
  const interpolator = new ViewportFlyToInterpolator();

  TEST_CASES.filter(testCase => testCase.transition).forEach(testCase => {
    Object.keys(testCase.transition).forEach(time => {
      const propsInTransition = interpolator.interpolateProps(
        testCase.expect.start,
        testCase.expect.end,
        Number(time)
      );
      t.deepEqual(toLowPrecision(propsInTransition, 7), testCase.transition[time], time);
    });
  });

  t.end();
});

test('ViewportFlyToInterpolator#getDuration', t => {
  DURATION_TEST_CASES.forEach(testCase => {
    const interpolator = new ViewportFlyToInterpolator(testCase.opts);
    t.equal(
      toLowPrecision(
        interpolator.getDuration(START_PROPS, Object.assign({}, END_PROPS, testCase.endProps)),
        7
      ),
      testCase.expected,
      `${testCase.title}: should receive correct duration`
    );
  });
  t.end();
});
