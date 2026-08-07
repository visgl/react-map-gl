import {expect, test} from 'vitest';
import {applyReactStyle} from '@vis.gl/react-mapbox/utils/apply-react-style';

test('applyReactStyle', () => {
  /* global document */
  if (typeof document === 'undefined') {
    return;
  }

  const div = document.createElement('div');

  expect(() => applyReactStyle(null, {}), 'null element').not.toThrow();

  expect(() => applyReactStyle(div, null), 'null style').not.toThrow();

  applyReactStyle(div, {marginLeft: 4, height: 24, lineHeight: 2, zIndex: 1, flexGrow: 0.5});

  expect(div.style.marginLeft, 'appended px to numeric value').toBe('4px');
  expect(div.style.height, 'appended px to numeric value').toBe('24px');
  expect(div.style.lineHeight, 'unitless numeric property').toBe('2');
  expect(div.style.zIndex, 'unitless numeric property').toBe('1');
  expect(div.style.flexGrow, 'unitless numeric property').toBe('0.5');
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
