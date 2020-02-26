// @flow

/* global window */
const pixelRatio = (typeof window !== 'undefined' && window.devicePixelRatio) || 1;

export const crispPixel = (size: number) => Math.round(size * pixelRatio) / pixelRatio;

const offsetCache = new WeakMap();

export const crispPercentage = (
  el: null | HTMLDivElement,
  percentage: number,
  dimension: 'x' | 'y' = 'x'
) => {
  if (el === null) {
    return percentage;
  }
  const offset = offsetCache.get(el) || {};
  if (offset[dimension] === undefined) {
    offset[dimension] = dimension === 'x' ? el.offsetWidth : el.offsetHeight;
    offsetCache.set(el, offset);
  }
  const size = offset[dimension];
  return (crispPixel((percentage / 100) * size) / size) * 100;
};
