import {MjolnirEvent} from '../utils/map-controller';
import {MapControlProps, MapControlRef} from './use-map-control';

type Coordinate = [number, number];
type Offset = [number, number];
type CallbackEvent = MjolnirEvent & {
  lngLat: Coordinate
};

export type DraggableControlProps = MapControlProps & {
  draggable?: boolean,
  onDrag?: (evt: CallbackEvent) => void,
  onDragEnd?: (evt: CallbackEvent) => void,
  onDragStart?: (evt: CallbackEvent) => void,
  offsetLeft?: number,
  offsetTop?: number
};

type State = {
  dragPos?: Coordinate,
  dragOffset?: Offset
};

export const draggableControlPropTypes: any;
export const draggableControlDefaultProps: DraggableControlProps;

export type DraggableControlRef = MapControlRef & {
  props: DraggableControlProps,
  state: State
};

export default function useDraggableControl(
  props: DraggableControlProps,
  callbacks: any
): DraggableControlRef;
