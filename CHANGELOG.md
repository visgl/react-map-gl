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
