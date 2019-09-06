# Viewport Transition

`react-map-gl` does not expose the transition API from `mapbox-gl-js` since it is designed to be a stateless component, and needs to synchronize with separate overlay systems such as deck.gl.

Instead, transitions can be defined using [InteractiveMap](/docs/components/interactive-map.md)'s transition props. For example:
```jsx
import ReactMapGL, {LinearInterpolator, FlyToInterpolator} from 'react-map-gl';
// 3rd-party easing functions
import d3 from 'd3-ease';

class MyApp extends React.Component {
    state = {
        viewport: {
            width: 800,
            height: 600,
            longitude: -122.45,
            latitude: 37.78,
            zoom: 14
        }
    };

    _onViewportChange = viewport => {
        this.setState({viewport});
    };

    _goToNYC = () => {
        const viewport = {
            ...this.state.viewport,
            longitude: -74.1,
            latitude: 40.7,
            zoom: 14,
            transitionDuration: 5000,
            transitionInterpolator: new FlyToInterpolator(),
            transitionEasing: d3.easeCubic
        };
        this.setState({viewport});
    };

    render() {
        return (
            <div>
                <ReactMapGL {...this.state.viewport} onViewportChange={this._onViewportChange} />
                <button onClick={this._goToNYC}>New York City</button>
            </div>
        );
    }
}
```

See [viewport animation](#examples/viewport-animation) for a complete example.


## Transition Viewport To A Bounding Box

You can use the `WebMercatorViewport` utility to find the target viewport that fits around a lngLat bounding box:

```js
import WebMercatorViewport from 'viewport-mercator-project';
```

```js
    _goToSF = () => {
        const {longitude, latitude, zoom} = new WebMercatorViewport(this.state.viewport)
            .fitBounds([[-122.4, 37.7], [-122.5, 37.8]], {
              padding: 20,
              offset: [0, -100]
            });
        const viewport = {
            ...this.state.viewport,
            longitude,
            latitude,
            zoom,
            transitionDuration: 5000,
            transitionInterpolator: new FlyToInterpolator(),
            transitionEasing: d3.easeCubic
        }
        this.setState({viewport});
    };
```

[Documentation of WebMercatorViewport](https://uber-common.github.io/viewport-mercator-project/#/documentation/api-reference/webmercatorviewport)


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

`InteractiveMap` is designed to be a stateless component. For transitions to work, the application must update the viewport props returned by the `onViewportChange` callback:
```
<ReactMapGL
    {...this.state.viewport}
    onViewportChange={(viewport) => this.setState({viewport})}
```

Remarks:
- The props returned by the callback may contain transition properties. For example, during panning and rotating, the callback is invoked with `transitionDuration: 0`, meaning that the map movement instantly matches the change of the pointer. When panning or zooming with keyboard, the callback is invoked with a 300ms linear transition.
- It is recommended that when programatically triggering a transition, always explicitly set the transition properties (interpolator, easing and duration).
- "Set and forget": the values of the following props at the start of a transition carry through the entire duration of the transition:
  + `transitionDuration`
  + `transitionInterpolator`
  + `transitionEasing`
  + `transitionInterruption`
- The default interaction/transition behavior can always be intercepted and overwritten in the handler for `onViewportChange`. However, if a transition is in progress, the properties that are being transitioned (e.g. longitude and latitude) should not be manipulated, otherwise the change will be interpreted as an interruption of the transition.
- When using `FlyToInterpolator` for `transitionInterpolator`, `transitionDuration` can be set to `'auto'` where actual duration is auto calculated based on start and end viewports and is linear to the distance between them. This duration can be further customized using `speed` parameter to `FlyToInterpolator` constructor.


## Transition Interpolators

A `TransitionInterpolator` instance must be supplied to the `transitionInterpolator` prop. It contains the following methods:
- `arePropsEqual(currentProps, nextProps)` - called to determine if transition should be triggered when viewport props update.
- `initiateProps(startProps, endProps)` - called before transition starts to pre-process the start and end viewport props.
- `interpolateProps(startProps, endProps, t)` - called to get viewport props in transition. `t` is a time factor between `[0, 1]`.

react-map-gl offers two built-in interpolator classes:
- [LinearInterpolator](/docs/components/linear-interpolator.md)
- [FlyToInterpolator](/docs/components/fly-to-interpolator.md)
