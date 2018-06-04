# About Mapbox Tokens

To show maps from a service such as Mapbox you will need to register on their website in order to retrieve an access token required by the map component, which will be used to identify you and start serving up map tiles. The service will be free until a certain level of traffic is exceeded.

There are several ways to provide a token to your app, as showcased in some of the example folders:

* Modify the source directly
* Set the `MapboxAccessToken` environment variable
* Provide it in the URL, e.g `?access_token=TOKEN`
* Pass it as a prop to the ReactMapGL instance `<ReactMapGL mapboxApiAccessToken={TOKEN} />`

But we would recommend using something like [dotenv](https://github.com/motdotla/dotenv) and put your key in an untracked `.env` file, that will then expose it as a `process.env` variable, with much less leaking risks.
