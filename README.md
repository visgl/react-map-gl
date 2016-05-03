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
import ScatterplotOverlay from 'react-map-gl/src/overlays/scatterplot.react';
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

#### Built in overlays

1. ChoroplethOverlay
2. ScatterplotOverlay
3. DraggablePointsOverlay
4. SVGOverlay
5. CanvasOverlay

#### Third party overlays

Other third party overlays can also be created. For example, the
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


### ImmutableJS all the things

The `mapStyle` property of the `MapGL` as well as several of the built in
overlay properties must be provided as
[ImmutableJS](https://facebook.github.io/immutable-js/) objects. This allows
the library to be fast since computing changes to props only involves checking
if the immutable objects are the same instance.


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
[localhost:9966](http://localhost:9966). Any changes you make will automatically
run the compiler to build the files again.

### Testing

It's particularly difficult to write tests for this component beacuse it uses WebGL. There are some tests in `test/` but for the most part, as new features are added, we typically test drive them by running `npm run start` and play with the demos.

# CHANGE LOG

### 0.6

Support for React 0.14 as well as several other API changes

### Breaking changes

#### No longer provide viewport props transparently to overlay children.

Require viewport props to be explicitly provided to overlays. Previously,
viewport overlay props all had to be optional because the elements were created
once and then cloned inside of `<MapGL>`. This also made it difficult to follow
what props were being passed automatically to overlays. In addition, it meant
that overlays could only be direct children of the `<MapGL>` element.

This shouldn't require changes to overlays, other than marking viewport props
as required. It will only involve passing the needed props explicitly to
overlays.

Old way:

```js
<MapGL {...viewport}>
  <Overlay1 />
  <Overlay2 />
</MapGL>
```

New way:

```js
<MapGL {...viewport}>
  <Overlay1 {...viewport}/>
  <Overlay2 {...viewport}/>
</MapGL>
```

For any third party overlay's that depend on `project` or `unproject` props,
either update them to calculate the `project`/`unproject` functions from the
viewport using the [ViewportMercatorProject](github.com/uber-common/viewport-mercator-project) module or provide them explicitly in the same render function as the
`<MapGL/>` component. example:

```js
import ViewportMercator from 'viewport-mercator-project';
// ...
  render() {
    const mercator = ViewportMercator(this.state.viewport);
    return <MapGL ...viewport>
      <Overlay1
        project={mercator.project}
        unproject={this.mercator.unproject
        {...viewport}/>
      {/* or equivalently */}
      <Overlay2 {...mercator} {...viewport}/>
    </MapGL>;
  }
</MapGL>
```

#### Swapping LatLng for LngLat

This is more inline with
[MapboxGL-js](https://github.com/mapbox/mapbox-gl-js/pull/1433) and GeoJSON.

Accessors that were previously `latLngAccessor` are have been renamed to
`lngLatAccessor`.

Rename the viewport prop `startDragLatLng` to `startDragLngLat`.

The `project` function prop passed to overlays now expecteds an array of
the form `[longitude, latitude]` instead of `[latitude, longitude]`.

The `project` function prop now returns an array of `[pixelX, pixelY]` instead
of an object of the form `{x:pixelX, y: pixelY}`.

The `unproject` function prop passed to overlays now returns an array of
the form `[longitude, latitude]` instead of a MapboxGL
[LngLat](https://www.mapbox.com/mapbox-gl-js/api/#LngLat) object.

DraggablePointsOverlay's `locationAccessor` prop was renamed `lngLatAccessor`
to be more consistent with other overlays.

#### `bbox` property of the `onChangeViewport` event was removed

This should be calculated instead using the [ViewportMercatorProject](github.com/uber-common/viewport-mercator-project) module instead.

```js
const mercator = ViewportMercator(viewport);
const bbox = [mercator.unproject([0, 0]), mercator.unproject([width, height])];
```

### Non-breaking changes

`unproject` was added to the arguments passed to the `redraw` callback in the
`CanvasOverlay`.


## Disclaimer

This project is not affiliated with either Facebook or Mapbox.

## Example Data

1. SF GeoJSON data from: [SF OpenData](http://data.sfgov.org).
