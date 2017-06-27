# react-map-gl v3.0

Release date: End of Q2, 2017 (TBD)

## Highlights

- **Node Version Requirement** is now **>=v6.4.0**: This is introduced in [Mapbox GL JS v0.38.0](https://github.com/mapbox/mapbox-gl-js/releases/tag/v0.38.0)
- **Event Handling**: New event handling architecture that enables full customization of event handling (experimental).
- **Multi-Touch Support**: Full support for multi-touch gestures such as pinch-to-zoom and rotate.
- **New Components**:  `Popup`, `Marker`, `NavigationControl` have been added to provide parity with `Mapbox GL JS`.
`StaticMap` is also added, which provides a static React wrapper around a `mapbox` instance.
- **Documentation**: Significantly expanded and linked with our other geospatial frameworks.
- **Examples**: Additional stand-alone examples to get you instantly started with new features.
- **Latest Mapbox GL JS**: Bumps `Mapbox GL JS` to the [latest version](https://github.com/mapbox/mapbox-gl-js/releases) and enables us to stay in sync with future versions.
- **Improved overlay components**: Vi ewport props (`width` `height` `zoom` `longitude` and `latitude`) are no longer required if you render `SVGOverlay` `CanvasOverlay` or `HTMLOverlay` as a child of the map. Perspective mode is now supported in all overlays.

## New Props

##### `{Bool} visible`: exposed on `StaticMap`
Allows control visibility of the map component. This uses CSS's `display` property internally.

##### `{Func} getCursor`: exposed on `InteractiveMap` to determine the current cursor.
See [Source Code](https://github.com/uber/react-map-gl/blob/master/src/components/interactive-map.js#L97)
for more information.

##### `{Number} maxPitch, {Number} minPitch`: exposed on `InteractiveMap`
Set the minimum and maximum allowed pitch.

##### `{Bool} dragPan`: exposed on `InteractiveMap`
Set panning. Defaults to `true`.

##### `{Bool} doubleClickZoom`: exposed on `InteractiveMap`
Set double clicking to zoom. Defaults to `true`.

##### `{Bool} touchZoomRotate`: exposed on `InteractiveMap`
Set touch interaction. Defaults to `true`.

##### `{Object} mapControls`: exposed on `InteractiveMap`
A map control instance to replace the default map controls.
The object must expose one property: `events` as an array of subscribed
event names; and two methods: `setState(state)` and `handle(event)`
See [Source Code](https://github.com/uber/react-map-gl/blob/master/src/components/interactive-map.js#L88)
for more information

## Experimental Props

##### `{Object} visibilityConstraints`: exposed on `InteractiveMap`
A set of constraints to keep map visible. This automatically takes care of toggling
`visible` on the `StaticMap` layer underneath. See
[Source Code](https://github.com/uber/react-map-gl/blob/master/src/components/interactive-map.js#L79)
for more information.

## New API

- `queryRenderedFeatures`: exposed on `StaticMap` and `InteractiveMap`

## Deprecations

- **Property Names** - some prop names have been modernized, the old ones will still work for now with a warning.
- **Internal Properties** such as `isHovering` and `isDragging` have been removed.
These were never meant to be useful publicly and have caused confusions in the past.

## Breaking Changes

- **Overlay Support** - Three overlays (`ScatterplotOverlay`, `DraggablePointsOverlay`, `ChoroplethOverlay`), ... are now only provided as examples.
- **fitBounds**: `fitBounds` has  been rewritten to provide a better interface.

For more information, see `Upgrade Guide`.


# react-map-gl v2.0

Date: Jan 17, 2017

## Highlights
- **Latest mapbox-gl**: Bump `mapbox-gl` to v0.31.0
- **new maxZoom prop** - Add `maxZoom` prop and defaults to `20`
- **New onLoad prop** - Add `onLoad` event handler
- **new onClick prop** - Add `onClick` prop handler (#140)

## Breaking Changes

- **Node version bump** `react-map-gl` now requires that you are on Node >= v4 and npm >= v3.


# react-map-gl v1.0

* **Perspective Mode** - Now supports `bearing` and `pitch` properties, per mapbox-gl-js api documentation. These props default to 0 which means that maps will still be rendered in flat/ortographic mode when they are not provided
* **Support for ES6 imports** - The map overlay components (HTMLOverlay, CanvasOverlay, SVGOverlay etc) previously had to be imported via their relative source paths can now be imported directly using `import {SVGOverlay} from 'react-map-gl'.


# react-map-gl v0.6

Initial public version
