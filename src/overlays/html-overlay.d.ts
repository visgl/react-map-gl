import {ReactElement} from 'react';
import type {MapControlProps} from '../components/use-map-control';

type HTMLOverlayProps = MapControlProps & {
  redraw: Function,
  style?: Object
};

export default function HTMLOverlay(props: HTMLOverlayProps): ReactElement;
