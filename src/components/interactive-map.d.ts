import {ReactElement} from 'react';
import type {StaticMapProps} from './static-map';
import MapController, {MjolnirEvent} from '../utils/map-controller';

type State = {
  isLoaded: boolean,
  isDragging: boolean,
  isHovering: boolean
};

type MapEvent = MjolnirEvent & {
  point: Array<number>,
  lngLat: Array<number>,
  features?: Array<any>
};

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

  transitionDuration: number,
  transitionInterpolator: any,
  transitionInterruption: number,
  transitionEasing: Function,

  scrollZoom: boolean,
  dragPan: boolean,
  dragRotate: boolean,
  doubleClickZoom: boolean,
  touchZoom: boolean,
  touchRotate: boolean,
  keyboard: boolean,

  touchAction: string,
  clickRadius: number,
  interactiveLayerIds: Array<string>,
  getCursor: (state: State) => string,
  controller: MapController
}>;

export default function InteractiveMap(props: InteractiveMapProps): ReactElement;
