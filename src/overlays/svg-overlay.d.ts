import {ReactElement} from 'react';
import type {MapControlProps} from '../components/use-map-control';

type SVGOverlayProps = MapControlProps & {
  redraw: Function,
  style?: Object
};

export default function SVGOverlay(props: SVGOverlayProps): ReactElement;
