# default (Map)

React component that wraps [Map](https://docs.mapbox.com/mapbox-gl-js/api/map/). This is also the default export from react-map-gl.

```js
import * as React from 'react';
import Map from 'react-map-gl';

function App() {
  return <Map
    mapLib={import('mapbox-gl')}
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

Imperative methods are accessible via a [React ref](https://reactjs.org/docs/refs-and-the-dom.html#creating-refs) or the [useMap](./use-map.md) hook.


```js
import * as React from 'react';
import Map from 'react-map-gl';

function App() {
  const mapRef = React.useRef();

  const onMapLoad = React.useCallback(() => {
    mapRef.current.on('move', () => {
      // do something
    });
  }, []);

  return <Map mapLib={import('mapbox-gl')} ref={mapRef} onLoad={onMapLoad} />;
}
```

The [MapRef](./types.md#mapref) object exposes [Map methods](https://docs.mapbox.com/mapbox-gl-js/api/map/#map-instance-members) that **are safe to call without breaking the React bindings**. For example, `setStyle()` is hidden from the ref object, because the style is supposed to be changed by updating the `mapStyle` prop. Calling the method directly may cause the the React prop to mismatch with the underlying state, and lead to unexpected behaviors.

You can still access the hidden members via `getMap()`:

#### `getMap()`: MapboxMap {#getmap}

Returns the native [Map](https://docs.mapbox.com/mapbox-gl-js/api/map/) instance associated with this component.


## Properties

### Layout options

#### `id`: string {#id}

Map container id.

#### `style`: CSSProperties {#style}

Default: `{position: 'relative', width: '100%', height: '100%'}`

Map container CSS.

#### `cursor`: string {#cursor}

Default: `'auto'`

The current cursor [type](https://developer.mozilla.org/en-US/docs/Web/CSS/cursor).

### Styling options

#### `fog`: [Fog](./types.md#fog) {#fog}

The fog property of the style. Must conform to the [Fog Style Specification](https://docs.mapbox.com/mapbox-gl-js/style-spec/fog/).
If `undefined` is provided, removes the fog from the map.

#### `light`: [Light](./types.md#light) {#light}

Light properties of the style. Must conform to the [Light Style Specification](https://www.mapbox.com/mapbox-gl-style-spec/#light).

#### `mapStyle`: [MapboxStyle](./types.md#mapboxstyle) | string | Immutable {#mapstyle}

Default: (empty style)

The map's Mapbox style. This must be an a JSON object conforming to the schema described in the [Mapbox Style Specification](https://mapbox.com/mapbox-gl-style-spec/), or a URL to such JSON.

#### `projection`: string | [ProjectionSpecification](./types.md#projectionspecification) {#projection}

Default: `'mercator'`

The projection the map should be rendered in. Available projections are Albers (`'albers'`), Equal Earth (`'equalEarth'`), Equirectangular/Plate Carrée/WGS84 (`'equirectangular'`), Lambert (`'lambertConformalConic'`), Mercator (`'mercator'`), Natural Earth (`'naturalEarth'`), and Winkel Tripel (`'winkelTripel'`). Conic projections such as Albers and Lambert have configurable `center` and `parallels` properties that allow developers to define the region in which the projection has minimal distortion; see [example](https://docs.mapbox.com/mapbox-gl-js/api/map/#map#setprojection).

#### `renderWorldCopies`: boolean {#renderworldcopies}

Default: `true`

If `true`, multiple copies of the world will be rendered, when zoomed out.

#### `styleDiffing`: boolean {#stylediffing}

Default: `true`

Enable diffing when `mapStyle` changes. If `false`, force a 'full' update, removing the current style and building the given one instead of attempting a diff-based update.

#### `terrain`: [TerrainSpecification](./types.md#terrainspecification) {#terrain}

Terrain property of the style. Must conform to the [Terrain Style Specification](https://docs.mapbox.com/mapbox-gl-js/style-spec/terrain/).
If `undefined` is provided, removes terrain from the map.


### Camera options

#### `initialViewState`: object {#initialviewstate}

The initial view state of the map. If specified, `longitude`, `latitude`, `zoom` etc. in props are ignored when constructing the map. Only specify `initialViewState` if `Map` is being used as an **uncontrolled component**. See [state management](../get-started/state-management.md) for examples.

- `bounds?`: [LngLatBoundsLike](./types.md#lnglatboundslike) - The initial bounds of the map. If specified, it overrides the `longitude`, `latitude` and `zoom` options. Default `null`.
- `fitBoundsOptions`: [FitBoundsOptions](./types.md#fitboundsoptions) - A `fitBounds` options object to use only when setting the `bounds` option. Default `null`.
- `longitude`: number - The initial longitude of the map center. Default `0`.
- `latitude`: number - The initial latitude of the map center. Default `0`.
- `zoom`: number - The initial zoom level. Default `0`.
- `pitch`: number - The initial pitch (tilt) of the map. Default `0`.
- `bearing`: number - The initial bearing (rotation) of the map. Default `0`.

#### `longitude`: number {#longitude}

The longitude of the map center.

#### `latitude`: number {#latitude}

The latitude of the map center.

#### `zoom`: number {#zoom}

The [zoom level](https://docs.mapbox.com/help/glossary/camera/#zoom-level) of the map.

#### `pitch`: number {#pitch}

The initial [pitch](https://docs.mapbox.com/help/glossary/camera/#pitch) (tilt) of the map, measured in degrees away from the plane of the screen (0-85).

#### `bearing`: number {#bearing}

The initial [bearing](https://docs.mapbox.com/help/glossary/camera/#bearing) (rotation) of the map, measured in degrees counter-clockwise from north.

#### `padding`: [PaddingOptions](./types.md#paddingoptions) {#padding}

Default: `null`

The padding in pixels around the viewport.

#### `minZoom`: number {#minzoom}

Default: `0`

The minimum zoom level of the map (0-24).

#### `maxZoom`: number {#maxzoom}

Default: `22`

The maximum zoom level of the map (0-24).

#### `minPitch`: number {#minpitch}

Default: `0`

The minimum pitch of the map (0-85).

#### `maxPitch`: number {#maxpitch}

Default: `60`

The maximum pitch of the map (0-85).

#### `maxBounds`: [LngLatBoundsLike](./types.md#lnglatboundslike) {#maxbounds}

Default: `null`

If set, the map is constrained to the given bounds.

### Input handler options

#### `boxZoom`: boolean {#boxzoom}

Default: `true`

If `true`, the "box zoom" interaction is enabled (see [BoxZoomHandler](https://docs.mapbox.com/mapbox-gl-js/api/handlers/#boxzoomhandler)).

#### `doubleClickZoom`: boolean {#doubleclickzoom}

Default: `true`

If `true`, the "double click to zoom" interaction is enabled (see [DoubleClickZoomHandler](https://docs.mapbox.com/mapbox-gl-js/api/handlers/#doubleclickzoomhandler)).

#### `dragRotate`: boolean {#dragrotate}

Default: `true`

If `true`, the "drag to rotate" interaction is enabled (see [DragRotateHandler](https://docs.mapbox.com/mapbox-gl-js/api/handlers/#dragrotatehandler)).

#### `dragPan`: boolean | [DragPanOptions](./types.md#dragpanoptions) {#dragpan}

Default: `true`

If `true`, the "drag to pan" interaction is enabled. Optionally accpt an object value that is the options to [DragPanHandler#enable](https://docs.mapbox.com/mapbox-gl-js/api/handlers/#dragpanhandler).

#### `keyboard`: boolean {#keyboard}

Default: `true`

If `true`, keyboard shortcuts are enabled (see [KeyboardHandler](https://docs.mapbox.com/mapbox-gl-js/api/handlers/#keyboardhandler)).

#### `scrollZoom`: boolean | [ZoomRotateOptions](./types.md#zoomrotateoptions) {#scrollzoom}

Default: `true`

If `true`, the "scroll to zoom" interaction is enabled. Optionally accpt an object value that is the options to  [ScrollZoomHandler#enable](https://docs.mapbox.com/mapbox-gl-js/api/handlers/#scrollzoomhandler).

#### `touchPitch`: boolean {#touchpitch}

Default: `true`

If `true`, the "drag to pitch" interaction is enabled. Optionally accpt an object value that is the options to [TouchPitchHandler#enable](https://docs.mapbox.com/mapbox-gl-js/api/handlers/#touchpitchhandler).

#### `touchZoomRotate`: boolean | [ZoomRotateOptions](./types.md#zoomrotateoptions) {#touchzoomrotate}

Default: `true`

If `true`, the "pinch to rotate and zoom" interaction is enabled. Optionally accpt an object value that is the options to [TouchZoomRotateHandler#enable](https://docs.mapbox.com/mapbox-gl-js/api/handlers/#touchzoomrotatehandler).

#### `interactiveLayerIds`: string[] {#interactivelayerids}

Default: `null`

The id(s) of style layer(s).

If specified, pointer event (`mousemove`, `click` etc.) listeners will be triggered only if its location is within a visible feature in these layers, and the event will have a `features` property containing an array of the matching features.

If not specified, pointer event listeners will be triggered by a corresponding event happening anywhere on the map, and the event will not have a `features` property.

See the [Callbacks](#callbacks) section for affected events.

### Callbacks

#### `onResize`: (event: [MapboxEvent](./types.md#mapboxevent)) => void {#onresize}

Called when the map has been resized.

#### `onLoad`: (event: [MapboxEvent](./types.md#mapboxevent)) => void {#onload}

Called after all necessary resources have been downloaded and the first visually complete rendering of the map has occurred.

#### `onRender`: (event: [MapboxEvent](./types.md#mapboxevent)) => void {#onrender}

Called whenever the map is drawn to the screen.

#### `onIdle`: (event: [MapboxEvent](./types.md#mapboxevent)) => void {#onidle}

Called after the last frame rendered before the map enters an "idle" state:

- No camera transitions are in progress
- All currently requested tiles have loaded
- All fade/transition animations have completed

#### `onRemove`: (event: [MapboxEvent](./types.md#mapboxevent)) => void {#onremove}

Called when the map has been removed.

#### `onError`: (event: [ErrorEvent](./types.md#errorevent)) => void {#onerror}

Default: `evt => console.error(evt.error)`

Called when an error occurs.

#### `onMouseDown`: (event: [MapLayerMouseEvent](./types.md#maplayermouseevent)) => void {#onmousedown}

Called when a pointing device (usually a mouse) is pressed within the map.

If `interactiveLayerIds` is specified, the event will contain an additional `features` field that contains features under the cursor from the specified layer.

#### `onMouseUp`: (event: [MapLayerMouseEvent](./types.md#maplayermouseevent)) => void {#onmouseup}

Called when a pointing device (usually a mouse) is released within the map.

If `interactiveLayerIds` is specified, the event will contain an additional `features` field that contains features under the cursor from the specified layer.

#### `onMouseOver`: (event: [MapLayerMouseEvent](./types.md#maplayermouseevent)) => void {#onmouseover}

Called when a pointing device (usually a mouse) is moved within the map. As you move the cursor across a web page containing a map, the event will fire each time it enters the map or any child elements.

#### `onMouseEnter`: (event: [MapLayerMouseEvent](./types.md#maplayermouseevent)) => void {#onmouseenter}

Called when a pointing device (usually a mouse) enters a visible portion of the layer(s) specified by `interactiveLayerIds` from outside that layer or outside the map canvas.

#### `onMouseMove`: (event: [MapLayerMouseEvent](./types.md#maplayermouseevent)) => void {#onmousemove}

Called when a pointing device (usually a mouse) is moved while the cursor is inside the map. As you move the cursor across the map, the event will fire every time the cursor changes position within the map.

If `interactiveLayerIds` is specified, the event will contain an additional `features` field that contains features under the cursor from the specified layer.

#### `onMouseLeave`: (event: [MapLayerMouseEvent](./types.md#maplayermouseevent)) => void {#onmouseleave}

Called when a pointing device (usually a mouse) leaves a visible portion of the layer(s) specified by `interactiveLayerIds` or moves from the layer to outside the map canvas.

#### `onMouseOut`: (event: [MapLayerMouseEvent](./types.md#maplayermouseevent)) => void {#onmouseout}

Called when a point device (usually a mouse) leaves the map's canvas.

#### `onClick`: (event: [MapLayerMouseEvent](./types.md#maplayermouseevent)) => void {#onclick}

Called when a pointing device (usually a mouse) is pressed and released at the same point on the map.

If `interactiveLayerIds` is specified, the event will contain an additional `features` field that contains features under the cursor from the specified layer.

#### `onDblClick`: (event: [MapLayerMouseEvent](./types.md#maplayermouseevent)) => void {#ondblclick}

Called when a pointing device (usually a mouse) is pressed and released twice at the same point on the map in rapid succession.

If `interactiveLayerIds` is specified, the event will contain an additional `features` field that contains features under the cursor from the specified layer.

#### `onContextMenu`: (event: [MapLayerMouseEvent](./types.md#maplayermouseevent)) => void {#oncontextmenu}

Called when the right button of the mouse is clicked or the context menu key is pressed within the map.

If `interactiveLayerIds` is specified, the event will contain an additional `features` field that contains features under the cursor from the specified layer.

#### `onWheel`: (event: [MapWheelEvent](./types.md#mapwheelevent)) => void {#onwheel}

Called when a wheel event occurs within the map.

#### `onTouchStart`: (event: [MapLayerTouchEvent](./types.md#maplayertouchevent)) => void {#ontouchstart}

Called when a `touchstart` event occurs within the map.

If `interactiveLayerIds` is specified, the event will contain an additional `features` field that contains features under the cursor from the specified layer.

#### `onTouchEnd`: (event: [MapLayerTouchEvent](./types.md#maplayertouchevent)) => void {#ontouchend}

Called when a `touchend` event occurs within the map.

If `interactiveLayerIds` is specified, the event will contain an additional `features` field that contains features under the cursor from the specified layer.

#### `onTouchMove`: (event: [MapLayerTouchEvent](./types.md#maplayertouchevent)) => void {#ontouchmove}

Called when a `touchmove` event occurs within the map.

If `interactiveLayerIds` is specified, the event will contain an additional `features` field that contains features under the cursor from the specified layer.

#### `onTouchCancel`: (event: [MapLayerTouchEvent](./types.md#maplayertouchevent)) => void {#ontouchcancel}

Called when a `touchcancel` event occurs within the map.

If `interactiveLayerIds` is specified, the event will contain an additional `features` field that contains features under the cursor from the specified layer.

#### `onMoveStart`: (event: [ViewStateChangeEvent](./types.md#viewstatechangeevent)) => void {#onmovestart}

Called just before the map begins a transition from one view to another.

#### `onMove`: (event: [ViewStateChangeEvent](./types.md#viewstatechangeevent)) => void {#onmove}

Called repeatedly during an animated transition from one view to another.

When `Map` is used as a controlled component, `event.viewState` reflects the view state that the camera "proposes" to move to, as a result of either user interaction or methods such as [flyTo](https://docs.mapbox.com/mapbox-gl-js/api/map/#map#flyto). The camera does not actually change until the application updates the view state props (`longitude`, `latitude`, `zoom` etc.).
See [state management](../get-started/state-management.md) for examples.

#### `onMoveEnd`: (event: [ViewStateChangeEvent](./types.md#viewstatechangeevent)) => void {#onmoveend}

Called just after the map completes a transition from one view to another.

#### `onDragStart`: (event: [ViewStateChangeEvent](./types.md#viewstatechangeevent)) => void {#ondragstart}

Called when a "drag to pan" interaction starts.

#### `onDrag`: (event: [ViewStateChangeEvent](./types.md#viewstatechangeevent)) => void {#ondrag}

Called repeatedly during a "drag to pan" interaction.

#### `onDragEnd`: (event: [ViewStateChangeEvent](./types.md#viewstatechangeevent)) => void {#ondragend}

Called when a "drag to pan" interaction ends.

#### `onZoomStart`: (event: [ViewStateChangeEvent](./types.md#viewstatechangeevent)) => void {#onzoomstart}

Called just before the map begins a transition from one zoom level to another.

#### `onZoom`: (event: [ViewStateChangeEvent](./types.md#viewstatechangeevent)) => void {#onzoom}

Called repeatedly during an animated transition from one zoom level to another.

When `Map` is used as a controlled component, `event.viewState.zoom` reflects the zoom that the camera "proposes" to change to, as a result of either user interaction or methods such as [flyTo](https://docs.mapbox.com/mapbox-gl-js/api/map/#map#flyto). The camera does not actually change until the application updates the `zoom` prop.

#### `onZoomEnd`: (event: [ViewStateChangeEvent](./types.md#viewstatechangeevent)) => void {#onzoomend}

Called just after the map completes a transition from one zoom level to another.

#### `onRotateStart`: (event: [ViewStateChangeEvent](./types.md#viewstatechangeevent)) => void {#onrotatestart}

Called just before the map begins a transition from one bearing (rotation) to another.

#### `onRotate`: (event: [ViewStateChangeEvent](./types.md#viewstatechangeevent)) => void {#onrotate}

Called repeatedly during an animated transition from one bearing (rotation) to another.

When `Map` is used as a controlled component, `event.viewState.bearing` reflects the zoom that the camera "proposes" to change to, as a result of either user interaction or methods such as [flyTo](https://docs.mapbox.com/mapbox-gl-js/api/map/#map#flyto). The camera does not actually change until the application updates the `bearing` prop.

#### `onRotateEnd`: (event: [ViewStateChangeEvent](./types.md#viewstatechangeevent)) => void {#onrotateend}

Called just after the map completes a transition from one bearing (rotation) to another.

#### `onPitchStart`: (event: [ViewStateChangeEvent](./types.md#viewstatechangeevent)) => void {#onpitchstart}

Called just before the map begins a transition from one pitch (tilt) to another.

#### `onPitch`: (event: [ViewStateChangeEvent](./types.md#viewstatechangeevent)) => void {#onpitch}

Called repeatedly during an animated transition from one pitch (tilt) to another.

When `Map` is used as a controlled component, `event.viewState.pitch` reflects the zoom that the camera "proposes" to change to, as a result of either user interaction or methods such as [flyTo](https://docs.mapbox.com/mapbox-gl-js/api/map/#map#flyto). The camera does not actually change until the application updates the `pitch` prop.

#### `onPitchEnd`: (event: [ViewStateChangeEvent](./types.md#viewstatechangeevent)) => void {#onpitchend}

Called just after the map completes a transition from one pitch (tilt) to another.

#### `onBoxZoomStart`: (event: [MapBoxZoomEvent](./types.md#mapboxzoomevent)) => void {#onboxzoomstart}

Called when a "box zoom" interaction starts.

#### `onBoxZoomEnd`: (event: [MapBoxZoomEvent](./types.md#mapboxzoomevent)) => void {#onboxzoomend}

Called when a "box zoom" interaction ends.

#### `onBoxZoomCancel`: (event:[MapBoxZoomEvent](./types.md#mapboxzoomevent)) => void {#onboxzoomcancel}

Called when the user cancels a "box zoom" interaction, or when the bounding box does not meet the minimum size threshold.

#### `onData`: (event: [MapStyleDataEvent](./types.md#mapstyledataevent) | [MapSourceDataEvent](./types.md#mapsourcedataevent)) => void {#ondata}

Called when any map data loads or changes. See [MapDataEvent](https://docs.mapbox.com/mapbox-gl-js/api/events/#mapdataevent) for more information.

#### `onStyleData`: (event: [MapStyleDataEvent](./types.md#mapstyledataevent)) => void {#onstyledata}

Called when the map's style loads or changes. See [MapDataEvent](https://docs.mapbox.com/mapbox-gl-js/api/events/#mapdataevent) for more information.

#### `onSourceData`: (event: [MapSourceDataEvent](./types.md#mapsourcedataevent)) => void {#onsourcedata}

Called when one of the map's sources loads or changes, including if a tile belonging to a source loads or changes. See [MapDataEvent](https://docs.mapbox.com/mapbox-gl-js/api/events/#mapdataevent) for more information.

### Other options

Props in this section are not reactive. They are only used once when the Map instance is constructed.

#### `mapLib`: any {#maplib}

Specify the underlying base map library for the Map component. The value can be provided with several options:

By module import (and embedding in the final bundle):

```js
import * as React from 'react';
import Map from 'react-map-gl';
import maplibregl from 'maplibre-gl';

function App() {
  return <Map mapLib={maplibregl} />;
}
```

By dynamic import (thus enable bundle splitting):

```js
import * as React from 'react';
import Map from 'react-map-gl';

function App() {
  return <Map mapLib={import('mapbox-gl')} />;
}
```

Or to load a pre-bundled version of the library:

```html
<script src="https://api.mapbox.com/mapbox-gl-js/v2.4.0/mapbox-gl.js" ></script>
```

```js
import * as React from 'react';
import Map from 'react-map-gl';

function App() {
  return <Map mapLib={window.mapboxgl} />;
}
```


#### `mapboxAccessToken`: string {#mapboxaccesstoken}

Token used to access the Mapbox data service. See [about map tokens](../get-started/mapbox-tokens.md).

#### `antialias`: boolean {#antialias}

Default: `false`

If `true` , the gl context will be created with [MSAA antialiasing](https://en.wikipedia.org/wiki/Multisample_anti-aliasing), which can be useful for antialiasing custom layers.
This is `false` by default as a performance optimization.

#### `attributionControl`: boolean {#attributioncontrol}

Default: `true`

If `true`, an attribution control will be added to the map.

#### `baseApiUrl`: string {#baseapiurl}

The map's default API URL for requesting tiles, styles, sprites, and glyphs.

#### `bearingSnap`: number {#bearingsnap}

Default: `7`

Snap to north threshold in degrees.

#### `clickTolerance`: number {#clicktolerance}

Default: `3`

The max number of pixels a user can shift the mouse pointer during a click for it to be considered a valid click (as opposed to a mouse drag).

#### `collectResourceTiming`: boolean {#collectresourcetiming}

Default: `false`

If `true`, Resource Timing API information will be collected for requests made by GeoJSON and Vector Tile web workers (this information is normally inaccessible from the main Javascript thread). Information will be returned in a `resourceTiming` property of  relevant `data` events.

#### `cooperativeGestures`: boolean {#cooperativegestures}

Default: `false`

If `true` , scroll zoom will require pressing the ctrl or ⌘ key while scrolling to zoom map, and touch pan will require using two fingers while panning to move the map. Touch pitch will require three fingers to activate if enabled.

#### `crossSourceCollisions`: boolean {#crosssourcecollisions}

Default: `true`

If `true`, symbols from multiple sources can collide with each other during collision detection. If `false`, collision detection is run separately for the symbols in each source.

#### `customAttribution`: string | string[] {#customattribution}

Default: `null`

String or strings to show in an AttributionControl.
Only applicable if `attributionControl` is `true`.

#### `fadeDuration`: number {#fadeduration}

Default: `300`

Controls the duration of the fade-in/fade-out animation for label collisions, in milliseconds. This setting affects all symbol layers. This setting does not affect the duration of runtime styling transitions or raster tile cross-fading.

#### `failIfMajorPerformanceCaveat`: boolean {#failifmajorperformancecaveat}

Default: `false`

If true, map creation will fail if the implementation determines that the performance of the created WebGL context would be dramatically lower than expected.

#### `hash`: boolean | string {#hash}

Default: `false`

If `true`, the map's position (zoom, center latitude, center longitude, bearing, and pitch) will be synced with the hash fragment of the page's URL.
For example, `http://path/to/my/page.html#2.59/39.26/53.07/-24.1/60`.

An additional string may optionally be provided to indicate a parameter-styled hash,
e.g. `http://path/to/my/page.html#map=2.59/39.26/53.07/-24.1/60&foo=bar`, where `foo` is a custom parameter and bar is an arbitrary hash distinct from the map hash.

#### `interactive`: boolean {#interactive}

Default: `true`

If `false`, no mouse, touch, or keyboard listeners are attached to the map, so it will not respond to input.

#### `locale`: Record\<string, string\> {#locale}

Default: `null`

A patch to apply to the default localization table for UI strings, e.g. control tooltips.
The `locale` object maps namespaced UI string IDs to translated strings in the target language; see `src/ui/default_locale.js` for an example with all supported string IDs.
The object may specify all UI strings (thereby adding support for a new translation) or only a subset of strings (thereby patching the default translation table).

#### `localFontFamily`: string {#localfontfamily}

Default: `null`

Defines a CSS font-family for locally overriding generation of all glyphs. Font settings from the map's style will be ignored, except for font-weight keywords (light/regular/medium/bold). If set, this option overrides the setting in localIdeographFontFamily.

#### `localIdeographFontFamily`: string {#localideographfontfamily}

Default: `'sans-serif'`

Defines a CSS font-family for locally overriding generation of glyphs in the 'CJK Unified Ideographs', 'Hiragana', 'Katakana', 'Hangul Syllables' and 'CJK Symbols and Punctuation' ranges. Overrides font settings from the map's style. See [example](https://www.mapbox.com/mapbox-gl-js/example/local-ideographs).

#### `logoPosition`: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' {#logoposition}

Default: `'bottom-left'`

A string representing the position of the Mapbox wordmark on the map.

#### `maxParallelImageRequests`: number {#maxparallelimagerequests}

Default: `16`

The maximum number of images (raster tiles, sprites, icons) to load in parallel.

#### `maxTileCacheSize`: number {#maxtilecachesize}

Default: `null`

The maximum number of tiles stored in the tile cache for a given source. If omitted, the cache will be dynamically sized based on the current viewport.

#### `optimizeForTerrain`: boolean {#optimizeforterrain}

Default: `true`

If true, map will prioritize rendering for performance by reordering layers.
If false, layers will always be drawn in the specified order.

#### `pitchWithRotate`: boolean {#pitchwithrotate}

Default: `true`

If `false`, the map's pitch (tilt) control with "drag to rotate" interaction will be disabled.

#### `preserveDrawingBuffer`: boolean {#preservedrawingbuffer}

Default: `false`

If `true`, The maps canvas can be exported to a PNG using `map.getCanvas().toDataURL()`;. This is `false` by default as a performance optimization.

#### `refreshExpiredTiles`: boolean {#refreshexpiredtiles}

Default: `true`

If `false`, the map won't attempt to re-request tiles once they expire per their HTTP `cacheControl`/`expires` headers.

#### `reuseMaps`: boolean {#reusemaps}

Default: `false`

By default, every time a map component is unmounted, all internal resources associated with the underlying `Map` instance are released. If the map gets mounted again, a new `Map` instance is constructed.

If `reuseMaps` is set to `true`, when a map component is unmounted, the underlying `Map` instance is retained in memory. The next time a map component gets mounted, the saved instance is reused. This behavior may be desirable if an application frequently mounts/unmounts map(s), for example in a tabbed or collapsable UI, and wants to avoid [new billable events](https://github.com/mapbox/mapbox-gl-js/releases/tag/v2.0.0) triggered by initialization.

Note that since some map options cannot be modified after initialization, when reusing maps, only the reactive props and `initialViewState` of the new component are respected.

#### `RTLTextPlugin`: string {#rtltextplugin}

Default: `'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js'`

Sets the map's [RTL text plugin](https://www.mapbox.com/mapbox-gl-js/plugins/#mapbox-gl-rtl-text). Necessary for supporting the Arabic and Hebrew languages, which are written right-to-left.

Setting this prop is the equivelant of calling [mapboxgl.setRTLTextPlugin](https://docs.mapbox.com/mapbox-gl-js/api/properties/#setrtltextplugin) with `lazy: true`.

#### `testMode`: boolean {#testmode}

Default: `false`

Silences errors and warnings generated due to an invalid accessToken, useful when using the library to write unit tests.

#### `trackResize`: boolean {#trackresize}

Default: `true`

If `true`, the map will automatically resize when the browser window resizes.

#### `transformRequest`: [TransformRequestFunction](./types.md#transformrequestfunction) {#transformrequest}

Default: `null`

A callback run before the Map makes a request for an external URL. The callback can be used to modify the url, set headers, or set the credentials property for cross-origin requests.

#### `workerClass`: object {#workerclass}

Default: `null`

Provides an interface for external module bundlers such as Webpack or Rollup to package mapbox-gl's WebWorker into a separate class and integrate it with the library.
Takes precedence over `workerUrl`.

#### `workerCount`: number {#workercount}

Default: `2`

The number of web workers instantiated on a page with mapbox-gl maps.

#### `workerUrl`: string {#workerurl}

Provides an interface for loading mapbox-gl's WebWorker bundle from a self-hosted URL. This is useful if your site needs to operate in a strict CSP (Content Security Policy) environment wherein you are not allowed to load JavaScript code from a Blob URL, which is default behavior.


## Source

[map.tsx](https://github.com/visgl/react-map-gl/tree/7.0-release/src/components/map.tsx)
