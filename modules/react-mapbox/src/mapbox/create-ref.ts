import type {MapInstance} from '../types/lib';
import {LngLatLike, PointLike} from '../types/common';

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

export type MapRef = {
  getMap(): MapInstance;
} & Omit<MapInstance, (typeof skipMethods)[number]>;

export default function createRef(mapInstance: Mapbox): MapRef | null {
  if (!mapInstance) {
    return null;
  }

  const map = mapInstance.map;
  const ref: any = {
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
    // options diverge between mapbox and maplibre
    queryTerrainElevation: (lnglat: LngLatLike, options?: any) => {
      const tr = map.transform;
      map.transform = mapInstance.transform;
      const result = map.queryTerrainElevation(lnglat, options);
      map.transform = tr;
      return result;
    },
    queryRenderedFeatures: (geometry?: any, options?: any) => {
      const tr = map.transform;
      map.transform = mapInstance.transform;
      const result = map.queryRenderedFeatures(geometry, options);
      map.transform = tr;
      return result;
    }
  };

  for (const key of getMethodNames(map)) {
    // @ts-expect-error
    if (!(key in ref) && !skipMethods.includes(key)) {
      ref[key] = map[key].bind(map);
    }
  }

  return ref;
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
