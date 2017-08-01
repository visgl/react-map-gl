# Introduction

react-map-gl is a suite of [React](http://facebook.github.io/react/) components for
[Mapbox GL JS](https://github.com/mapbox/mapbox-gl-js), a WebGL-powered vector and raster tile mapping library. In addition to exposing `MapboxGL` functionality to React apps, react-map-gl also integrates seamlessly with [deck.gl](https://uber.github.io/deck.gl).

# Installation

```sh
npm install --save react-map-gl
```

## Using with Browserify, Webpack, and other JavaScript Bundlers

* `browserify` - react-map-gl is extensively tested with `browserify` and works without configuration.

* `webpack 2` - Most of the provided react-map-gl examples use webpack 2. For a minimal example, look at the [exhibit-webpack](https://github.com/uber/react-map-gl/tree/master/examples/exhibit-webpack) folder, demonstrating a working demo using `webpack 2`.

* `create-react-app` - At this point configuration-free builds are not possible with webpack due to the way the mapbox-gl-js module is published. You will need to eject your app (sorry) and add one line alias to your webpack config.

While react-map-gl provides many examples, getting mapbox-gl-js to work non-browserify-based build environments can sometimes be tricky. If the examples provided by react-map-gl are not enough, a good source for more information might be [Using mapbox-gl and webpack together](https://mikewilliamson.wordpress.com/2016/02/24/using-mapbox-gl-and-webpack-together/).


## Example Code

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
          const {width, height, latitude, longitude, zoom} = viewport;
          // Optionally call `setState` and use the state to update the map.
        }}
      />
    );
  }
}
```

# About Mapbox Tokens

To show maps from a service such as Mapbox you will need to register with Mapbox and get a "token" that you need to provide to your map component. The map component will use the token to identify itself to the mapbox service which then will start serving up map tiles. The token will usually be free until a certain level of traffic is exceeded.

While the token will need to be hard-coded into your application in production, there are several ways to provide a token during development:
* Modify file to specify your Mapbox token,
* Set an environment variable (MapboxAccessToken) - through the use of a webpack loader or browserify transform, see the hello-world examples for details.
* Provide a token in the URL.

To make the maps load, either:
* add `?access_token=TOKEN` to the URL where `TOKEN` is a valid Mapbox access token, or
* set the `MapboxAccessToken` environment variable before running `npm start`

## Using with Redux

If you're using redux, it is very easy to hook this component up to
store state in the redux state tree. The simplest way is to take all
properties passed to the `onChangeViewport` function property and add them
directly into the store. This state can then be passed back to `react-map-gl`
without any transformation.

You can use the package [redux-map-gl](https://github.com/Willyham/redux-map-gl) to save writing this code yourself.
