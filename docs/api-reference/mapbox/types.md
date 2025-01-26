# Types

The following types can be imported from `react-map-gl/mapbox` when using TypeScript.

## Components

#### IControl

A [custom control implementation](https://docs.mapbox.com/mapbox-gl-js/api/markers/#icontrol).

#### CustomLayerInterface

A [custom layer implementation](https://docs.mapbox.com/mapbox-gl-js/api/#customlayerinterface).

#### MapRef

Instance [ref](https://reactjs.org/docs/refs-and-the-dom.html#creating-refs) of a `Map` component. See [Map documentation](./map.md#methods) for details.


## Styling

#### MapStyle

An object conforming to the [Mapbox Style Specification](https://mapbox.com/mapbox-gl-style-spec/).

#### Fog

An object conforming to the [Fog Style Specification](https://docs.mapbox.com/mapbox-gl-js/style-spec/fog/).

#### Light

An object conforming to the [Light Style Specification](https://www.mapbox.com/mapbox-gl-style-spec/#light).

#### Terrain

An object conforming to the [Terrain Style Specification](https://docs.mapbox.com/mapbox-gl-js/style-spec/terrain/).

#### Projection

An object conforming to the [Projection Style Specification](https://docs.mapbox.com/mapbox-gl-js/style-spec/projection/).

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

#### GeoJSONSource

A JSON object that defines a `geojson` source according to the [Mapbox Style Specification](https://docs.mapbox.com/mapbox-gl-js/style-spec/sources/#geojson).

#### VideoSource

A JSON object that defines a `video` source according to the [Mapbox Style Specification](https://docs.mapbox.com/mapbox-gl-js/style-spec/sources/#video).

#### ImageSource

A JSON object that defines a `image` source according to the [Mapbox Style Specification](https://docs.mapbox.com/mapbox-gl-js/style-spec/sources/#image).

#### VectorSource

A JSON object that defines a `vector` source according to the [Mapbox Style Specification](https://docs.mapbox.com/mapbox-gl-js/style-spec/sources/#vector).

#### RasterSource

A JSON object that defines a `raster` source according to the [Mapbox Style Specification](https://docs.mapbox.com/mapbox-gl-js/style-spec/sources/#raster).

#### RasterDemSource

A JSON object that defines a `raster-dem` source according to the [Mapbox Style Specification](https://docs.mapbox.com/mapbox-gl-js/style-spec/sources/#raster-dem).

#### CanvasSource

A JSON object that defines a `canvas` source type. See [CanvasSourceOptions](https://docs.mapbox.com/mapbox-gl-js/api/sources/#canvassourceoptions).


## Configurations

#### ControlPosition

One of `'top-right'`, `'top-left'`, `'bottom-right'` and `'bottom-left'`.

#### PaddingOptions

An object with the following fields:

- `left`: number - in pixels.
- `top`: number - in pixels.
- `right`: number - in pixels.
- `bottom`: number - in pixels.


## Data Types

#### LngLat

A Mapbox [LngLat](https://docs.mapbox.com/mapbox-gl-js/api/geography/#lnglat) object.

#### LngLatLike

A [`LngLat`](#lnglat) object, an array of two numbers representing longitude and latitude, or an object with `lng` and `lat` or `lon` and `lat` properties.

#### LngLatBounds

A Mapbox [LngLatBounds](https://docs.mapbox.com/mapbox-gl-js/api/geography/#lnglatbounds) object.

#### LngLatBoundsLike

A [`LngLatBounds`](#lnglatbounds) object, an array of [`LngLatLike`](#lnglatlike) objects in [sw, ne] order, or an array of numbers in [west, south, east, north] order.

#### Point

A Mapbox [Point](https://docs.mapbox.com/mapbox-gl-js/api/geography/#point) object.

#### PointLike

A [Point](#point) or an array of two numbers representing x and y screen coordinates in pixels.

#### MapGeoJSONFeature

A [GeoJSON](http://geojson.org/) feature that also contains the following library-specific fields:

- `layer`: Layer
- `source`: string
- `sourceLayer`: string
- `state`: `{ [key: string]: any }`

#### ViewState

An object with the following fields:

- `longitude`: number - The longitude of the map center.
- `latitude`: number - The latitude of the map center.
- `zoom`: number - The zoom level.
- `pitch`: number - The pitch (tilt) of the map, in degrees.
- `bearing`: number - The bearing (rotation) of the map, in degrees.


## Events

#### MapEvent

An object with the following fields:

- `type`: string - Event type
- `target`: [Map](https://docs.mapbox.com/mapbox-gl-js/api/map/)
- `originalEvent?`: [Event](https://developer.mozilla.org/en-US/docs/Web/API/Event)

#### MapLayerMouseEvent

An object with the following fields:

- `type`: string
- `target`: [Map](https://docs.mapbox.com/mapbox-gl-js/api/map/)
- `originalEvent?`: [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent)
- `point`: [Point](#point)
- `lngLat`: [LngLat](#lnglat)
- `preventDefault`: () => void
- `defaultPrevented`: boolean
- `features?`: [MapGeoJSONFeature](#mapgeojsonfeature)[]

#### MapWheelEvent

An object with the following fields:

- `type`: string
- `target`: [Map](https://docs.mapbox.com/mapbox-gl-js/api/map/)
- `originalEvent?`: [WheelEvent](https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent)
- `preventDefault`: () => void
- `defaultPrevented`: boolean

#### MapLayerTouchEvent

An object with the following fields:

- `type`: string
- `target`: [Map](https://docs.mapbox.com/mapbox-gl-js/api/map/)
- `originalEvent?`: [TouchEvent](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent)
- `point`: [Point](#point)
- `lngLat`: [LngLat](#lnglat)
- `points`: [Point](#point)[]
- `lngLats`: [LngLat](#lnglat)[]
- `preventDefault`: () => void
- `defaultPrevented`: boolean
- `features?`: [MapGeoJSONFeature](#mapgeojsonfeature)[]

#### ViewStateChangeEvent

An object with the following fields:

- `type`: string - Event type
- `target`: [Map](https://docs.mapbox.com/mapbox-gl-js/api/map/)
- `viewState`: [ViewState](#viewstate) - the next view state that the camera wants to change to based on user input or transition.

#### MapBoxZoomEvent

An object with the following fields:

- `type`: string
- `target`: [Map](https://docs.mapbox.com/mapbox-gl-js/api/map/)
- `originalEvent?`: [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent)
- `boxZoomBounds`: [LngLatBounds](#lnglatbounds)

#### MapStyleDataEvent

An object with the following fields:

- `type`: string
- `target`: [Map](https://docs.mapbox.com/mapbox-gl-js/api/map/)
- `dataType`: 'style'

#### MapSourceDataEvent

An object with the following fields:

- `type`: string
- `target`: [Map](https://docs.mapbox.com/mapbox-gl-js/api/map/)
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
- `target`: [Map](https://docs.mapbox.com/mapbox-gl-js/api/map/)
- `error`: [Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)

#### GeolocateEvent

An object with the following fields:

- `type`: string
- `target`: [Map](https://docs.mapbox.com/mapbox-gl-js/api/map/)
- `target`: [GeolocateControl](https://docs.mapbox.com/mapbox-gl-js/api/markers/#geolocatecontrol)

#### GeolocateResultEvent

An object with the following fields:

- `type`: string
- `target`: [GeolocateControl](https://docs.mapbox.com/mapbox-gl-js/api/markers/#geolocatecontrol)
- `coords`: [GeolocationCoordinates](https://developer.mozilla.org/en-US/docs/Web/API/GeolocationCoordinates) - the current location.
- `timestamp`: number - the time at which the location was retrieved.

#### GeolocateErrorEvent

An object with the following fields:

- `type`: string
- `target`: [GeolocateControl](https://docs.mapbox.com/mapbox-gl-js/api/markers/#geolocatecontrol)
- `code`: PERMISSION_DENIED | POSITION_UNAVAILABLE | TIMEOUT - see [GeolocationPositionError](https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPositionError)
- `message`: string - the details of the error. Specifications note that this is primarily intended for debugging use and not to be shown directly in a user interface.

#### MarkerEvent

An object with the following fields:

- `type`: string
- `target`: [Marker](https://docs.mapbox.com/mapbox-gl-js/api/markers/#marker)

#### MarkerDragEvent

An object with the following fields:

- `type`: string
- `target`: [Marker](https://docs.mapbox.com/mapbox-gl-js/api/markers/#marker)
- `lngLat`: [LngLat](#lnglat) - the new location of the marker

#### PopupEvent

An object with the following fields:

- `type`: string
- `target`: [Popup](https://docs.mapbox.com/mapbox-gl-js/api/markers/#popup)
