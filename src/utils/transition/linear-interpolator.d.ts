import TransitionInterpolator from './transition-interpolator';

export default class LinearInterpolator extends TransitionInterpolator {
  constructor(
    opts?: {
      transitionProps?: Array<string>,
      around?: Array<number>
    }
  );
}
