// This function is needed in initialization stages,
// make sure it can be imported in isolation
/* global process */

export const isNode =
  typeof process === 'object' &&
  String(process) === '[object process]' &&
  !process.browser;

export const isBrowser = !isNode;

export default isBrowser;
