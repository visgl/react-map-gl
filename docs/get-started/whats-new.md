# What's New



## v3.0

Release date: TBD

## Highlights

- **Separated Event Handling**: Event handling in `v3` is decoupled from the `React`
component.
- **Added Touch Support**: Using `hammer.js` to back our new event handling
process means we can leverage its great support for touch events for our map interactions.
- **Static and Interactive Map Component**: We now expose a `StaticMap` component
which is meant to be completely stateless. The default component is now `InteractiveMap`,
which will take care of handling interactions and states for you.
- **Addional MapboxGL Components**: The following `MapboxGL` pieces have been
given their own `React` components as well: `Popup`, `Marker`, `NavigationControl`.
- **New fitBounds**: `fitBounds` has also been rewritten to remove dependency
on `MapboxGL`'s utility functions.
- **Documentation**: Improved and updated, and now uses a consistent style to
other Uber Visualization open source projects.


## v2.0

Date: Jan 17, 2017

### New Features
- Bump `mapbox-gl` to v0.31.0
- Add `maxZoom` prop and defaults to `20`
- Add `onLoad` event handler
- Add `onClick` prop handler (#140)

### Breaking Changes
- `mapbox-gl` 0.31.0 introduced a hard dependency on Node >= v4. `react-map-gl` now requires that you are on Node >= v4 and npm >= v3.


## v1.0.0

* **Perspective Mode** - Now supports `bearing` and `pitch` properties, per mapbox-gl-js api documentation. These props default to 0 which means that maps will still be rendered in flat/ortographic mode when they are not provided
* **Support for ES6 imports** - The map overlay components (HTMLOverlay, CanvasOverlay, SVGOverlay etc) previously had to be imported via their relative source paths can now be imported directly using `import {SVGOverlay} from 'react-map-gl'.
