import type {MapStateProps} from '../map-state';

export default class TransitionInterpolator {
  propNames: Array<string>;

  initializeProps(startProps: MapStateProps, endProps: MapStateProps): {start: any, end: any};

  arePropsEqual(currentProps: MapStateProps, nextProps: MapStateProps): boolean;

  interpolateProps(startProps: MapStateProps, endProps: MapStateProps, t: number): any;

  getDuration(startProps: MapStateProps, endProps: MapStateProps): number;
}
