import {expect, test} from 'vitest';
import {applyReactStyle} from 'react-map-gl/mapbox-legacy/utils/apply-react-style';

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
