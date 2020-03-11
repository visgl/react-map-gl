# Get Started


## Installation

Using `react-map-gl` requires `node >= v4` and `react >= 16.3`.

```sh
npm install --save react-map-gl
```

## Example

```js
import * as React from 'react';
import { useState } from 'react';
import ReactMapGL from 'react-map-gl';

function Map() {
  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8
  });

  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={nextViewport => setViewport(nextViewport)}
    />
  );
}
```

See full project setup in [get-started examples](https://github.com/uber/react-map-gl/tree/5.2-release/examples/get-started)

## Styling

The current mapbox-gl release requires its stylesheet be included at all times. The marker, popup and navigation components in react-map-gl also need the stylesheet to work properly.

You may add the stylesheet to the head of your page:
```html
<!-- index.html -->
<link href='https://api.tiles.mapbox.com/mapbox-gl-js/v<YOUR_MAPBOX_VERSION>/mapbox-gl.css' rel='stylesheet' />
```

Find out your mapbox version by running `yarn list mapbox-gl` or `npm ls mapbox-gl`.

Or embed it in your app by using - [browserify-css](https://www.npmjs.com/package/browserify-css)
with Browserify or - [css-loader](https://webpack.github.io/docs/stylesheets.html) with Webpack:

```js
// app.js
import 'mapbox-gl/dist/mapbox-gl.css';
```

## Enable Right-to-Left Language Support

![Since v5.2.2](https://img.shields.io/badge/since-v5.2.2-green)

```js
import {setRTLTextPlugin} from 'react-map-gl';

setRTLTextPlugin(
  // find out the latest version at https://www.npmjs.com/package/@mapbox/mapbox-gl-rtl-text
  'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',
  null,
  // lazy: only load when the map first encounters Hebrew or Arabic text
  true
);
```

This is the same as `import {setRTLTextPlugin} from 'mapbox-gl'` in the browser, but will not crash in node. The export mainly offers a convenience when using server-side rendering.

To use this API, consult Mapbox's [setRTLTextPlugin](https://docs.mapbox.com/mapbox-gl-js/api/#setrtltextplugin) documentation.


## Using with Browserify, Webpack, and other JavaScript Bundlers

* `browserify` - react-map-gl is extensively tested with `browserify` and works without configuration.

* `webpack 2` - Most of the provided react-map-gl examples use webpack 2. Look at the [get started examples](https://github.com/uber/react-map-gl/tree/5.2-release/examples/get-started) folder for minimalist templates.

* `create-react-app` - react-map-gl is compatible with [create-react-app](https://github.com/facebook/create-react-app).

* `create-react-app-typescript` - react-map-gl is compatible with [create-react-app-typescript](https://github.com/wmonk/create-react-app-typescript). You can see an example [here](https://github.com/zackhsi/react-map-gl-typescript).

There's many other ready-to-run [examples](https://github.com/uber/react-map-gl/tree/5.2-release/examples) you can take a look at if you need more inspiration.
