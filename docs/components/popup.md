# Popup Control

This is a React equivalent of Mapbox's [Popup Control](https://www.mapbox.com/mapbox-gl-js/api/#popup), which can be used to
show tooltip popups with custom HTML content at specific locations on the map.

```js
import {Component} from 'react';
import ReactMapGL, {Popup} from 'react-map-gl';

class Map extends Component {
  render() {
    return (
      <ReactMapGL latitude={-122.41} longitude={37.78} zoom={8}>
        <Popup latitude={-122.41} longitude={37.78} closeButton={true} closeOnClick={false} anchor="top">
          <div>You are here</div>
        </Popup>
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

##### `closeButton` {Boolean} - default: `true`
If `true`, a close button will appear in the top right corner of the popup.

##### `closeOnClick` {Boolean} - default: `true`
If `true`, the popup will closed when the map is clicked.

##### `tipSize` {Number} - default: `10`
Size of the tip pointing to the coordinate.

##### `anchor` {String} - default: `bottom`
A string indicating the popup's position relative to the coordinate.
Options are `top`, `bottom`, `left`, `right`, `top-left`, `top-right`, `bottom-left`, and `bottom-right`.

##### `dynamicPosition` {Boolean} - default: `true`
If `true`, the anchor will be dynamically adjusted to ensure the popup falls within the map container.

##### `onClose` {Function}
Callback when the user closes the popup.

##### `captureScroll` {Boolean} - default: `false`
Stop propagation of mouse wheel event to the map component. Can be used to stop map from zooming when this component is scrolled.

##### `captureDrag` {Boolean} - default: `true`
Stop propagation of dragstart event to the map component. Can be used to stop map from panning when this component is dragged.

##### `captureClick` {Boolean} - default: `true`
Stop propagation of click event to the map component. Can be used to stop map from calling the `onClick` callback when this component is clicked.

##### `captureDoubleClick` {Boolean} - default: `true`
Stop propagation of dblclick event to the map component. Can be used to stop map from zooming when this component is double clicked.


## Styling

Like its Mapbox counterpart, this control relies on the mapbox-gl stylesheet to work properly. Make sure to add the stylesheet to your page.
