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

  applyReactStyle(div, {background: 'red', color: 'blue', borderColor: 'green'});
  applyReactStyle(div, {background: undefined, color: 'blue', borderColor: null});
  t.is(div.style.background, '', 'unsets a property that became undefined');
  t.is(div.style.borderColor, '', 'unsets a property that became null');
  t.is(div.style.color, 'blue', 'keeps a property that is still set');

  applyReactStyle(div, {});
  t.is(div.style.color, '', 'unsets a property omitted from the style object');

  applyReactStyle(div, {background: 'green'});
  t.is(div.style.background, 'green', 'reapplies a property after it was cleared');

  applyReactStyle(div, undefined);
  t.is(div.style.background, '', 'clears applied properties when styles become undefined');

  applyReactStyle(div, {color: 'purple'});
  applyReactStyle(div, null);
  t.is(div.style.color, '', 'clears applied properties when styles become null');

  t.end();
});

test('applyReactStyle#handles shorthand transitions', t => {
  /* global document */
  if (typeof document === 'undefined') {
    t.end();
    return;
  }

  const shorthandToLonghand = document.createElement('div');
  applyReactStyle(shorthandToLonghand, {padding: '10px'});
  applyReactStyle(shorthandToLonghand, {paddingTop: '20px'});
  t.is(shorthandToLonghand.style.paddingTop, '20px', 'preserves a new longhand property');
  t.is(shorthandToLonghand.style.paddingRight, '', 'clears the removed shorthand property');

  const longhandToShorthand = document.createElement('div');
  applyReactStyle(longhandToShorthand, {paddingTop: '20px'});
  applyReactStyle(longhandToShorthand, {padding: '10px'});
  t.is(longhandToShorthand.style.paddingTop, '10px', 'preserves a new shorthand property');
  t.is(longhandToShorthand.style.paddingRight, '10px', 'applies all parts of the shorthand');

  t.end();
});

test('applyReactStyle#preserves unmanaged inline properties', t => {
  /* global document */
  if (typeof document === 'undefined') {
    t.end();
    return;
  }

  const div = document.createElement('div');
  div.style.opacity = '0.5';

  applyReactStyle(div, {color: 'red'});
  applyReactStyle(div, {});

  t.is(div.style.opacity, '0.5', 'does not clear properties it did not apply');
  t.end();
});
