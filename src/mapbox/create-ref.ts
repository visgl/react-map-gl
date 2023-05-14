import type {MapLib, MapInstance, MapInstanceInternal, LngLatLike, PointLike, ElevationQueryOptions} from '../types';
import type Mapbox from './mapbox';

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

export type MapRef<MapT extends MapInstance> = {
  getMap(): MapT;
} & Omit<MapT, typeof skipMethods[number]>;

export default function createRef<LibT extends MapLib>(
  mapInstance: Mapbox<LibT>,
  mapLib: LibT
): MapRef<InstanceType<LibT['Map']>> {
  if (!mapInstance) {
    return null;
  }

  const map = mapInstance.map as MapInstanceInternal<InstanceType<LibT['Map']>>;
  const result: any = {
    getMap: () => map,

    // Overwrite getters to use our shadow transform
    getCenter: () => mapInstance.transform.center,
    getZoom: () => mapInstance.transform.zoom,
    getBearing: () => mapInstance.transform.bearing,
    getPitch: () => mapInstance.transform.pitch,
    getPadding: () => mapInstance.transform.padding,
    getBounds: () => mapInstance.transform.getBounds(),
    project: (lnglat: LngLatLike) => {
      const tr = map.transform;
      map.transform = mapInstance.transform;
      const result = map.project(lnglat);
      map.transform = tr;
      return result;
    },
    unproject: (point: PointLike) => {
      const tr = map.transform;
      map.transform = mapInstance.transform;
      const result = map.unproject(point);
      map.transform = tr;
      return result;
    },
    queryTerrainElevation: (lnglat: LngLatLike, options: ElevationQueryOptions) => {
      // @ts-ignore transform not defined
      const tr = map.transform;
      // @ts-ignore transform not defined
      map.transform = mapInstance.transform;
      const result = map.queryTerrainElevation(lnglat, options);
      // @ts-ignore transform not defined
      map.transform = tr;
      return result;
    }
  };

  for (const key of getMethodNames(map)) {
    // @ts-expect-error
    if (!(key in result) && !skipMethods.includes(key)) {
      result[key] = map[key].bind(map);
    }
  }

  return result;
}

function getMethodNames(obj) {
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
