// Place camera over terrain
export function getTerrainElevation(map, {longitude, latitude}) {
  if (map && map.queryTerrainElevation) {
    return map.queryTerrainElevation([longitude, latitude]) || 0;
  }
  return 0;
}
