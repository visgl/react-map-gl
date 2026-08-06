import type {MapInstance} from '../types/lib';

export function removeSource(map: MapInstance, id: string) {
  // Mapbox may create terrain before evaluating its properties. In that state,
  // Map#removeSource throws from its subsequent terrain update.
  // https://github.com/mapbox/mapbox-gl-js/blob/7a72385de5c7400647ea7d3539637145fdf616a7/src/terrain/terrain.ts#L380
  // @ts-ignore Mapbox private terrain state
  const terrain = map.style?.terrain;

  try {
    map.removeSource(id);
  } catch (error) {
    if (!(error instanceof TypeError) || !terrain || terrain.properties !== undefined) {
      throw error;
    }
    console.error(error); // eslint-disable-line
  }
}
