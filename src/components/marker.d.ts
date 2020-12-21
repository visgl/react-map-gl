import {ReactElement} from 'react';
import type {DraggableControlProps} from './draggable-control';

type MarkerProps = DraggableControlProps & {
  className?: string,
  longitude: number,
  latitude: number
};

export default function Marker(props: MarkerProps): ReactElement;
