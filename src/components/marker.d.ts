import {ReactElement} from 'react';
import type {DraggableControlProps} from './draggable-control';

export type MarkerProps = DraggableControlProps & {
  className?: string,
  longitude: number,
  latitude: number,
  style?: { [key: string]: string | number }
};

export default function Marker(props: MarkerProps): ReactElement;
