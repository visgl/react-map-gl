# About Mapbox Tokens

To show maps from a service such as Mapbox you will need to register with Mapbox and get a "token" that you need to provide to your map component. The map component will use the token to identify itself to the mapbox service which then will start serving up map tiles. The token will usually be free until a certain level of traffic is exceeded.

While the token will need to be hard-coded into your application in production, there are several ways to provide a token during development:
* Modify file to specify your Mapbox token,
* Set an environment variable (MapboxAccessToken) - through the use of a webpack loader or browserify transform, see the hello-world examples for details.
* Provide a token in the URL.

To make the maps load, either:
* add `?access_token=TOKEN` to the URL where `TOKEN` is a valid Mapbox access token, or
* set the `MapboxAccessToken` environment variable before running `npm start`
