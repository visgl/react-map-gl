# Get Started


# Installation

Using `react-map-gl` requires `node >= v4` and `react >= 15.4`.

```sh
npm install --save react-map-gl
```

## Using with Browserify, Webpack, and other JavaScript Bundlers

* `browserify` - react-map-gl is extensively tested with `browserify` and works without configuration.

* `webpack 2` - Most of the provided react-map-gl examples use webpack 2. For a minimal example, look at the [exhibit-webpack](https://github.com/uber/react-map-gl/tree/master/examples/exhibit-webpack) folder, demonstrating a working demo using `webpack 2`.

* `create-react-app` - At this point configuration-free builds are not possible with webpack due to the way the mapbox-gl-js module is published. You will need to eject your app and add an alias to your webpack config, as shown in the exhibit-webpack.

There's many other ready-to-run [examples](https://github.com/uber/react-map-gl/blob/master/examples) you can take a look at if you need more inspiration.

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
