// @flow

/* global window */
const pixelRatio = (typeof window !== 'undefined' && window.devicePixelRatio) || 1;

export const crispPixel = (size: number) => Math.round(size * pixelRatio) / pixelRatio;

export const crispPercentage = (
  el: null | HTMLDivElement,
  percentage: number,
  dimension: 'x' | 'y' = 'x'
) => {
  if (el === null) {
    return percentage;
  }
  const origSize = dimension === 'x' ? el.offsetWidth : el.offsetHeight;
  return (crispPixel((percentage / 100) * origSize) / origSize) * 100;
};
