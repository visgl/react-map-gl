import {ReactElement} from 'react';
import type {MapboxProps} from '../mapbox/mapbox';

export type StaticMapProps = MapboxProps & Partial<{
  className: string,
  style: any,

  disableTokenWarning: boolean,
  visibilityConstraints: {
    minZoom?: number;
    maxZoom?: number;
    minPitch?: number;
    maxPitch?: number;
  };
  children: any,

  onResize: (dimensions: { width: number; height: number }) => void;
}>;

export interface MapRef {
  getMap(): any;
  queryRenderedFeatures(geometry: [number,number] | [[number,number],[number,number]], options?: any): Array<any>;
}

export default function StaticMap(props: StaticMapProps) : ReactElement;
