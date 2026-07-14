import * as React from 'react';
// This is a simplified version of
// https://github.com/facebook/react/blob/4131af3e4bf52f3a003537ec95a1655147c81270/src/renderers/dom/shared/CSSPropertyOperations.js#L62
const unitlessNumber = /box|flex|grid|column|lineHeight|fontWeight|opacity|order|tabSize|zIndex/;

// Remembers the style keys applied to each element on the previous call, so that
// properties which are later removed (set to undefined/null or omitted from the
// style object) can be unset instead of lingering on the element.
const appliedStyleKeys = new WeakMap<HTMLElement, string[]>();

export function applyReactStyle(element: HTMLElement, styles: React.CSSProperties) {
  if (!element) {
    return;
  }
  const style = element.style;
  const previousKeys = appliedStyleKeys.get(element);
  const nextKeys: string[] = [];

  for (const key in styles) {
    const value = styles[key];
    if (value === undefined || value === null) {
      continue;
    }
    if (Number.isFinite(value) && !unitlessNumber.test(key)) {
      style[key] = `${value}px`;
    } else {
      style[key] = value;
    }
    nextKeys.push(key);
  }

  if (previousKeys) {
    for (const key of previousKeys) {
      if (!nextKeys.includes(key)) {
        style[key] = '';
      }
    }
  }

  if (nextKeys.length) {
    appliedStyleKeys.set(element, nextKeys);
  } else {
    appliedStyleKeys.delete(element);
  }
}
