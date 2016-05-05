# Version 1.0.0


## API Breaking Changes

* The map overlay components (HTMLOverlay, CanvasOverlay, SVGOverlay etc)
  used to be imported via their source paths. Due to the introduction of
  transpilation these paths now point to ES6+ code which will not work
  for many applications. Instead these layers are now exported from the module
  by attaching them to the MapGL object.
```
import MapGL, {SVGOverlay} from 'react-map-gl';
```


## New Functionality - Perspective Mode

* Now supports `bearing` and `pitch` properties, per mapbox-gl-js api
  documentation. These props default to 0 which means that maps will still
  be rendered in flat/ortographic mode when they are not provided.
* Setting the `perspectiveEnabled` prop to true enables a perspective control
  mode (Command-Drag) allowing the user to change perspective.
* A utility for calculating projection matrices based on mapbox gl props is
  provided, so that 3D enabled overlays

**Limitations:** The existing overlays (HTMLOverlay, CanvasOverlay,
  SVGOverlay etc) do not currently support perspective mode.


## Internal changes - Transpiled ES6 code base

* The code base has been updated to ES6+ and is now transpiled back to ES5
  before being published on npm.
