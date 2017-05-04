# Marker Control

This is a React equivalent of Mapbox's [Marker Control](https://www.mapbox.com/mapbox-gl-js/api/#marker):

```js
import ReactMap, {Marker} from 'react-map-gl';

export default MyMap = () => {
  return (
    <ReactMap latitude={-122.41} longitude={37.78} zoom={8}>
      <Marker latitude={-122.41} longitude={37.78} offsetLeft={-20} offsetTop={-10}>
        <div>You are here</div>
      </Marker>
    </ReactMap>
  );
}
```

## Properties

##### `latitude` (Number)
Latitude of the marker.

##### `longitude` (Number)
Longitude of the marker.

##### `offsetLeft` (Number, optional)
Offset of the marker from the left in pixels, negative number indicates left.

##### `offsetTop` (Number, optional)
Offset of the marker from the top in pixels, negative number indicates up.
