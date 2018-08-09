# InteractiveMap

This component renders `MapboxGL` and provides full interactivity support.
It uses `StaticMap` underneath to render the final map component.
This is the `default` exported component from `ReactMapGL`.

```js
import {Component} from 'react';
import ReactMapGL from 'react-map-gl';

class Map extends Component {
  render() {
    return (
      <ReactMapGL
        width={400}
        height={400}
        latitude={37.7577}
        longitude={-122.4376}
        zoom={8}
        onViewportChange={(viewport) => {
          const {width, height, latitude, longitude, zoom} = viewport;
          // call `setState` and use the state to update the map.
        }}
      />
    );
  }
}
```

## Properties

Has all properties of [StaticMap](/docs/components/static-map.md) and the following:

##### `onViewStateChange` {Function}

Callback that is fired when the map's viewport properties should be updated.

`onViewStateChange({viewState, interactionState, oldViewState})`

If the map is intended to be interactive, the app uses this prop to listen to map updates and update the props accordingly.

See `onViewportChange` for details of the arguments.

Note:
* `onViewStateChange` is a newer version of the `onViewportChange` callback. Both are supported and provide equivalent functionality.

##### `onViewportChange` {Function}

Callback that is fired when the map's viewport properties should be updated.

`onViewportChange(viewState, interactionState, oldViewState)`

Arguments: 

- `viewState` {Object} The next viewport properties, including: `width`, `height`, `latitude`, `longitude`, `zoom`, `bearing`, `pitch`, `altitude`, `maxZoom`, `minZoom`, `maxPitch`, `minPitch`, `transitionDuration`, `transitionEasing`, `transitionInterpolator`, `transitionInterruption`.
- `interactionState` {Object} The current interaction that caused this viewport change. See `onInteractionStateChange` for possible fields.
- `oldViewState` {Object} The current viewport properties.

Note:
* Even if both `onViewStateChange` and `onViewportChange` callbacks are supplied, they will both be called during an update.

##### `onInteractionStateChange` {Function}

Callback that is fired when the user interacted with the map.

`onInteractionStateChange(interactionState)`

Possible fields include:

- `interactionState.inTransition` (Boolean)
- `interactionState.isDragging` (Boolean)
- `interactionState.isPanning` (Boolean)
- `interactionState.isRotating` (Boolean)
- `interactionState.isZooming` (Boolean)

Note:
* `onInteractionStateChange` may be fired without `onViewportChange`. For example, when the pointer is released at the end of a drag-pan, `isDragging` are reset to `false`, without the viewport's `longitude` and `latitude` changing.


##### `maxZoom` {Number} [default: 20]

Max zoom level.

##### `minZoom` {Number} [default: 0]

Min zoom level.

##### `maxPitch` {Number} [default: 60]

Max pitch in degrees.

##### `minPitch` {Number} [default: 0]

Min pitch in degrees.

##### `scrollZoom` {Bool} [default: true]

Enable scroll to zoom.

##### `dragPan` {Bool} [default: true]

Enable drag to pan.

##### `dragRotate` {Bool} [default: true]

Enable drag to rotate.

##### `doubleClickZoom` {Bool} [default: true]

Enable double click to zoom.

##### `touchZoom` {Bool} [default: true]

Enable multitouch zoom.

##### `touchRotate` {Bool} [default: false]

Enable multitouch rotate.

##### `touchAction` {String} [default: 'none']

Allow browser default touch actions. Default `none`. See [hammer.js doc](http://hammerjs.github.io/touch-action/).

By default, the map captures all touch interactions. This prop is useful for mobile applications to unblock default scrolling behavior. For example, use the combination `dragPan: false` and `touchAction: 'pan-y'` to allow vertical page scroll when dragging over the map.


##### `clickRadius` {Number} [default: 0]

Radius to detect features around a clicked point.

##### `mapControls` {Object}

A map control instance to replace the default map controls.

This object must implement the following interface:
- `events` - An array of subscribed events
- `handleEvent(event, context)` - A method that handles interactive events

Parameters
- `event` - The pointer event.
  + `event.lngLat` - The geo coordinates that is being hovered.
  + `event.features` - The array of features under the pointer, queried using Mapbox's
    [queryRenderedFeatures](https://www.mapbox.com/mapbox-gl-js/api/#Map#queryRenderedFeatures) API.
    To make a layer interactive, set the `interactive` property in the layer style to `true`.

##### `onHover` {Function}

Called when the map is hovered over.

Parameters
- `event` - The pointer event.
  + `event.lngLat` - The geo coordinates that is being clicked.
  + `event.features` - The array of features under the pointer, queried using Mapbox's
    [queryRenderedFeatures](https://www.mapbox.com/mapbox-gl-js/api/#Map#queryRenderedFeatures) API.
    To make a layer interactive, set the `interactive` property in the layer style to `true`.

##### `onClick` {Function}

Called when the map is clicked.

Parameters
- `event` - The pointer event.
  + `event.lngLat` - The geo coordinates that is being clicked.
  + `event.features` - The array of features under the pointer, queried using Mapbox's
    [queryRenderedFeatures](https://www.mapbox.com/mapbox-gl-js/api/#Map#queryRenderedFeatures) API.
    To make a layer interactive, set the `interactive` property in the layer style to `true`.

##### `onContextMenu` {Function}

Called when the context menu is activated. Prevent default here to enable right button interaction.

Default: `event => event.preventDefault()`

##### `getCursor` {Function}

Accessor that returns a cursor style to show interactive state. Called when the component is being rendered.

Parameters
- `state` - The current state of the component.
  + `state.isDragging` - If the map is being dragged.
  + `state.isHovering` - If the pointer is over a clickable feature.

##### `transitionDuration` {Number}

Duration of transition in milliseconds. If specified, the map's viewport will smoothly move from the previous props to the current one. Default `0`;

##### `transitionInterpolator` {Object}

An interpolator object that defines the transition behavior between two map states. `react-map-gl` offers two interpolators:
- `LinearInterpolator` - similar to Mapbox's `easeTo` behavior.
- `FlyToInterpolator` - similar to Mapbox's `flyTo` behavior.

You may import them as follows:
```jsx
import ReactMapGL, {LinearInterpolator, FlyToInterpolator} from 'react-map-gl';

<ReactMapGL transitionDuration={1000} transitionInterpolator={new FlyToInterpolator()}>
```

Default: `new LinearInterpolator()`

For details about using transition interpolators, see [transitions](/docs/advanced/viewport-transitions.md).

##### `transitionEasing` {Function}

Easing function that maps a value from `[0, 1]` to `[0, 1]`. Default to `t => t` (linear). Check out [http://easings.net/](http://easings.net/) for common easing curves.

##### `transitionInterruption` {Number}

What to do if an ongoing transition is interrupted by another transition. There are 3 options:
- `TRANSITION_EVENTS.BREAK` - Start new transition from the current view. This is the default.
- `TRANSITION_EVENTS.SNAP_TO_END` - Jump to the end of the previous transition before starting the new transition.
- `TRANSITION_EVENTS.IGNORE` - Complete the previous transition and ignore the new viewport change.

You may import the constants as follows:
```
import {TRANSITION_EVENTS} from 'react-map-gl';
```

##### `onTransitionStart` {Function}

Callback that is fired when a transition is triggered.

##### `onTransitionInterrupt` {Function}

Callback that is fired when an ongoing transition is interrupted by another transition.

##### `onTransitionEnd` {Function}

Callback that is fired when a transition is complete.

## Methods

Same methods as [StaticMap](/docs/components/static-map.md).

## Source
[interactive-map.js](https://github.com/uber/react-map-gl/tree/3.2-release/src/components/interactive-map.js)

