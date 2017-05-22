# StaticMap


## Properties

### mapboxApiAccessToken (string)

Mapbox API access token for mapbox-gl-js. Required when using Mapbox vector tiles/styles
Mapbox WebGL context creation option. Useful when you want to export the canvas as a PNG

### preserveDrawingBuffer (bool)

### attributionControl (bool)

Show attribution control or not


### mapStyle (string | Immutable.Map)

The Mapbox style. A string url or a MapboxGL style Immutable.Map object


### preventStyleDiffing (bool)

There are known issues with style diffing. As stopgap, add option to prevent style diffing


### width (number, required)

The width of the map


### height (number, required)

The height of the map


### latitude (number, required)

The latitude of the center of the map


### longitude (number, required)

The longitude of the center of the map


### zoom (number, required)

The tile zoom level of the map


### bearing (number)

Specify the bearing of the viewpor


### pitch (number)

Specify the pitch of the viewpor


### altitude (number)

Altitude of the viewport camera. Default 1.5 "screen heights

Note: Non-public API, see https://github.com/mapbox/mapbox-gl-js/issues/1137


### onHoverFeatures (function)

Called when a feature is hovered over. Uses Mapbox's
queryRenderedFeatures API to find features under the pointer:
https://www.mapbox.com/mapbox-gl-js/api/#Map#queryRenderedFeatures
To query only some of the layers, set the `interactive` property in the
layer style to `true`. See Mapbox's style spec
https://www.mapbox.com/mapbox-gl-style-spec/#layer-interactive
If no interactive layers are found (e.g. using Mapbox's default styles),
will fall back to query all layers.

@callback
@param {array} features - The array of features the mouse is over.


### onClickFeatures (func)
Called when a feature is clicked on. Uses Mapbox's queryRenderedFeatures API to find features under the pointer: https://www.mapbox.com/mapbox-gl-js/api/#Map#queryRenderedFeatures.
* To query only some of the layers, set the `interactive` property in the layer style to `true`. See Mapbox's style spec https://www.mapbox.com/mapbox-gl-style-spec/#layer-interactive.
* If no interactive layers are found (e.g. using Mapbox's default styles), will fall back to query all layers.

### onClick (func)
Called when the map is clicked. The handler is called with the clicked coordinates (https://www.mapbox.com/mapbox-gl-js/api/#LngLat) and the screen coordinates (https://www.mapbox.com/mapbox-gl-js/api/#PointLike).

### clickRadius (number)

Radius to detect features around a clicked point. Defaults to 15
