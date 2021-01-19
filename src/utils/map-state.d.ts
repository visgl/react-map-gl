import {TransitionInterpolator} from './transition';

export const MAPBOX_LIMITS: any;

export type ViewportProps = Partial<{
  width: number,
  height: number,
  latitude: number,
  longitude: number,
  zoom: number,
  bearing: number,
  pitch: number,
  altitude: number,
  maxZoom: number,
  minZoom: number,
  maxPitch: number,
  minPitch: number,
  transitionDuration: number,
  transitionEasing: (t: number) => number,
  transitionInterpolator: TransitionInterpolator,
  transitionInterruption: number
}>;

type InteractiveState = Partial<{
  startPanLngLat: Array<number>,
  startZoomLngLat: Array<number>,
  startBearing: number,
  startPitch: number,
  startZoom: number
}>;

export type MapStateProps = ViewportProps & InteractiveState;

export default class MapState {
  constructor(props: MapStateProps);

  getViewportProps(): ViewportProps;

  getState(): InteractiveState;

  panStart(params: {pos: Array<number>}): MapState;

  pan(params: {pos: Array<number>, startPos?: Array<number>}): MapState;

  panEnd(): MapState;

  rotateStart(params: {pos: Array<number>}): MapState;

  rotate(params: {pos?: Array<number>, deltaAngleX?: number, deltaAngleY?: number}): MapState;

  rotateEnd(): MapState;

  zoomStart(params: {pos: Array<number>}): MapState;

  zoom(params: {pos: Array<number>, startPos?: Array<number>, scale: number}): MapState;

  zoomEnd(): MapState;
}
