import * as React from 'react';

/* global setTimeout */
export function sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
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
