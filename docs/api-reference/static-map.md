# StaticMap

![Since v3.0](https://img.shields.io/badge/since-v3.0-green)

The simplest `React` wrapper around `MapboxGL`. This is designed to be completely
static, and should be used to render a map with no interactivity. For a component
that supports full user interactivity, see [InteractiveMap](/docs/api-reference/interactive-map.md).

```js
import * as React from 'react';
import {StaticMap} from 'react-map-gl';

function App() {
  return (
    <StaticMap
      width="100vw"
      height="100vh"
      latitude={37.78}
      longitude={-122.45}
      zoom={8} />
  );
}
```

## Properties

### Initialization

The following props are used during the creation of the Mapbox map.

##### `attributionControl` (Boolean)

- default: `true`

Equivalent to Mapbox's `attributionControl` [option](https://www.mapbox.com/mapbox-gl-js/api/#map). If `true`, shows Mapbox's attribution control.

##### `disableTokenWarning` (Boolean)

- default: `false`

If the provided API access token is rejected by Mapbox, `StaticMap` renders a warning instead of failing silently. If you know what you are doing and want to hide this warning anyways, set this prop to `true`.

##### `gl` (WebGLContext)

> This prop is experimental.

Use an existing WebGLContext instead of creating a new one. This allows multiple libraries to render into a shared buffer. Use with caution.

##### `mapboxApiAccessToken` (String)

Mapbox API access token for `MapboxGL`. Required when using Mapbox vector tiles/styles
Mapbox WebGL context creation option. Useful when you want to export the canvas as a PNG

##### `mapboxApiUrl` (String)

- default: `https://api.mapbox.com`

Enables the use of private and country specific servers Mapbox servers, e.g. https://api.mapbox.cn/.

##### `mapOptions` (Object)

- default: `{}`

> Non-public API, see https://github.com/visgl/react-map-gl/issues/545

An object of additional options to be passed to Mapbox's [`Map` constructor](https://www.mapbox.com/mapbox-gl-js/api/#map). Options specified here
will take precedence over those same options if set via props.

##### `preserveDrawingBuffer` (Boolean)

- default: `false`

Equivalent to Mapbox's `preserveDrawingBuffer` [option](https://www.mapbox.com/mapbox-gl-js/api/#map). If `true`, the map's canvas can be exported to a PNG using `map.getCanvas().toDataURL()`.

##### `preventStyleDiffing` (Boolean)

- default: `false`

If `mapStyle` is assigned an Immutable object, when the prop changes, `StaticMap` can diff between the two values and call the appropriate Mapbox API such as `addLayer`, `removeLayer`, `setStyle`, `setData`, etc.
This allows apps to update data sources and layer styles efficiently. In use cases such as animation or dynamic showing/hiding layers, style diffing prevents the map from reloading and flickering when the map style changes.

There are known issues with style diffing. As stopgap, use this option to prevent style diffing.

##### `reuseMaps` (Boolean)

- default: `false`

> This prop is experimental.

If `true`, when the map component is unmounted, instead of calling `remove` on the Mapbox map instance, save it for later reuse. This will avoid repeatedly creating new Mapbox map instances if possible.

Applications that frequently mount and unmount maps may try this prop to help work around a mapbox-gl resource leak issue that can lead to a browser crash in certain situations.

##### `transformRequest` (Function)

- default: `null`

A callback run before the Map makes a request for an external URL. The callback can be used to modify the url, set headers, or set the credentials property for cross-origin requests.
Expected to return an object with a `url` property and optionally `headers` and `credentials` properties.  Equivalent to Mapbox's `transformRequest` [map option](https://www.mapbox.com/mapbox-gl-js/api#map).


### Map State

##### `mapStyle` (String | Object | Immutable.Map)

- default: `'mapbox://styles/mapbox/light-v8'`

The Mapbox style. A string url or a
[MapboxGL style](https://www.mapbox.com/mapbox-gl-style-spec/#layer-interactive)
object (regular JS object or Immutable.Map).

Whenever the `mapStyle` prop changes, the component will attempt to update the style of the underlying Mapbox map. The behavior can be further customized with the `preventStyleDiffing` prop.

`mapStyle` is ignored when explicitly set to `null`.

##### `width` (Number | String, required)

The width of the map. Can be either a number in pixels, or a valid CSS string.

##### `height` (Number | String, required)

The height of the map. Can be either a number in pixels, or a valid CSS string.

##### `latitude` (Number)

The latitude of the center of the map, as a top level prop. Only used if `viewState` is not supplied.

##### `longitude` (Number)

The longitude of the center of the map, as a top level prop. Only used if `viewState` is not supplied.

##### `zoom` (Number)

The tile zoom level of the map, as a top level prop. Only used if `viewState` is not supplied.

Bounded implicitly by default `minZoom` and `maxZoom` of `MapboxGL`

##### `bearing` (Number)

- default: `0`

Specify the bearing of the viewport, as a top level prop. Only used if `viewState` is not supplied.

##### `pitch` (Number)

- default: `0`

Specify the pitch of the viewport, as a top level prop. Only used if `viewState` is not supplied..

##### `altitude` (Number)

- default: `1.5`

> Non-public API, see https://github.com/mapbox/mapbox-gl-js/issues/1137.

Altitude of the viewport camera, relative to screen height.

##### `viewState` (Object)

An object containing the view state of the map specified by the following fields:
* `latitude` (Number) - The latitude of the center of the map.
* `longitude` (Number) - The longitude of the center of the map.
* `zoom` (Number) - The tile zoom level of the map. Bounded implicitly by default `minZoom` and `maxZoom` of `MapboxGL`.
* `bearing` (Number) - default: `0` - The bearing of the viewport.
* `pitch` (Number) - default: `0` - The pitch of the viewport.
* `altitude` (Number) - default: `1.5 screen heights`

Note: Either the `viewState`, or the `latitude`, `longitude` and `zoom` properties need to be specified.


### Render Options

##### `asyncRender` (Boolean)

- default: `false`

If `true`, let Mapbox manage its own render cycle. This is the behavior prior to v4.1.

If `false`, force Mapbox canvas to redraw with DOM updates. This will make the map synchronize better with other controls during prop-driven viewport changes.

##### `style` (Object)

The CSS style of the map container.

##### `visible` (Boolean)

- default: `true`

Whether the map is visible. Unmounting and re-mounting a Mapbox instance is known to be costly. This option offers a way to hide a map using CSS style.

##### `visibilityConstraints` (Object)

An object that specifies bounds for viewport props with `min*`, `max*` keys. If the viewport props are outside of these constraints, the Mapbox map is automatically hidden.

Default: `{ minZoom: 0, maxZoom: 20, minPitch: 0, maxPitch: 60 }`


### Callbacks

##### `onLoad` (Function)

- default: `() => {}`

A callback run when the map emits a `load` event. [Mapbox docs](https://www.mapbox.com/mapbox-gl-js/api#map.event:load)

##### `onResize` (Function)

- default: `() => {}`

A callback run when the map size has changed.

##### `onError` (Function)

- default: `console.error`

A callback run when the map emits an `error` event. [Mapbox docs](https://www.mapbox.com/mapbox-gl-js/api#map.event:error)


## Methods

##### `getMap`

Returns the Mapbox instance if initialized. The `Map` instance will have full access to [MapboxGL's API](https://www.mapbox.com/mapbox-gl-js/api/#map).

`getMap()`

##### `queryRenderedFeatures`

Use Mapbox's `queryRenderedFeatures` API to find features at point or in a bounding box. If the `parameters` argument is not specified, only queries the layers with the `interactive` property in the layer style.

`queryRenderedFeatures(geometry, parameters)`

- `geometry` {`[Number, Number` | `[[Number, Number, [Number, Number` - Point or an array of two points defining the bounding box. Coordinates in pixels.
- `parameters` - Query options. For more details, see [Mapbox API documentation](https://www.mapbox.com/mapbox-gl-js/api/#Map#queryRenderedFeatures).


## Source

[static-map.js](https://github.com/visgl/react-map-gl/tree/5.3-release/src/components/static-map.js)
