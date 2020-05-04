# WebMercatorViewport

The `WebMercatorViewport` class takes map camera states (`latitude`, `longitude`, `zoom`, `pitch`, `bearing` etc.),
and performs projections between world and screen coordinates.


## Constructor

| Parameter     |  Type    | Default | Description                                                |
| ------------- | -------- | ------- | ---------------------------------------------------------- |
| `width`       | `Number` | `1`       | Width of viewport |
| `height`      | `Number` | `1`       | Height of viewport |
| `latitude`    | `Number` | `0`      | Latitude of viewport center  |
| `longitude`   | `Number` | `0`    | Longitude of viewport center  |
| `zoom`        | `Number` | `11`      | Map zoom (scale is calculated as `2^zoom`) |
| `pitch`       | `Number` | `0`       | The pitch (tilt) of the map from the screen, in degrees (0 is straight down) |
| `bearing`     | `Number` | `0`       | The bearing (rotation) of the map from north, in degrees counter-clockwise (0 means north is up) |
| `altitude`    | `Number` | `1.5`     | Altitude of camera in screen units  |


Remarks:
 - Altitude has a default value that matches assumptions in mapbox-gl
 - `width` and `height` are forced to 1 if supplied as 0, to avoid
   division by zero. This is intended to reduce the burden of apps to
   to check values before instantiating a `Viewport`.
 -  When using Mercator projection, per cartographic tradition, longitudes and
   latitudes are specified as degrees.


## Methods

##### `project(lngLatZ, opts)`

Projects latitude and longitude to pixel coordinates on screen.

| Parameter      | Type      | Default  | Description                     |
| -------------- | --------- | -------- | ------------------------------- |
| `lngLatZ`      | `Array`   | (required) | map coordinates, `[lng, lat]` or `[lng, lat, Z]` where `Z` is elevation in meters |
| `opts`         | `Object`  | `{}`     | named options                   |
| `opts.topLeft` | `Boolean` | `true`   | If `true` projected coords are top left, otherwise bottom left |

Returns: `[x, y]` or `[x, y, z]` in pixels coordinates. `z` is pixel depth.
- If input is `[lng, lat]`: returns `[x, y]`.
- If input is `[lng, lat, Z]`: returns `[x, y, z]`.

Remarks:
* By default, returns top-left coordinates suitable for canvas/SVG type
  rendering.


##### `unproject(xyz, opts)`

Unproject pixel coordinates on screen to longitude and latitude on map.

| Parameter      | Type      | Default  | Description                     |
| -------------- | --------- | -------- | ------------------------------- |
| `xyz`          | `Array`   | (required) | pixel coordinates, `[x, y]` or `[x, y, z]` where `z` is pixel depth   |
| `opts`         | `Object`  | `{}`     | named options                   |
| `opts.topLeft` | `Boolean` | `true`   | If `true` projected coords are top left, otherwise bottom left |
| `opts.targetZ` | `Number`  | `0`      | If pixel depth `z` is not specified in `xyz`, use `opts.targetZ` as the desired elevation |

Returns: `[lng, lat]` or `[longitude, lat, Z]` in map coordinates. `Z` is elevation in meters.
- If input is `[x, y]` without specifying `opts.targetZ`: returns `[lng, lat]`.
- If input is `[x, y]` with `opts.targetZ`: returns `[lng, lat, targetZ]`.
- If input is `[x, y, z]`: returns `[lng, lat, Z]`.


##### `projectFlat(lngLat, scale)`

Project longitude and latitude onto Web Mercator coordinates.

| Parameter      | Type      | Default  | Description                     |
| -------------- | --------- | -------- | ------------------------------- |
| `lngLat`          | `Array`   | (required) | map coordinates, `[lng, lat]`   |
| `scale`         | `Number`  | `this.scale`     | Web Mercator scale  |

Returns:

 - `[x, y]`, representing Web Mercator coordinates.

##### `unprojectFlat(xy, scale)`

Unprojects a Web Mercator coordinate to longitude and latitude.
| Parameter      | Type      | Default  | Description                     |
| -------------- | --------- | -------- | ------------------------------- |
| `xy`          | `Array`   | (required) | Web Mercator coordinates, `[x, y]`   |
| `scale`         | `Number`  | `this.scale`     | Web Mercator scale  |

Returns:

 - `[longitude, latitude]`


##### `fitBounds(bounds, options)`

Get a new flat viewport that fits around the given bounding box.

* `bounds` ([[Number,Number],[Number,Number]]) - an array of two opposite corners of
the bounding box. Each corner is specified in `[lon, lat]`.
* `options` (Object)
  + `options.padding` (Number|{top:Number, bottom: Number, left: Number, right: Number}, optional) - The amount of
  padding in pixels to add to the given bounds from the edge of the viewport. If padding is set as object, all parameters are
  required.
  + `options.offset` ([Number,Number], optional) - The center of the given bounds relative to the viewport's center, `[x, y]` measured in pixels.


##### `getMapCenterByLngLatPosition(opts)`

Returns the map center that place a given [lng, lat] coordinate at screen point [x, y].

Parameters:
- `opts` (Object) - options
- `opts.lngLat` (Array, required) - [lng,lat] coordinates of a location on the sphere.
- `opts.pos` (Array, required) - [x,y] coordinates of a pixel on screen.

Returns:
- `[longitude, latitude]` new map center

