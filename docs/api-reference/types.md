# Types

The following types can be imported from `react-map-gl` when using TypeScript.

## Components

#### MapboxMap

A [mapboxgl.Map](https://docs.mapbox.com/mapbox-gl-js/api/map/) instance.

#### IControl

A [mapboxgl.IControl](https://docs.mapbox.com/mapbox-gl-js/api/markers/#icontrol) implementation.

#### CustomLayerInterface

A [custom layer implementation](https://docs.mapbox.com/mapbox-gl-js/api/#customlayerinterface).

#### MapRef

Instance [ref]((https://reactjs.org/docs/refs-and-the-dom.html#creating-refs)) of a `Map` component. See [Map documentation](/docs/api-reference/map.md#methods) for details.

#### GeolocateControlRef

Instance [ref]((https://reactjs.org/docs/refs-and-the-dom.html#creating-refs)) of a `GeolocateControl` component. See [GeolocateControl documentation](/docs/api-reference/geolocate-control.md#methods) for details.


## Styling

#### MapboxStyle

An object conforming to the [Mapbox Style Specification](https://mapbox.com/mapbox-gl-style-spec/).

#### Fog

An object conforming to the [Fog Style Specification](https://docs.mapbox.com/mapbox-gl-js/style-spec/fog/).

#### Light

An object conforming to the [Light Style Specification](https://www.mapbox.com/mapbox-gl-style-spec/#light).

#### TerrainSpecification

An object conforming to the [Terrain Style Specification](https://docs.mapbox.com/mapbox-gl-js/style-spec/terrain/).

#### ProjectionSpecification

An object with the following fields:

- `name` (string): projection name, one of Albers (`'albers'`), Equal Earth (`'equalEarth'`), Equirectangular/Plate Carrée/WGS84 (`'equirectangular'`), Lambert (`'lambertConformalConic'`), Mercator (`'mercator'`), Natural Earth (`'naturalEarth'`), and Winkel Tripel (`'winkelTripel'`).
- `center?` ([number, number]): longitude and latitude of the projection center
- `parallels?` ([number, number]): the [two standard parallels](https://en.wikipedia.org/wiki/Map_projection#Conic) of a conic projection such as Albers and Lambert.

#### BackgroundLayer

A JSON object that defines a `background` layer according to the [Mapbox Style Specification](https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#background).

#### CircleLayer

A JSON object that defines a `circle` layer according to the [Mapbox Style Specification](https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#circle).

#### FillExtrusionLayer

A JSON object that defines a `fill-extrusion` layer according to the [Mapbox Style Specification](https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#fill-extrusion).

#### FillLayer

A JSON object that defines a `fill` layer according to the [Mapbox Style Specification](https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#fill).

#### HeatmapLayer

A JSON object that defines a `heatmap` layer according to the [Mapbox Style Specification](https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#heatmap).

#### HillshadeLayer

A JSON object that defines a `hillshade` layer according to the [Mapbox Style Specification](https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#hillshade).

#### LineLayer

A JSON object that defines a `line` layer according to the [Mapbox Style Specification](https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#line).

#### RasterLayer

A JSON object that defines a `raster` layer according to the [Mapbox Style Specification](https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#raster).

#### SymbolLayer

A JSON object that defines a `symbol` layer according to the [Mapbox Style Specification](https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#symbol).

#### SkyLayer

A JSON object that defines a `sky` layer according to the [Mapbox Style Specification](https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#sky).

#### GeoJSONSourceRaw

A JSON object that defines a `geojson` source according to the [Mapbox Style Specification](https://docs.mapbox.com/mapbox-gl-js/style-spec/sources/#geojson).

#### VideoSourceRaw

A JSON object that defines a `video` source according to the [Mapbox Style Specification](https://docs.mapbox.com/mapbox-gl-js/style-spec/sources/#video).

#### ImageSourceRaw

A JSON object that defines a `image` source according to the [Mapbox Style Specification](https://docs.mapbox.com/mapbox-gl-js/style-spec/sources/#image).

#### VectorSourceRaw

A JSON object that defines a `vector` source according to the [Mapbox Style Specification](https://docs.mapbox.com/mapbox-gl-js/style-spec/sources/#vector).

#### RasterSource

A JSON object that defines a `raster` source according to the [Mapbox Style Specification](https://docs.mapbox.com/mapbox-gl-js/style-spec/sources/#raster).

#### RasterDemSource

A JSON object that defines a `raster-dem` source according to the [Mapbox Style Specification](https://docs.mapbox.com/mapbox-gl-js/style-spec/sources/#raster-dem).

#### CanvasSourceRaw

A JSON object that defines a `canvas` source type. See [CanvasSourceOptions](https://docs.mapbox.com/mapbox-gl-js/api/sources/#canvassourceoptions).


## Configurations

#### Anchor

One of `'center'`, `'left'`, `'right'`, `'top'`, `'bottom'`, `'top-left'`, `'top-right'`, `'bottom-left'` and `'bottom-right'`.

#### Alignment

One of `'map'`, `'viewport'` and `'auto'`.

#### ControlPosition

One of `'top-right'`, `'top-left'`, `'bottom-right'` and `'bottom-left'`.

#### DragPanOptions

An object with the following fields:

- `linearity?`: number - The rate at which the speed reduces after the pan ends.
- `easing?`: (t: number) => number - Optional easing function when applying the drag. Defaults to bezier function.
- `deceleration?`: number - Factor used to scale the drag velocity. Default `0`.
- `maxSpeed?`: number - The maximum value of the drag velocity. Default `1400`.

See [DragPanHandler#enable](https://docs.mapbox.com/mapbox-gl-js/api/handlers/#dragpanhandler#enable).

#### FitBoundsOptions

An object with the following fields:

- `offset?`: [PointLike](#pointlike) - The center of the given bounds relative to the map's center, measured in pixels.
- `padding?`: [PaddingOptions](#paddingoptions) - The amount of padding in pixels to add to the given bounds.
- `maxZoom?`: number - The maximum zoom level to allow when the map view transitions to the specified bounds.
- `animate?`: boolean - When set to `false`, no animation happens.
- `linear?`: boolean - If `true`, the map transitions using [Map#easeTo](https://docs.mapbox.com/mapbox-gl-js/api/map/#map#easeto). If `false`, the map transitions using [Map#flyTo](https://docs.mapbox.com/mapbox-gl-js/api/map/#map#flyto) 
- `duration?`: number - Duration in milliseconds
- `maxDuration?`: number - Max duration in milliseconds
- `easing?`: (t: number) => number - A function taking a time in the range 0..1 and returning a number where 0 is the initial state and 1 is the final state.
- `essential?`: boolean - If `true`, then the animation is considered essential and will not be affected by `prefers-reduced-motion`. Otherwise, the transition will happen instantly if the user has enabled the `reduced motion` accesibility feature in their operating system.

See [Map#fitBounds](https://docs.mapbox.com/mapbox-gl-js/api/map/#map#fitbounds)

#### ZoomRotateOptions

An object with the following fields:

- `around?`: 'center' - If "center" is passed, map will zoom around center of map.

See [ScrollZoomHandler#enable](https://docs.mapbox.com/mapbox-gl-js/api/handlers/#scrollzoomhandler#enable), [TouchZoomRotateHandler#enable](https://docs.mapbox.com/mapbox-gl-js/api/handlers/#touchzoomrotatehandler#enable)

#### PaddingOptions

An object with the following fields:

- `left`: number - in pixels.
- `top`: number - in pixels.
- `right`: number - in pixels.
- `bottom`: number - in pixels.

#### TransformRequestFunction

A function that takes the following arguments:

- `url`: string
- `resourceType`: 'Unknown' | 'Style' | 'Source' | 'Tile' | 'Glyphs' | 'SpriteImage' | 'SpriteJSON' | 'Image';

And returns an object with the following fields:

- `url`: string - The URL to be requested.
- `credentials?`: 'same-origin' | 'include' - Use `'include'` to send cookies with cross-origin requests.
- `headers?`: { [header: string]: any } - The headers to be sent with the request.
- `method?`: 'GET' | 'POST' | 'PUT'
- `collectResourceTiming?`: boolean

See [RequestParameters](https://docs.mapbox.com/mapbox-gl-js/api/properties/#requestparameters).

## Data Types

#### LngLat

A [mapboxgl.LngLat](https://docs.mapbox.com/mapbox-gl-js/api/geography/#lnglat) object.

#### LngLatLike

A [LngLat](#lnglat) object, an array of two numbers representing longitude and latitude, or an object with `lng` and `lat` or `lon` and `lat` properties.

#### LngLatBounds

A [mapboxgl.LngLatBounds](https://docs.mapbox.com/mapbox-gl-js/api/geography/#lnglatbounds) object.

#### LngLatBoundsLike

A [LngLatBounds](#lnglatbounds) object, an array of [LngLatLike](#lnglatlike) objects in [sw, ne] order, or an array of numbers in [west, south, east, north] order.

#### Point

A [mapboxgl.Point](https://github.com/mapbox/point-geometry) object.

#### PointLike

A [Point](#point) or an array of two numbers representing x and y screen coordinates in pixels.

#### MapboxGeoJSONFeature

A [GeoJSON](http://geojson.org/) feature that also contains the following library-specific fields:

- `layer`: Layer
- `source`: string
- `sourceLayer`: string
- `state`: { [key: string]: any }

#### ViewState

An object with the following fields:

- `longitude`: number - The longitude of the map center.
- `latitude`: number - The latitude of the map center.
- `zoom`: number - The zoom level.
- `pitch`: number - The pitch (tilt) of the map, in degrees.
- `bearing`: number - The bearing (rotation) of the map, in degrees.

## Sources

The following are implementations of source types that could be retrieved with [Map#getSource](https://docs.mapbox.com/mapbox-gl-js/api/map/#map#getsource).

#### GeoJSONSource

A source containing GeoJSON. See [GeoJSONSource](https://docs.mapbox.com/mapbox-gl-js/api/sources/#geojsonsource).

#### VideoSource

A source containing video. See [VideoSource](https://docs.mapbox.com/mapbox-gl-js/api/sources/#videosource).

#### ImageSource

A source containing image. See [ImageSource](https://docs.mapbox.com/mapbox-gl-js/api/sources/#imagesource).

#### CanvasSource

A source containing the contents of an HTML canvas. See [CanvasSource](https://docs.mapbox.com/mapbox-gl-js/api/sources/#canvassource).

#### VectorTileSource

A source containing vector tiles in [Mapbox Vector Tile format](https://docs.mapbox.com/vector-tiles/reference/). See [VectorTileSource](https://docs.mapbox.com/mapbox-gl-js/api/sources/#vectortilesource).

## Events

#### MapboxEvent

An object with the following fields:

- `type`: string - Event type
- `target`: [MapboxMap](#mapboxmap) - The map instance that fired the event
- `originalEvent?`: [Event](https://developer.mozilla.org/en-US/docs/Web/API/Event)

#### MapLayerMouseEvent

An object with the following fields:

- `type`: string
- `target`: [MapboxMap](#mapboxmap)
- `originalEvent?`: [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent)
- `point`: [Point](#point)
- `lngLat`: [LngLat](#lnglat)
- `preventDefault`: () => void
- `defaultPrevented`: boolean
- `features?`: [MapboxGeoJSONFeature](#mapboxgeojsonfeature)[]

#### MapWheelEvent

An object with the following fields:

- `type`: string
- `target`: [MapboxMap](#mapboxmap)
- `originalEvent?`: [WheelEvent](https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent)
- `preventDefault`: () => void
- `defaultPrevented`: boolean

#### MapLayerTouchEvent

An object with the following fields:

- `type`: string
- `target`: [MapboxMap](#mapboxmap)
- `originalEvent?`: [TouchEvent](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent)
- `point`: [Point](#point)
- `lngLat`: [LngLat](#lnglat)
- `points`: [Point](#point)[]
- `lngLats`: [LngLat](#lnglat)[]
- `preventDefault`: () => void
- `defaultPrevented`: boolean
- `features?`: [MapboxGeoJSONFeature](#mapboxgeojsonfeature)[]

#### ViewStateChangeEvent

An object with the following fields:

- `type`: string - Event type
- `target`: [MapboxMap](#mapboxmap)
- `viewState`: [ViewState](#viewstate) - the next view state that the camera wants to change to based on user input or transition.

#### MapBoxZoomEvent

An object with the following fields:

- `type`: string
- `target`: [MapboxMap](#mapboxmap)
- `originalEvent?`: [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent)
- `boxZoomBounds`: [LngLatBounds](#lnglatbounds)

#### MapStyleDataEvent

An object with the following fields:

- `type`: string
- `target`: [MapboxMap](#mapboxmap)
- `dataType`: 'style'

#### MapSourceDataEvent

An object with the following fields:

- `type`: string
- `target`: [MapboxMap](#mapboxmap)
- `dataType`: 'source'
- `isSourceLoaded`: boolean
- `source`: string
- `sourceId`: string
- `sourceDataType`: 'metadata' | 'content'
- `tile`: any
- `coord`: Coordinate

See [MapDataEvent](https://docs.mapbox.com/mapbox-gl-js/api/events/#mapdataevent).

#### ErrorEvent

An object with the following fields:

- `type`: 'error'
- `error`: [Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)

#### GeolocateEvent

An object with the following fields:

- `type`: string
- `target`: [MapboxMap](#mapboxmap)
- `target`: [mapboxgl.GeolocateControl](https://docs.mapbox.com/mapbox-gl-js/api/markers/#geolocatecontrol)

#### GeolocateResultEvent

An object with the following fields:

- `type`: string
- `target`: [mapboxgl.GeolocateControl](https://docs.mapbox.com/mapbox-gl-js/api/markers/#geolocatecontrol)
- `coords`: [GeolocationCoordinates](https://developer.mozilla.org/en-US/docs/Web/API/GeolocationCoordinates) - the current location.
- `timestamp`: number - the time at which the location was retrieved.

#### GeolocateErrorEvent

An object with the following fields:

- `type`: string
- `target`: [mapboxgl.GeolocateControl](https://docs.mapbox.com/mapbox-gl-js/api/markers/#geolocatecontrol)
- `code`: PERMISSION_DENIED | POSITION_UNAVAILABLE | TIMEOUT - see [GeolocationPositionError](https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPositionError)
- `message`: string - the details of the error. Specifications note that this is primarily intended for debugging use and not to be shown directly in a user interface.

#### MarkerDragEvent

An object with the following fields:

- `type`: string
- `target`: [mapboxgl.Marker](https://docs.mapbox.com/mapbox-gl-js/api/markers/#marker)
- `lngLat`: [LngLat](#lnglat) - the new location of the marker

#### PopupEvent

An object with the following fields:

- `type`: string
- `target`: [mapboxgl.Popup](https://docs.mapbox.com/mapbox-gl-js/api/markers/#popup)
