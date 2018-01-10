# Get Started


## Installation

Using `react-map-gl` requires `node >= v4` and `react >= 15.4`.

```sh
npm install --save react-map-gl
```

## Example

```js
import {Component} from 'react';
import ReactMapGL from 'react-map-gl';

class Map extends Component {

  state = {
    viewport: {
      width: 400,
      height: 400,
      latitude: 37.7577,
      longitude: -122.4376,
      zoom: 8
    }
  };

  render() {
    return (
      <ReactMapGL
        {...this.state.viewport}
        onViewportChange={(viewport) => this.setState({viewport})}
      />
    );
  }
}
```

## Styling

The current mapbox-gl release requires its stylesheet be included at all times. The marker, popup and navigation components in react-map-gl also need the stylesheet to work properly.

You may add the stylesheet to the head of your page:
```html
<!-- index.html -->
<link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.42.0/mapbox-gl.css' rel='stylesheet' />
```

Or embed it in your app by using - [browserify-css](https://www.npmjs.com/package/browserify-css)
with Browserify or - [css-loader](https://webpack.github.io/docs/stylesheets.html) with Webpack:
```js
// app.js
import 'mapbox-gl/dist/mapbox-gl.css';
```

## Using with Browserify, Webpack, and other JavaScript Bundlers

* `browserify` - react-map-gl is extensively tested with `browserify` and works without configuration.

* `webpack 2` - Most of the provided react-map-gl examples use webpack 2. For a minimal example, look at the [exhibit-webpack](https://github.com/uber/react-map-gl/tree/master/examples/exhibit-webpack) folder, demonstrating a working demo using `webpack 2`.

* `create-react-app` - At this point configuration-free builds are not possible with webpack due to the way the mapbox-gl-js module is published. You will need to eject your app and add an alias to your webpack config. The following [tutorial](https://github.com/zjhch123/react-map-gl-demo-with-create-react-app) might be helpful.

There's many other ready-to-run [examples](https://github.com/uber/react-map-gl/blob/master/examples) you can take a look at if you need more inspiration.
