# react-map-gl Example: Using Map with a State Management System

This example shows how to use react-map-gl's Map component with react-redux.

## Usage

To run this example, you need a [Mapbox token](http://visgl.github.io/react-map-gl/docs/get-started/mapbox-tokens). You can either set it as `MAPBOX_TOKEN` in `map.js`, or set a `MapboxAccessToken` environment variable in the command line.

Alternative to acquiring a Mapbox token, you can install `maplibre-gl` and change all `import from 'react-map-gl/mapbox'` to `import from 'react-map-gl/maplibre'`. You also need to supply a third-party or self-hosted `mapStyle` URL.

```bash
npm i
npm run start
```

To build a production version:

```bash
npm run build
```
