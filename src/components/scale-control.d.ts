import {ReactElement} from 'react';
import {MapControlProps} from './use-map-control';

type ScaleControlProps = MapControlProps & {
  maxWidth?: number,
  unit?: string
};

export default function ScaleControl(props: ScaleControlProps): ReactElement;
