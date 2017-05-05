# Popup Control

This is a React equivalent of Mapbox's [Popup Control](https://www.mapbox.com/mapbox-gl-js/api/#popup):

```js
import ReactMap, {Popup} from 'react-map-gl';

export default MyMap = () => {
 return (
  <ReactMap latitude={-122.41} longitude={37.78} zoom={8}>
   <Popup latitude={-122.41} longitude={37.78}
     closeButton={true} closeOnClick={false}
     anchor="top" >
    <div>You are here</div>
   </Popup>
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

##### `latitude` (Number)
Latitude of the marker.

##### `longitude` (Number)
Longitude of the marker.

##### `offsetLeft` (Number, optional)
Offset of the marker from the left in pixels, negative number indicates left.

##### `offsetTop` (Number, optional)
Offset of the marker from the top in pixels, negative number indicates up.

##### `closeButton` (Boolean, optional)
If `true`, a close button will appear in the top right corner of the popup.
Default `true`.

##### `closeOnClick` (Boolean, optional)
If `true`, the popup will closed when the map is clicked.
Default `true`.

##### `tipSize` (Number, optional)
Size of the tip pointing to the coordinate.
Default `10`.

##### `anchor` (String, optional)
A string indicating the popup's position relative to the coordinate.
Options are `top`, `bottom`, `left`, `right`, `top-left`, `top-right`, `bottom-left`, and `bottom-right`.

##### `dynamicPosition` (Boolean, optional)
If `true`, the anchor will be dynamically adjusted to ensure the popup falls within the map container.
Default `true`.

##### `onClose` (Function, optional)
Callback when the user closes the popup.
