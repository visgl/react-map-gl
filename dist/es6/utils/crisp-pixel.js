const pixelRatio = typeof window !== 'undefined' && window.devicePixelRatio || 1;
export const crispPixel = size => Math.round(size * pixelRatio) / pixelRatio;
export const crispPercentage = (el, percentage, dimension = 'x') => {
  if (el === null) {
    return percentage;
  }

  const origSize = dimension === 'x' ? el.offsetWidth : el.offsetHeight;
  return crispPixel(percentage / 100 * origSize) / origSize * 100;
};
//# sourceMappingURL=crisp-pixel.js.map