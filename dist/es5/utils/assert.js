"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = assert;

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'react-map-gl: assertion failed.');
  }
}
//# sourceMappingURL=assert.js.map