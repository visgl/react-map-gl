import test from 'tape-catch';
import TransitionManager from 'react-map-gl/utils/transition-manager';
import {equals} from 'math.gl';
import {cropEasingFunction} from '../../../src/utils/transition-manager';

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

test('cropEasingFunction', function (t) {
  easingFunctions.forEach(func => {
    interruptions.forEach(x0 => {
      var newEasing = cropEasingFunction(func, x0);
      values.forEach(val => {
        t.ok(equals(func(x0 + val * (1 - x0)), func(x0) + (1 - func(x0)) * newEasing(val)), 'cropped easing function matches the old one');
      })
    })
  });
  t.end();
});
