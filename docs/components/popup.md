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

## Styling

Like its Mapbox counterpart, this control relies on the mapbox-gl stylesheet to work properly.

You may add the stylesheet to your page:
```html
<!-- index.html -->
<link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.37.0/mapbox-gl.css' rel='stylesheet' />
```

Or embed it in your app by using - [browserify-css](https://www.npmjs.com/package/browserify-css)
with Browserify or - [css-loader](https://webpack.github.io/docs/stylesheets.html) with Webpack:
```js
// app.js
import 'mapbox-gl/dist/mapbox-gl.css';
```
