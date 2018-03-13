# CHANGELOG

# Version 3.2.5

- Add null check to BaseControl ref callback (#479)
- Manually bind methods (#463)

# Version 3.2.4

- mapbox-gl 0.44.0
- Fix `reuseMap` option
- Add showZoom and showCompass options (#448)


### 3.2.3 (February 9, 2018)
- FIX: reuseMaps function - reparenting child nodes when reusing the saved map

### 3.2.2 (February 5, 2018)

- FIX: `getMap()` crashes if map is unmounted (#454)
- NEW: `showZoom` and `showCompass` props to NavigationControl (#448)
- FIX: projection alignment bug when resizing (#455)

### 3.2.1 (January 26, 2018)

- Include dist-es6 in published npm files (#447)

### 3.2.0 (January 10, 2018)

- mapbox-gl 0.42.2
- Viewport transition: feature equivalent to Mapbox's flyTo and easeTo; smooth transition when using keyboard navigation or the NavigationControl. Add new props `transitionDuration`, `transitionInterpolator`, `transitionEasing`, `transitionInterruption`, `onTransitionStart`, `onTransitionInterrupt`, `onTransitionEnd`
- Navigation using keyboard and the navigation control matches Mapbox behavior, including smooth transition when zooming and panning.
- Touch rotate support: new props of InteractiveMap `touchZoom` and `touchRotate`
- Expose Mapbox's `transformRequest` API
- Map Reuse (experimental): A new property `reuseMaps` is provided for applications that create and destroy maps, to help work around a mapbox-gl resource leak issue that can lead to a browser crash in certain situations.

# Version 3.1

### 3.1.1 (October 20, 2017)

- FIX: custom events in MapControls

### 3.1.0 (October 19, 2017)

- Add right mouse button click & drag to rotate
- Allow controls and overlays to block map interactions
- Extend control elements with custom classNames
- Bump Mapbox to 0.40.1
- StaticMap: Based on new Mapbox wrapper that supports reuse of mapbox maps
- StaticMap: Renders HTML mapbox token warning if no token supplied
- StaticMap: Remaining style diffing utils broken out


# Version 3.0

## Version 3.0.5 (October 03, 2017)

- FIX: missing `babel-runtime` module at runtime
- FIX: interaction when map is scaled by CSS transform

## Version 3.0.4 (August 08, 2017)

Add babel transform-runtime to es5 build for IE11 support.

## Version 3.0.3 (August 01, 2017)

- `v3.0.2` skipped because of faulty publish
- FIX: unbound `this` in ref callback for canvas-overlay (#337)

## Version 3.0.1 (July 27, 2017)

- FIX: pinch zoom
- FIX: wheel scrolling is blocked when onViewportChange is null

## Version 3.0.0 (July 27, 2017)

This is a major release of the library. For more information, please see [What's new](https://github.com/uber/react-map-gl/blob/3.0-release/docs/whats-new.md) in latest documentation.

## Version 2.0.2 (Feb 09, 2017)

### Minor Fixes

- Changed `postinstall` script again to use postinstall.js to run
  flow-remove-types. This attempts to resolve cross-platform issues. (#192)

## Version 2.0.1 (Jan 24, 2017)

### Minor Fixes

- Fixed calculation of map pitch during interaction
- Changed `postinstall` script

## Version 2.0.0 (Jan 17, 2017)

### Reasons for the major version bump

- We updated to `mapbox-gl` 0.31.0 which introduced flow types as well as having
  a hard dependency on Node >= v4. We now assume that you are on Node >= v4
  and npm >= v3.
- We want >= v2.0.0 of `react-map-gl` to continue tracking `mapbox-gl` updates
  as closely as possible. This means minor / patch updates will be published
  more frequently.
- This also marks the start of more aggressive development on `react-map-gl`
  and we will start rolling out bigger updates in the coming months.

### New Features & Updates

- Bump `mapbox-gl` to v0.31.0
- Add `maxZoom` prop and defaults to `20`
- Add `onLoad` event handler
- Add `onClick` prop handler (#140)

### Fixes

- Ensure fitBounds doesn't return NaN zoom value (#159)
- Use 'changedTouches' for 'touchend' / 'touchcancel' events (#164)
- Typo fix in draggable-points overlay (#178)
- Remove mapbox-gl's `Point` dependency from map-interactions. (#161)

### Miscellaneous

- Added more info about usage with Webpack in README

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



# Beta Releases

## v3.1 Beta Releases

### Version 3.1.0-alpha.1
- React 16 preliminary integration.


## v3.0 Beta Releases

### Version 3.0.0-beta.3
- Fix: viewport misalignment with Mapbox at low zoom levels

### Version 3.0.0-beta.2
- Fix: scroll zoom with touch does not block page scrolling
- Fix: feature lookup error when child components are rendered with error

### Version 3.0.0-beta.1

- WEBSITE: Polish docs
- WEBSITE: Add links to other libraries
- WEBSITE: babel config fix

### Version 3.0.0-alpha.15
- update event manager (#283)
- Fix: Event Manager update fixes an issue where `scrollZoom` disabled will also
consume the scroll event preventing the page from scrolling.
- Fix: breakage on node (#292)
- BREAKING: `fitBounds` is now accessed through the `PerspectiveMercatorViewport` class
- BREAKING: `react-map-gl` now requires **at least** Node `>=v6.4` in development
- New: `SVGOverlay` `CanvasOverlay` and `HTMLOverlay` supports perspective mode; no longer requires viewport props

### Version 3.0.0-alpha.14
- BREAKING: Remove `fitBounds` util (#278)
- Updated to `mapbox-gl-js` version `0.38.0` (#285)
- Update overlays code and documentation (#282)
- Fix: Compass arrow in navigation control (#277)

### Version 3.0.0-alpha.13
- New: Add new examples (#270)
- Fix: Add `onLoad` callback to static map props and componentDidMount (#269)
- Fix: Change `pan` event listener to move specific `panmove` (#272)

### Version 3.0.0-alpha.12
- Bump mapbox-gl to 0.37.0
- New: `fitBounds` util function
- Fix: Map flickering when drag over popups
- BREAKING: `onChangeViewport` is now `onViewportChange`

### Version 3.0.0-alpha.11
- New event management system based on hammer.js
- FIX: Touch interaction
- Remove `MapControls` React component
- Remove `ControllerClass` prop from `InteractiveMap`
- Add `mapControls` prop to `InteractiveMap`
- Add `visibility` prop to `StaticMap` for showing/hiding the map
- Rename `_getMap` method to `getMap`
- Add `queryRenderedFeatures` method that exposes the MapboxGL API with the same name
- Remove all interactivity related props from `StaticMap`
- Remove intermediate state props from `InteractiveMap`: `startPanLngLat`, `startZoomLngLat`, `startBearing`, `startPitch`, `startZoom`.
- `InteractiveMap` is now stateful (`isDragging` and `isHover`)
- Rename `onClickFeatures` and `onHoverFeatures` to `onClick` and `onHover`. Remove `ignoreEmptyFeatures` prop. The callbacks are invoked with an event object with `features` and `lngLat` fields.
- New `getCursor` prop of `InteractiveMap`: returns cursor style from the current map state
- Rename `displayConstraints` to `visibilityConstraints`
- Remove `perspectiveEnabled` prop. Add `scrollZoom`, `dragPan`, `dragRotate`, `doubleClickZoom`, `touchZoomRotate` props.

### Version 3.0.0-alpha.10 - Add `ControllerClass` prop to `InteractiveMap`

### Version 3.0.0-alpha.9
- NEW: Marker component
- NEW: Popup component
- FIX: `attributeControl` prop
- NEW: NavigationControl component

### Version 3.0.0-alpha.8 - Fix server side rendering of InteractiveMap

### Version 3.0.0-alpha.7 - Bug fixes

* FIX: Prop comparison bug in static map
* FIX: Children get unmounted/re-mounted when the map is shown/hidden

### Version 3.0.0-alpha.6 - Bug fixes

* FIX: Viewport jump at start of rotation with pitch
* FIX: Viewport jump at start of pan with pitch
* FIX: Zoom around mouse position

### Version 3.0.0-alpha.5 - Add `pressKeyToRotate` prop on `MapControls`
### Version 3.0.0-alpha.4 - More transpile/export fixes
### Version 3.0.0-alpha.3 - Transpile/export fixes
### Version 3.0.0-alpha.3 - Remove JSX from overlays
### Version 3.0.0-alpha.2 - Hide map when pitch > 60.

## Version 3.0.0-alpha.1 - Major New Rlease

* NEW: Supports "tree-shaking" in Webpack2 and Rollup - adds new package.json
  `module` field that points to files with preserved ES6 import/exports.
* NEW: Significant reduction in number of npm dependencies.

* NEW: Setting the new `pressKeyToRotate` prop to `false` will make rotation
  rather than pan the default operation, requiring a function key to be pressed
  for pan.
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
