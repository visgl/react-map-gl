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
npm install --save react-map-gl mapbox-gl
```

### Example

```js
import * as React from 'react';
import Map from 'react-map-gl';

function App() {
  return <Map
    mapLib={import('mapbox-gl')}
    initialViewState={{
      longitude: -100,
      latitude: 40,
      zoom: 3.5
    }}
    style={{width: 600, height: 400}}
    mapStyle="mapbox://styles/mapbox/streets-v9"
  />;
}
```

### Using Mapbox Tokens

**Starting with v2.0, mapbox-gl requires a Mapbox token for any usage, with or without the Mapbox data service. See [about Mapbox tokens](/docs/get-started/mapbox-tokens.md) for your options.**

To show maps from a service such as Mapbox you will need to register on their website in order to retrieve an access token required by the map component, which will be used to identify you and start serving up map tiles. The service will be free until a certain level of traffic is exceeded.

There are several ways to provide a token to your app, as showcased in some of the example folders:

* Provide a `mapboxAccessToken` prop to the map component
* Set the `MapboxAccessToken` environment variable (or set `REACT_APP_MAPBOX_ACCESS_TOKEN` if you are using Create React App)
* Provide it in the URL, e.g `?access_token=TOKEN`


### Contribute

See [contribution guide](/CONTRIBUTING.md).


### Attributions

react-map-gl is part of vis.gl, an [Urban Computing Foundation](https://uc.foundation) project.

Development is also supported by

<img src="https://raw.githubusercontent.com/visgl/deck.gl-data/master/images/branding/mapbox.svg" height="40" />
