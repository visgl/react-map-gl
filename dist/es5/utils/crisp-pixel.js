"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.crispPercentage = exports.crispPixel = void 0;
var pixelRatio = typeof window !== 'undefined' && window.devicePixelRatio || 1;

var crispPixel = function crispPixel(size) {
  return Math.round(size * pixelRatio) / pixelRatio;
};

exports.crispPixel = crispPixel;

var crispPercentage = function crispPercentage(el, percentage) {
  var dimension = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'x';

  if (el === null) {
    return percentage;
  }

  var origSize = dimension === 'x' ? el.offsetWidth : el.offsetHeight;
  return crispPixel(percentage / 100 * origSize) / origSize * 100;
};

exports.crispPercentage = crispPercentage;
//# sourceMappingURL=crisp-pixel.js.map