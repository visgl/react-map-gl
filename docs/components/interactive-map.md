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
          const {latitude, longitude, zoom} = viewport;
          // Optionally call `setState` and use the state to update the map.
        }}
      />
    );
  }
}
```

## Properties

Has all properties of [StaticMap](/docs/components/static-map.md) and the following:

##### `onViewportChange` {Function}
Callback that is fired when the user interacted with the map.
The object passed to the callback contains viewport properties such as
`longitude`, `latitude`, `zoom` etc.

If the map is intended to be interactive, the app use this prop to listen to
map updates and update the props accordingly.

##### `maxZoom` {Number} [default: 20]
Max zoom level.

##### `minZoom` {Number} [default: 0]
Min zoom level.

##### `maxPitch` {Number} [default: 60]
Max pitch in degrees.

##### `minPitch` {Number} [default: 0]
Min pitch in degrees.

##### `scrollZoom` {Bool} [default: true]
Enable croll to zoom.

##### `dragPan` {Bool} [default: true]
Enable drag to pan.

##### `dragRotate` {Bool} [default: true]
Enable drag to rotate.

##### `doubleClickZoom` {Bool} [default: true]
Enable double click to zoom.

##### `touchZoomRotate` {Bool} [default: true]
Enable touch to zoom and rotate.

##### `clickRadius` {Number} [default: 0]
Radius to detect features around a clicked point.

##### `mapControls` {Object}
A map control instance to replace the default map controls.
This object must implement the following interface:

- `events` - An array of subscribed events
- `handleEvent(event, context)` - A method that handles interactive events

##### `visibilityConstraints` {Object} ==EXPERIMENTAL==
An object with the bounding `minZoom`, `maxZoom`, `minPitch`, `maxPitch` within
which the map should be visible. This will manage automatically toggling the
`visible` prop in `StaticMap`.

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

##### `getCursor` {Function}
Accessor that returns a cursor style to show interactive state. Called when the component is being rendered.

Parameters
- `state` - The current state of the component.
  + `state.isDragging` - If the map is being dragged.
  + `state.isHovering` - If the pointer is over a clickable feature.

## Methods

Same methods as [StaticMap](/docs/controls/static-map.md).
