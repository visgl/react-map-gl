import {TransitionInterpolator} from './transition';
import type {MapStateProps} from './map-state';

export type ViewportProps = MapStateProps & {
  onTransitionStart: Function,
  onTransitionInterrupt: Function,
  onTransitionEnd: Function,
  onViewportChange: Function,
  onStateChange: Function
};

type TransitionState = {
  propsInTransition: any,
  interactionState: any,
  startProps: MapStateProps,
  endProps: MapStateProps,

  duration: number,
  easing: (t: number) => number,
  interpolator: TransitionInterpolator,
  interruption: number,

  startTime: number
};

export default class TransitionManager {
  static defaultProps: ViewportProps;

  constructor(props?: ViewportProps, getTime?: Function);

  getViewportInTransition(): ViewportProps;

  processViewportChange(nextProps: ViewportProps): boolean;

}

export const TRANSITION_EVENTS: any;
