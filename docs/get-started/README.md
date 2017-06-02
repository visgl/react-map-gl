# Get Started

`ReactMapGL` is a [React](http://facebook.github.io/react/)-friendly
wrapper for [MapboxGL](https://www.mapbox.com/mapbox-gl-js/), a WebGL-powered
vector and raster tile mapping library. On top of exposing as much of
`MapboxGL` as possible, we also introduced our own event handling classes
that aim to make working with external overlays, such as
[Deck.GL](https://uber.github.io/deck.gl), much easier.

# Installation

`ReactMapGL` requires `node >= v4` and `react >= 15.4`.

```sh
npm install --save react-map-gl
```
or
```sh
yarn add react-map-gl
```

## Example

```js
import {Component} from 'react';
import ReactMapGL from 'react-map-gl';

class Map extends Component {
  render() {
    return (
      <ReactMapGL
        width={400}
        height={400}
        latitude={37.7577}
        longitude={-122.4376}
        zoom={8}
        onViewportChange={(viewport) => {
          const {latitude, longitude, zoom} = viewport;
          // Optionally call `setState` and use the state to update the map.
        }}
      />
    );
  }
}
```

## Server Side Rendering

`ReactMapGL` depends on `gl`, which may cause issues when running in a server
environment without `gl` installed. You can either make sure that your system
has `gl` installed or use the following work-around to ensure you only require
`ReactMapGL` on the client.

```js
// is-browser is an npm package, but you can use any other solution to make sure
// that you are in a browser environment.
import isBrowser from 'is-browser';

const ReactMapGL = 'div';
if (isBrowser) {
  ReactMapGL = require('react-map-gl').default;
}
```

## Using with Browserify, Webpack, and other environments

* `browserify` - `ReactMapGL` is extensively tested with `browserify` and works
without issue.

* `webpack 1` - look at the [deck.gl exhibits](https://github.com/uber/deck.gl/tree/master/exhibits)
folder, demonstrating a working demo using `webpack`.

* `webpack 2` - our `custom-interactions`
[example](https://github.com/uber/react-map-gl/blob/master/examples/custom-interactions/webpack.config.js)
uses `webpack 2` for configuration and can be used as a reference.

In general, for non-browserify based environments, make sure you have read the instructions on the
[MapboxGL README](https://github.com/mapbox/mapbox-gl-js#using-mapbox-gl-js-with-other-module-systems).
