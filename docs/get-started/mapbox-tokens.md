# About Mapbox Tokens

`react-map-gl` itself is open source and free. It provides a React wrapper for `mapbox-gl`, `maplibre-gl` or compatible projects.
Depending on which base map library you use, you may need a Mapbox token. You will need a Mapbox token if you use:

-  [mapbox-gl@>=2.0.0](https://github.com/mapbox/mapbox-gl-js/releases/tag/v2.0.0) - requires a mapbox access token in order to access the map renderer, and generates billable events regardlesss of whether you are displaying your own maps.
-  `mapbox-gl@1.x` - requires an access token only if you load the map styles and tiles from Mapbox's data service. See "Display Maps Without A Mapbox Token" section below for using non-Mapbox tiles.

To get a Mapbox token, you will need to register on [the Mapbox website](https://www.mapbox.com). The token will be used to identify you and start serving up map tiles. The service is free until a certain level of traffic is exceeded.

There are several ways to provide a token to your app, as showcased in some of the example folders:

* Provide a `mapboxAccessToken` prop to the map component
* Set the `MapboxAccessToken` environment variable (or set `REACT_APP_MAPBOX_ACCESS_TOKEN` if you are using Create React App)
* Provide it in the URL, e.g `?access_token=TOKEN`

We recommend using an environment variable to minimize leaking risks. See [securing Mapbox token](./tips-and-tricks.md#securing-mapbox-token) for examples.

## Display Maps Without A Mapbox Token

It is possible to use the map component without the Mapbox service, if you use another tile source (for example, if you host your own map tiles). Note that this is no longer allowed using `mapbox-gl` v2.0 and above. The options are:

- Use [maplibre-gl](https://maplibre.org/maplibre-gl-js/docs/). See [Get Started](./get-started.md) for how to configure your project.
- Stay on `mapbox-gl@1.x`. react-map-gl plans to continue supporting this release in the foreseeable future, however, this version will not include any of the latest features of the map renderer, nor get any future updates from Mapbox.

To use your own map service, you will need a custom map style that points to your own [tile source](https://maplibre.org/maplibre-style-spec/sources/), and pass it to `Map` using the `mapStyle` prop.

Some alternative map data providers include:

- [MapTiler](https://www.maptiler.com)
- [Amazon Location Service](https://docs.aws.amazon.com/location/latest/developerguide/map-concepts.html)

Useful resources for creating your own map tiles and service:

- [Martin Tile Server](https://maplibre.org/martin/introduction.html)
- [OpenMapTiles](https://openmaptiles.org)
- [Mapbox Vector Tile Spec](https://github.com/mapbox/vector-tile-spec)
- [PMTiles](https://github.com/protomaps/PMTiles)
- [List of open source tools](https://github.com/mapbox/awesome-vector-tiles)

If you are using a third party service that requires header based authentication, you can do this by defining a function to pass to `Map` using the `transformRequest` prop.

An example function:

```ts
const transformRequest = (url, resourceType) => {
  if (resourceType === 'Tile' && url.match('yourTileSource.com')) {
    return {
      url: url,
      headers: { 'Authorization': 'Bearer ' + yourAuthToken }
    }
  }
}
```
