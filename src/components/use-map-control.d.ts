import {RefObject} from 'react';
import {MapContextProps} from './map-context';

export type MapControlProps = Partial<{
  captureScroll: boolean,
  captureDrag: boolean,
  captureClick: boolean,
  captureDoubleClick: boolean,
  capturePointerMove: boolean,
  children: any
}>;

export type MapControlRef = {
  props: any,
  context: MapContextProps,
  state: any,
  containerRef: RefObject<any>
};

export const mapControlDefaultProps: MapControlProps;

export const mapControlPropTypes: any;

export default function useMapControl(props: MapControlProps): MapControlRef;
