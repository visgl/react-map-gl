import * as React from 'react';
// https://github.com/facebook/react/blob/4131af3e4bf52f3a003537ec95a1655147c81270/src/renderers/dom/shared/CSSProperty.js
const unitlessNumber = /^(box|flex|grid|column|lineHeight|fontWeight|opacity|order|tabSize|zIndex)/;

export function applyReactStyle(element: HTMLElement, style: React.CSSProperties) {
  if (!element || !style) {
    return;
  }

  for (const key in style) {
    const value = style[key];
    if (Number.isFinite(value) && !unitlessNumber.test(key)) {
      element.style[key] = `${value}px`;
    } else {
      element.style[key] = value;
    }
  }
}
