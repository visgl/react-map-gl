# Marker Control

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

## Properties

##### `latitude` {Number} (required)
Latitude of the marker.

##### `longitude` {Number} (required)
Longitude of the marker.

##### `offsetLeft` {Number} - default: `0`
Offset of the marker from the left in pixels, negative number indicates left.

##### `offsetTop` {Number} - default: `0`
Offset of the marker from the top in pixels, negative number indicates up.

##### `captureScroll` {Boolean} - default: `false`
Block map zoom when scrolling over this component.

##### `captureDrag` {Boolean} - default: `true`
Block map pan & rotate when dragging this component.

##### `captureClick` {Boolean} - default: `true`
Block map click when clicking on this component.

##### `captureDoubleClick` {Boolean} - default: `true`
Block map zoom when double clicking on this component.
