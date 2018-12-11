# About Mapbox Tokens

react-map-gl and the underlying Mapbox GL JS libraries are open source and free to use. However, to load the map styles and tiles from Mapbox's data service, you will need to register on their website in order to retrieve an access token required by the map component, which will be used to identify you and start serving up map tiles. The service will be free until a certain level of traffic is exceeded.

There are several ways to provide a token to your app, as showcased in some of the example folders:

* Set the `MapboxAccessToken` environment variable
* Provide it in the URL, e.g `?access_token=TOKEN`
* Pass it as a prop to the ReactMapGL instance `<ReactMapGL mapboxApiAccessToken={TOKEN} />`

But we would recommend using something like [dotenv](https://github.com/motdotla/dotenv) and put your key in an untracked `.env` file, that will then expose it as a `process.env` variable, with much less leaking risks.

## Display Maps Without A Mapbox Token

It is possible to use the map component without the paid service, if you host your own map tiles. You will need a custom Mapbox style that points to your own [vector tile source](https://www.mapbox.com/mapbox-gl-js/style-spec/#sources-vector), and pass it to `ReactMapGL` using the `mapStyle` prop.

Some useful resources for creating your own map service:

- [Mapbox Vector Tile Spec](https://www.mapbox.com/developers/vector-tiles/)
- [Open source tools](https://github.com/mapbox/awesome-vector-tiles)
