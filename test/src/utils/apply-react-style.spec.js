import test from 'tape-promise/tape';
import {applyReactStyle} from 'react-map-gl/utils/apply-react-style';

test('applyReactStyle', t => {
  /* global document */
  const div = document.createElement('div');

  t.doesNotThrow(() => applyReactStyle(null, {}), 'null element');

  t.doesNotThrow(() => applyReactStyle(div, null), 'null style');

  applyReactStyle(div, {marginLeft: 4, height: 24, lineHeight: 2, zIndex: 1, flexGrow: 0.5});

  t.is(div.style.marginLeft, '4px', 'appended px to numeric value');
  t.is(div.style.height, '24px', 'appended px to numeric value');
  t.is(div.style.lineHeight, '2', 'unitless numeric property');
  t.is(div.style.zIndex, '1', 'unitless numeric property');
  t.is(div.style.flexGrow, '0.5', 'unitless numeric property');

  t.end();
});
