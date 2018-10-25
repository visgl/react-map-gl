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

### Initialization

Inherit the following props from [StaticMap](/docs/components/static-map.md):

- `attributionControl` {Bool}
- `disableTokenWarning` {Bool}
- `gl` {WebGLContext}
- `mapboxApiAccessToken` {String}
- `mapOptions` {Object}
- `preserveDrawingBuffer` {Bool}
- `preventStyleDiffing` {Bool}
- `reuseMaps` {Bool}
- `transformRequest` {Function}


### Map State

Inherit the following props from [StaticMap](/docs/components/static-map.md):

- `mapStyle` {String | Object | Immutable.Map}
- `width` {Number | String} (required)
- `height` {Number | String} (required)
- `latitude` {Number}
- `longitude` {Number}
- `zoom` {Number}
- `bearing` {Number} - default: `0`
- `pitch` {Number} - default: `0`
- `altitude` {Number} - default: `1.5 (screen heights)`
- `viewState` {Object}


### Render Options

Inherit the following props from [StaticMap](/docs/components/static-map.md):

- `style` {Object}
- `visible` {Bool}
- `visibilityConstraints` {Object}

##### `getCursor` {Function}

Accessor that returns a cursor style to show interactive state. Called when the component is being rendered.

Parameters
- `state` - The current state of the component.
  + `state.isDragging` - If the map is being dragged.
  + `state.isHovering` - If the pointer is over an interactive feature. See `interactiveLayerIds` prop.

The default implementation of `getCursor` returns `'pointer'` if `isHovering`, `'grabbing'` if `isDragging` and `'grab'` otherwise.


### Interaction Options

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

##### `controller` {Object}

A map controller instance to replace the default map controller.

This object must implement the following interface:
- `events` - An array of subscribed events
- `handleEvent(event, context)` - A method that handles interactive events

##### `interactiveLayerIds` {Array} [default: null]

A list of layer ids that are interactive. If specified:
- Pointer event callbacks will only query the features under the pointer of these layers.
- The `getCursor` callback will receive `isHovering: true` when hover over features of these layers.

If not specified:
- Pointer event callbacks will query the features under the pointer of all layers.
- The `getCursor` callback will always receive `isHovering: false`.


### Transitions

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

What to do if an ongoing transition is interrupted by another transition. There are 4 options:
- `TRANSITION_EVENTS.BREAK` - Start new transition from the current view. This is the default.
- `TRANSITION_EVENTS.SNAP_TO_END` - Jump to the end of the previous transition before starting the new transition.
- `TRANSITION_EVENTS.IGNORE` - Complete the previous transition and ignore the new viewport change.
- `TRANSITION_EVENTS.UPDATE` - Continue the ongoing transition but change its path from the current view toward the end of the interrupting transition.

You may import the constants as follows:

```js
import {TRANSITION_EVENTS} from 'react-map-gl';
```


### Callbacks

Inherit the following props from [StaticMap](/docs/components/static-map.md):

- `onLoad` {Function}
- `onResize` {Function}
- `onError` {Function}


##### `onViewportChange` {Function}

Callback that is fired when the map's viewport properties should be updated.

```js
onViewportChange(viewState, interactionState, oldViewState);
```

Arguments:

- `viewState` {Object} The next viewport properties, including: `width`, `height`, `latitude`, `longitude`, `zoom`, `bearing`, `pitch`, `altitude`, `maxZoom`, `minZoom`, `maxPitch`, `minPitch`, `transitionDuration`, `transitionEasing`, `transitionInterpolator`, `transitionInterruption`.
- `interactionState` {Object} The current interaction that caused this viewport change. See `onInteractionStateChange` for possible fields.
- `oldViewState` {Object} The current viewport properties.


##### `onViewStateChange` {Function}

A newer version of the `onViewportChange` callback. Both are supported and provide equivalent functionality.

```js
onViewStateChange({viewState, interactionState, oldViewState});
```


##### `onInteractionStateChange` {Function}

Callback that is fired when the user interacted with the map.

```js
onInteractionStateChange(interactionState)
```

Possible fields include:

- `interactionState.inTransition` (Boolean)
- `interactionState.isDragging` (Boolean)
- `interactionState.isPanning` (Boolean)
- `interactionState.isRotating` (Boolean)
- `interactionState.isZooming` (Boolean)

Note:
* `onInteractionStateChange` may be fired without `onViewportChange`. For example, when the pointer is released at the end of a drag-pan, `isDragging` are reset to `false`, without the viewport's `longitude` and `latitude` changing.


##### `onHover` {Function}

Called when the map is hovered over with mouse (not pressed). Receives a [PointerEvent](/docs/components/pointer-event.md) object.

##### `onClick` {Function}

Called when the map is clicked. Receives a [PointerEvent](/docs/components/pointer-event.md) object.

##### `onDblClick` {Function}

Called when the map is double clicked. Receives a [PointerEvent](/docs/components/pointer-event.md) object.

##### `onMouseDown` {Function}

Called when a pointing device (usually a mouse) is pressed within the map. Receives a [PointerEvent](/docs/components/pointer-event.md) object.

##### `onMouseMove` {Function}

Called when a pointing device (usually a mouse) is moved within the map. Receives a [PointerEvent](/docs/components/pointer-event.md) object.

##### `onMouseUp` {Function}

Called when a pointing device (usually a mouse) is released within the map. Receives a [PointerEvent](/docs/components/pointer-event.md) object.

##### `onTouchStart` {Function}

Called when a `touchstart` event occurs within the map. Receives a [PointerEvent](/docs/components/pointer-event.md) object.

##### `onTouchMove` {Function}

Called when a `touchmove` event occurs within the map. Receives a [PointerEvent](/docs/components/pointer-event.md) object.

##### `onTouchEnd` {Function}

Called when a `touchend` event occurs within the map. Receives a [PointerEvent](/docs/components/pointer-event.md) object.

##### `onMouseEnter` {Function}

Called when a pointing device (usually a mouse) enters a visible portion of one of the interactive layers, defined by the `interactiveLayerIds` prop. Receives a [PointerEvent](/docs/components/pointer-event.md) object.

##### `onMouseLeave` {Function}

Called when a pointing device (usually a mouse) leaves a visible portion of one of the interactive layers, defined by the `interactiveLayerIds` prop. Receives a [PointerEvent](/docs/components/pointer-event.md) object.

##### `onWheel` {Function}

Called when a `wheel` event occurs within the map. Receives a [PointerEvent](/docs/components/pointer-event.md) object.

##### `onMouseOut` {Function}

Called when a point device (usually a mouse) leaves the map's canvas. Receives a [PointerEvent](/docs/components/pointer-event.md) object.

##### `onContextMenu` {Function}

Called when the context menu is activated. Prevent default here to enable right button interaction.

Default: `event => event.preventDefault()`

##### `onTransitionStart` {Function}

Callback that is fired when a transition is triggered.

##### `onTransitionInterrupt` {Function}

Callback that is fired when an ongoing transition is interrupted by another transition.

##### `onTransitionEnd` {Function}

Callback that is fired when a transition is complete.

## Methods

Inherit the following methods from [StaticMap](/docs/components/static-map.md):

- `getMap()`
- `queryRenderedFeatures(geometry, parameters)`


## Source
[interactive-map.js](https://github.com/uber/react-map-gl/tree/3.2-release/src/components/interactive-map.js)

