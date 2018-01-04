# Viewport Transition

`react-map-gl` does not expose the transition API from `mapbox-gl-js` since it is designed to be a stateless component, and needs to synchronize with separate overlay systems such as deck.gl.

Instead, transitions can be defined using [InteractiveMap](/docs/components/interactive-map.md)'s transition props. For example:
```jsx
import ReactMapGL, {LinearInterpolator, FlyToInterpolator} from 'react-map-gl';
// 3rd-party easing functions
import d3 from 'd3-ease';

<ReactMapGL
    {...viewport}
    transitionDuration={1000}
    transitionInterpolator={new FlyToInterpolator()}
    transitionEasing={d3.easeCubic}
    onTransitionEnd={() => {
        // do something
        }} >
```

See [viewport transition](#examples/viewport-transition) for a complete example.

## InteractiveMap's Transition Props

See properties of [InteractiveMap](/docs/components/interactive-map.md).

- `transitionDuration` {Number}
- `transitionInterpolator` {Object}
- `transitionEasing` {Function}
- `transitionInterruption` {Number}
- `onTransitionStart` {Function}
- `onTransitionInterrupt` {Function}
- `onTransitionEnd` {Function}


## Transition and the onViewportChange Callback

`InteractiveMap` is designed to be a stateless component. Its appearance is entirely controlled by the properties that are passed in from its parent. In this architecture, transition works the same way as interaction: the component shall notify the application of "user intent" by calling the `onViewportChange` callback, but ultimately the application needs to decide what to do with it.

The most simple handling of this intent is to accept it:
```
render() {
    const {viewport} = this.state;
    return <ReactMapGL
        {...viewport}
        onViewportChange={newViewport => this.setState({viewport: newViewport})}
        />;
}
```
The default interaction/transition are guaranteed to work with this set up.

Remarks:
- The props returned by the callback may contain transition properties. For example, during panning and rotating, the callback is invoked with `transitionDuration: 0`, meaning that the map movement instantly matches the change of the pointer. When panning or zooming with keyboard, the callback is invoked with a 300ms linear transition.
- It is recommended that when programatically triggering a transition, always explicitly set the transition properties (interpolator, easing and duration).
- The default interaction/transition behavior can always be intercepted and overwritten in the handler for `onViewportChange`. However, if a transition is in progress, the properties that are being transitioned (e.g. longitude and latitude) should not be manipulated, otherwise the change will be interpreted as an interruption of the transition.


## Transition Interpolators

A `TransitionInterpolator` instance must be supplied to the `transitionInterpolator` prop. It contains the following methods:
- `arePropsEqual(currentProps, nextProps)` - called to determine if transition should be triggered when viewport props update.
- `initiateProps(startProps, endProps)` - called before transition starts to pre-process the start and end viewport props.
- `interpolateProps(startProps, endProps, t)` - called to get viewport props in transition. `t` is a time factor between `[0, 1]`.

### `LinearInterpolator`

Interpolates all viewport props linearly. This interpolator offers similar behavior to Mapbox's `easeTo` when combined with a `transitionEasing` function. You may optionally limit the transition to selected viewport props, for example `new LinearInterpolator(['pitch', 'bearing'])` animates pitch and bearing while the user is still allowed to pan and zoom.

##### constructor

`new LinearInterpolator([transitionProps])`

Parameters:
- `transitionProps` {Array} (optional) - list of prop names to interpolate. Default: `['longitude', 'latitude', 'zoom', 'pitch', 'bearing']`.

### `FlyToInterpolator`

This interpolator offers similar behavior to Mapbox's `flyTo` method. 

##### constructor

`new FlyToInterpolator()`

