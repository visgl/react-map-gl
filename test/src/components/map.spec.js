import {Map} from 'react-map-gl';
import * as React from 'react';
import ReactTestUtils from 'react-test-renderer/shallow';
// import ReactTestRenderer from 'react-test-renderer';
import test from 'tape-promise/tape';

test('InteractiveMap#default export', t => {
  t.ok(Map, 'Map is defined');

  const map = <Map />;
  const result = ReactTestUtils.createRenderer().render(map);

  t.ok(result, 'Map rendered');
  t.end();
});
