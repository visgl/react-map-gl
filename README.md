<p align="right">
  <a href="https://npmjs.org/package/react-map-gl">
    <img src="https://img.shields.io/npm/v/react-map-gl.svg?style=flat-square" alt="version" />
  </a>
  <a href="https://github.com/visgl/react-map-gl/actions?query=workflow%3Atest+branch%3Amaster">
    <img src="https://github.com/visgl/react-map-gl/workflows/test/badge.svg?branch=master" alt="build" />
  <a href="https://npmjs.org/package/react-map-gl">
    <img src="https://img.shields.io/npm/dm/react-map-gl.svg?style=flat-square" alt="downloads" />
  </a>
</p>

<h1 align="center">react-map-gl | <a href="https://visgl.github.io/react-map-gl">Docs</a></h1>

`react-map-gl` is a suite of [React](http://facebook.github.io/react/) components designed to provide a React API for [Mapbox GL JS](https://github.com/mapbox/mapbox-gl-js)-compatible libraries. More information in the online documentation.

See our [Design Philosophy](docs/README.md#design-philosophy).

### Installation

Using `react-map-gl` requires `react >= 16.3`.

```sh
npm install --save react-map-gl
```

### Example

```js
import * as React from 'react';
import ReactMapGL from 'react-map-gl';

function Map() {
  const [viewport, setViewport] = React.useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8
  });

  return (
    <ReactMapGL
      {...viewport}
      width="100%"
      height="100%"
      onViewportChange={(viewport) => setViewport(viewport)}
    />
  );
}
```

### Using Mapbox Tokens

**Starting with v2.0, mapbox-gl requires a Mapbox token for any usage, with or without the Mapbox data service. See [about Mapbox tokens](/docs/get-started/mapbox-tokens.md) for your options.**

To show maps from a service such as Mapbox you will need to register on their website in order to retrieve an access token required by the map component, which will be used to identify you and start serving up map tiles. The service will be free until a certain level of traffic is exceeded.

There are several ways to provide a token to your app, as showcased in some of the example folders:

* Provide a `mapboxApiAccessToken` prop to the map component
* Set the `MapboxAccessToken` environment variable (or set `REACT_APP_MAPBOX_ACCESS_TOKEN` if you are using Create React App)
* Provide it in the URL, e.g `?access_token=TOKEN`
* Provide `mapboxApiUrl` prop to the map component to override the default mapbox API URL

But we would recommend using something like [dotenv](https://github.com/motdotla/dotenv) and put your key in an untracked `.env` file, that will then expose it as a `process.env` variable, with much less leaking risks.


### Limitations

This library provides convenient wrappers around initializing and (to some degree) tracking the state of a Mapbox WebGL map. Because most of the functionality of Mapbox's JS API depends on the use of HTML5 canvases and WebGL, which React is not built to manipulate, the React component does not mirror all the functionality of Mapbox GL JS's Map class. You may access the native Mapbox API exposed by the `getMap()` function in this library. However, proceed with caution as calling the native APIs may break the connection between the React layer props and the underlying map state.

Examples of replacing common native API calls with their React equivalents can be found on the [FAQ](/docs/get-started/faq.md) page.


### Contribute

See [contribution guide](/CONTRIBUTING.md).
