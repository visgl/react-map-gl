# Navigation Control

This is a React equivalent of Mapbox's [NavigationControl](https://www.mapbox.com/mapbox-gl-js/api/#navigationcontrol):

```js
import ReactMap, {Marker} from 'react-map-gl';

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

## Styling

Like its Mapbox counterpart, this control relies on the mapbox-gl stylesheet to work properly.

You may add the stylesheet to your page:
```
<!-- index.html -->
<link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.37.0/mapbox-gl.css' rel='stylesheet' />
```

Or embed it in your app by using [browserify-css](https://www.npmjs.com/package/browserify-css) with Browserify or [css-loader](https://webpack.github.io/docs/stylesheets.html) with Webpack:
```
/// app.js
import 'mapbox-gl/dist/mapbox-gl.css';
```


## Properties

##### `onChangeViewport` (Function)
Callback when the viewport needs to be updated.
