# Map

React component that wraps [Map](https://docs.mapbox.com/mapbox-gl-js/api/map/).

```js
import * as React from 'react';
import Map from 'react-map-gl';

function App() {
  return <Map
    initialViewState={{
      longitude: -100,
      latitude: 40,
      zoom: 3.5
    }}
    style={{width: '100vw', height: '100vh'}}
    mapStyle="mapbox://styles/mapbox/streets-v9"
    mapboxAccessToken="MY_ACCESS_TOKEN"
  />;
}
```

## Methods

Imperative methods are accessible via a [React ref](https://reactjs.org/docs/refs-and-the-dom.html#creating-refs) or the [useMap](/docs/api-reference/use-map.md) hook.


```js
import * as React from 'react';
import Map from 'react-map-gl';

function App() {
  const mapRef = React.useRef();

  React.useEffect(() => {
    mapRef.current.on('styleimagemissing', () => {
      // do something
    });
  }, [])

  return <Map ref={mapRef} />;
}
```

The [MapRef](/docs/api-reference/types.md#mapref) object exposes [Map methods](https://docs.mapbox.com/mapbox-gl-js/api/map/#map-instance-members) that **are safe to call without breaaking the React bindings**. For example, `setStyle()` is hidden from the ref object, because the style is supposed to be changed by updating the `mapStyle` prop. Calling the method directly may cause the the React prop to mismatch with the underlying state, and lead to unexpected behaviors.

You can still access the hidden members via `getMap()`:

#### getMap(): MapboxMap

Returns the native [Map](https://docs.mapbox.com/mapbox-gl-js/api/map/) instance associated with this component.


## Properties

### Layout options

#### id: string

Map container id.

#### style: CSSProperties

Default: `{position: 'relative', width: '100%', height: '100%'}`

Map container CSS.

#### cursor: string

Default: `'auto'`

The current cursor [type](https://developer.mozilla.org/en-US/docs/Web/CSS/cursor).

### Styling options

#### fog: [Fog](/docs/api-reference/types.md#fog) | null

The fog property of the style. Must conform to the [Fog Style Specification](https://docs.mapbox.com/mapbox-gl-js/style-spec/fog/).
If `null` is provided, removes the fog from the map.

#### light: [Light](/docs/api-reference/types.md#light)

Light properties of the style. Must conform to the [Light Style Specification](https://www.mapbox.com/mapbox-gl-style-spec/#light).

#### mapStyle: [MapboxStyle](/docs/api-reference/types.md#mapboxstyle) | string | Immutable

Default: (empty style)

The map's Mapbox style. This must be an a JSON object conforming to the schema described in the [Mapbox Style Specification](https://mapbox.com/mapbox-gl-style-spec/), or a URL to such JSON.

#### projection: string | [ProjectionSpecification](/docs/api-reference/types.md#projectionspecification)

Default: `'mercator'`

The projection the map should be rendered in. Available projections are Albers (`'albers'`), Equal Earth (`'equalEarth'`), Equirectangular/Plate Carrée/WGS84 (`'equirectangular'`), Lambert (`'lambertConformalConic'`), Mercator (`'mercator'`), Natural Earth (`'naturalEarth'`), and Winkel Tripel (`'winkelTripel'`). Conic projections such as Albers and Lambert have configurable `center` and `parallels` properties that allow developers to define the region in which the projection has minimal distortion; see [example](https://docs.mapbox.com/mapbox-gl-js/api/map/#map#setprojection).

#### renderWorldCopies: boolean

Default: `true`

If `true`, multiple copies of the world will be rendered, when zoomed out.

#### styleDiffing: boolean

Default: `true`

Enable diffing when `mapStyle` changes. If `false`, force a 'full' update, removing the current style and building the given one instead of attempting a diff-based update.

#### terrain: [TerrainSpecification](/docs/api-reference/types.md#terrainspecification)

Terrain property of the style. Must conform to the [Terrain Style Specification](https://docs.mapbox.com/mapbox-gl-js/style-spec/terrain/).
If `null` is provided, removes terrain from the map.


### Camera options

#### initialViewState: object

The initial view state of the map. If specified, `longitude`, `latitude`, `zoom` etc. in props are ignored when constructing the map. Only specify `initialViewState` if `Map` is being used as an **uncontrolled component**. See [state management](/docs/get-started/state-management.md) for examples.

- `bounds?`: [LngLatBoundsLike](/docs/api-reference/types.md#lnglatboundslike) - The initial bounds of the map. If specified, it overrides the `longitude`, `latitude` and `zoom` options. Default `null`.
- `fitBoundsOptions`: [FitBoundsOptions](/docs/api-reference/types.md#fitboundsoptions) - A `fitBounds` options object to use only when setting the `bounds` option. Default `null`.
- `longitude`: number - The initial longitude of the map center. Default `0`.
- `latitude`: number - The initial latitude of the map center. Default `0`.
- `zoom`: number - The initial zoom level. Default `0`.
- `pitch`: number - The initial pitch (tilt) of the map. Default `0`.
- `bearing`: number - The initial bearing (rotation) of the map. Default `0`.

#### longitude: number

The longitude of the map center.

#### latitude: number

The latitude of the map center.

#### zoom: number

The [zoom level](https://docs.mapbox.com/help/glossary/camera/#zoom-level) of the map.

#### pitch: number

The initial [pitch](https://docs.mapbox.com/help/glossary/camera/#pitch) (tilt) of the map, measured in degrees away from the plane of the screen (0-85).

#### bearing: number

The initial [bearing](https://docs.mapbox.com/help/glossary/camera/#bearing) (rotation) of the map, measured in degrees counter-clockwise from north.

#### padding: [PaddingOptions](/docs/api-reference/types.md#paddingoptions)

Default: `null`

The padding in pixels around the viewport.

#### minZoom: number

Default: `0`

The minimum zoom level of the map (0-24).

#### maxZoom: number

Default: `22`

The maximum zoom level of the map (0-24).

#### minPitch: number

Default: `0`

The minimum pitch of the map (0-85).

#### maxPitch: number

Default: `85`

The maximum pitch of the map (0-85).

#### maxBounds: [LngLatBoundsLike](/docs/api-reference/types.md#lnglatboundslike)

Default: `null`

If set, the map is constrained to the given bounds.

### Input handler options

#### boxZoom: boolean

Default: `true`

If `true`, the "box zoom" interaction is enabled (see [BoxZoomHandler](https://docs.mapbox.com/mapbox-gl-js/api/handlers/#boxzoomhandler)).

#### doubleClickZoom: boolean

Default: `true`

If `true`, the "double click to zoom" interaction is enabled (see [DoubleClickZoomHandler](https://docs.mapbox.com/mapbox-gl-js/api/handlers/#doubleclickzoomhandler)).

#### dragRotate: boolean

Default: `true`

If `true`, the "drag to rotate" interaction is enabled (see [DragRotateHandler](https://docs.mapbox.com/mapbox-gl-js/api/handlers/#dragrotatehandler)).

#### dragPan: boolean | [DragPanOptions](/docs/api-reference/types.md#dragpanoptions)

Default: `true`

If `true`, the "drag to pan" interaction is enabled. Optionally accpt an object value that is the options to [DragPanHandler#enable](https://docs.mapbox.com/mapbox-gl-js/api/handlers/#dragpanhandler).

#### keyboard: boolean

Default: `true`

If `true`, keyboard shortcuts are enabled (see [KeyboardHandler](https://docs.mapbox.com/mapbox-gl-js/api/handlers/#keyboardhandler)).

#### scrollZoom: boolean | [ZoomRotateOptions](/docs/api-reference/types.md#zoomrotateoptions)

Default: `true`

If `true`, the "scroll to zoom" interaction is enabled. Optionally accpt an object value that is the options to  [ScrollZoomHandler#enable](https://docs.mapbox.com/mapbox-gl-js/api/handlers/#scrollzoomhandler).

#### touchPitch: boolean

Default: `true`

If `true`, the "drag to pitch" interaction is enabled. Optionally accpt an object value that is the options to [TouchPitchHandler#enable](https://docs.mapbox.com/mapbox-gl-js/api/handlers/#touchpitchhandler).

#### touchZoomRotate: boolean | [ZoomRotateOptions](/docs/api-reference/types.md#zoomrotateoptions)

Default: `true`

If `true`, the "pinch to rotate and zoom" interaction is enabled. Optionally accpt an object value that is the options to [TouchZoomRotateHandler#enable](https://docs.mapbox.com/mapbox-gl-js/api/handlers/#touchzoomrotatehandler).

#### interactiveLayerIds: string[]

Default: `null`

The id(s) of style layer(s).

If specified, pointer event (`mousemove`, `click` etc.) listeners will be triggered only if its location is within a visible feature in these layers, and the event will have a `features` property containing an array of the matching features.

If not specified, pointer event listeners will be triggered by a corresponding event happening anywhere on the map, and the event will not have a `features` property.

See the [Callbacks](#callbacks) section for affected events.

### Callbacks

#### onResize: (event: [MapboxEvent](/docs/api-reference/types.md#mapboxevent)) => void

Called when the map has been resized.

#### onLoad: (event: [MapboxEvent](/docs/api-reference/types.md#mapboxevent)) => void

Called after all necessary resources have been downloaded and the first visually complete rendering of the map has occurred.

#### onRender: (event: [MapboxEvent](/docs/api-reference/types.md#mapboxevent)) => void

Called whenever the map is drawn to the screen.

#### onIdle: (event: [MapboxEvent](/docs/api-reference/types.md#mapboxevent)) => void

Called after the last frame rendered before the map enters an "idle" state:

- No camera transitions are in progress
- All currently requested tiles have loaded
- All fade/transition animations have completed

#### onRemove: (event: [MapboxEvent](/docs/api-reference/types.md#mapboxevent)) => void

Called when the map has been removed.

#### onError: (event: [ErrorEvent](/docs/api-reference/types.md#errorevent)) => void

Default: `evt => console.error(evt.error)`

Called when an error occurs.

#### onMouseDown: (event: [MapLayerMouseEvent](/docs/api-reference/types.md#maplayermouseevent)) => void

Called when a pointing device (usually a mouse) is pressed within the map.

If `interactiveLayerIds` is specified, the event will fire only when the the cursor is pressed while inside a visible portion of the specifed layer(s).

#### onMouseUp: (event: [MapLayerMouseEvent](/docs/api-reference/types.md#maplayermouseevent)) => void

Called when a pointing device (usually a mouse) is released within the map.

If `interactiveLayerIds` is specified, the event will fire only when the the cursor is released while inside a visible portion of the specifed layer(s).

#### onMouseOver: (event: [MapLayerMouseEvent](/docs/api-reference/types.md#maplayermouseevent)) => void

Called when a pointing device (usually a mouse) is moved within the map. As you move the cursor across a web page containing a map, the event will fire each time it enters the map or any child elements.

#### onMouseEnter: (event: [MapLayerMouseEvent](/docs/api-reference/types.md#maplayermouseevent)) => void

Called when a pointing device (usually a mouse) enters a visible portion of the layer(s) specified by `interactiveLayerIds` from outside that layer or outside the map canvas.

#### onMouseMove: (event: [MapLayerMouseEvent](/docs/api-reference/types.md#maplayermouseevent)) => void

Called when a pointing device (usually a mouse) is moved while the cursor is inside the map. As you move the cursor across the map, the event will fire every time the cursor changes position within the map.

If `interactiveLayerIds` is specified, the event will fire only when the the cursor is inside a visible portion of the specifed layer(s).

#### onMouseLeave: (event: [MapLayerMouseEvent](/docs/api-reference/types.md#maplayermouseevent)) => void

Called when a pointing device (usually a mouse) leaves a visible portion of the layer(s) specified by `interactiveLayerIds` or moves from the layer to outside the map canvas.

#### onMouseOut: (event: [MapLayerMouseEvent](/docs/api-reference/types.md#maplayermouseevent)) => void

Called when a point device (usually a mouse) leaves the map's canvas.

#### onClick: (event: [MapLayerMouseEvent](/docs/api-reference/types.md#maplayermouseevent)) => void

Called when a pointing device (usually a mouse) is pressed and released at the same point on the map.

If `interactiveLayerIds` is specified, the event will fire only when the point that is clicked twice contains a visible portion of the specifed layer.

#### onDblClick: (event: [MapLayerMouseEvent](/docs/api-reference/types.md#maplayermouseevent)) => void

Called when a pointing device (usually a mouse) is pressed and released twice at the same point on the map in rapid succession.

If `interactiveLayerIds` is specified, the event will fire only when the point that is pressed and released contains a visible portion of the specifed layer.

#### onContextMenu: (event: [MapLayerMouseEvent](/docs/api-reference/types.md#maplayermouseevent)) => void

Called when the right button of the mouse is clicked or the context menu key is pressed within the map.

If `interactiveLayerIds` is specified, the event will fire only when the point that is right clicked contains a visible portion of the specifed layer.

#### onWheel: (event: [MapWheelEvent](/docs/api-reference/types.md#mapwheelevent)) => void

Called when a wheel event occurs within the map.

#### onTouchStart: (event: [MapLayerTouchEvent](/docs/api-reference/types.md#maplayertouchevent)) => void

Called when a `touchstart` event occurs within the map.

If `interactiveLayerIds` is specified, the event will fire only when the point is inside a visible portion of the specifed layer.


#### onTouchEnd: (event: [MapLayerTouchEvent](/docs/api-reference/types.md#maplayertouchevent)) => void

Called when a `touchend` event occurs within the map.

If `interactiveLayerIds` is specified, the event will fire only when the point is inside a visible portion of the specifed layer.

#### onTouchMove: (event: [MapLayerTouchEvent](/docs/api-reference/types.md#maplayertouchevent)) => void

Called when a `touchmove` event occurs within the map.

If `interactiveLayerIds` is specified, the event will fire only when the point is inside a visible portion of the specifed layer.

#### onTouchCancel: (event: [MapLayerTouchEvent](/docs/api-reference/types.md#maplayertouchevent)) => void

Called when a `touchcancel` event occurs within the map.

If `interactiveLayerIds` is specified, the event will fire only when the point is inside a visible portion of the specifed layer.

#### onMoveStart: (event: [ViewStateChangeEvent](/docs/api-reference/types.md#viewstatechangeevent)) => void

Called just before the map begins a transition from one view to another.

#### onMove: (event: [ViewStateChangeEvent](/docs/api-reference/types.md#viewstatechangeevent)) => void

Called repeatedly during an animated transition from one view to another.

When `Map` is used as a controlled component, `event.viewState` reflects the view state that the camera "proposes" to move to, as a result of either user interaction or methods such as [flyTo](https://docs.mapbox.com/mapbox-gl-js/api/map/#map#flyto). The camera does not actually change until the application updates the view state props (`longitude`, `latitude`, `zoom` etc.).
See [state management](/docs/get-started/state-management.md) for examples.

#### onMoveEnd: (event: [ViewStateChangeEvent](/docs/api-reference/types.md#viewstatechangeevent)) => void

Called just after the map completes a transition from one view to another.

#### onDragStart: (event: [ViewStateChangeEvent](/docs/api-reference/types.md#viewstatechangeevent)) => void

Called when a "drag to pan" interaction starts.

#### onDrag: (event: [ViewStateChangeEvent](/docs/api-reference/types.md#viewstatechangeevent)) => void

Called repeatedly during a "drag to pan" interaction.

#### onDragEnd: (event: [ViewStateChangeEvent](/docs/api-reference/types.md#viewstatechangeevent)) => void

Called when a "drag to pan" interaction ends.

#### onZoomStart: (event: [ViewStateChangeEvent](/docs/api-reference/types.md#viewstatechangeevent)) => void

Called just before the map begins a transition from one zoom level to another.

#### onZoom: (event: [ViewStateChangeEvent](/docs/api-reference/types.md#viewstatechangeevent)) => void

Called repeatedly during an animated transition from one zoom level to another.

When `Map` is used as a controlled component, `event.viewState.zoom` reflects the zoom that the camera "proposes" to change to, as a result of either user interaction or methods such as [flyTo](https://docs.mapbox.com/mapbox-gl-js/api/map/#map#flyto). The camera does not actually change until the application updates the `zoom` prop.

#### onZoomEnd: (event: [ViewStateChangeEvent](/docs/api-reference/types.md#viewstatechangeevent)) => void

Called just after the map completes a transition from one zoom level to another.

#### onRotateStart: (event: [ViewStateChangeEvent](/docs/api-reference/types.md#viewstatechangeevent)) => void

Called just before the map begins a transition from one bearing (rotation) to another.

#### onRotate: (event: [ViewStateChangeEvent](/docs/api-reference/types.md#viewstatechangeevent)) => void

Called repeatedly during an animated transition from one bearing (rotation) to another.

When `Map` is used as a controlled component, `event.viewState.bearing` reflects the zoom that the camera "proposes" to change to, as a result of either user interaction or methods such as [flyTo](https://docs.mapbox.com/mapbox-gl-js/api/map/#map#flyto). The camera does not actually change until the application updates the `bearing` prop.

#### onRotateEnd: (event: [ViewStateChangeEvent](/docs/api-reference/types.md#viewstatechangeevent)) => void

Called just after the map completes a transition from one bearing (rotation) to another.

#### onPitchStart: (event: [ViewStateChangeEvent](/docs/api-reference/types.md#viewstatechangeevent)) => void

Called just before the map begins a transition from one pitch (tilt) to another.

#### onPitch: (event: [ViewStateChangeEvent](/docs/api-reference/types.md#viewstatechangeevent)) => void

Called repeatedly during an animated transition from one pitch (tilt) to another.

When `Map` is used as a controlled component, `event.viewState.pitch` reflects the zoom that the camera "proposes" to change to, as a result of either user interaction or methods such as [flyTo](https://docs.mapbox.com/mapbox-gl-js/api/map/#map#flyto). The camera does not actually change until the application updates the `pitch` prop.

#### onPitchEnd: (event: [ViewStateChangeEvent](/docs/api-reference/types.md#viewstatechangeevent)) => void

Called just after the map completes a transition from one pitch (tilt) to another.

#### onBoxZoomStart: (event: [MapBoxZoomEvent](/docs/api-reference/types.md#mapboxzoomevent)) => void

Called when a "box zoom" interaction starts.

#### onBoxZoomEnd: (event: [MapBoxZoomEvent](/docs/api-reference/types.md#mapboxzoomevent)) => void

Called when a "box zoom" interaction ends.

#### onBoxZoomCancel: (event:[MapBoxZoomEvent](/docs/api-reference/types.md#mapboxzoomevent)) => void

Called when the user cancels a "box zoom" interaction, or when the bounding box does not meet the minimum size threshold.

#### onData: (event: [MapStyleDataEvent](/docs/api-reference/types.md#mapstyledataevent) | [MapSourceDataEvent](/docs/api-reference/types.md#mapsourcedataevent)) => void

Called when any map data loads or changes. See [MapDataEvent](https://docs.mapbox.com/mapbox-gl-js/api/events/#mapdataevent) for more information.

#### onStyleData: (event: [MapStyleDataEvent](/docs/api-reference/types.md#mapstyledataevent)) => void

Called when the map's style loads or changes. See [MapDataEvent](https://docs.mapbox.com/mapbox-gl-js/api/events/#mapdataevent) for more information.

#### onSourceData: (event: [MapSourceDataEvent](/docs/api-reference/types.md#mapsourcedataevent)) => void

Called when one of the map's sources loads or changes, including if a tile belonging to a source loads or changes. See [MapDataEvent](https://docs.mapbox.com/mapbox-gl-js/api/events/#mapdataevent) for more information.

### Other options

Props in this section are not reactive. They are only used once when the Map instance is constructed.

#### mapboxAccessToken: string

Token used to access the Mapbox data service. See [about map tokens](/docs/get-started/mapbox-tokens.md).

#### antialias: boolean

Default: `false`

If `true` , the gl context will be created with [MSAA antialiasing](https://en.wikipedia.org/wiki/Multisample_anti-aliasing), which can be useful for antialiasing custom layers.
This is `false` by default as a performance optimization.

#### attributionControl: boolean

Default: `true`

If `true`, an attribution control will be added to the map.

#### baseApiUrl: string

The map's default API URL for requesting tiles, styles, sprites, and glyphs.

#### bearingSnap: number

Default: `7`

Snap to north threshold in degrees.

#### clickTolerance: number

Default: `3`

The max number of pixels a user can shift the mouse pointer during a click for it to be considered a valid click (as opposed to a mouse drag).

#### collectResourceTiming: boolean

Default: `false`

If `true`, Resource Timing API information will be collected for requests made by GeoJSON and Vector Tile web workers (this information is normally inaccessible from the main Javascript thread). Information will be returned in a `resourceTiming` property of  relevant `data` events.

#### cooperativeGestures: boolean

Default: `false`

If `true` , scroll zoom will require pressing the ctrl or ⌘ key while scrolling to zoom map, and touch pan will require using two fingers while panning to move the map. Touch pitch will require three fingers to activate if enabled.

#### crossSourceCollisions: boolean

Default: `true`

If `true`, symbols from multiple sources can collide with each other during collision detection. If `false`, collision detection is run separately for the symbols in each source.

#### customAttribution: string | string[]

Default: `null`

String or strings to show in an AttributionControl.
Only applicable if `attributionControl` is `true`.

#### fadeDuration: number

Default: `300`

Controls the duration of the fade-in/fade-out animation for label collisions, in milliseconds. This setting affects all symbol layers. This setting does not affect the duration of runtime styling transitions or raster tile cross-fading.

#### failIfMajorPerformanceCaveat: boolean

Default: `false`

If true, map creation will fail if the implementation determines that the performance of the created WebGL context would be dramatically lower than expected.

#### hash: boolean | string

Default: `false`

If `true`, the map's position (zoom, center latitude, center longitude, bearing, and pitch) will be synced with the hash fragment of the page's URL.
For example, `http://path/to/my/page.html#2.59/39.26/53.07/-24.1/60`.

An additional string may optionally be provided to indicate a parameter-styled hash,
e.g. `http://path/to/my/page.html#map=2.59/39.26/53.07/-24.1/60&foo=bar`, where `foo` is a custom parameter and bar is an arbitrary hash distinct from the map hash.

#### interactive: boolean

Default: `true`

If `false`, no mouse, touch, or keyboard listeners are attached to the map, so it will not respond to input.

#### locale: Record\<string, string\>

Default: `null`

A patch to apply to the default localization table for UI strings, e.g. control tooltips.
The `locale` object maps namespaced UI string IDs to translated strings in the target language; see `src/ui/default_locale.js` for an example with all supported string IDs.
The object may specify all UI strings (thereby adding support for a new translation) or only a subset of strings (thereby patching the default translation table).

#### localFontFamily: string

Default: `null`

Defines a CSS font-family for locally overriding generation of all glyphs. Font settings from the map's style will be ignored, except for font-weight keywords (light/regular/medium/bold). If set, this option overrides the setting in localIdeographFontFamily.

#### localIdeographFontFamily: string

Default: `'sans-serif'`

Defines a CSS font-family for locally overriding generation of glyphs in the 'CJK Unified Ideographs', 'Hiragana', 'Katakana', 'Hangul Syllables' and 'CJK Symbols and Punctuation' ranges. Overrides font settings from the map's style. See [example](https://www.mapbox.com/mapbox-gl-js/example/local-ideographs).

#### logoPosition: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

Default: `'bottom-left'`

A string representing the position of the Mapbox wordmark on the map.

#### maxParallelImageRequests: number

Default: `16`

The maximum number of images (raster tiles, sprites, icons) to load in parallel.

#### maxTileCacheSize: number

Default: `null`

The maximum number of tiles stored in the tile cache for a given source. If omitted, the cache will be dynamically sized based on the current viewport.

#### optimizeForTerrain: boolean

Default: `true`

If true, map will prioritize rendering for performance by reordering layers.
If false, layers will always be drawn in the specified order.

#### pitchWithRotate: boolean

Default: `true`

If `false`, the map's pitch (tilt) control with "drag to rotate" interaction will be disabled.

#### preserveDrawingBuffer: boolean

Default: `false`

If `true`, The maps canvas can be exported to a PNG using `map.getCanvas().toDataURL()`;. This is `false` by default as a performance optimization.

#### refreshExpiredTiles: boolean

Default: `true`

If `false`, the map won't attempt to re-request tiles once they expire per their HTTP `cacheControl`/`expires` headers.

#### RTLTextPlugin: string

Default: `'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js'`

Sets the map's [RTL text plugin](https://www.mapbox.com/mapbox-gl-js/plugins/#mapbox-gl-rtl-text). Necessary for supporting the Arabic and Hebrew languages, which are written right-to-left.

Setting this prop is the equivelant of calling [mapboxgl.setRTLTextPlugin](https://docs.mapbox.com/mapbox-gl-js/api/properties/#setrtltextplugin) with `lazy: true`.

#### testMode: boolean

Default: `false`

Silences errors and warnings generated due to an invalid accessToken, useful when using the library to write unit tests.

#### trackResize: boolean

Default: `true`

If `true`, the map will automatically resize when the browser window resizes.

#### transformRequest: [TransformRequestFunction](/docs/api-reference/types.md#transformrequestfunction)

Default: `null`

A callback run before the Map makes a request for an external URL. The callback can be used to modify the url, set headers, or set the credentials property for cross-origin requests.

#### workerClass: object

Default: `null`

Provides an interface for external module bundlers such as Webpack or Rollup to package mapbox-gl's WebWorker into a separate class and integrate it with the library.
Takes precedence over `workerUrl`.

#### workerCount: number

Default: `2`

The number of web workers instantiated on a page with mapbox-gl maps.

#### workerUrl: string

Provides an interface for loading mapbox-gl's WebWorker bundle from a self-hosted URL. This is useful if your site needs to operate in a strict CSP (Content Security Policy) environment wherein you are not allowed to load JavaScript code from a Blob URL, which is default behavior.


## Source

[map.tsx](https://github.com/visgl/react-map-gl/tree/7.0-dev/src/components/map.tsx)
