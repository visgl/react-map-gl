# Get Started

## Using with Mapbox GL JS

### Installation

Using `react-map-gl` requires `node >= 12` and `react >= 16.3`.

```sh
npm install --save react-map-gl mapbox-gl @types/mapbox-gl
```

### Example

```tsx title="app.tsx"
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


### Styling

mapbox-gl requires its stylesheet be included at all times. The marker, popup and navigation components in react-map-gl also need the stylesheet to work properly.

You may add the stylesheet to the head of your page:

```html title="index.html"
<link href='https://api.tiles.mapbox.com/mapbox-gl-js/v<YOUR_MAPBOX_VERSION>/mapbox-gl.css' rel='stylesheet' />
```

Find out your mapbox version by running `yarn list mapbox-gl` or `npm ls mapbox-gl`.

Or embed it in your app by using [css-loader](https://webpack.github.io/docs/stylesheets.html) with Webpack or [postcss](https://www.npmjs.com/package/rollup-plugin-postcss) with rollup:

```ts title="app.tsx"
/// app.js
import 'mapbox-gl/dist/mapbox-gl.css';
```

## Using with Maplibre GL JS

### Installation

```bash
npm install --save react-map-gl maplibre-gl
```


### Example

```tsx title="app.tsx"
import * as React from 'react';
import Map from 'react-map-gl/maplibre';

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

### Styling

maplibre-gl requires its stylesheet be included at all times. The marker, popup and navigation components in react-map-gl also need the stylesheet to work properly.

You may add the stylesheet to the head of your page:

```html title="index.html"
<link href='https://unpkg.com/maplibre-gl@<YOUR_MAPLIBRE_VERSION>/dist/maplibre-gl.css' rel='stylesheet' />
```

Find out your maplibre version by running `yarn list maplibre-gl` or `npm ls maplibre-gl`.

Or embed it in your app by using [css-loader](https://webpack.github.io/docs/stylesheets.html) with Webpack or [postcss](https://www.npmjs.com/package/rollup-plugin-postcss) with rollup:

```ts title="app.tsx"
import 'maplibre-gl/dist/maplibre-gl.css';
```

## Using with Other Compatible Base Map Libraries

```bash
npm install --save react-map-gl my-mapbox-fork
```

Then override the `mapLib` prop of `Map`:

```tsx title="app.tsx"
import * as React from 'react';
import Map from 'react-map-gl';

// Include style sheet
import 'my-mapbox-fork/path/to/style-sheet.css';

function App() {
  return <Map mapLib={import('my-mapbox-fork')} />;
}
```
