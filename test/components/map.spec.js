// import InteractiveMap from 'react-map-gl';
import MapGL, {InteractiveMap} from 'react-map-gl';
import {createElement} from 'react';
import ReactTestUtils from 'react-test-renderer/shallow';
import ReactTestRenderer from 'react-test-renderer';
import sinon from 'sinon';
import test from 'tape-catch';

const mapboxApiAccessToken =
  process.env.MapboxAccessToken || process.env.MAPBOX_ACCESS_TOKEN; // eslint-disable-line

const defaultProps = {
  width: 500,
  height: 500,
  longitude: -122,
  latitude: 37,
  zoom: 14,
  mapboxApiAccessToken
};

test('InteractiveMap#default export', t => {
  t.ok(MapGL, 'InteractiveMap is defined');

  const map = createElement(MapGL, defaultProps);
  const result = ReactTestUtils.createRenderer().render(map);

  t.ok(result, 'InteractiveMap rendered');
  t.end();
});

test('InteractiveMap#named export', t => {
  t.ok(InteractiveMap, 'InteractiveMap is defined');

  const map = createElement(InteractiveMap, defaultProps);
  const result = ReactTestUtils.createRenderer().render(map);

  t.ok(result, 'InteractiveMap rendered');
  t.end();
});

test('InteractiveMap#call onLoad when provided', t => {
  function onLoad(...args) {
    t.is(args.length, 0, 'onLoad does not expose the map object.');
    t.end();
  }

  const props = Object.assign({}, defaultProps, {onLoad});

  const map = createElement(InteractiveMap, props);

  const result = ReactTestRenderer.create(map);

  t.ok(result, 'InteractiveMap rendered');

  if (!InteractiveMap.supported()) {
    t.ok('onLoad not called since InteractiveMap.supported() false');
    t.end();
  } else {
    /* global setTimeout */
    setTimeout(() => {
      t.fail('onLoad wasn\'t called');
      t.end();
    }, 5000);
  }
});

test('Interactive map renders children on first render', t => {
  const childComponent = sinon.spy(() => null);
  const child = createElement(childComponent);
  const map = createElement(InteractiveMap, defaultProps, child);
  try {
    ReactTestRenderer.create(map);
  } catch (e) {
    // we use try catch here as InteractiveMap fails in DidMount
    // but having that render have already called this fail does not matter
    // for this test
  }

  t.ok(childComponent.called, 'Child rendered');
  t.end();
});

test('Interactive map#call transformRequest callback when provided', t => {
  function transformRequest(url, resourceType) {
    t.ok(true, 'transformRequest handler was called');
    t.end();
  }

  const props = Object.assign({}, defaultProps, {transformRequest});

  const map = createElement(InteractiveMap, props);

  // const result = ReactTestUtils.createRenderer().render(map);
  const result = ReactTestRenderer.create(map);

  t.ok(result, 'InteractiveMap rendered');

  if (!InteractiveMap.supported()) {
    t.ok('transformRequest not called since InteractiveMap.supported() false');
    t.end();
  } else {
    /* global setTimeout */
    setTimeout(() => {
      t.fail('transformRequest wasn\'t called');
      t.end();
    }, 1000);
  }
});
