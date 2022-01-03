import type {MapboxMap, ViewState} from '../types';
import type Mapbox from './mapbox';

/** mapboxgl.Map methods to forward to the ref object
    Object.getOwnPropertyNames(Object.getPrototypeOf(map))
      .filter(key => typeof temp1[key] === 'function' && key[0] != '_')
  */
const forwardMethods = [
  // 'getCenter',
  // 'setCenter',
  'panBy',
  'panTo',
  // 'getZoom',
  // 'setZoom',
  'zoomTo',
  'zoomIn',
  'zoomOut',
  // 'getBearing',
  // 'setBearing',
  // 'getPadding',
  // 'setPadding',
  'rotateTo',
  'resetNorth',
  'resetNorthPitch',
  'snapToNorth',
  // 'getPitch',
  // 'setPitch',
  'cameraForBounds',
  'fitBounds',
  'fitScreenCoordinates',
  'jumpTo',
  'getFreeCameraOptions',
  'setFreeCameraOptions',
  'easeTo',
  'flyTo',
  'isEasing',
  'stop',
  // "addControl",
  // "removeControl",
  // "hasControl",
  'getContainer',
  'getCanvasContainer',
  'getCanvas',
  'resize',
  'getBounds',
  // "getMaxBounds",
  // "setMaxBounds",
  // "setMinZoom",
  // "getMinZoom",
  // "setMaxZoom",
  // "getMaxZoom",
  // "setMinPitch",
  // "getMinPitch",
  // "setMaxPitch",
  // "getMaxPitch",
  // "getRenderWorldCopies",
  // "setRenderWorldCopies",
  // "getProjection",
  // "setProjection",
  'project',
  'unproject',
  'isMoving',
  'isZooming',
  'isRotating',
  'on',
  'once',
  'off',
  'queryRenderedFeatures',
  'querySourceFeatures',
  'queryTerrainElevation',
  // "setStyle",
  // "getStyle",
  'isStyleLoaded',
  // "addSource",
  'isSourceLoaded',
  'areTilesLoaded',
  // "addSourceType",
  // "removeSource",
  'getSource',
  'addImage',
  'updateImage',
  'hasImage',
  'removeImage',
  'loadImage',
  'listImages',
  // "addLayer",
  'moveLayer',
  // "removeLayer",
  'getLayer',
  // "setLayerZoomRange",
  // "setFilter",
  // "getFilter",
  // "setPaintProperty",
  // "getPaintProperty",
  // "setLayoutProperty",
  // "getLayoutProperty",
  'setLight',
  'getLight',
  'setTerrain',
  'getTerrain',
  'setFog',
  'getFog',
  'setFeatureState',
  'removeFeatureState',
  'getFeatureState',
  'loaded'
  // "remove",
  // "triggerRepaint"
] as const;

export type MapRef = {
  getMap(): MapboxMap;
  getViewState(): ViewState;
} & Pick<MapboxMap, typeof forwardMethods[number]>;

export default function createRef(mapInstance: Mapbox): MapRef {
  if (!mapInstance) {
    return null;
  }

  const result: any = {
    getMap: () => mapInstance.map,
    getViewState: () => mapInstance.viewState
  };
  for (const key of forwardMethods) {
    result[key] = mapInstance.map[key].bind(mapInstance.map);
  }

  return result;
}
