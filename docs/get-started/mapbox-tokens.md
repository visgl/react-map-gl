# About Mapbox Tokens

`react-map-gl` itself is open source and free. It provides a React wrapper for `mapbox-gl` or derived projects.
Depending on which Mapbox GL JS version (or fork) you use, you may need a Mapbox token. You will need a Mapbox token if you use:

-  `react-map-gl@>=6.0.0`, depending on [mapbox-gl@>=2.0.0](https://github.com/mapbox/mapbox-gl-js/releases/tag/v2.0.0) and above - requires a mapbox access token in order to access the map renderer, and generates billable events regardlesss of whether you are displaying your own maps.
-  `react-map-gl@5.x`, depending on `mapbox-gl@1.x` - requires an access token only if you load the map styles and tiles from Mapbox's data service. See "Display Maps Without A Mapbox Token" section below for using non-Mapbox tiles.

To get a Mapbox token, you will need to register on [their website](https://www.mapbox.com). The token will be used to identify you and start serving up map tiles. The service is free until a certain level of traffic is exceeded.

There are several ways to provide a token to your app, as showcased in some of the example folders:

* Provide a `mapboxApiAccessToken` prop to the map component
* Set the `MapboxAccessToken` environment variable (or set `REACT_APP_MAPBOX_ACCESS_TOKEN` if you are using Create React App)
* Provide it in the URL, e.g `?access_token=TOKEN`
* Provide `mapboxApiUrl` prop to the map component to override the default mapbox API URL

But we would recommend using something like [dotenv](https://github.com/motdotla/dotenv) and put your key in an untracked `.env` file, that will then expose it as a `process.env` variable, with much less leaking risks.

## Display Maps Without A Mapbox Token

It is possible to use the map component without the Mapbox service, if you use another tile source (for example, if you host your own map tiles). Note that this is no longer allowed using mapbox-gl v2.0 and above. The options are:

- Stay on `react-map-gl@5.x` and `mapbox-gl@1.x`. react-map-gl plans to continue supporting this release in the foreseeable future, however, this version will not include any of the latest features of the map renderer, nor get any future updates from Mapbox.
- Use a community fork of mapbox-gl, for example [maplibre-gl](https://www.npmjs.com/package/maplibre-gl). See [using with a mapbox-gl fork](/docs/get-started/get-started.md#using-with-a-mapbox-gl-fork) for how to configure your project.

To use your own map service, you will need a custom Mapbox GL style that points to your own [vector tile source](https://www.mapbox.com/mapbox-gl-js/style-spec/), and pass it to `ReactMapGL` using the `mapStyle` prop. This custom style must match the schema of your tile source.

Open source tile schemas include:

- [TileZen schema](https://tilezen.readthedocs.io/en/latest/layers/)
- [OpenMapTiles schema ](https://openmaptiles.org/schema/)

Some useful resources for creating your own map service:

- [Mapbox Vector Tile Spec](https://www.mapbox.com/developers/vector-tiles/)
- [Open source tools](https://github.com/mapbox/awesome-vector-tiles)

If you are using a third party service that requires header based authentication, you can do this by defining a function to pass to `ReactMapGL` using the `transformRequest` prop.

An example function:

```js
const transformRequest = (url, resourceType) => {
        if (resourceType === 'Tile' && url.match('yourTileSource.com')) {
            return {
                url: url,
                headers: { 'Authorization': 'Bearer ' + yourAuthToken }
            }
        }
    }
```
