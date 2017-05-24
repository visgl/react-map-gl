# InteractiveMap


## Properties

Additional props on top of [StaticMap](/docs/controls/static-map.md):

### maxZoom (number)

Max zoom level.

Default: `20`


### minZoom (number)

Min zoom level.

Default: `0`


### maxPitch (number)

Max pitch in degrees.

Default: `60`


### minPitch (number)

Min pitch in degrees.

Default: `0`


### scrollZoom (bool)

Enable croll to zoom.

Default: `true`


### dragPan (bool)

Enable drag to pan.

Default: `true`


### dragRotate (bool)

Enable drag to rotate.

Default: `true`


### doubleClickZoom (bool)

Enable double click to zoom.

Default: `true`


### touchZoomRotate (bool)

Enable touch to zoom and rotate.

Default: `true`


### onChangeViewport (function)

`onChangeViewport` callback is fired when the user interacted with the map. The object passed to the callback contains viewport properties such as `longitude`, `latitude`, `zoom` etc.

If the map is intended to be interactive, the app use this prop to listen to map updates and update the props accordingly.


### mapControls (object)

A map control instance to replace the default map controls.
This object must implement the following interface:
- `events` - An array of subscribed events
- `handleEvent(event, context)` - A method that handles interactive events


### onHover (function)

Called when the map is hovered over.

Parameters
- `event` - The pointer event.
  + `event.lngLat` - The geo coordinates that is being hovered.
  + `event.features` - The array of features under the pointer, queried using Mapbox's
    [queryRenderedFeatures](https://www.mapbox.com/mapbox-gl-js/api/#Map#queryRenderedFeatures) API.
    To make a layer interactive, set the `interactive` property in the layer style to `true`.


### onClick (function)

Called when the map is clicked.

Parameters
- `event` - The pointer event.
  + `event.lngLat` - The geo coordinates that is being clicked.
  + `event.features` - The array of features under the pointer, queried using Mapbox's
    [queryRenderedFeatures](https://www.mapbox.com/mapbox-gl-js/api/#Map#queryRenderedFeatures) API.
    To make a layer interactive, set the `interactive` property in the layer style to `true`.


### clickRadius (number)

Radius to detect features around a clicked point.

Default: `15`


### getCursor (number)

Accessor that returns a cursor style to show interactive state. Called when the component is being rendered.

Parameters
- `state` - The current state of the component.
  + `state.isDragging` - If the map is being dragged.
  + `state.isHovering` - If the pointer is over a clickable feature.


## Methods

Same methods as [StaticMap](/docs/controls/static-map.md).
