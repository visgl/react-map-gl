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

<h5 align="center">React Components for Mapbox GL JS</h5>

![screen](https://cloud.githubusercontent.com/assets/499192/11028165/49f41da2-86bc-11e5-85eb-9279621ef971.png)

## Installation

    npm install --save react-map-gl

## Using with Browserify, Webpack etc

* `browserify` - react-map-gl is extensively tested with `browserify` and works without configuration.

* `webpack 2` - Most of the provided react-map-gl examples use webpack 2. For a minimal example, look at the [exhibit-webpack](https://github.com/uber/react-map-gl/tree/master/examples/exhibit-webpack) folder, demonstrating a working demo using `webpack 2`.

* `create-react-app` - At this point configuration-free builds are not possible with webpack. You will need to eject your app (sorry) and add one line alias to your webpack config.

For more information, please refer to the docs <a href="https://uber.github.io/react-map-gl">docs</a>.


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
    // Call `setState` and use the state to update the map.
  }}
/>
```


## Visualizing Geospatial Data

The main point of using a map is usually to visualize geospatial data on top of it. react-map-gl provides several solutions

* **Components** - react-map-gl provides React components like `Marker`, `Popup` etc that takes `longitude` and `latitude` props and will automatically follow the map.

* **Overlays** - react-map-gl provides a basic overlay API. Each overlay takes long/lat encoded data and displays it on top of the map. You can use one of the provided visualization overlays, or create your own.

* **deck.gl Layers** - [deck.gl](https://github.com/uber/deck.gl) is a companion module to react-map-gl that provides high-performance geospatial data visualiation layers (`ScatterplotLayer`, `GeoJsonLayer`, `PointCloudLayer` etc) that are 3D enabled and 100% compatible with mapbox perspective mode. These layers are particularly suitable for very large and/or dynamic data sets.


## Development

Install project dependencies and check that the tests run

    npm install
    npm test

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
