## 0.6

### Breaking changes

#### Renaming references of LatLng to LngLat

This is more inline with
[MapboxGL-js](https://github.com/mapbox/mapbox-gl-js/pull/1433) and GeoJSON.

Accessors that were previously `latLngAccessor` are have been renamed to
`lngLatAccessor`.

Rename the viewport prop `startDragLatLng` to `startDragLngLat`.

The `project` function prop passed to overlays now expecteds an array of
the form `[logitude, latitude]` instead of `[latitude, longitude]`.

The `project` function prop now returns an array of `[pixelX, pixelY]` instead
of an object of the form `{x:pixelX, y: pixelY}`.

The `unproject` function prop passed to overlays now returns an array of
the form `[longitude, latitude]` instead of a MapboxGL
[LngLat](https://www.mapbox.com/mapbox-gl-js/api/#LngLat) object.

DraggablePointsOverlay's `locationAccessor` prop was renamed `lngLatAccessor`
to be more consistent with other overlays.