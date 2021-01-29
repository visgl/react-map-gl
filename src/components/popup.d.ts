import {ReactElement} from 'react';
import {MapControlProps} from './use-map-control';
import type {PositionType} from '../utils/dynamic-position';

export type PopupProps = MapControlProps & {
  className?: string,
  longitude: number,
  latitude: number,
  altitude?: number,
  offsetLeft?: number,
  offsetTop?: number,
  tipSize?: number,
  closeButton?: boolean,
  closeOnClick?: boolean,
  anchor?: PositionType,
  dynamicPosition?: boolean,
  sortByDepth?: boolean,
  onClose?: Function
};

export default function Popup(props: PopupProps): ReactElement;
