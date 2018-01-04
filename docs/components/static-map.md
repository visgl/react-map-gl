# StaticMap

The simplest `React` wrapper around `MapboxGL`. This is designed to be completely
static, and should be used to render a map with no interactivity. For a component
that supports full user interactivity, see [InteractiveMap](/docs/components/interactive-map.md).

```js
import {Component} from 'react';
import {StaticMap} from 'react-map-gl';

class Map extends Component {
  render() {
    return (
      <StaticMap
        width={400}
        height={400}
        latitude={37.7577}
        longitude={-122.4376}
        zoom={8} />
    );
  }
}
```

## Properties

##### `mapboxApiAccessToken` {String}
Mapbox API access token for `MapboxGL`. Required when using Mapbox vector tiles/styles
Mapbox WebGL context creation option. Useful when you want to export the canvas as a PNG

##### `mapStyle` {String | Object | Immutable.Map}
The Mapbox style. A string url or a
[MapboxGL style](https://www.mapbox.com/mapbox-gl-style-spec/#layer-interactive)
object (regular JS object or Immutable.Map).

##### `width` {Number} (required)
The width of the map.

##### `height` {Number} (required)
The height of the map.

##### `latitude` {Number} (required)
The latitude of the center of the map.

##### `longitude` {Number} (required)
The longitude of the center of the map.

##### `zoom` {Number} (required)
The tile zoom level of the map. Bounded implicitly by default `minZoom`
and `maxZoom` of `MapboxGL`.

##### `bearing` {Number} - default: `0`
Specify the bearing of the viewport.

##### `pitch` {Number} - default: `0`
Specify the pitch of the viewport.

##### `altitude` {Number} - default: `1.5 (screen heights)`
Altitude of the viewport camera.
Note: Non-public API, see https://github.com/mapbox/mapbox-gl-js/issues/1137.

##### `visible` {Bool} - default: `true`
Whether the map is visible.
Unmounting and re-mounting a Mapbox instance is known to be costly.
This option offers a way to hide a map using CSS style.

##### `preserveDrawingBuffer` {Bool} - default: `false`
Equivalent to Mapbox's `preserveDrawingBuffer`
[option](https://www.mapbox.com/mapbox-gl-js/api/#map).
If `true`, the map's canvas can be exported to a PNG using `map.getCanvas().toDataURL()`.

##### `attributionControl` {Bool} - default: `true`
Equivalent to Mapbox's `attributionControl`
[option](https://www.mapbox.com/mapbox-gl-js/api/#map).
If `true`, shows Mapbox's attribution control.

##### `preventStyleDiffing` {Bool} - default: `false`
If `mapStyle` is assigned an Immutable object, when the prop changes, `StaticMap` can diff
between the two values and call the appropriate Mapbox API such as `addLayer`,
`removeLayer`, `setStyle`, `setData`, etc.
This allows apps to update data sources and layer styles efficiently.
In use cases such as animation or dynamic showing/hiding layers, style diffing prevents the
map from reloading and flickering when the map style changes.

There are known issues with style diffing. As stopgap, use this option to prevent style diffing.

##### `reuseMaps` {Bool} - default: `false`
If `true`, when the map component is unmounted, instead of calling `remove` on the Mapbox map instance, save it for later reuse. This will avoid repeatedly creating new Mapbox map instances if possible.

Applications that frequently mount and unmount maps may try this prop to help work around a mapbox-gl resource leak issue that can lead to a browser crash in certain situations.

##### `onLoad` {Function} - default: `no-op function`
A callback run when the map emits a `load` event.
[Mapbox docs](https://www.mapbox.com/mapbox-gl-js/api#map.event:load)

##### `onError` {Function} - default: `no-op function`
A callback run when the map emits an `error` event.
[Mapbox docs](https://www.mapbox.com/mapbox-gl-js/api#map.event:error)

##### `transformRequest` {Function} - default: `null`
A callback run before the Map makes a request for an external URL. The callback can be used
to modify the url, set headers, or set the credentials property for cross-origin requests.
Expected to return an object with a `url` property and optionally `headers` and `credentials`
properties.  Equivalent to Mapbox's `transformRequest` [map option](https://www.mapbox.com/mapbox-gl-js/api#map).

## Methods

##### `getMap()`
Returns the Mapbox instance if initialized. The `Map` instance will have
full access to [MapboxGL's API](https://www.mapbox.com/mapbox-gl-js/api/#map).

##### `queryRenderedFeatures(geometry, parameters)`
Use Mapbox's `queryRenderedFeatures` API to find features at point or in a bounding box.
If the `parameters` argument is not specified, only queries the layers with the
`interactive` property in the layer style.

Parameters:
- `geometry` {[Number, Number` | [[Number, Number`, [Number, Number```
  Point or an array of two points defining the bounding box. Coordinates in pixels.
- `parameters`
  Query options. For more details, see
  [Mapbox API documentation](https://www.mapbox.com/mapbox-gl-js/api/#Map#queryRenderedFeatures).
