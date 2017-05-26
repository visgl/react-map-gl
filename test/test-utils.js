
// Discard precision errors for comparison
export function toLowPrecision(input, precision = 11) {
  if (Number.isFinite(input)) {
    return Number(input.toPrecision(precision));
  } else if (Array.isArray(input)) {
    return input.map(item => toLowPrecision(item, precision));
  } else if (input) {
    const output = {};
    for (const key in input) {
      output[key] = toLowPrecision(input[key], precision);
    }
    return output;
  }
  return input;
}

// Compare two [lng, lat] locations, account for longitude wrapping
export function isSameLocation(lngLat1, lngLat2) {
  const lng1 = toLowPrecision(lngLat1[0]);
  const lat1 = toLowPrecision(lngLat1[1]);
  const lng2 = toLowPrecision(lngLat2[0]);
  const lat2 = toLowPrecision(lngLat2[1]);
  return ((lng1 - lng2) % 360) === 0 && lat1 === lat2;
}

