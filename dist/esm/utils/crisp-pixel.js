var pixelRatio = typeof window !== 'undefined' && window.devicePixelRatio || 1;
export var crispPixel = function crispPixel(size) {
  return Math.round(size * pixelRatio) / pixelRatio;
};
export var crispPercentage = function crispPercentage(el, percentage) {
  var dimension = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'x';

  if (el === null) {
    return percentage;
  }

  var origSize = dimension === 'x' ? el.offsetWidth : el.offsetHeight;
  return crispPixel(percentage / 100 * origSize) / origSize * 100;
};
//# sourceMappingURL=crisp-pixel.js.map