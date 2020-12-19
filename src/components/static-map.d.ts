import {ReactElement} from 'react';
import type {MapboxProps} from '../mapbox/mapbox';

export type StaticMapProps = MapboxProps & Partial<{
  className: string,
  style: any,

  disableTokenWarning: boolean,
  visibilityConstraints: any,
  children: any,

  onResize: Function
}>;

export interface MapRef {
  getMap(): any;
  queryRenderedFeatures(geometry: [number,number] | [[number,number],[number,number]], options?: any): Array<any>;
}

export default function StaticMap(props: StaticMapProps) : ReactElement;
