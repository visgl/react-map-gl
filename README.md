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

## Installation

    npm install --save react-map-gl

## Using with Browserify, Webpack etc

* `browserify` - react-map-gl is extensively tested with `browserify` and works without configuration.

* `webpack 1` - look at the [exhibit-webpack](https://github.com/uber/react-map-gl/tree/master/examples/exhibit-webpack)
folder, demonstrating a working demo using `webpack`.

* `webpack 2` - The dev branch in this repo is based on webpack 2, look at the webpack config file in the main example.

In general, for non-browserify based environments, make sure you have read the instructions on the
[mapbox-gl-js README](https://github.com/mapboxmapbox-gl-js#using-mapbox-gl-js-with-other-module-systems).


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

## Components

react-map-gl provides React-friendly components like `Marker`, `Popup` etc.


## Visualizing Geospatial Data

The main point of using a map is usuallt to visualize geospatial data on top of it. react-map-gl provides several solutions


### deck.gl Layers

[deck.gl](https://github.com/uber/deck.gl) is a companion module to `react-map-gl` that provide a number of classic data visualization overlays (scatterplots, choropleths etc) implemented in WebGL. These overlays are suitable for very large and/or dynamic data sets, and for use in perspective mode
applications.


## Overlays

react-map-gl provides a basic overlay API. You can use the built-in visualization overlays, or create your own.


## Perspective Mode

react-map-gl fully supports mapbox-gl perspective mode (pitch and bearing).

In addition, for a set of high-performance geospatial data visualiation overlays that are 100% compatible with mapbox-gl perspective mode, look at [deck.gl](https://github.com/uber/deck.gl).


## Transitions

TBD


## ImmutableJS

The `mapStyle` property of the `MapGL` as well as several of the built in
overlay properties must be provided as [ImmutableJS](https://facebook.github.io/immutable-js) objects. This allows the library to be fast since computing changes to props only involves checking if the immutable objects are the same instance.


## Development

Install project dependencies and check that the tests run

    npm install
    npm test

Note on yarn: `yarn` does not appear to be compatible with `mapbox-gl` v0.31,
in terms of installing correct versions of dependencies needed to run
test scripts in the folder.
While this is likely to change, for now it is recommended it is recommended to
use `npm install` in the root folder of `react-map-gl`. This restriction only
applies when installing in the root folder; `yarn` is still supported and
recommended when installing the examples in the `examples` folder.

Then start the main example in `examples/main` by running the shortcut

    npm start

This should open a new tab in your browser with the examples.
To make the maps load, either:
* add `?access_token=TOKEN` to the URL where `TOKEN` is a valid Mapbox access token, or
* set the `MapboxAccessToken` environment variable before running `npm start`

## Testing

* **Unit Tests** - it is expected that any feature is accompanied by standard unit tests in [test folder](./test).
* **Run Unit Tests in Node** - Note that This component uses WebGL, but it still runs under Node.js (using headless-gl and jsdom). This is how the standard `npm test` script runs.
* **Run Unit Tests in Browser** - It is also important to run unit tests in the browser, via `npm run test-browser`.
* **Manual Testing** - In addition, please test drive new and existing features by running `npm start` and manually testing the demos.


## Contributing

Contributions are welcome. It can be helpful to check with maintainers before opening your PR, just open an issue and describe your proposal. Also, be aware that you will need to complete a short open source contribution form before your pull request can be accepted.
