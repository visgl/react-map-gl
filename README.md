# react-map-gl

react-map-gl provides a [React](http://facebook.github.io/react/) friendly
API wrapper around [Mapbox GL JS](https://www.mapbox.com/mapbox-gl-js/). A webGL
based vector tile mapping library.

WARNING: This project is new and the API may change. There also may be Mapbox
APIs that haven't yet been exposed.

![react-map-gl-screenshots](https://cloud.githubusercontent.com/assets/499192/11028165/49f41da2-86bc-11e5-85eb-9279621ef971.png)

See the interactive docs at: https://uber.github.io/react-map-gl

## Overview

### Installation

```
npm install react-map-gl --save
```

**Note on Bundling:** react-map-gl is extensively tested with `browserify`,
however several users have reported issues when bundling their apps using
`webpack`. As a first step, please consult the
[official mapbox webpack config](https://github.com/mapbox/mapbox-gl-js/blob/master/webpack.config.example.js).
There is also some helpful information from  in the issues and a
[request for help](https://github.com/uber/react-map-gl/issues/112).

### Usage

````js
import MapGL from 'react-map-gl';

<MapGL width={400} height={400} latitude={37.7577} longitude={-122.4376}
  zoom={8} onChangeViewport={(viewport) => {
    const {latitude, longitude, zoom} = viewport;
    // Optionally call `setState` and use the state to update the map.
  }}
/>
````

### Using overlays

react-map-gl provides an overlay API so you can use the built-in visualization
overlays, or create your own. Here's an example of using the build in
ScatterplotOverlay.

````js
import {ScatterplotOverlay} from 'react-map-gl';
// ...
<MapGL {...viewport}>
  <ScatterplotOverlay
    {...viewport}
    locations={locations}
    dotRadius={4}
    globalOpacity={1}
    compositeOperation="screen" />
  // Add additional overlays here...
])
````

#### Built-in Overlays

1. ChoroplethOverlay
2. ScatterplotOverlay
3. DraggablePointsOverlay
4. SVGOverlay
5. CanvasOverlay

**Note:** These overlays are currently not compatible with perspective mode.


### deck.gl overlays

[deck.gl](https://github.com/uber/deck.gl) is a companion module to
`react-map-gl` that provide a number of classic data visualization overlays
(scatterplots, choropleths etc) implemented in WebGL. These overlays are
suitable for large or dynamic data sets, or for use in perspective mode
applications

#### Third party overlays

Third party overlays can also be created. For example, the
[heatmap-overlay](https://github.com/vicapow/react-map-gl-heatmap-overlay) uses
[webgl-heatmap](https://github.com/vicapow/webgl-heatmap) to create geographic
heatmaps.
![heatmap-example](https://cloud.githubusercontent.com/assets/499192/11028150/33f34640-86bc-11e5-9678-3fa1798394d5.gif)

Example usage:

````js
import HeatmapOverlay from 'react-map-gl-heatmap-overlay';
import cities from 'example-cities';
// ...
    render() {
      return <MapGL {...viewport}>
        return <HeatmapOverlay locations={cities} {...viewport}/>
      </MapGL>;
    }
````

Want to create and share your own overlay? Fork the
[react-map-gl-example-overlay](https://github.com/vicapow/react-map-gl-example-overlay)
project to get started.

### Perspective Mode

Perspective mode is exposed using the `pitch` and `bearing` props
(both default to `0`), which will show the map "tilted" `pitch` degrees
(overhead being 0 degrees), looking towards `bearing` (0 degrees is north).

In addition, the `perspectiveEnabled` prop (default: `false`)
will activate mouse handlers that allow the user to change `pitch` and
`bearing` using the mouse while holding down the "command" key.

If `perspectiveEnabled` is not set to `true` then the user will not be able to
change the pitch and bearing, which means that the default props will show
an overhead map and only enable standard pan and zoom mouse actions on that map.

**Note:** Mapbox-gl-js limits the pitch to 60 degrees.

**Note:** When using pitch, several additional fields are passed in the
onViewportChange callback, make sure to pass all received props back to
the component.

**Note:** not all overlays are compatible with perspective mode.
For a set of overlays that do work with perspective mode, look at
[deck.gl](https://github.com/uber/deck.gl).

### Transitions

`react-map-gl` does not expose the transition API for `mapbox-gl-js`
since it is designed to be a stateless component.

Instead it is recommended to use a separate module like
[react-motion](https://github.com/chenglou/react-motion)
to animate properties. An example:

```js
<Motion style={{
  latitude: spring(viewport.latitude, { stiffness: 170, damping: 26, precision: 0.000001 }),
  longitude: spring(viewport.longitude, { stiffness: 170, damping: 26, precision: 0.000001 })
}}>
  {({ latitude, longitude }) => <MapGL
    {...viewport}
    latitude={latitude}
    longitude={longitude}
    mapStyle={mapboxStyle}
  />}
</Motion>
```

### ImmutableJS all the things

The `mapStyle` property of the `MapGL` as well as several of the built in
overlay properties must be provided as
[ImmutableJS](https://facebook.github.io/immutable-js/) objects. This allows
the library to be fast since computing changes to props only involves checking
if the immutable objects are the same instance.

### Use with Redux

If you're using redux, it is relatively simple to hook this component up to
store state in the redux state tree. The simplest way is to take all
properties passed to the `onChangeViewport` function property and add them
directly into the store. This state can then be passed back to `react-map-gl`
without any transformation. You can use the package
[redux-map-gl](https://github.com/Willyham/redux-map-gl) to save writing this
code yourself.

## Development

To develop on this component, install the dependencies and then build and watch
the static files.

```bash
$ npm install
```

To serve example app:

```bash
$ npm start &
$ open "http://localhost:9966/?access_token="`echo $MapboxAccessToken`
```

Where `echo $MapboxAccessToken` returns your Mapbox access token.

Once complete, you can view the component in your browser at
[localhost:9966](http://localhost:9966). Any changes you make will
automatically run the compiler to build the files again.

### Testing

Its difficult to write tests for this component beacuse it uses WebGL.
There are some tests in `test/` but for the most part, as new features
are added, we typically test drive them by running `npm run start` and
play with the demos.

### Contributing

Contributions are welcome. While not necessary, it can be helpful to check with
maintainers before opening your PR. Also, you will need to complete a short open
source contribution form before your pull request can be accepted.

# CHANGE LOG

See [change log](https://github.com/uber/react-map-gl/blob/master/CHANGELOG.md)
