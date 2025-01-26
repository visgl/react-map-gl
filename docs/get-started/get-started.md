# Get Started

You may find complete project setups in [get-started examples](https://github.com/visgl/react-map-gl/tree/8.0-release/examples/get-started).

## Installation

Using `react-map-gl` requires `node >= 12` and `react >= 16.3`.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="map-library">
  <TabItem value="mapbox" label="Mapbox">

```bash
npm install react-map-gl mapbox-gl @types/mapbox-gl
```

  </TabItem>
  <TabItem value="maplibre" label="Maplibre">

```bash
npm install react-map-gl maplibre-gl
```

  </TabItem>
</Tabs>

## Example

<Tabs groupId="map-library">
  <TabItem value="mapbox" label="Mapbox">

```tsx title="app.tsx"
import * as React from 'react';
import Map from 'react-map-gl/mapbox';
// If using with mapbox-gl v1:
// import Map from 'react-map-gl/mapbox-legacy';
import 'mapbox-gl/dist/mapbox-gl.css';

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
import 'maplibre-gl/dist/maplibre-gl.css';

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

The above example code imports the CSS file directly into the app. Most bundlers support this syntax out-of-the-box or with an official plugin.

Alternatively, you may add the stylesheet to the head of your page:

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
