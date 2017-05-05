# Navigation Control

This is a React equivalent of Mapbox's [NavigationControl](https://www.mapbox.com/mapbox-gl-js/api/#navigationcontrol):

```js
import ReactMap, {Marker} from 'react-map-gl';

/* Needs Mapbox's stylesheet to work! */
import 'mapbox-gl/dist/mapbox-gl.css';

export default MyMap = ({viewport, updateViewport}) => {
  return (
    <ReactMap {...viewport} onChangeViewport={updateViewport}>
      <div style={{position: 'absolute', right: 0}}>
        <NavigationControl onChangeViewport={updateViewport} />
      </div>
    </ReactMap>
  );
}
```

## Properties

##### `onChangeViewport` (Function)
Callback when the viewport needs to be updated.
