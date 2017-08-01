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

<h5 align="center">
React Components Suite for <a href="https://github.com/mapbox/mapbox-gl-js">Mapbox GL JS</a>.
</h5>

In addition to exposing MapboxGL functionality to React apps, react-map-gl also integrates seamlessly with [deck.gl](https://uber.github.io/deck.gl).

### Installation

    npm install --save react-map-gl

* `browserify` - react-map-gl is extensively tested with `browserify` and works without configuration.

* `webpack 2` - Most of the provided react-map-gl examples use webpack 2. For a minimal example, look at the [exhibit-webpack](https://github.com/uber/react-map-gl/tree/master/examples/exhibit-webpack) folder, demonstrating a working demo using `webpack 2`.

* `create-react-app` - At this point configuration-free builds are not possible with webpack due to the way the mapbox-gl-js module is published. You will need to eject your app and add an alias to your webpack config, as shown in the exhibit-webpack.

There's many other ready-to-run [examples](https://github.com/uber/react-map-gl/blob/master/examples) you can take a look at if you need more inspiration.

### Example

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

### About Mapbox Tokens

To show maps from a service such as Mapbox you will need to register on their website in order to retrieve an access token required by the map component, which will be used to identify you and start serving up map tiles. The service will be free until a certain level of traffic is exceeded.

There are several ways to provide a token to your app, as showcased in some of the example folders:

* Modify the source directly
* Set the `MapboxAccessToken` environment variable
* Provide it in the URL, e.g `?access_token=TOKEN`

But we would recommend using something like [dotenv](https://github.com/motdotla/dotenv) and put your key in an untracked `.env` file, that will then expose it as a `process.env` variable, with much less leaking risks.

### Redux Usage

If you're using redux, it is very easy to hook this component up to store state in the redux state tree.
The simplest way is to take all properties passed to the `onViewportChange` function property and add them
directly into the store. This state can then be passed back to the `<ReactMapGL>` component without any transformation.

You can even use the package [redux-map-gl](https://github.com/Willyham/redux-map-gl) to save you some writing.
