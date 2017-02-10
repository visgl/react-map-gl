## Version 2.0.2 (Feb 09, 2017)

#### Minor Fixes

- Changed `postinstall` script again to use postinstall.js to run
  flow-remove-types. This attempts to resolve cross-platform issues. (#192)

## Version 2.0.1 (Jan 24, 2017)

#### Minor Fixes

- Fixed calculation of map pitch during interaction
- Changed `postinstall` script

## Version 2.0.0 (Jan 17, 2017)

#### Reasons for the major version bump

- We updated to `mapbox-gl` 0.31.0 which introduced flow types as well as having
  a hard dependency on Node >= v4. We now assume that you are on Node >= v4
  and npm >= v3.
- We want >= v2.0.0 of `react-map-gl` to continue tracking `mapbox-gl` updates
  as closely as possible. This means minor / patch updates will be published
  more frequently.
- This also marks the start of more aggressive development on `react-map-gl`
  and we will start rolling out bigger updates in the coming months.

#### New Features & Updates

- Bump `mapbox-gl` to v0.31.0
- Add `maxZoom` prop and defaults to `20`
- Add `onLoad` event handler
- Add `onClick` prop handler (#140)

#### Fixes

- Ensure fitBounds doesn't return NaN zoom value (#159)
- Use 'changedTouches' for 'touchend' / 'touchcancel' events (#164)
- Typo fix in draggable-points overlay (#178)
- Remove mapbox-gl's `Point` dependency from map-interactions. (#161)

### Miscellaneous

- Added more info about usage with Webpack in README

# Version 1.7.2
* Use any one of the function keys {command, shift, ctrl, alt} to enable the
  perspective mode.

# Version 1.7.1
* Bump Mapbox version to 0.26

# Version 1.7.0

* Provide a way to control per-layer interactivity - onClickFeatures and
  onHoverFeatures have the option to only query selected layers. Enabled by
  setting the `interactive` property to `true` in layer styles. (#131)

* Fix bug where onClickFeatures is fired after panning/rotating (#133)

# Version 1.6.1

* Hotfix: GeoJSON style support issue with mapbox-gl 0.24.0

# Version 1.6.0

* Reduced flicker when updating GeoJSON sources in styles - (Thanks @tsemerad)
  Covers certain cases, for more info see #124)
* `MapGL.supported()` - New function which calls mapbox-gl's `supported()`.
  Enables applications to detect unsupported browsers and avoid rendering
  the react-map-gl, for graceful recovery or error handling.
* Bumps mapbox-gl dependency to 0.24.0.
* Cursor now changes to pointer over interactive features
* Fix grab cursor in recent Chrome browsers

# Version 1.5.0

* Add touch support (Thanks @cammanderson)

# Version 1.4.2

* Remove alphaify dependency due to peerDependency issues

# Version 1.4.1

* Bumped `alphaify` dependency to avoid pulling in d3 v3 as sub-dependency
* Added test case for `fitBounds`

# Version 1.4.0

* Bump d3 to v4, replaces monolithic d3 dependency with specific d3 submodules.

# Version 1.3.0

* Added `clickRadius` prop to allow for customization of hitbox around clicked point

# Version 1.2.0

* Add `fitBounds`

# Version 1.1.1

* Update mapbox-gl from v0.21.0 (from v0.20.0)

# Version 1.0.0

## New Feature: Perspective Mode

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

## Internal change: Transpiled ES6 code base

* The code base has been updated to ES6+ and is now transpiled back to ES5
  before being published on npm.

## Breaking Change: Layer Imports

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

## Breaking Change: fitBounds has been removed

The previously exported `fitbounds` function will be made available
as part of the separate package of utilities that handles coordinate
projections in perspective mode.
