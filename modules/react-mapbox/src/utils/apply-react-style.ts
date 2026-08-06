import * as React from 'react';
// This is a simplified version of
// https://github.com/facebook/react/blob/4131af3e4bf52f3a003537ec95a1655147c81270/src/renderers/dom/shared/CSSPropertyOperations.js#L62
const unitlessNumber = /box|flex|grid|column|lineHeight|fontWeight|opacity|order|tabSize|zIndex/;

// Remembers the style keys applied to each element on the previous call, so that
// properties which are later removed (set to undefined/null or omitted from the
// style object) can be unset instead of lingering on the element.
const appliedStyleKeys = new WeakMap<HTMLElement, Set<string>>();

function getDefinedStyleKeys(styles: React.CSSProperties): Set<string> {
  const keys = new Set<string>();
  for (const key in styles) {
    if (styles[key] !== undefined && styles[key] !== null) {
      keys.add(key);
    }
  }
  return keys;
}

function setStyleValue(style: CSSStyleDeclaration, key: string, value) {
  if (Number.isFinite(value) && !unitlessNumber.test(key)) {
    style[key] = `${value}px`;
  } else {
    style[key] = value;
  }
}

export function applyReactStyle(
  element: HTMLElement | null | undefined,
  styles: React.CSSProperties | null | undefined
) {
  if (!element) {
    return;
  }
  const style = element.style;
  const nextStyles = styles ?? {};
  const previousKeys = appliedStyleKeys.get(element);
  const nextKeys = getDefinedStyleKeys(nextStyles);

  if (previousKeys) {
    for (const key of previousKeys) {
      if (!nextKeys.has(key)) {
        style[key] = '';
      }
    }
  }

  for (const key in nextStyles) {
    const value = nextStyles[key];
    if (value !== undefined && value !== null) {
      setStyleValue(style, key, value);
    }
  }

  if (nextKeys.size) {
    appliedStyleKeys.set(element, nextKeys);
  } else {
    appliedStyleKeys.delete(element);
  }
}
