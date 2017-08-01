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

# Introduction

react-map-gl is a suite of [React](http://facebook.github.io/react/) components for
[Mapbox GL JS](https://github.com/mapbox/mapbox-gl-js), a WebGL-powered vector and raster tile mapping library. In addition to exposing `MapboxGL` functionality to React apps, react-map-gl also integrates seamlessly with [deck.gl](https://uber.github.io/deck.gl).

## Example

```js
import ReactMapGL from 'react-map-gl';

<ReactMapGL
  width={400}
  height={400}
  latitude={37.7577}
  longitude={-122.4376}
  zoom={8}
  onViewportChange={(viewport) => {
    const {width, height, latitude, longitude, zoom} = viewport;
    // Optionally call `setState` and use the state to update the map.
  }}
/>
```
