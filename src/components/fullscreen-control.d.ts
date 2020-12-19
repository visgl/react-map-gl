import {ReactElement} from 'react';
import {MapControlProps} from './use-map-control';

type FullscreenControlProps = MapControlProps & {
  className?: string,
  container?: HTMLElement,
  label?: string
};

export default function FullscreenControl(props: FullscreenControlProps): ReactElement;
