export function pointOnCircle({center, angle, radius}) {
  return {
    type: 'Point',
    coordinates: [
      center[0] + Math.cos(angle) * radius,
      center[1] + Math.sin(angle) * radius
    ]
  };
}
