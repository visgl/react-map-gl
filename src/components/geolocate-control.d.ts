import {ReactElement} from 'react';
import {MapControlProps} from './use-map-control';

type GeolocateControlProps = MapControlProps & Partial<{
  className: string,
  style: Object,
  label: string,
  auto: boolean,
  positionOptions: any,
  fitBoundsOptions: any,
  trackUserLocation: boolean,
  showUserLocation: boolean,
  showAccuracyCircle: boolean,
  onViewStateChange?: Function,
  onViewportChange?: Function,
  onGeolocate?: Function
}>;

export default function GeolocateControl(props: GeolocateControlProps): ReactElement;
