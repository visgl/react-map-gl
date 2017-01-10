<p align="right">
  <a href="https://npmjs.org/package/react-map-gl">
    <img src="https://img.shields.io/npm/v/react-map-gl.svg?style=flat-square" alt="version" />
  </a>
  <a href="https://travis-ci.org/uber/react-map-gl">
    <img src="https://img.shields.io/travis/uber/react-map-gl/master.svg?style=flat-square" alt="build" />
  </a>
  <a href="https://npmjs.org/package/react-map-gl">
    <img src="https://img.shields.io/npm/dm/react-map-gl.svg?style=flat-square" alt="downloads" />
  </a>
</p>

<h1 align="center">react-map-gl | <a href="https://uber.github.io/react-map-gl">Docs</a></h1>

<h5 align="center">React friendly API wrapper around MapboxGL JS</h5>

![screen](https://cloud.githubusercontent.com/assets/499192/11028165/49f41da2-86bc-11e5-85eb-9279621ef971.png)

*This project is new and the API may change.*

    npm install --save react-map-gl

## Using with Browserify, Webpack etc

* `browserify` - react-map-gl is extensively tested with `browserify` and works without configuration.

* `webpack 1` - look at the [deck.gl exhibits](https://github.com/uber/deck.gl/tree/master/exhibits)
folder, demonstrating a working demo using `webpack`.

* `webpack 2` - The dev branch in this repo is based on webpack 2, look at the webpack config file in the main example. 

In general, for non-browserify based environments, make sure you have read the instructions on the
[mapbox-gl-js README](https://github.com/mapbox/mapbox-gl-js#using-mapbox-gl-js-with-other-module-systems).

## Example

```js
import MapGL from 'react-map-gl';

<MapGL
  width={400}
  height={400}
  latitude={37.7577}
  longitude={-122.4376}
  zoom={8}
  onChangeViewport={viewport => {
    const {latitude, longitude, zoom} = viewport;
    // Optionally call `setState` and use the state to update the map.
  }}
/>
```

## Overlays

react-map-gl provides an overlay API so you can use the built-in visualization
overlays, or create your own.

```js
import {ScatterplotOverlay} from 'react-map-gl';

<MapGL {...viewport}>
  <ScatterplotOverlay
    {...viewport}
    locations={locations}
    dotRadius={4}
    globalOpacity={1}
    compositeOperation="screen" />
</MapGL>
```

Built-in overlays are: `ChoroplethOverlay`, `ScatterplotOverlay`, `DraggablePointsOverlay`,
`SVGOverlay` and `CanvasOverlay`.

**These overlays are currently not compatible with perspective mode.**

### deck.gl

[deck.gl](https://github.com/uber/deck.gl) is a companion module to
`react-map-gl` that provide a number of classic data visualization overlays
(scatterplots, choropleths etc) implemented in WebGL. These overlays are
suitable for large or dynamic data sets, or for use in perspective mode
applications.

### Third-party

Third party overlays can also be created. For example, the
[heatmap-overlay](https://github.com/vicapow/react-map-gl-heatmap-overlay) uses
[webgl-heatmap](https://github.com/vicapow/webgl-heatmap) to create geographic
heatmaps.

<img width=200 src="https://cloud.githubusercontent.com/assets/499192/11028150/33f34640-86bc-11e5-9678-3fa1798394d5.gif" />

```js
import HeatmapOverlay from 'react-map-gl-heatmap-overlay';
import cities from 'example-cities';

<MapGL {...viewport}>
  <HeatmapOverlay locations={cities} {...viewport} />
</MapGL>
```

Want to create and share your own overlay? Fork the
[react-map-gl-example-overlay](https://github.com/vicapow/react-map-gl-example-overlay)
project to get started.

## Perspective Mode

Perspective mode is exposed using the `pitch` and `bearing` props
(both default to `0`), which will show the map "tilted" `pitch` degrees
(overhead being 0 degrees), looking towards `bearing` (0 degrees is north).

In addition, the `perspectiveEnabled` prop (default: `false`)
will activate mouse handlers that allow the user to change `pitch` and
`bearing` using the mouse while holding down any function key {command, shift, ctrl, alt}.

If `perspectiveEnabled` is not set to `true` then the user will not be able to
change the pitch and bearing, which means that the default props will show
an overhead map and only enable standard pan and zoom mouse actions on that map.

**Considerations:**

- Mapbox-gl-js limits the pitch to 60 degrees.
- When using pitch, several additional fields are passed in the
onViewportChange callback, make sure to pass all received props back to
the component.
- Not all overlays are compatible with perspective mode. For a set of overlays that
do work with perspective mode, look at [deck.gl](https://github.com/uber/deck.gl).

## Transitions

`react-map-gl` does not expose the transition API for `mapbox-gl-js` since it is
designed to be a stateless component.

Instead it is recommended to use a separate module like
[react-motion](https://github.com/chenglou/react-motion)
to animate properties.

```js
<Motion style={{
  latitude: spring(viewport.latitude, { stiffness: 170, damping: 26, precision: 0.000001 }),
  longitude: spring(viewport.longitude, { stiffness: 170, damping: 26, precision: 0.000001 })
}}>
  {({ latitude, longitude }) => <MapGL
    {...viewport}
    latitude={latitude}
    longitude={longitude}
    mapStyle={mapboxStyle}
  />}
</Motion>
```

## ImmutableJS

The `mapStyle` property of the `MapGL` as well as several of the built in
overlay properties must be provided as
[ImmutableJS](https://facebook.github.io/immutable-js) objects. This allows
the library to be fast since computing changes to props only involves checking
if the immutable objects are the same instance.

## Redux

If you're using redux, it is relatively simple to hook this component up to
store state in the redux state tree. The simplest way is to take all
properties passed to the `onChangeViewport` function property and add them
directly into the store. This state can then be passed back to `react-map-gl`
without any transformation. You can use the package
[redux-map-gl](https://github.com/Willyham/redux-map-gl) to save writing this
code yourself.

## Development

Install project dependencies and start watching the examples:

    npm start

You can now open your browser and navigate to `http://localhost:9966/?access_token=TOKEN`,
where `TOKEN` is a valid Mapbox access token.

## Testing

Its difficult to write tests for this component because it uses WebGL.
There are some tests in the [test folder](./test) but for the most part, as new
features are added, we typically test drive them by running `npm start` and
play with the demos.

## Contributing

Contributions are welcome. While not necessary, it can be helpful to check with
maintainers before opening your PR. Also, you will need to complete a short open
source contribution form before your pull request can be accepted.
