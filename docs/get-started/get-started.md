# Get Started

## Installation

Using `react-map-gl` requires `node >= v8` and `react >= 16.3`.

```sh
npm install --save react-map-gl mapbox-gl
```

## Example

```js
import * as React from 'react';
import Map from 'react-map-gl';

function App() {
  return (
    <Map
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14
      }}
      style={{width: 600, height: 400}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    />
  );
}
```

See full project setup in [get-started examples](https://github.com/visgl/react-map-gl/tree/7.0-release/examples/get-started).


## Styling

The current mapbox-gl release requires its stylesheet be included at all times. The marker, popup and navigation components in react-map-gl also need the stylesheet to work properly.

You may add the stylesheet to the head of your page:

```html
<!-- index.html -->
<link href='https://api.tiles.mapbox.com/mapbox-gl-js/v<YOUR_MAPBOX_VERSION>/mapbox-gl.css' rel='stylesheet' />
```

Find out your mapbox version by running `yarn list mapbox-gl` or `npm ls mapbox-gl`.

Or embed it in your app by using [css-loader](https://webpack.github.io/docs/stylesheets.html) with Webpack or [postcss](https://www.npmjs.com/package/rollup-plugin-postcss) with rollup:

```js
/// app.js
import 'mapbox-gl/dist/mapbox-gl.css';
```


## Using with a mapbox-gl Fork

Install your choice of fork along with react-map-gl, for example:

```bash
npm install --save react-map-gl maplibre-gl

# Add an empty placeholder for mapbox-gl to satisfy the peer dependency
npm install --save mapbox-gl@npm:empty-npm-package@1.0.0
```

Then override the `mapLib` prop of `Map`:

```js
import * as React from 'react';
import Map from 'react-map-gl';
import maplibregl from 'maplibre-gl';

function App() {
  return <Map mapLib={maplibregl} />;
}
```

To use the stylesheet from the fork:

```html
<!-- index.html -->
<link href='https://unpkg.com/maplibre-gl@<YOUR_MAPLIBRE_VERSION>/dist/maplibre-gl.css' rel='stylesheet' />
```

Or

```js
/// app.js
import 'maplibre-gl/dist/maplibre-gl.css';
```
