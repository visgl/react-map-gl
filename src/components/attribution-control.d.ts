import {ReactElement} from 'react';
import {MapControlProps} from './use-map-control';

export type AttributionControlProps = MapControlProps & Partial<{
  toggleLabel: string,
  className: string,
  style: Object,
  compact: boolean,
  customAttribution: string|[string]
}>;

export default function AttributionControl(props: AttributionControlProps): ReactElement;
