import {ReactElement} from 'react';
import type {MapControlProps} from '../components/use-map-control';

type CanvasOverlayProps = MapControlProps & {
  redraw: Function
};

export default function CanvasOverlay(props: CanvasOverlayProps): ReactElement;
