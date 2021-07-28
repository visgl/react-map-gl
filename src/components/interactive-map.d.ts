import * as MapboxGL from "mapbox-gl";
import {ReactElement, Ref} from 'react';
import type {MapRef, StaticMapProps} from './static-map';
import MapController, {MjolnirEvent} from '../utils/map-controller';

export type ExtraState = {
  isLoaded: boolean,
  isDragging: boolean,
  isHovering: boolean
};

export type MapEvent = MjolnirEvent & {
  point: [number, number], // [x: number, y: number]
  lngLat: [number, number], // [longitude: number, latitude: number]
  features?: Array<any>
};

export type EasingFunction = (t: number) => number;

export enum TRANSITION_EVENTS {
  BREAK = 1,
  SNAP_TO_END = 2,
  IGNORE = 3,
  UPDATE = 4,
}

export type InteractiveMapProps = StaticMapProps & Partial<{
  onViewStateChange: Function,
  onViewportChange: Function,
  onInteractionStateChange: Function,
  onHover: (evt: MapEvent) => void,
  onClick: (evt: MapEvent) => void,
  onNativeClick: (evt: MapEvent) => void,
  onDblClick: (evt: MapEvent) => void,
  onContextMenu: (evt: MapEvent) => void,
  onMouseDown: (evt: MapEvent) => void,
  onMouseMove: (evt: MapEvent) => void,
  onMouseUp: (evt: MapEvent) => void,
  onTouchStart: (evt: MapEvent) => void,
  onTouchMove: (evt: MapEvent) => void,
  onTouchEnd: (evt: MapEvent) => void,
  onMouseEnter: (evt: MapEvent) => void,
  onMouseLeave: (evt: MapEvent) => void,
  onMouseOut: (evt: MapEvent) => void,
  onWheel: (evt: MapEvent) => void,

  transitionDuration: number | 'auto',
  transitionInterpolator: any,
  transitionInterruption: TRANSITION_EVENTS,
  transitionEasing: EasingFunction,
  onTransitionStart: () => void,
  onTransitionInterrupt: () => void,
  onTransitionEnd: () => void,

  scrollZoom: boolean | {speed?: number, smooth?: boolean},
  dragPan: boolean | {inertia?: number},
  dragRotate: boolean | {inertia?: number},
  doubleClickZoom: boolean,
  touchZoom: boolean | {inertia?: number},
  touchRotate: boolean | {inertia?: number},
  keyboard: boolean | {zoomSpeed?: number, moveSpeed?: number, rotateSpeedX?: number, rotateSpeedY?: number},
  touchAction: string,
  eventRecognizerOptions: any,
  clickRadius: number,
  interactiveLayerIds: Array<string>,
  getCursor: (state: ExtraState) => string,
  controller: MapController,
  ref: Ref<MapRef>,

  maxZoom: number,
  minZoom: number,
  maxPitch: number,
  minPitch: number
}>;

export default function InteractiveMap(props: InteractiveMapProps): ReactElement;
