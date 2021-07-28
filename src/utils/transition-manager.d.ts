import {TransitionInterpolator} from './transition';
import type {MapStateProps} from './map-state';

export type TransitionManagerProps = MapStateProps & {
  onTransitionStart: Function,
  onTransitionInterrupt: Function,
  onTransitionEnd: Function,
  onViewportChange?: Function,
  onStateChange?: Function
};

export type TransitionState = {
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
  static defaultProps: TransitionManagerProps;

  constructor(props?: TransitionManagerProps, getTime?: Function);

  getViewportInTransition(): TransitionManagerProps;

  processViewportChange(nextProps: TransitionManagerProps): boolean;

}

export const TRANSITION_EVENTS: any;
