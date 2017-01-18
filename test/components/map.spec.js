// import MapGL from 'react-map-gl';
import DefaultMapGL, {MapGL} from 'react-map-gl';
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

test('MapGL#default export', t => {
  t.ok(DefaultMapGL, 'MapGL is defined');

  const map = createElement(DefaultMapGL, defaultProps);
  const result = ReactTestUtils.createRenderer().render(map);

  t.equal(result.type, 'div', 'MapGL rendered a div');
  t.end();
});

test('MapGL#named export', t => {
  t.ok(MapGL, 'MapGL is defined');

  const map = createElement(MapGL, defaultProps);
  const result = ReactTestUtils.createRenderer().render(map);

  t.equal(result.type, 'div', 'MapGL rendered a div');
  t.end();
});

test('MapGL#call onLoad when provided', t => {
  function onLoad(...args) {
    t.equal(args.length, 0, 'onLoad does not expose the map object.');
    t.end();
  }

  const props = Object.assign({}, defaultProps, {onLoad});

  const map = createElement(MapGL, props);

  const result = ReactTestUtils.createRenderer().render(map);

  t.equal(result.type, 'div', 'MapGL rendered a div');

  if (!MapGL.supported()) {
    t.ok('onLoad not called since MapGL.supported() false');
    t.end();
  } else {
    /* global setTimeout */
    setTimeout(() => {
      t.fail('onLoad wasn\'t called');
      t.end();
    }, 1000);
  }
});
