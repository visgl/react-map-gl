// import InteractiveMap from 'react-map-gl';
import MapGL, {InteractiveMap} from 'react-map-gl';
import {createElement} from 'react';
import ReactTestUtils from 'react-addons-test-utils';
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
    t.ok(args.length, 0, 'onLoad does not expose the map object.');
    t.end();
  }

  const props = Object.assign({}, defaultProps, {onLoad});

  const map = createElement(InteractiveMap, props);

  const result = ReactTestUtils.createRenderer().render(map);

  t.ok(result, 'InteractiveMap rendered');

  if (!InteractiveMap.supported()) {
    t.ok('onLoad not called since InteractiveMap.supported() false');
    t.end();
  } else {
    /* global setTimeout */
    setTimeout(() => {
      t.fail('onLoad wasn\'t called');
      t.end();
    }, 1000);
  }
});
