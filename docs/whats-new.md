# What's new

## react-map-gl v8.0

Release date: Jan 2025

- First version to support Mapbox GL JS' official types and MapLibre GL JS v5.
  This version fully separates the code that support each compatible map library:
  + `react-map-gl/mapbox`: for use with `mapbox-gl>=3.5.0`
  + `react-map-gl/maplibre`: for use with `maplibre-gl>=4`
  + `react-map-gl/mapbox-legacy`: for use with `mapbox-gl` v1.x and v2.x and `@types/mapbox-gl`
- As a result, each endpoint now have slightly smaller bundle size and more precise types.
- Maplibre wrapper is expected to have better functionality and performance than v7 by utilizing an [upstream API](https://github.com/maplibre/maplibre-gl-js/issues/1545) for the React use case.

For a full list of breaking changes, please visit the [upgrade guide](./upgrade-guide.md#upgrading-to-v80).

## react-map-gl v7.1

Release date: June 2023

- To better accommodate the API divergence between Mapbox and Maplibre, this version adds a new endpoint `react-map-gl/maplibre`. The new endpoint exports identical components as `react-map-gl`, but typed for `maplibre-gl` instead. After switching to this new endpoint, `maplibre-gl` users no longer need to install `mapbox-gl` or a placeholder package as dependency. See [upgrade guide](./upgrade-guide.md) for an example.
- `Marker`, `Popup` and `GeolocateControl` components now expose the native instance via React ref.

## react-map-gl v7.0

Release date: Feb 4, 2022

v7 is a complete rewrite of the library. It addresses many long-standing issues in v5 and v6 limited by legacy architecture decisions. The most notable results of this redesign are:

- Performance: minimize the overhead of React, offer the same fast and smooth interaction as the native library
- Lightweight: the ESM build size is reduced from 219k to 57k
- Predictability: Components behave the same as their mapbox counterparts. Props are mapped 1:1 from the native options wherever appropriate. Almost all imperative APIs (`flyTo`, `fitBounds` etc.) can now be called directly without breaking the React binding.
- Compatibility: first and third-party plugins! Directly use [mapbox-gl-draw](https://github.com/visgl/react-map-gl/tree/7.0-release/examples/draw-polygon), [mapbox-gl-geocoder](https://github.com/visgl/react-map-gl/tree/7.0-release/examples/geocoder), to name a few.
- TypeScript compliant: the code base is now entirely written in TypeScript, and all types can be [imported](./api-reference/mapbox/types.md).

Visit the [upgrade guide](./upgrade-guide.md) if you are trying to upgrade from v5 and v6.

## react-map-gl v5.3/v6.1

Release date: Jan 27, 2020

### Highlights

- **TypeScript and Flow typings** are now published with the library
- **More controller customizations.** Smooth easing on wheel scroll, three-finger gesture to change pitch, inertia after pan/pinch, and customizable keyboard navigation speed. See the updated [interaction options](https://github.com/visgl/react-map-gl/tree/6.1-release/docs/api-reference/interactive-map.md#interaction-options) for details.
- A new [eventRecognizerOptions](https://github.com/visgl/react-map-gl/tree/6.1-release/docs/api-reference/interactive-map.md#eventrecognizeroptions) prop is added for fine-tuning the interaction experience.
- New component: [AttributionControl](https://github.com/visgl/react-map-gl/tree/6.1-release/docs/api-reference/attribution-control.md)
- Promoted to official API: [MapContext](https://github.com/visgl/react-map-gl/tree/6.1-release/docs/api-reference/map-context.md)
- Resolved React error over attempted state update during render
- `GeolocateControl` added supports for `showAccuracyCircle`
- All controls now support inline styling with a `style` prop
- All components and examples have been rewritten as functional components

## react-map-gl v6.0

Release date: Dec 16, 2020

### What's Changed

The 6.0 release upgrades its Mapbox GL JS dependency to v2.0. There are [important changes](https://github.com/mapbox/mapbox-gl-js/releases/tag/v2.0.0) to mapbox-gl's license and pricing model in this milestone. If you are NOT using a Mapbox account (e.g. self-hosting map tiles), do **NOT** upgrade to this version, and consider your options discussed in [this document](./get-started/mapbox-tokens.md).

See [upgrade guide](./upgrade-guide.md) for a complete list of breaking changes.

## react-map-gl v5.2

Release date: Jan 6, 2020

### Highlights

- **New Components**: [`ScaleControl`](https://github.com/visgl/react-map-gl/tree/5.2-release/docs/api-reference/scale-control.md)
- **NavigationControl**: new `label` prop
- **GeolocateControl**: new `label`, `onGeolocate`, `auto` props
- **New Export**: `WebMercatorViewport` is re-exported from the `viewport-mercator-project` library for ease of use. It's recommended to import it from `react-map-gl` instead to avoid future dependency change.
- **New Example**: [Clusters](https://visgl.github.io/react-map-gl/examples/clusters)

## react-map-gl v5.1

Release date: Oct 30, 2019

### Highlights

- **New Components**: [`Layer`](https://github.com/visgl/react-map-gl/tree/5.1-release/docs/components/layer.md) and [`Source`](https://github.com/visgl/react-map-gl/tree/5.1-release/docs/components/source.md) have been added to provide better React parity with the `Mapbox GL JS` API.
- **Viewport transition**: `transitionDuration` can be set to `'auto'` when using [`FlyToInterpolator`](https://github.com/visgl/react-map-gl/tree/5.1-release/docs/components/fly-to-interpolator.md).
- **New Example**: Add an [example](https://visgl.github.io/react-map-gl/examples/draw-polygon) with drawing library [react-map-gl-draw](https://github.com/uber/nebula.gl/tree/master/modules/react-map-gl-draw).

## react-map-gl v5.0

Release date: May 31, 2019

### What's Changed

The only change between the 5.0 release and the latest 4.1 release is Mapbox GL JS v1.0. By using this version, you opt into Mapbox's new pricing model, which bills per map load instead of map views. 5.0.x and 4.1.x will continue to update in parallel with otherwise identical features until November 2019 when Mapbox moves all users of 0.xx to a new pricing scheme. For more details, see mapbox's [changelog](https://github.com/mapbox/mapbox-gl-js/releases/tag/v1.0.0) and [blog post](https://blog.mapbox.com/new-pricing-46b7c26166e7).

Alongside Mapbox GL JS's new milestone, we have relaxed the `mapbox-gl` dependency from locking minor release (`~0.53.0`) to major release (`^1.0.0`). This will allow developers to upgrade faster without waiting for a new release from react-map-gl.

## react-map-gl v4.1

Release date: Mar 14, 2019

### Highlights

- **New Components**: [`FullscreenControl`](https://github.com/visgl/react-map-gl/tree/4.1-release/docs/components/fullscreen-control.md), [`GeolocateControl`](https://github.com/visgl/react-map-gl/tree/4.1-release/docs/components/geolocate-control.md) have been added to provide better React parity with the `Mapbox GL JS` API.
- **New callback props** `InteractiveMap` supports more callbacks:
  + `onNativeClick`

## react-map-gl v4.0

Release date: Nov 5, 2018

### Highlights

- **Relative dimensions** Both `InteractiveMap` and `StaticMap` now support CSS strings supplied to map `width` and `height` props. New `onResize` callback is fired when the map resizes.
- **React 16** Upgrade to React 16.3 context and ref patterns
- **Babel 7** Upgrade build system to Babel 7, better support for tree-shaking
- **Style diffing** Now use Mapbox's native style diffing. Immutable is no longer required.
- **Draggable Markers** `Marker` component now supports a new prop `draggable`, along with callbacks `onDragStart`, `onDrag`, and `onDragEnd`.
- **3d Popups** `Popup` component now supports a new prop `sortByDepth` to enable proper occlusion when multiple popups are used in a tilted map.
- **Interaction states** `onViewportChange` is now called with richer descriptors of the user interaction, including `isPanning`, `isZooming` and `isRotating`.
- **Interactive layers** Dropped the requirement for the deprecated `interactive` property on the layer styles. Use the `interactiveLayerIds` prop to specify which layers are clickable.
- **New callback props** `InteractiveMap` supports more callbacks:
  + `onDblClick`
  + `onMouseDown`
  + `onMouseMove`
  + `onMouseUp`
  + `onTouchStart`
  + `onTouchMove`
  + `onTouchEnd`
  + `onMouseEnter`
  + `onMouseLeave`
  + `onWheel`
  + `onMouseOut`

See [upgrade guide](./upgrade-guide.md) for breaking changes.

## react-map-gl v3.3

Release date: July, 2018

### Highlights

- **New `viewState` Property**: Makes it possible to specify all map state properties (`longitude`, `latitude`, `zoom`, `bearing` and `pitch`) as a single property.
- **New `onViewStateChange` callback**: An alternative callback that matches the new `viewState` prop.


## react-map-gl v3.2

Realease date: January, 2018

### Highlights

- **Viewport transition**: feature equivalent to Mapbox's flyTo and easeTo; smooth transition when using keyboard navigation or the NavigationControl.
- **Better parity of Mapbox interaction**: navigation using keyboard and the navigation control matches Mapbox behavior, including smooth transition when zooming and panning.
- **Support for Map Reuse (experimental)**: A new property `reuseMaps` is provided for applications that create and destroy maps, to help work around a mapbox-gl resource leak issue that can lead to a browser crash in certain situations.
- **mapbox-gl 0.42.2**
- **New props** of the InteractiveMap component:
  + Map creation: `transformRequest`, `reuseMaps`
  + Interaction: `touchZoom`, `touchRotate`
  + Transition: `transitionDuration`, `transitionInterpolator`, `transitionEasing`, `transitionInterruption`, `onTransitionStart`, `onTransitionInterrupt`, `onTransitionEnd`


## react-map-gl v3.1

Release date: October 19, 2017

### Highlights

- **Event handling**
  + Support right mouse drag to rotate
  + Support keyboard navigation
  + Allow controls and overlays to block map interactions
- **React 16** - react-map-gl is now being tested with React 16, but the React peer dependency requirement is unchanged at `>=15.4.x`.
- **mapbox-gl v0.40.1**
- **No Token warning**: react-map-gl now renders an HTML message if no mapbox token is supplied.


## react-map-gl v3.0

Release date: July 27th, 2017

### Highlights

- **Latest Mapbox GL JS**: Bumps `Mapbox GL JS` to [0.38](https://github.com/mapbox/mapbox-gl-js/releases).
- **Multi-Touch Support**: Full support for multi-touch gestures such as pinch-to-zoom and rotate.
- **New Components**: The `MapGL` component has been split into [`StaticMap`](https://github.com/visgl/react-map-gl/tree/3.0-release/docs/components/static-map.md) and [`InteractiveMap`](https://github.com/visgl/react-map-gl/tree/3.0-release/docs/components/interactive-map.md) (the default). Also, [`Popup`](https://github.com/visgl/react-map-gl/tree/3.0-release/docs/components/popup.md), [`Marker`](https://github.com/visgl/react-map-gl/tree/3.0-release/docs/components/marker.md), [`NavigationControl`](https://github.com/visgl/react-map-gl/tree/3.0-release/docs/components/navigation-control.md) have been added to provide better React parity with the `Mapbox GL JS` API.
- **Improved Overlay Components**: Supplying viewport props (`width` `height` `zoom` `longitude` and `latitude`) are no longer required if you render [`SVGOverlay`](https://github.com/visgl/react-map-gl/tree/3.0-release/docs/overlays/svg-overlay.md), [`CanvasOverlay`](https://github.com/visgl/react-map-gl/tree/3.0-release/docs/overlays/canvas-overlay.md) or [`HTMLOverlay`](https://github.com/visgl/react-map-gl/tree/3.0-release/docs/overlays/html-overlay.md) as a child of the map. Perspective mode is now supported in all overlays.
- **New Props**: `maxPitch`, `minPitch`, `dragPan`, `doubleClickZoom`, `touchZoomRotate`,
`scrollZoom` are now provided to allow granular control of map interactivity.
- **Documentation**: Significantly expanded and linked with our other geospatial frameworks.
- **Examples**: New stand-alone examples to get you started instantly with the new features.
- **Event Handling**: New event handling architecture that enables full customization of event handling (experimental).

### Components

#### [InteractiveMap (New, MapGL replacement)](https://github.com/visgl/react-map-gl/tree/3.0-release/docs/components/interactive-map.md)

This is a wrapper on top of `StaticMap`. It takes all the props of `StaticMap` and additional ones such as `onViewportChange`, `scrollZoom`, `dragRotate`, etc. to control interactivity on the map. See [Source Code](https://github.com/visgl/react-map-gl/tree/7.0-release/src/components/interactive-map.js) for more information.

#### [StaticMap (New)](https://github.com/visgl/react-map-gl/tree/3.0-release/docs/components/static-map.md)

This is the React wrapper around `Mapbox GL JS` and takes in viewport properties such as `width`, `height`, `latitude`, `longitude`. Style diffing and updating logic also live here. See [Source Code](https://github.com/visgl/react-map-gl/tree/7.0-release/src/components/static-map.js) for more information.

#### Overlays

* Three overlays (`ScatterplotOverlay`, `DraggablePointsOverlay`, `ChoroplethOverlay`), have been moved out of the library and are now only provided as examples.

### Property Changes

- **Property Names** - some prop names have been modernized, the old ones will still work for now with a warning.
- **Internal Properties** such as `isHovering`, `isDragging`, `startDragLngLat` have been removed.
These were never meant to be useful publicly and have caused confusions in the past.

### Utilities

* **fitBounds**: `fitBounds` has been moved to another repository and has been rewritten to provide a more logical interface.

For more information, see the `Upgrade Guide`.


## react-map-gl v2.0

Date: Jan 17, 2017

### Highlights
- **Latest mapbox-gl**: Bump `mapbox-gl` to v0.31.0
- **new maxZoom prop** - Add `maxZoom` prop and defaults to `20`
- **New onLoad prop** - Add `onLoad` event handler
- **new onClick prop** - Add `onClick` prop handler (#140)


## react-map-gl v1.0

* **Perspective Mode** - Now supports `bearing` and `pitch` properties, per mapbox-gl api documentation. These props default to 0 which means that maps will still be rendered in flat/ortographic mode when they are not provided
* **Support for ES6 imports** - The map overlay components (HTMLOverlay, CanvasOverlay, SVGOverlay etc) previously had to be imported via their relative source paths can now be imported directly.


## react-map-gl v0.6

Initial public version
