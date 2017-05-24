# StaticMap


## Properties

### mapboxApiAccessToken (string)

Mapbox API access token for mapbox-gl-js. Required when using Mapbox vector tiles/styles
Mapbox WebGL context creation option. Useful when you want to export the canvas as a PNG


### preserveDrawingBuffer (bool)

Equivalent to Mapbox's `preserveDrawingBuffer` [option](https://www.mapbox.com/mapbox-gl-js/api/#map).
If `true`, the map's canvas can be exported to a PNG using `map.getCanvas().toDataURL()`.

Default: `false`


### attributionControl (bool)

Equivalent to Mapbox's `attributionControl` [option](https://www.mapbox.com/mapbox-gl-js/api/#map).
If `true`, shows Mapbox's attribution control.

Default: `true`


### mapStyle (string | Immutable.Map)

The Mapbox style. A string url or a [MapboxGL style](https://www.mapbox.com/mapbox-gl-style-spec/#layer-interactive) [`Immutable.Map`](https://facebook.github.io/immutable-js/) object.


### preventStyleDiffing (bool)

If `mapStyle` is assigned an Immutable object, when the prop changes, `StaticMap` can diff
between the two values and call the appropriate Mapbox API such as `addLayer`, `removeLayer`,
`setStyle`, `setData`, etc. This allows apps to update data sources and layer styles efficiently.
In use cases such as animation or dynamic showing/hiding layers, style diffing prevents the
map from reloading and flickering when the map style changes.

There are known issues with style diffing. As stopgap, use this option to prevent style diffing.

Default: `false`


### width (number, required)

The width of the map.


### height (number, required)

The height of the map.


### latitude (number, required)

The latitude of the center of the map.


### longitude (number, required)

The longitude of the center of the map.


### zoom (number, required)

The tile zoom level of the map.


### bearing (number)

Specify the bearing of the viewpor.

Default: `0`


### pitch (number)

Specify the pitch of the viewpor.

Default: `0`


### altitude (number)

Altitude of the viewport camera.

Note: Non-public API, see https://github.com/mapbox/mapbox-gl-js/issues/1137

Default: `1.5` (screen heights)


### visible (bool)

Whether the map is visible. Unmounting and re-mounting a Mapbox instance is known to be costly.
This option offers a way to hide a map using CSS style.

Default: `true`


## Methods

### getMap

Returns the Mapbox instance if initialized.


### queryRenderedFeatures

Use Mapbox's `queryRenderedFeatures` API to find features at point or in a bounding box. If the `parameters` argument is not specified, only queries the layers with the `interactive` property in the layer style.

Parameters:
- `geometry` ([Number, Number]|[[Number, Number], [Number, Number]]) - Point or an array of two points defining the bounding box. Coordinates in pixels.
- `parameters` - Query options. For more details, see [Mapbox API documentation](https://www.mapbox.com/mapbox-gl-js/api/#Map#queryRenderedFeatures).

