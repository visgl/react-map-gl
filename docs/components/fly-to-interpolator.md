# FlyToInterpolator

Implements the `TransitionInterpolator` interface. Designed to use with the `transitionInterpolator` prop of [InteractiveMap](/docs/components/interactive-map.md).

This interpolator offers similar behavior to Mapbox's `flyTo` method.

```jsx
import ReactMapGL, {FlyToInterpolator} from 'react-map-gl';

<ReactMapGL
    ...
    transitionDuration={1000}
    transitionInterpolator={new FlyToInterpolator()} />
```

##### constructor

`new FlyToInterpolator([options])`

Parameters:
- `options` {Object} (optional)
  + `curve` (Number, optional, default: 1.414) - The zooming "curve" that will occur along the flight path.
  - `speed` (Number, optional, default: 1.2) - The average speed of the animation defined in relation to `options.curve`, it linearly affects the duration, higher speed returns smaller durations and vice versa.
  - `screenSpeed` (Number, optional) - The average speed of the animation measured in screenfuls per second. Similar to `opts.speed` it linearly affects the duration,  when specified `opts.speed` is ignored.
  - `maxDuration` (Number, optional) - Maximum duration in milliseconds, if calculated duration exceeds this value, `0` is returned.



## Source
[viewport-fly-to-interpolator.js](https://github.com/uber/react-map-gl/tree/5.0-release/src/utils/transition/viewport-fly-to-interpolator.js)
