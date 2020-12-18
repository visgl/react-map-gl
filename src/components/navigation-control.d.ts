import {MapControlProps} from './use-map-control';

type NavigationControlProps = MapControlProps & {
  className: string,
  onViewStateChange?: Function,
  onViewportChange?: Function,
  showCompass: boolean,
  showZoom: boolean,
  zoomInLabel: string,
  zoomOutLabel: string,
  compassLabel: string
};

export default function NavigationControl(props: NavigationControlProps);
