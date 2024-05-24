# default (Map)

React component that wraps the base library's `Map` class ([Mapbox](https://docs.mapbox.com/mapbox-gl-js/api/map/) | [Maplibre](https://maplibre.org/maplibre-gl-js-docs/api/map/)). This is also the default export from react-map-gl.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="map-library">
  <TabItem value="mapbox" label="Mapbox">

```tsx title="app.tsx"
import * as React from 'react';
import Map from 'react-map-gl';

function App() {
  return (
    <Map
      mapboxAccessToken="<Mapbox access token>"
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14
      }}
      style={{width: 600, height: 400}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    />
  );
}
```

  </TabItem>
  <TabItem value="maplibre" label="Maplibre">

```tsx title="app.tsx"
import * as React from 'react';
import Map from 'react-map-gl/maplibre';

function App() {
  return (
    <Map
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14
      }}
      style={{width: 600, height: 400}}
      mapStyle="https://api.maptiler.com/maps/streets/style.json?key=get_your_own_key"
    />
  );
}
```

  </TabItem>
</Tabs>

## Properties

Aside from the props listed below, the `Map` component supports all parameters of the `Map` class constructor ([Mapbox](https://docs.mapbox.com/mapbox-gl-js/api/map/) | [Maplibre](https://maplibre.org/maplibre-gl-js-docs/api/map/)). Beware that this is not an exhaustive list of all props. Different base map libraries may offer different options and default values. When in doubt, refer to your base map library's documentation.

### Layout options

#### `id`: string {#id}

Map container id.

Required when [`MapProvider`](./map-provider.md)s are used. Used to reference the map with [`useMap`](./use-map.md).

Make sure to pick a name that has no conflict with other imports (there are no checks or errors in this case).

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

#### `mapStyle`: [MapStyle](./types.md#mapstyle) | string | Immutable {#mapstyle}

Default: (empty style)

The map's Mapbox style. This must be an a JSON object conforming to the schema described in the [Mapbox Style Specification](https://mapbox.com/mapbox-gl-style-spec/), or a URL to such JSON.

#### `projection`: string | [Projection](./types.md#projection) {#projection}

Default: `'mercator'`

The projection the map should be rendered in. Available projections are Albers (`'albers'`), Equal Earth (`'equalEarth'`), Equirectangular/Plate Carrée/WGS84 (`'equirectangular'`), Lambert (`'lambertConformalConic'`), Mercator (`'mercator'`), Natural Earth (`'naturalEarth'`), and Winkel Tripel (`'winkelTripel'`). Conic projections such as Albers and Lambert have configurable `center` and `parallels` properties that allow developers to define the region in which the projection has minimal distortion; see [example](https://docs.mapbox.com/mapbox-gl-js/api/map/#map#setprojection).

#### `renderWorldCopies`: boolean {#renderworldcopies}

Default: `true`

If `true`, multiple copies of the world will be rendered, when zoomed out.

#### `styleDiffing`: boolean {#stylediffing}

Default: `true`

Enable diffing when `mapStyle` changes. If `false`, force a 'full' update, removing the current style and building the given one instead of attempting a diff-based update.

#### `terrain`: [Terrain](./types.md#terrain) {#terrain}

Terrain property of the style. Must conform to the [Terrain Style Specification](https://docs.mapbox.com/mapbox-gl-js/style-spec/terrain/).
If `undefined` is provided, removes terrain from the map.

### Camera options

#### `initialViewState`: object {#initialviewstate}

The initial view state of the map. If specified, `longitude`, `latitude`, `zoom` etc. in props are ignored when constructing the map. Only specify `initialViewState` if `Map` is being used as an **uncontrolled component**. See [state management](../get-started/state-management.md) for examples.

- `bounds`: [LngLatBoundsLike](./types.md#lnglatboundslike) - The initial bounds of the map. If specified, it overrides the `longitude`, `latitude` and `zoom` options. Default `null`.
- `fitBoundsOptions` - An object to use only when setting the `bounds` option. Default `null`.
  + `fitBoundsOptions.offset`: [PointLike](./types.md#pointlike)
  + `fitBoundsOptions.minZoom`: number
  + `fitBoundsOptions.maxZoom`: number
  + `fitBoundsOptions.padding`: [PaddingOptions](./types.md#paddingoptions)
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

If `true`, the "box zoom" interaction is enabled. See `BoxZoomHandler`
([Mapbox](https://docs.mapbox.com/mapbox-gl-js/api/handlers/#boxzoomhandler) | [Maplibre](https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.BoxZoomHandler/))

#### `doubleClickZoom`: boolean {#doubleclickzoom}

Default: `true`

If `true`, the "double click to zoom" interaction is enabled. See `DoubleClickZoomHandler` ([Mapbox](https://docs.mapbox.com/mapbox-gl-js/api/handlers/#doubleclickzoomhandler) | [Maplibre](https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.DoubleClickZoomHandler/)).

#### `dragRotate`: boolean {#dragrotate}

Default: `true`

If `true`, the "drag to rotate" interaction is enabled. See `DragRotateHandler` ([Mapbox](https://docs.mapbox.com/mapbox-gl-js/api/handlers/#dragrotatehandler) | [Maplibre](https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.DragRotateHandler/)).

#### `dragPan`: boolean | Object {#dragpan}

Default: `true`

If `true`, the "drag to pan" interaction is enabled. Optionally accpt an object value that is the options to `DragPanHandler.enable` ([Mapbox](https://docs.mapbox.com/mapbox-gl-js/api/handlers/#dragpanhandler#enable) | [Maplibre](https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.DragPanHandler/#enable)).

#### `keyboard`: boolean {#keyboard}

Default: `true`

If `true`, keyboard shortcuts are enabled. See `KeyboardHandler` ([Mapbox](https://docs.mapbox.com/mapbox-gl-js/api/handlers/#keyboardhandler) | [Maplibre](https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.KeyboardHandler/)).

#### `scrollZoom`: boolean | Object {#scrollzoom}

Default: `true`

If `true`, the "scroll to zoom" interaction is enabled. Optionally accpt an object value that is the options to `ScrollZoomHandler.enable` ([Mapbox](https://docs.mapbox.com/mapbox-gl-js/api/handlers/#scrollzoomhandler#enable) | [Maplibre](https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.ScrollZoomHandler/#enable))

#### `touchPitch`: boolean | Object {#touchpitch}

Default: `true`

If `true`, the "drag to pitch" interaction is enabled. Optionally accpt an object value that is the options to `TouchPitchHandler.enable`([Mapbox](https://docs.mapbox.com/mapbox-gl-js/api/handlers/#touchpitchhandler) | [Maplibre](https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.TwoFingersTouchPitchHandler/#enable)).

#### `touchZoomRotate`: boolean | Object {#touchzoomrotate}

Default: `true`

If `true`, the "pinch to rotate and zoom" interaction is enabled. Optionally accpt an object value that is the options to `TouchZoomRotateHandler.enable` ([Mapbox](https://docs.mapbox.com/mapbox-gl-js/api/handlers/#touchzoomrotatehandler#enable) | [Maplibre](https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.TwoFingersTouchZoomHandler/#enable)).

#### `interactiveLayerIds`: string[] {#interactivelayerids}

Default: `null`

The id(s) of style layer(s).

If specified, pointer event (`mousemove`, `click` etc.) listeners will be triggered only if its location is within a visible feature in these layers, and the event will have a `features` property containing an array of the matching features.

If not specified, pointer event listeners will be triggered by a corresponding event happening anywhere on the map, and the event will not have a `features` property.

See the [Callbacks](#callbacks) section for affected events.

### Callbacks

#### `onResize`: (event: [MapEvent](./types.md#mapevent)) => void {#onresize}

Called when the map has been resized.

#### `onLoad`: (event: [MapEvent](./types.md#mapevent)) => void {#onload}

Called after all necessary resources have been downloaded and the first visually complete rendering of the map has occurred.

#### `onRender`: (event: [MapEvent](./types.md#mapevent))) => void {#onrender}

Called whenever the map is drawn to the screen.

#### `onIdle`: (event: [MapEvent](./types.md#mapevent))) => void {#onidle}

Called after the last frame rendered before the map enters an "idle" state:

- No camera transitions are in progress
- All currently requested tiles have loaded
- All fade/transition animations have completed

#### `onRemove`: (event: [MapEvent](./types.md#mapevent))) => void {#onremove}

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

The following props, along with any options of the `Map` class ([Mapbox](https://docs.mapbox.com/mapbox-gl-js/api/map/) | [Maplibre](https://maplibre.org/maplibre-gl-js-docs/api/map/)) not listed above, can be specified to construct the underlying `Map` instance.

Note: props in this section are not reactive. They are only used once when the Map instance is constructed.

#### `mapLib`: any {#maplib}

Default:

- `import('mapbox-gl')` if imported from `react-map-gl`
- `import('maplibre-gl')` if imported from `react-map-gl/maplibre`

Specify the underlying base map library for the Map component. The value can be provided with several options:

By module import (and embedding in the final bundle):

```tsx
import * as React from 'react';
import Map from 'react-map-gl';
import mapboxgl from 'mapbox-gl';

function App() {
  return <Map mapLib={mapboxgl} />;
}
```

By dynamic import (thus enable bundle splitting):

```tsx
import * as React from 'react';
import Map from 'react-map-gl';

function App() {
  return <Map mapLib={import('mapbox-gl')} />;
}
```

Or to load a pre-bundled version of the library:

```html title="index.html"
<script src="https://api.mapbox.com/mapbox-gl-js/v2.4.0/mapbox-gl.js"></script>
```

```tsx title="app.tsx"
import * as React from 'react';
import Map from 'react-map-gl';

function App() {
  return <Map mapLib={window.mapboxgl} />;
}
```

#### `mapboxAccessToken`: string {#mapboxaccesstoken}

Token used to access the Mapbox data service. See [about map tokens](../get-started/mapbox-tokens.md).

#### `baseApiUrl`: string {#baseapiurl}

The map's default API URL for requesting tiles, styles, sprites, and glyphs.

#### `maxParallelImageRequests`: number {#maxparallelimagerequests}

Default: `16`

The maximum number of images (raster tiles, sprites, icons) to load in parallel.

#### `reuseMaps`: boolean {#reusemaps}

Default: `false`

By default, every time a map component is unmounted, all internal resources associated with the underlying `Map` instance are released. If the map gets mounted again, a new `Map` instance is constructed.

If `reuseMaps` is set to `true`, when a map component is unmounted, the underlying `Map` instance is retained in memory. The next time a map component gets mounted, the saved instance is reused. This behavior may be desirable if an application frequently mounts/unmounts map(s), for example in a tabbed or collapsable UI, and wants to avoid Mapbox's [billable events](https://github.com/mapbox/mapbox-gl-js/releases/tag/v2.0.0) triggered by initialization.

Note that since some map options cannot be modified after initialization, when reusing maps, only the reactive props and `initialViewState` of the new component are respected.

#### `RTLTextPlugin`: string | false {#rtltextplugin}

Default: `'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js'`

Sets the map's [RTL text plugin](https://www.mapbox.com/mapbox-gl-js/plugins/#mapbox-gl-rtl-text). Necessary for supporting the Arabic and Hebrew languages, which are written right-to-left.

Setting this prop is the equivalent of calling [mapboxgl.setRTLTextPlugin](https://docs.mapbox.com/mapbox-gl-js/api/properties/#setrtltextplugin) with `lazy: true`. Set to `false` to disable loading the RTL text plugin.

#### `workerClass`: object {#workerclass}

Default: `null`

Provides an interface for external module bundlers such as Webpack or Rollup to package mapbox-gl's WebWorker into a separate class and integrate it with the library.
Takes precedence over `workerUrl`.

#### `workerCount`: number {#workercount}

Default: `2`

The number of web workers instantiated on a page with mapbox-gl maps.

#### `workerUrl`: string {#workerurl}

Provides an interface for loading mapbox-gl's WebWorker bundle from a self-hosted URL. This is useful if your site needs to operate in a strict CSP (Content Security Policy) environment wherein you are not allowed to load JavaScript code from a Blob URL, which is default behavior.

## Methods

Imperative methods are accessible via a [React ref](https://reactjs.org/docs/refs-and-the-dom.html#creating-refs) or the [useMap](./use-map.md) hook.

<Tabs groupId="map-library">
  <TabItem value="mapbox" label="Mapbox">

```tsx
import * as React from 'react';
import {useRef, useCallback} from 'react';
import Map from 'react-map-gl';
import type {MapRef} from 'react-map-gl';

function App() {
  const mapRef = useRef<MapRef>();

  const onMapLoad = useCallback(() => {
    mapRef.current.on('move', () => {
      // do something
    });
  }, []);

  return <Map ref={mapRef} onLoad={onMapLoad} ... />;
}
```

  </TabItem>
  <TabItem value="maplibre" label="Maplibre">

```tsx
import * as React from 'react';
import {useRef, useCallback} from 'react';
import Map from 'react-map-gl/maplibre';
import type {MapRef} from 'react-map-gl/maplibre';

function App() {
  const mapRef = useRef<MapRef>();

  const onMapLoad = useCallback(() => {
    mapRef.current.on('move', () => {
      // do something
    });
  }, []);

  return <Map ref={mapRef} onLoad={onMapLoad} ... />;
}
```

  </TabItem>
</Tabs>

The [MapRef](./types.md#mapref) object exposes Map methods ([Mapbox](https://docs.mapbox.com/mapbox-gl-js/api/map/#map-instance-members) | [Maplibre](https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.Map/#methods)) that **are safe to call without breaking the React bindings**. For example, `setStyle()` is hidden from the ref object, because the style is supposed to be changed by updating the `mapStyle` prop. Calling the method directly may cause the the React prop to mismatch with the underlying state, and lead to unexpected behaviors.

You can still access the hidden members via `getMap()`:

#### `getMap()` {#getmap}

Returns the native `Map` ([Mapbox](https://docs.mapbox.com/mapbox-gl-js/api/map/) | [Maplibre](https://maplibre.org/maplibre-gl-js-docs/api/map/)) instance associated with this component.

## Source

[map.tsx](https://github.com/visgl/react-map-gl/tree/7.0-release/src/components/map.tsx)
