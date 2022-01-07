// Generated with
// flow-remove-types ./node_modules/mapbox-gl/src/util/util.js

export function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}

export function wrap(n, min, max) {
  const d = max - min;
  const w = ((((n - min) % d) + d) % d) + min;
  return w === min ? max : w;
}

export function extend(dest, ...sources) {
  for (const src of sources) {
    for (const k in src) {
      dest[k] = src[k];
    }
  }
  return dest;
}

export function number(a, b, t) {
  return a * (1 - t) + b * t;
}
