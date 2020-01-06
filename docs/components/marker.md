# Marker Control

![Since v3.0](https://img.shields.io/badge/since-v3.0-green)

This is a React equivalent of Mapbox's
[Marker Control](https://www.mapbox.com/mapbox-gl-js/api/#marker), which can
be used to render custom icons at specific locations on the map.

```js
import {Component} from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';

class Map extends Component {
  render() {
    return (
      <ReactMapGL latitude={37.78} longitude={-122.41} zoom={8}>
        <Marker latitude={37.78} longitude={-122.41} offsetLeft={-20} offsetTop={-10}>
          <div>You are here</div>
        </Marker>
      </ReactMapGL>
    );
  }
}
```

Performance notes: if a large number of markers are needed, it's generally favorable to cache the `<Marker>` nodes, so that we don't rerender them when the viewport changes.

```js
import React, {PureComponent} from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';

const CITIES = [...];

// PureComponent ensures that the markers are only rerendered when data changes
class Markers extends PureComponent {
  render() {
    const {data} = this.props;
    return data.map(
      city => <Marker key={city.name} longitude={city.longitude} latitude={city.latitude} ><img src="pin.png" /></Marker>
    )
  }
}

class Map extends PureComponent {
  state = {
    viewport: {
      latitude: 37.78,
      longitude: -122.41,
      zoom: 8
    }
  };

  render() {
    return (
      <ReactMapGL {...this.state.viewport} onViewportChange={viewport => this.setState({viewport})}>
        <Markers data={CITIES} />
      </ReactMapGL>
    );
  }
}
```


## Properties

##### `latitude` {Number} (required)
Latitude of the marker.

##### `longitude` {Number} (required)
Longitude of the marker.

##### `offsetLeft` {Number} - default: `0`
Offset of the marker from the left in pixels, negative number indicates left.

##### `offsetTop` {Number} - default: `0`
Offset of the marker from the top in pixels, negative number indicates up.

##### `draggable` {Boolean} - default `false`
Allows this marker component to be dragged around the map. (Use `onDragEnd` to capture the final position and update `longitude` and `latitude`).

##### `onDragStart` {Function}
Called when a draggable marker starts being dragged.

Parameters
- `event` - The pointer event.
  + `event.lngLat` - The geo coordinates where the drag started, as `[lng, lat]`.

##### `onDrag` {Function}
Continuously called while a draggable marker is being dragged.

Parameters
- `event` - The pointer event.
  + `event.lngLat` - The geo coordinates of the drag event, as `[lng, lat]`.

##### `onDragEnd` {Function}
Called when a draggable marker is released at its final position. This is usually a good time to capture `event.lngLat` and update the marker's `longitude` and `latitude` props.

Parameters
- `event` - The pointer event.
  + `event.lngLat` - The geo coordinates where the drag ended, as `[lng, lat]`.

##### `captureScroll` {Boolean} - default: `false`
Stop propagation of mouse wheel event to the map component. Can be used to stop map from zooming when this component is scrolled.

##### `captureDrag` {Boolean} - default: `true`
Stop propagation of dragstart event to the map component. Can be used to stop map from panning when this component is dragged. Automatically true if `draggable` is `true`.

##### `captureClick` {Boolean} - default: `true`
Stop propagation of click event to the map component. Can be used to stop map from calling the `onClick` callback when this component is clicked.

##### `captureDoubleClick` {Boolean} - default: `true`
Stop propagation of dblclick event to the map component. Can be used to stop map from zooming when this component is double clicked.

## Styling

Like its Mapbox counterpart, this control relies on the mapbox-gl stylesheet to work properly. Make sure to add the stylesheet to your page.

## Source
[marker.js](https://github.com/uber/react-map-gl/tree/5.2-release/src/components/marker.js)

