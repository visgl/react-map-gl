// This file is used as a replacement of the react-dom module during node tests
import * as React from 'react';

export function createPortal(element, container) {
  return <div>{element}</div>;
}
