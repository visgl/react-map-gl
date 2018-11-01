import test from 'tape-catch';
import TransitionManager from 'react-map-gl/utils/transition-manager';
import {equals} from 'math.gl';
import {cropEasingFunction} from '../../../src/utils/transition-manager';
import {TRANSITION_EVENTS} from '../../../src/utils/transition-manager';
import LinearInterpolator from '../../../src/utils/transition/linear-interpolator';
import ViewportFlyToInterpolator from '../../../src/utils/transition/viewport-fly-to-interpolator';

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
    initialProps:
      {width: 100, height: 100, longitude: -122.45, latitude: 37.78, zoom: 12, pitch: 0, bearing: 0, transitionDuration: 200},
    input: [
      // no change
      {width: 100, height: 100, longitude: -122.45, latitude: 37.78, zoom: 12, pitch: 0, bearing: 0, transitionDuration: 200},
      // no valid prop change
      {width: 200, height: 100, longitude: -122.45, latitude: 37.78, zoom: 12, pitch: 0, bearing: 0, transitionDuration: 200},
      // transitionDuration is 0
      {width: 100, height: 100, longitude: -70.9, latitude: 41, zoom: 12, pitch: 60, bearing: 0},
      // transitionInterpolator is empty
      {width: 100, height: 100, longitude: -70.9, latitude: 41, zoom: 12, pitch: 60, bearing: 0, transitionDuration: 200, transitionInterpolator: null}
    ],
    expect: [false, false, false, false]
  },
  {
    title: 'Trigger viewport transition',
    initialProps:
      {width: 100, height: 100, longitude: -70.9, latitude: 41, zoom: 12, pitch: 60, bearing: 0, transitionDuration: 200},
    input: [
      // viewport change
      {width: 100, height: 100, longitude: -122.45, latitude: 37.78, zoom: 12, pitch: 0, bearing: 0, transitionDuration: 200},
      // viewport change interrupting transition
      {width: 100, height: 100, longitude: -122.45, latitude: 37.78, zoom: 12, pitch: 0, bearing: 0, transitionDuration: 200}
    ],
    expect: [true, true]
  }
];

test('TransitionManager#constructor', t => {
  const transitionManager = new TransitionManager({});
  t.ok(transitionManager, 'TransitionManager constructor does not throw errors');
  t.ok(transitionManager.props, 'TransitionManager has props');
  t.ok(transitionManager.state, 'TransitionManager has state');
  t.end();
});

test('TransitionManager#processViewportChange', t => {

  const mergeProps = props => Object.assign({}, TransitionManager.defaultProps, props);

  TEST_CASES.forEach(testCase => {
    const transitionManager = new TransitionManager(mergeProps(testCase.initialProps));

    testCase.input.forEach((props, i) => {
      t.is(transitionManager.processViewportChange(mergeProps(props)), testCase.expect[i],
        testCase.title);
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
      t.ok(transitionInterpolator.arePropsEqual(viewport, transitionProps),
        'viewport matches end props');
      endCount++;
    },
    onViewportChange: (newViewport, interactionState) => {
      t.ok(!transitionInterpolator.arePropsEqual(viewport, newViewport),
        'viewport has changed');
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
    t.is(startCount, 2, 'onTransitionStart() called twice');
    t.is(interruptCount, 1, 'onTransitionInterrupt() called once');
    t.is(endCount, 1, 'onTransitionEnd() called once');
    t.ok(updateCount > 2, 'onViewportChange() called');
    t.end();
  }, 500);
});

// testing cropEasingFunction
const easingFunctions = [
  t => Math.sqrt(t),
  t => t,
  t => t * t,
  t => t * t * t];
const interruptions = [0.2, 0.5, 0.8];
const values = [0, 0.5, 1];

test('TransitionManager#cropEasingFunction', function (t) {
  easingFunctions.forEach(func => {
    interruptions.forEach(x0 => {
      var newEasing = cropEasingFunction(func, x0);
      t.ok(equals(newEasing(0), 0), 'cropped easing function starts at (0, 0)');
      t.ok(equals(newEasing(1), 1), 'cropped easing function ends at (1, 1)');
      values.forEach(val => {
        t.ok(equals(func(x0 + val * (1 - x0)), func(x0) + (1 - func(x0)) * newEasing(val)), 'cropped easing function matches the old one');
      })
    })
  });
  t.end();
});


// testing interruption mode

test('TransitionManager#TRANSITION_EVENTS', t => {
  const testCase = {
    title: 'Transition events',
    initialProps:
      { width: 100,
        height: 100,
        longitude: -70.9,
        latitude: 41,
        zoom: 12,
        pitch: 60,
        bearing: 0,
        transitionDuration: 200,
        transitionInterpolator: new LinearInterpolator()},
    input: [
      // viewport change
      { width: 100,
        height: 100,
        longitude: -102.45,
        latitude: 3.78,
        zoom: 1,
        pitch: 10,
        bearing: 30,
        transitionDuration: 200,
        transitionEasing: t => t * t,
        transitionInterpolator: new ViewportFlyToInterpolator()},
      // viewport change interrupting transition
      { width: 100,
        height: 100,
        longitude: -122.45,
        latitude: 37.78,
        zoom: 12, pitch: 0,
        bearing: 0,
        transitionDuration: 2000,
        transitionEasing: t => t,
        transitionInterpolator: new LinearInterpolator()}
    ],
    expect: [
      [false, true, false, true, false, true], //break
      [false, true, false, true, false, true], //snap_to_end
      [true, false, true, false, true, false], //ignore
      [true, false, true, false, true, false]  //update
    ],
    modes: [TRANSITION_EVENTS.BREAK, TRANSITION_EVENTS.SNAP_TO_END, TRANSITION_EVENTS.IGNORE, TRANSITION_EVENTS.UPDATE]
  };

  testCase.modes.forEach((mode) => {
    let transitionProps;
    let time = [0, 0];
    let interruptionMode = mode;
    const transitionManager = new TransitionManager(Object.assign({}, TransitionManager.defaultProps, testCase.initialProps, {transitionInterruption: interruptionMode}));

    testCase.input.forEach((props, i) => {
      transitionProps = Object.assign({}, TransitionManager.defaultProps, props, {transitionInterruption: interruptionMode});
      time[i] = Date.now();
      transitionManager.processViewportChange(transitionProps);
    });
    // testing interpolator
    t.is(transitionManager.state.interpolator === testCase.input[0].transitionInterpolator, testCase.expect[mode - 1][0], 'interpolator match');
    t.is(transitionManager.state.interpolator === testCase.input[1].transitionInterpolator, testCase.expect[mode - 1][1], 'interpolator match');

    // testing duration
    const testDuration = mode === TRANSITION_EVENTS.UPDATE ?
                          testCase.input[0].transitionDuration - (time[1] - time[0]) : testCase.input[0].transitionDuration;
    t.is(transitionManager.state.duration === testDuration, testCase.expect[mode - 1][2], 'duration match');
    t.is(transitionManager.state.duration === testCase.input[1].transitionDuration, testCase.expect[mode - 1][3], 'duration match');

    // testing easing function
    let testEasingFunc = testCase.input[0].transitionEasing;
    if(mode === TRANSITION_EVENTS.UPDATE) {
      const completion = mode === (time[1] - time[0]) / testCase.input[0].transitionDuration;
      testEasingFunc = cropEasingFunction(testCase.input[0].transitionEasing, completion);
    }
    t.is(transitionManager.state.easing.toString() === testEasingFunc.toString(), testCase.expect[mode - 1][4], 'transitionEasing match');
    t.is(transitionManager.state.easing.toString() === testCase.input[1].transitionEasing.toString(), testCase.expect[mode - 1][5], 'transitionEasing match');

  });
  t.end();
});
