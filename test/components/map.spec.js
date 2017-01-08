// import MapGL from 'react-map-gl';
import DefaultMapGL, {MapGL} from 'react-map-gl';
import {createElement} from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import test from 'tape-catch';

/* eslint-disable no-shadow */
test('MapGL', t => {
  t.test('default export', t => {
    t.ok(DefaultMapGL, 'MapGL is defined');

    const map = createElement(DefaultMapGL, {
      width: 500,
      height: 500,
      longitude: -122,
      latitude: 37,
      zoom: 14
    });

    const renderer = ReactTestUtils.createRenderer();
    renderer.render(map);
    const result = renderer.getRenderOutput();

    t.equal(result.type, 'div', 'MapGL rendered a div');
    t.end();
  });

  t.test('named export', t => {
    t.ok(MapGL, 'MapGL is defined');

    const map = createElement(MapGL, {
      width: 500,
      height: 500,
      longitude: -122,
      latitude: 37,
      zoom: 14
    });

    const renderer = ReactTestUtils.createRenderer();
    renderer.render(map);
    const result = renderer.getRenderOutput();

    t.equal(result.type, 'div', 'MapGL rendered a div');
    t.end();
  });
});
