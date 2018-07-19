# LinearInterpolator

Implements the `TransitionInterpolator` interface. Designed to use with the `transitionInterpolator` prop of [InteractiveMap](/docs/components/interactive-map.md).

Interpolates all viewport props linearly. This interpolator offers similar behavior to Mapbox's `easeTo` when combined with a `transitionEasing` function. You may optionally limit the transition to selected viewport props, for example `new LinearInterpolator(['pitch', 'bearing'])` animates pitch and bearing while the user is still allowed to pan and zoom.

```jsx
import ReactMapGL, {LinearInterpolator} from 'react-map-gl';

<ReactMapGL
    ...
    transitionDuration={1000}
    transitionInterpolator={new LinearInterpolator()} />
```

##### constructor

`new LinearInterpolator([transitionProps])`

Parameters:
- `transitionProps` {Array} (optional) - list of prop names to interpolate. Default: `['longitude', 'latitude', 'zoom', 'pitch', 'bearing']`.


## Source
[linear-interpolator.js](https://github.com/uber/react-map-gl/tree/3.3-release/src/utils/transition/linear-interpolator.js)

