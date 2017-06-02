# Upgrade Guide

## v3

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


### Deprecations

We have started to deprecate a few React props. In all the cases below, the old `props` will still work (you'll get a warning in the console), but they will likely be removed in the next major version of react-map-gl so you should start using the new `props` as soon as possible.

| Old Prop                        | New Prop |
| ---                             | --- |
| `onChangeViewport(<viewport>)`  | `onViewportChange(<viewport>)` |
| `onHoverFeatures(<features>)`   | `onHover(<event>)` |
| `onClickFeatures(<features>)`   | `onClick(<event>)` |
| `perspectiveEnabled [default: false]` | `dragRotate [default: true]`  |



## v2

v2 is API compatible with v1, however if you are still using `v1` of react-map-gl, make sure that you first upgrade:
* Your `node` version to `v4` or higher
* Your `react` version to `15.4` or higher.

Background: `mapbox-gl` 0.31.0 introduced a hard dependency on Node >= v4.


## v1

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
