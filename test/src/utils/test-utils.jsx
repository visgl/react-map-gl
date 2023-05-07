import * as React from 'react';

/* global setTimeout */
export function sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

export function waitForMapLoad(mapRef) {
  return new Promise(resolve => {
    const check = () => {
      if (mapRef.current) {
        resolve();
      } else {
        setTimeout(check, 50);
      }
    };
    check();
  });
}

export function createPortalMock() {
  const reactDom = require('react-dom');
  const createPortal = reactDom.createPortal;
  reactDom.createPortal = function mockCreatePortal(content, container) {
    return <div>{content}</div>;
  };
  return () => {
    reactDom.createPortal = createPortal;
  };
}
