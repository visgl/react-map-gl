import {ReactElement} from 'react';
import {MapControlProps} from './use-map-control';

type FullscreenControlProps = MapControlProps & Partial<{
  className: string,
  style: Object,
  container: HTMLElement,
  label: string
}>;

export default function FullscreenControl(props: FullscreenControlProps): ReactElement;
