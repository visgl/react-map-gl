# Example: Supercluster

This app reproduces Mapbox's [Create and style clusters](https://docs.mapbox.com/mapbox-gl-js/example/cluster/) example.

This example showcases how to visualize points as clusters.

## Usage

To run this example, you need a [Mapbox token](http://visgl.github.io/react-map-gl/docs/get-started/mapbox-tokens). You can either set it as `MAPBOX_TOKEN` in `src/app.js`, or set a `MapboxAccessToken` environment variable in the command line.

```bash
npm i
npm run start
```

Alternative to acquiring a Mapbox token, you can use `maplibre-gl` instead. Follow these steps:
- Run `npm install maplibre-gl`
- In the source, change all `import ... from 'react-map-gl'` to `import ... from 'react-map-gl/maplibre'`
- Change the `mapStyle` prop of `<Map>` to `"https://demotiles.maplibre.org/style.json"` or a self-hosted URL
