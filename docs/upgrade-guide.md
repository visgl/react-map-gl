# Upgrade Guide

## Upgrading to react-map-gl v3

v3 is a major upgrade of react-map-gl. While we have tried to gently deprecated any changed or removed features, a few breaking changes could not be avoided.

### Breaking Changes

#### `onChangeViewport` / `onViewportChange` viewport

Previously, the `viewport` object passed to these callbacks **did not** include `width` and `height`. With `v3`, we now include these dimensions in the `viewport` object as well. Use cases that applied `viewport` object after specifying `width` and `height` will have to be careful:
```js
// BAD: Width and Height below will be overridden by what's in the `viewport` object
<ReactMapGL width={500} height={400} {...viewport} />

// GOOD: Width and Height below will override what's in `viewport`
<ReactMapGL {...viewport} width={500} height={400} />
```
Please double check your render code if you relied on this behavior. If you rely on manually specifying the width and height, swapping the order should work:

#### Some Overlays Moved to Examples

Some less frequently used overlays (`DraggablePointsOverlay`, `ChoroplethOverlay`, `ScatterplotOverlay`), ... have been moved to examples. Most users have moved to map styles or deck.gl layers and removing these overlays reduces the size of the react-map-gl library for the majority of users that don't need them. If you still use them, simply copy the overlay source file(s) into your application.

#### Overlays API Have Changed

Overlays **MUST** now be rendered as children of the main `react-map-gl` component.
We use React's `context` internally to pass through viewport props.

#### `fitBounds` util

Previously, the library exports a `fitBounds` util that returns `{longitude, latitude, zoom}`
of a flat viewport that fits around a given bounding box.
This function has been moved to the `viewport-mercator-project` library.
The same goal can now be achieved by:

```js
import {PerspectiveMercatorViewport} from 'viewport-mercator-project';

const viewport = new PerspectiveMercatorViewport({width: 600, height: 400}).fitBounds(
  [[-73.9876, 40.7661], [-72.9876, 41.7661]],
  {padding: 20, offset: [0, -40]}
);
// viewport: instance of PerspectiveMercatorViewport
// {
//   longitude: -23.406499999999973,
//   latitude: 64.86850056273362,
//   zoom: 12.89199533073045,
//   pitch: 0,
//   bearing: 0
// }
```

### Two Map Components

v3 now exposes two React components: `StaticMap` and `InteractiveMap`.
`InteractiveMap` is the default export, and designed to be as compatible as
possible with the v2 default export.

#### StaticMap

This is the React wrapper around `Mapbox GL JS` and takes in viewport properties
such as `width`, `height`, `latitude`, `longitude`. Style diffing and updating
logic also live here. See [Source Code](https://github.com/uber/react-map-gl/blob/master/src/components/static-map.js)
for more information.

#### InteractiveMap

This is a wrapper on top of `StaticMap`. It takes all the props
of `StaticMap` and additional ones such as `onViewportChange`, `scrollZoom`,
`dragRotate`, etc. to control interactivity on the map.
See [Source Code](https://github.com/uber/react-map-gl/blob/master/src/components/interactive-map.js)
for more information.

### Deprecations

We have started to deprecate a few React props. In all the cases below, the old `props` will still work (you'll get a warning in the console), but they will likely be removed in the next major version of react-map-gl so you should start using the new `props` as soon as possible.

| Old Prop                        | New Prop |
| ---                             | --- |
| `onChangeViewport(<viewport>)`  | `onViewportChange(<viewport>)` |
| `onHoverFeatures(<features>)`   | `onHover(<event>)` |
| `onClickFeatures(<features>)`   | `onClick(<event>)` |
| `perspectiveEnabled [default: false]` | `dragRotate [default: true]`  |



## Upgrading to react-map-gl v2

v2 is API compatible with v1, however if you are still using `v1` of react-map-gl, make sure that you first upgrade:
* Your `node` version to `v4` or higher
* Your `react` version to `15.4` or higher.

Background: `mapbox-gl` 0.31.0 introduced a hard dependency on Node >= v4.


## Upgrading to react-map-gl v1

(Upgrading from 0.6.x)

* **Importing Overlays** - The map overlay components (`HTMLOverlay`, `CanvasOverlay`, `SVGOverlay` etc) are now named exports. They previously had to be imported via their relative source paths:

```js
// v1.0
import MapGL, {SVGOverlay} from 'react-map-gl';

// v0.6
import MapGL from 'react-map-gl';
import SVGOverlay from 'react-map-gl/src/overlays/svg-overlay';.
```

* **Map State** - The map state reported by `onViewportChanged` will now contain additional state fields (tracking not only `pitch` and `bearing` needed for perspective mode, but also transient information about how the projection is being changed by the user).
    * This information must be passed back to the react-map-gl component in the next render.
    * To simplify and future proof applications, it is recommended to simply save the entire `mapState` in your app store whenever it changes and then pass it back to the component rather than trying to keep track of individual fields (like `longitude`, `latitude` and `zoom`).
