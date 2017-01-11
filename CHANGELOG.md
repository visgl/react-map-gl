# Development Releases

## Version 2.0.0-alpha.1

* NEW: Supports "tree-shaking" in Webpack2 and Rollup - adds new package.json
  `module` field that points to files with preserved ES6 import/exports.
* NEW: Significant reduction in number of npm dependencies.

* BREAKING: The `ChoroplethOverlay` React component is no longer part of the
  exported library. It has been moved to examples folder, applications that
  still need it can copy it from there instead of importing it directly.
  Removing `ChoroplethOverlay` eliminated a number of big D3 dependencies from
  react-map-gl, which seemed like the right tradeoff since most users are using
  mapbox styles or deck.gl layers for Choropleths.

### Event Handling Refactor

* Event handling (Pan/Zoom/Tilt) has been significantly refactored, and is
  now handled by a separate component (`MapControls`).
* A new `StaticMap` component is the actual `mapbox-gl` wrapper. It only
  handles click and hover events.
* The separation of event handling from the map component opens up some
  interesting use cases, including creating apps that can modify viewports
  beyond mapbox' rendering limits and using the `MapControls` with
  non-mapbox maps.

### Compatibility with v1

* A new `InteractiveMap` is provided, that uses the `MapControls` component
  to add pan/zoom/title to `StaticMap`. `InteractiveMap` closely resembles
  the original `MapGL` component from version 1 and is the default export
  of `react-map-gl` in v2. `react-map-gl` should thus be API compatible with
  v1 in most cases, although there might be subtle differences in how events
  are handled.


# Version 1.X Series Releases

## Version 1.7.2
* Use any one of the function keys {command, shift, ctrl, alt} to enable the
  perspective mode.

## Version 1.7.1
* Bump Mapbox version to 0.26

## Version 1.7.0

* Provide a way to control per-layer interactivity - onClickFeatures and
  onHoverFeatures have the option to only query selected layers. Enabled by
  setting the `interactive` property to `true` in layer styles. (#131)

* Fix bug where onClickFeatures is fired after panning/rotating (#133)

## Version 1.6.1

* Hotfix: GeoJSON style support issue with mapbox-gl 0.24.0

## Version 1.6.0

* Reduced flicker when updating GeoJSON sources in styles - (Thanks @tsemerad)
  Covers certain cases, for more info see #124)
* `MapGL.supported()` - New function which calls mapbox-gl's `supported()`.
  Enables applications to detect unsupported browsers and avoid rendering
  the react-map-gl, for graceful recovery or error handling.
* Bumps mapbox-gl dependency to 0.24.0.
* Cursor now changes to pointer over interactive features
* Fix grab cursor in recent Chrome browsers

## Version 1.5.0

* Add touch support (Thanks @cammanderson)

## Version 1.4.2

* Remove alphaify dependency due to peerDependency issues

## Version 1.4.1

* Bumped `alphaify` dependency to avoid pulling in d3 v3 as sub-dependency
* Added test case for `fitBounds`

## Version 1.4.0

* Bump d3 to v4, replaces monolithic d3 dependency with specific d3 submodules.

## Version 1.3.0

* Added `clickRadius` prop to allow for customization of hitbox around clicked point

## Version 1.2.0

* Add `fitBounds`

## Version 1.1.1

* Update mapbox-gl from v0.21.0 (from v0.20.0)

## Version 1.0.0

### New Feature: Perspective Mode

* Now supports `bearing` and `pitch` properties, per mapbox-gl-js api
  documentation. These props default to 0 which means that maps will still
  be rendered in flat/ortographic mode when they are not provided.
* Setting the `perspectiveEnabled` prop to true enables a perspective control
  mode (Command-Drag) allowing the user to change perspective.

**Limitations:** The existing overlays (HTMLOverlay, CanvasOverlay,
  SVGOverlay etc) do not currently support perspective mode.
  For a set of overlays that do support perspective mode, see
  [deck.gl](https://github.com/uber/deck.gl)

Note: The map state reported by onViewportChanged may now contain additional
state fields (tracking not only pitch and bearing, but also transient
information about how the projection is being changed by the user).
To simplify and future proof applications,
it is recommended to simply save the entire mapState in your app store
whenever it changes and then pass it back to the component rather than
trying to keep track of individual fields (More info in README.md).

Note 2: A utility for calculating projections and projection matrices based
on props that include pitch and bearing will be provided separately.
In the mean-time, `ViewportMercatorProject` still works
for non-perspective maps.

### Internal change: Transpiled ES6 code base

* The code base has been updated to ES6+ and is now transpiled back to ES5
  before being published on npm.

### Breaking Change: Layer Imports

* The map overlay components (HTMLOverlay, CanvasOverlay, SVGOverlay etc)
  previously had to be imported via their relative source paths (e.g.
  `import SVGOverlay from 'react-map-gl/src/overlays/svg-overlays';`).
  These files still exist, but have now be rewritten in ES6+ which will
  not work for most applications.
  Instead the various Layers components are now exported as additional
  named exports from the module, and can be accessed using
  "desctructuring" imports:
```
import MapGL, {SVGOverlay} from 'react-map-gl';
```
or
```
var MapGL = require(`react-map-gl`);
var SVGOverlay = MapGL.SVGOverlay;
```

### Breaking Change: fitBounds has been removed

The previously exported `fitbounds` function will be made available
as part of the separate package of utilities that handles coordinate
projections in perspective mode.
