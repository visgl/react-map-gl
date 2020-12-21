import {ReactElement} from 'react';
import {MapControlProps} from './use-map-control';

type NavigationControlProps = MapControlProps & Partial<{
  className: string,
  onViewStateChange: Function,
  onViewportChange: Function,
  showCompass: boolean,
  showZoom: boolean,
  zoomInLabel: string,
  zoomOutLabel: string,
  compassLabel: string
}>;

export default function NavigationControl(props: NavigationControlProps): ReactElement;
