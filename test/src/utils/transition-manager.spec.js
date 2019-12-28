import test from 'tape-catch';
import {equals} from '../../test-utils';
import TransitionManager from 'react-map-gl/utils/transition-manager';
import {cropEasingFunction} from 'react-map-gl/utils/transition-manager';
import {TRANSITION_EVENTS} from 'react-map-gl/utils/transition-manager';
import LinearInterpolator from 'react-map-gl/utils/transition/linear-interpolator';
import ViewportFlyToInterpolator from 'react-map-gl/utils/transition/viewport-fly-to-interpolator';

/* global global, setTimeout, clearTimeout */
// backfill requestAnimationFrame on Node
if (typeof global !== 'undefined' && !global.requestAnimationFrame) {
  global.requestAnimationFrame = callback => setTimeout(callback, 100);
  global.cancelAnimationFrame = frameId => clearTimeout(frameId);
}

/* eslint-disable */
const TEST_CASES = [
  {
    title: 'No transition-able viewport change',
    initialProps: {
      width: 100,
      height: 100,
      longitude: -122.45,
      latitude: 37.78,
      zoom: 12,
      pitch: 0,
      bearing: 0,
      transitionDuration: 200
    },
    input: [
      // no change
      {
        width: 100,
        height: 100,
        longitude: -122.45,
        latitude: 37.78,
        zoom: 12,
        pitch: 0,
        bearing: 0,
        transitionDuration: 200
      },
      // no valid prop change
      {
        width: 200,
        height: 100,
        longitude: -122.45,
        latitude: 37.78,
        zoom: 12,
        pitch: 0,
        bearing: 0,
        transitionDuration: 'auto'
      },
      // transitionDuration is 0
      {
        width: 100,
        height: 100,
        longitude: -70.9,
        latitude: 41,
        zoom: 12,
        pitch: 60,
        bearing: 0
      },
      // transitionInterpolator is empty
      {
        width: 100,
        height: 100,
        longitude: -70.9,
        latitude: 41,
        zoom: 12,
        pitch: 60,
        bearing: 0,
        transitionDuration: 200,
        transitionInterpolator: null
      }
    ],
    expect: [false, false, false, false]
  },
  {
    title: 'Trigger viewport transition',
    initialProps: {
      width: 100,
      height: 100,
      longitude: -70.9,
      latitude: 41,
      zoom: 12,
      pitch: 60,
      bearing: 0,
      transitionDuration: 200
    },
    input: [
      // viewport change
      {
        width: 100,
        height: 100,
        longitude: -122.45,
        latitude: 37.78,
        zoom: 12,
        pitch: 0,
        bearing: 0,
        transitionDuration: 200
      },
      // viewport change interrupting transition
      {
        width: 100,
        height: 100,
        longitude: -122.45,
        latitude: 37.78,
        zoom: 12,
        pitch: 0,
        bearing: 0,
        transitionDuration: 200
      },
      // viewport change interrupting transition
      {
        width: 100,
        height: 100,
        longitude: -122.45,
        latitude: 37.78,
        zoom: 12,
        pitch: 0,
        bearing: 0,
        transitionInterpolator: new ViewportFlyToInterpolator({speed: 50}),
        transitionDuration: 'auto'
      }
    ],
    expect: [true, true, true]
  }
];

test('TransitionManager#constructor', t => {
  const transitionManager = new TransitionManager();
  t.ok(transitionManager, 'TransitionManager constructor does not throw errors');
  t.notOk(transitionManager._isTransitionInProgress(), 'no transition in progress');
  t.end();
});

test('TransitionManager#processViewportChange', t => {
  const mergeProps = props => Object.assign({}, TransitionManager.defaultProps, props);

  TEST_CASES.forEach(testCase => {
    const transitionManager = new TransitionManager(mergeProps(testCase.initialProps));

    testCase.input.forEach((props, i) => {
      t.is(
        transitionManager.processViewportChange(mergeProps(props)),
        testCase.expect[i],
        testCase.title
      );
    });
  });

  t.end();
});

test('TransitionManager#callbacks', t => {
  const testCase = TEST_CASES[1];

  let startCount = 0;
  let interruptCount = 0;
  let endCount = 0;
  let updateCount = 0;
  let viewport;
  let transitionProps;

  const {transitionInterpolator} = TransitionManager.defaultProps;

  const callbacks = {
    onTransitionStart: () => {
      viewport = {};
      startCount++;
    },
    onTransitionInterrupt: () => interruptCount++,
    onTransitionEnd: () => {
      t.ok(
        transitionInterpolator.arePropsEqual(viewport, transitionProps),
        'viewport matches end props'
      );
      endCount++;
    },
    onViewportChange: (newViewport, interactionState) => {
      t.ok(!transitionInterpolator.arePropsEqual(viewport, newViewport), 'viewport has changed');
      t.ok(interactionState.inTransition, 'inTransition flag is true');
      viewport = newViewport;
      // update props in transition, should not trigger interruption
      transitionManager.processViewportChange(Object.assign({}, transitionProps, viewport));
      updateCount++;
    }
  };

  const mergeProps = props => Object.assign({}, TransitionManager.defaultProps, callbacks, props);

  const transitionManager = new TransitionManager(mergeProps(testCase.initialProps));

  testCase.input.forEach((props, i) => {
    transitionProps = mergeProps(props);
    transitionManager.processViewportChange(transitionProps);
  });

  setTimeout(() => {
    t.is(startCount, 3, 'onTransitionStart() called twice');
    t.is(interruptCount, 2, 'onTransitionInterrupt() called once');
    t.is(endCount, 1, 'onTransitionEnd() called once');
    t.ok(updateCount > 2, 'onViewportChange() called');
    t.end();
  }, 500);
});

// testing cropEasingFunction
const easingFunctions = [t => Math.sqrt(t), t => t, t => t * t, t => t * t * t];
const interruptions = [0.2, 0.5, 0.8];
const values = [0, 0.5, 1];

test('TransitionManager#cropEasingFunction', function(t) {
  easingFunctions.forEach(func => {
    interruptions.forEach(x0 => {
      var newEasing = cropEasingFunction(func, x0);
      t.ok(equals(newEasing(0), 0), 'cropped easing function starts at (0, 0)');
      t.ok(equals(newEasing(1), 1), 'cropped easing function ends at (1, 1)');
      values.forEach(val => {
        t.ok(
          equals(func(x0 + val * (1 - x0)), func(x0) + (1 - func(x0)) * newEasing(val)),
          'cropped easing function matches the old one'
        );
      });
    });
  });
  t.end();
});

// testing interruption mode

const TEST_CASES_EVENTS = [
  {
    title: 'Transition events',
    initialProps: {
      width: 100,
      height: 100,
      longitude: -70.9,
      latitude: 41,
      zoom: 12,
      pitch: 60,
      bearing: 0,
      transitionDuration: 200,
      transitionInterpolator: new LinearInterpolator()
    },
    input: [
      // viewport change
      {
        width: 100,
        height: 100,
        longitude: -102.45,
        latitude: 3.78,
        zoom: 1,
        pitch: 10,
        bearing: 30,
        transitionDuration: 200,
        transitionEasing: t => t * t,
        transitionInterpolator: new ViewportFlyToInterpolator()
      },
      // viewport change interrupting transition
      {
        width: 100,
        height: 100,
        longitude: -122.45,
        latitude: 37.78,
        zoom: 12,
        pitch: 0,
        bearing: 0,
        transitionDuration: 2000,
        transitionEasing: t => t,
        transitionInterpolator: new LinearInterpolator()
      }
    ],
    shouldChange: {
      [TRANSITION_EVENTS.BREAK]: {
        transitionInterpolator: false,
        transitionDuration: false,
        transitionEasing: false
      },
      [TRANSITION_EVENTS.SNAP_TO_END]: {
        transitionInterpolator: false,
        transitionDuration: false,
        transitionEasing: false
      },
      [TRANSITION_EVENTS.IGNORE]: {
        transitionInterpolator: true,
        transitionDuration: true,
        transitionEasing: true
      },
      [TRANSITION_EVENTS.UPDATE]: {
        transitionInterpolator: true,
        transitionDuration: true,
        transitionEasing: true
      }
    }
  },
  {
    title: 'Transition events',
    initialProps: {
      width: 100,
      height: 100,
      longitude: -70.9,
      latitude: 41,
      zoom: 12,
      pitch: 60,
      bearing: 0,
      transitionDuration: 200,
      transitionInterpolator: new LinearInterpolator()
    },
    input: [
      // viewport change
      {
        width: 100,
        height: 100,
        longitude: -102.45,
        latitude: 3.78,
        zoom: 1,
        pitch: 10,
        bearing: 30,
        transitionDuration: 200,
        transitionEasing: t => t * t,
        transitionInterpolator: new ViewportFlyToInterpolator()
      },
      // viewport change interrupting transition
      {
        width: 100,
        height: 100,
        longitude: -122.45,
        latitude: 37.78,
        zoom: 12,
        pitch: 0,
        bearing: 0,
        transitionDuration: 2000,
        transitionEasing: t => t,
        transitionInterpolator: new LinearInterpolator()
      }
    ],
    shouldChange: {
      [TRANSITION_EVENTS.BREAK]: {
        transitionInterpolator: true,
        transitionDuration: true,
        transitionEasing: true
      },
      [TRANSITION_EVENTS.SNAP_TO_END]: {
        transitionInterpolator: true,
        transitionDuration: true,
        transitionEasing: true
      },
      [TRANSITION_EVENTS.IGNORE]: {
        transitionInterpolator: false,
        transitionDuration: false,
        transitionEasing: false
      },
      [TRANSITION_EVENTS.UPDATE]: {
        transitionInterpolator: false,
        transitionDuration: false,
        transitionEasing: false
      }
    }
  }
];

function compareFunc(func1, func2, step) {
  for (let i = 0; i <= 1; i += step) {
    if (!equals(func1(i), func2(i), 1e-7)) return false;
  }
  return true;
}

test('TransitionManager#TRANSITION_EVENTS', t => {
  const UPDATE_INTERVAL = 100;

  TEST_CASES_EVENTS.forEach((testCase, ti) => {
    for (let mode in testCase.shouldChange) {
      mode = parseInt(mode);
      let transitionProps;
      let time = 0;
      const transitionManager = new TransitionManager(
        Object.assign({}, TransitionManager.defaultProps, testCase.initialProps, {
          transitionInterruption: mode
        }),
        // Override current time getter
        () => time
      );

      testCase.input.forEach((props, i) => {
        transitionProps = Object.assign({}, TransitionManager.defaultProps, props, {
          transitionInterruption: mode
        });
        time = i * UPDATE_INTERVAL;
        transitionManager.processViewportChange(transitionProps);
      });
      // testing interpolator
      t.is(
        transitionManager.state.interpolator === testCase.input[ti].transitionInterpolator,
        testCase.shouldChange[mode].transitionInterpolator,
        'transitionInterpolator match'
      );

      // testing duration
      const testDuration =
        mode === TRANSITION_EVENTS.UPDATE
          ? testCase.input[ti].transitionDuration - UPDATE_INTERVAL
          : testCase.input[ti].transitionDuration;
      t.is(
        equals(transitionManager.state.duration, testDuration, 1e-7),
        testCase.shouldChange[mode].transitionDuration,
        'transitionDuration match'
      );

      // testing easing function
      let testEasingFunc = testCase.input[ti].transitionEasing;
      if (mode === TRANSITION_EVENTS.UPDATE) {
        const completion = UPDATE_INTERVAL / testCase.input[ti].transitionDuration;
        testEasingFunc = cropEasingFunction(testCase.input[ti].transitionEasing, completion);
      }

      t.is(
        compareFunc(transitionManager.state.easing, testEasingFunc, 0.1),
        testCase.shouldChange[mode].transitionEasing,
        'transitionEasing match'
      );

      // We provided an external timer so the animation never ends.
      // The test cannot end if there is a pending animation frame requested.
      transitionManager._endTransition();
    }
  });
  t.end();
});

test('TransitionManager#auto#duration', t => {
  const mergeProps = props => Object.assign({}, TransitionManager.defaultProps, props);
  const initialProps = {
    width: 100,
    height: 100,
    longitude: -122.45,
    latitude: 37.78,
    zoom: 12,
    pitch: 0,
    bearing: 0,
    transitionDuration: 200
  };
  const transitionManager = new TransitionManager(mergeProps(initialProps));
  transitionManager.processViewportChange(
    mergeProps({
      width: 100,
      height: 100,
      longitude: -100.45, // changed
      latitude: 37.78,
      zoom: 12,
      pitch: 0,
      bearing: 0,
      transitionInterpolator: new ViewportFlyToInterpolator(),
      transitionDuration: 'auto'
    })
  );
  t.ok(
    Number.isFinite(transitionManager.state.duration) && transitionManager.state.duration > 0,
    'should set duraiton when using "auto" mode'
  );
  t.end();
});
