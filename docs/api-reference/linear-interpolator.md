# LinearInterpolator

![Since v3.2](https://img.shields.io/badge/since-v3.2-green)

Implements the `TransitionInterpolator` interface. Designed to use with the `transitionInterpolator` prop of [InteractiveMap](/docs/api-reference/interactive-map.md).

Interpolates all viewport props linearly. This interpolator offers similar behavior to Mapbox's `easeTo` when combined with a `transitionEasing` function. You may optionally limit the transition to selected viewport props, for example `new LinearInterpolator(['pitch', 'bearing'])` animates pitch and bearing while the user is still allowed to pan and zoom.

```jsx
import ReactMapGL, {LinearInterpolator} from 'react-map-gl';

<ReactMapGL
    ...
    transitionDuration={1000}
    transitionInterpolator={new LinearInterpolator()} />
```

## Constructor

`new LinearInterpolator([options])`

Parameters:
- `options` {Object} (optional)
  + `transitionProps` {Array} (optional) - list of prop names to interpolate. Default: `['longitude', 'latitude', 'zoom', 'pitch', 'bearing']`.
  + `around` {Array} (optional) - a point to zoom/rotate the map around, as `[x, y]` in screen position.


## Source

[linear-interpolator.js](https://github.com/uber/react-map-gl/tree/5.2-release/src/utils/transition/linear-interpolator.js)

