"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.equals = equals;
exports.clamp = clamp;
exports.lerp = lerp;
var EPSILON = 1e-7;

function isArray(value) {
  return Array.isArray(value) || ArrayBuffer.isView(value);
}

function equals(a, b) {
  if (a === b) {
    return true;
  }

  if (isArray(a) && isArray(b)) {
    if (a.length !== b.length) {
      return false;
    }

    for (var i = 0; i < a.length; ++i) {
      if (!equals(a[i], b[i])) {
        return false;
      }
    }

    return true;
  }

  return Math.abs(a - b) <= EPSILON;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function lerp(a, b, t) {
  if (isArray(a)) {
    return a.map(function (ai, i) {
      return lerp(ai, b[i], t);
    });
  }

  return t * b + (1 - t) * a;
}
//# sourceMappingURL=math-utils.js.map