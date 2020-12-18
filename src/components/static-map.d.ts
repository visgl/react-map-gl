import * as React from 'react';
import type {ViewState, MapboxProps} from '../mapbox/mapbox';

export type StaticMapProps = Omit<MapboxProps, "mapboxgl" | "container" | "width" | "height"> & Partial<{
  width: number | string,
  height: number | string,
  className: string,
  style: any,

  preventStyleDiffing: boolean,
  disableTokenWarning: boolean,
  visibilityConstraints: any,
  children: any,

  onResize: Function
}>;

export default class StaticMap extends React.PureComponent<StaticMapProps, any> {
  static supported(): boolean;
  static propTypes: any;
  static defaultProps: StaticMapProps;

  getMap(): any;
  queryRenderedFeatures(geometry: [number,number] | [[number,number],[number,number]], options?: any): Array<any>;
}
