# Upgrade Guide

## Upgrading to v3.2

- The latest mapbox-gl release requires stylesheet to be included at all times. See [Get Started](/docs/get-started/get-started.md) for information about styling.
- Immutable.js is no longer a dependency. If you are importing immutable in your application, it must be added to the application's dependencies.


## Upgrading to v3

v3 is a major upgrade of react-map-gl. While we have tried to gently deprecated any changed or removed features, a few breaking changes could not be avoided.


### Version Requirements

- The **Node Version Requirement** for **building** react-map-gl is now **>=v6.4.0**. Using prebuilt react-map-gl does **NOT** has this limitation. This is introduced by [Mapbox GL JS v0.38.0](https://github.com/mapbox/mapbox-gl-js/releases/tag/v0.38.0)


### MapGL Component

* **Two Map Components** - v3 now splits the Map component into two React components: `StaticMap` and `InteractiveMap`. `InteractiveMap` is the default export, and designed to be as compatible as possible with the v2 default component.


#### `onChangeViewport` callback now includes `width` and `height`.

The `viewport` parameter passed to the `onChangeViewport` callback now includes `width` and `height`. Application code that composed the `viewport` with `width` and `height` may have to be updated. Please double check your render code if you relied on this behavior.
```js
// BAD: 'width' and 'height' below will be overridden by what's in the 'viewport' object
<ReactMapGL width={500} height={400} {...viewport} />
// GOOD: 'width' and 'height' below will override the values in 'viewport'
<ReactMapGL {...viewport} width={500} height={400} />
```

### Overlays

* **Some Overlays Moved to Examples** -  Some less frequently used overlays (`DraggablePointsOverlay`, `ChoroplethOverlay`, `ScatterplotOverlay`), have been moved to examples. Most users are now using mapbox styles or deck.gl layers and removing these overlays reduces the size of the react-map-gl library for the majority of users that don't need them. If you still use them, simply copy the overlay source file(s) into your application.
* **Overlays must be Children of the Map** - Overlays **must** now be rendered as children of the main `react-map-gl` component to automatically sync with the map viewport.

### `fitBounds` utility function

The `fitBounds` utility has been moved to the [viewport-mercator-project](https://github.com/uber-common/viewport-mercator-project) library. The function can now be called as follows:
```js
import WebMercatorViewport from 'viewport-mercator-project';
const viewport = new WebMercatorViewport({width: 600, height: 400});
const bound = viewport.fitBounds(
  [[-73.9876, 40.7661], [-72.9876, 41.7661]],
  {padding: 20, offset: [0, -40]}
);
// => bounds: instance of WebMercatorViewport
// {longitude: -73.48760000000007, latitude: 41.268014439447484, zoom: 7.209231188444142}
```

### Deprecations

We have started to deprecate a few React props. In all the cases below, the old `props` will still work (you'll get a warning in the console), but they will likely be removed in the next major version of react-map-gl so you should start using the new `props` as soon as possible.

| Old Prop                        | New Prop |
| ---                             | --- |
| `onChangeViewport(<viewport>)`  | `onViewportChange(<viewport>)` |
| `onHoverFeatures(<features>)`   | `onHover(<event>)` |
| `onClickFeatures(<features>)`   | `onClick(<event>)` |
| `perspectiveEnabled [default: false]` | `dragRotate [default: true]`  |



## Upgrading to v2

v2 is API compatible with v1, however if you are still using `v1` of react-map-gl, make sure that you first upgrade:
* Your `node` version to `v4` or higher
* Your `react` version to `15.4` or higher.

Background: `mapbox-gl` 0.31.0 introduced a hard dependency on Node >= v4.


## Upgrading to v1

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
