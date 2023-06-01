# Get Started

You may find complete project setups in [get-started examples](https://github.com/visgl/react-map-gl/tree/7.0-release/examples/get-started).

## Installation

Using `react-map-gl` requires `node >= 12` and `react >= 16.3`.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="map-library">
  <TabItem value="mapbox" label="Mapbox">

```bash
npm install --save react-map-gl mapbox-gl @types/mapbox-gl
```

  </TabItem>
  <TabItem value="maplibre" label="Maplibre">

```bash
npm install --save react-map-gl maplibre-gl
```

  </TabItem>
</Tabs>

## Example

<Tabs groupId="map-library">
  <TabItem value="mapbox" label="Mapbox">

```tsx title="app.tsx"
import * as React from 'react';
import Map from 'react-map-gl';

function App() {
  return (
    <Map
      mapboxAccessToken="<Mapbox access token>"
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

See [about Mapbox tokens](./mapbox-tokens.md) for alternatives to providing a Mapbox token.

  </TabItem>
  <TabItem value="maplibre" label="Maplibre">

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
      mapStyle="https://api.maptiler.com/maps/streets/style.json?key=get_your_own_key"
    />
  );
}
```

  </TabItem>
</Tabs>


## Styling

The base map library requires its stylesheet be included at all times. The marker, popup and navigation components in react-map-gl also need the stylesheet to work properly.

You may add the stylesheet to the head of your page:

<Tabs groupId="map-library">
  <TabItem value="mapbox" label="Mapbox">

```html title="index.html"
<link href='https://api.tiles.mapbox.com/mapbox-gl-js/v<YOUR_MAPBOX_VERSION>/mapbox-gl.css' rel='stylesheet' />
```

Find out your mapbox version by running `yarn list mapbox-gl` or `npm ls mapbox-gl`.

  </TabItem>
  <TabItem value="maplibre" label="Maplibre">

```html title="index.html"
<link href='https://unpkg.com/maplibre-gl@<YOUR_MAPLIBRE_VERSION>/dist/maplibre-gl.css' rel='stylesheet' />
```

Find out your maplibre version by running `yarn list maplibre-gl` or `npm ls maplibre-gl`.

  </TabItem>
</Tabs>

Or embed it in your app by using [css-loader](https://webpack.github.io/docs/stylesheets.html) with Webpack or [postcss](https://www.npmjs.com/package/rollup-plugin-postcss) with rollup:

<Tabs groupId="map-library">
  <TabItem value="mapbox" label="Mapbox">

```ts title="app.tsx"
import 'mapbox-gl/dist/mapbox-gl.css';
```

  </TabItem>
  <TabItem value="maplibre" label="Maplibre">

```ts title="app.tsx"
import 'maplibre-gl/dist/maplibre-gl.css';
```

  </TabItem>
</Tabs>


## Using with a Compatible Fork

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
