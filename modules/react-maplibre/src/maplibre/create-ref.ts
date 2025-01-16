import type {MapInstance} from '../types/lib';
import type Maplibre from './maplibre';

/** These methods may break the react binding if called directly */
const skipMethods = [
  'setMaxBounds',
  'setMinZoom',
  'setMaxZoom',
  'setMinPitch',
  'setMaxPitch',
  'setRenderWorldCopies',
  'setProjection',
  'setStyle',
  'addSource',
  'removeSource',
  'addLayer',
  'removeLayer',
  'setLayerZoomRange',
  'setFilter',
  'setPaintProperty',
  'setLayoutProperty',
  'setLight',
  'setTerrain',
  'setFog',
  'remove'
] as const;

export type MapRef = {
  getMap(): MapInstance;
} & Omit<MapInstance, (typeof skipMethods)[number]>;

export default function createRef(mapInstance: Maplibre): MapRef | null {
  if (!mapInstance) {
    return null;
  }

  const map = mapInstance.map;
  const result: any = {
    getMap: () => map
  };

  for (const key of getMethodNames(map)) {
    // @ts-expect-error
    if (!(key in result) && !skipMethods.includes(key)) {
      result[key] = map[key].bind(map);
    }
  }

  return result;
}

function getMethodNames(obj: Object) {
  const result = new Set<string>();

  let proto = obj;
  while (proto) {
    for (const key of Object.getOwnPropertyNames(proto)) {
      if (
        key[0] !== '_' &&
        typeof obj[key] === 'function' &&
        key !== 'fire' &&
        key !== 'setEventedParent'
      ) {
        result.add(key);
      }
    }
    proto = Object.getPrototypeOf(proto);
  }
  return Array.from(result);
}
