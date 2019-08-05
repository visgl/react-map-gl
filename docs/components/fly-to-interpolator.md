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
  + `speed` {Number} (optional, default 1.2) - Controls the `transitionDuration` calculated when it is set to `auto`, higher speed results in shorter duration and vice versa.


## Source
[viewport-fly-to-interpolator.js](https://github.com/uber/react-map-gl/tree/5.0-release/src/utils/transition/viewport-fly-to-interpolator.js)
