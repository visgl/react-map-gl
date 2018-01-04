# react-map-gl v3.2

Realease date: January, 2018

## Highlights

- **Viewport transition**: feature equivalent to Mapbox's flyTo and easeTo; smooth transition when using keyboard navigation or the NavigationControl.
- **Better parity of Mapbox interaction**: navigation using keyboard and the navigation control matches Mapbox behavior, including smooth transition when zooming and panning.
- **mapbox-gl 0.42.2**
- **New props** of the InteractiveMap component:
  + Map creation: `transformRequest`
  + Interaction: `touchZoom`, `touchRotate`
  + Transition: `transitionDuration`, `transitionInterpolator`, `transitionEasing`, `transitionInterruption`, `onTransitionStart`, `onTransitionInterrupt`, `onTransitionEnd`

# react-map-gl v3.1

Release date: October 19, 2017

## Highlights

- **Event handling**
  + Support right mouse drag to rotate
  + Support keyboard navigation
  + Allow controls and overlays to block map interactions
- **React 16** - react-map-gl is now being tested with React 16, but the React peer dependency requirement is unchanged at `>=15.4.x`.
- **mapbox-gl v0.40.1**
- **No Token warning**: react-map-gl now renders an HTML message if no mapbox token is supplied.


# react-map-gl v3.0

Release date: July 27th, 2017

## Highlights

- **Latest Mapbox GL JS**: Bumps `Mapbox GL JS` to [0.38](https://github.com/mapbox/mapbox-gl-js/releases).
- **Multi-Touch Support**: Full support for multi-touch gestures such as pinch-to-zoom and rotate.
- **New Components**: The `MapGL` component has been split into [`StaticMap`](/#/Documentation/api-reference/static-map) and [`InteractiveMap`](/#/Documentation/api-reference/interactive-map) (the default). Also, [`Popup`](/#/Documentation/api-reference/popup), [`Marker`](/#/Documentation/api-reference/marker), [`NavigationControl`](/#/Documentation/api-reference/navigation-control) have been added to provide better React parity with the `Mapbox GL JS` API.
- **Improved Overlay Components**: Supplying viewport props (`width` `height` `zoom` `longitude` and `latitude`) are no longer required if you render [`SVGOverlay`](/#/Documentation/api-reference/svg-overlay), [`CanvasOverlay`](/#/Documentation/api-reference/canvas-overlay) or [`HTMLOverlay`](/#/Documentation/api-reference/html-overlay) as a child of the map. Perspective mode is now supported in all overlays.
- **New Props**: `maxPitch`, `minPitch`, `dragPan`, `doubleClickZoom`, `touchZoomRotate`,
`scrollZoom` are now provided to allow granular control of map interactivity.
- **Documentation**: Significantly expanded and linked with our other geospatial frameworks.
- **Examples**: New stand-alone examples to get you started instantly with the new features.
- **Event Handling**: New event handling architecture that enables full customization of event handling (experimental).

## Components

### [InteractiveMap (New, MapGL replacement)](/#/Documentation/api-reference/interactive-map)

This is a wrapper on top of `StaticMap`. It takes all the props of `StaticMap` and additional ones such as `onViewportChange`, `scrollZoom`, `dragRotate`, etc. to control interactivity on the map. See [Source Code](https://github.com/uber/react-map-gl/blob/master/src/components/interactive-map.js) for more information.

### [StaticMap (New)](/#/Documentation/api-reference/static-map)

This is the React wrapper around `Mapbox GL JS` and takes in viewport properties such as `width`, `height`, `latitude`, `longitude`. Style diffing and updating logic also live here. See [Source Code](https://github.com/uber/react-map-gl/blob/master/src/components/static-map.js) for more information.

### Overlays

* Three overlays (`ScatterplotOverlay`, `DraggablePointsOverlay`, `ChoroplethOverlay`), have been moved out of the library and are now only provided as examples.

## Property Changes

- **Property Names** - some prop names have been modernized, the old ones will still work for now with a warning.
- **Internal Properties** such as `isHovering`, `isDragging`, `startDragLngLat` have been removed.
These were never meant to be useful publicly and have caused confusions in the past.

## Utilities

* **fitBounds**: `fitBounds` has been moved to another repository and has been rewritten to provide a more logical interface.

For more information, see the `Upgrade Guide`.


# react-map-gl v2.0

Date: Jan 17, 2017

## Highlights
- **Latest mapbox-gl**: Bump `mapbox-gl` to v0.31.0
- **new maxZoom prop** - Add `maxZoom` prop and defaults to `20`
- **New onLoad prop** - Add `onLoad` event handler
- **new onClick prop** - Add `onClick` prop handler (#140)


# react-map-gl v1.0

* **Perspective Mode** - Now supports `bearing` and `pitch` properties, per mapbox-gl-js api documentation. These props default to 0 which means that maps will still be rendered in flat/ortographic mode when they are not provided
* **Support for ES6 imports** - The map overlay components (HTMLOverlay, CanvasOverlay, SVGOverlay etc) previously had to be imported via their relative source paths can now be imported directly using `import {SVGOverlay} from 'react-map-gl'.


# react-map-gl v0.6

Initial public version
