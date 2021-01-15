import {ReactElement} from 'react';
import {MapControlProps} from './use-map-control';

type ScaleControlProps = MapControlProps & Partial<{
  className: string,
  style: Object,
  maxWidth: number,
  unit: string
}>;

export default function ScaleControl(props: ScaleControlProps): ReactElement;
