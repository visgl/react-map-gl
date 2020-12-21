import TransitionInterpolator from './transition-interpolator';

type FlyToInterpolatorProps = {
  curve?: number,
  speed?: number,
  screenSpeed?: number,
  maxDuration?: number
};

export default class ViewportFlyToInterpolator extends TransitionInterpolator {
  constructor(props?: FlyToInterpolatorProps);
}
