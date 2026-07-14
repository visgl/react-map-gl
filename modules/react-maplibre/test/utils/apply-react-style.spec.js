import test from 'tape-promise/tape';
import {applyReactStyle} from '@vis.gl/react-maplibre/utils/apply-react-style';

test('applyReactStyle', t => {
  /* global document */
  if (typeof document === 'undefined') {
    t.end();
    return;
  }

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

test('applyReactStyle#unset removed properties', t => {
  /* global document */
  if (typeof document === 'undefined') {
    t.end();
    return;
  }

  const div = document.createElement('div');

  applyReactStyle(div, {background: 'red', color: 'blue'});
  t.is(div.style.background, 'red', 'sets background');
  t.is(div.style.color, 'blue', 'sets color');

  // A property whose value becomes undefined should be unset, others preserved
  applyReactStyle(div, {background: undefined, color: 'blue'});
  t.is(div.style.background, '', 'unset property that became undefined');
  t.is(div.style.color, 'blue', 'kept property that is still set');

  // A property omitted from the style object should also be unset
  applyReactStyle(div, {});
  t.is(div.style.color, '', 'unset property that was removed from styles');

  t.end();
});
