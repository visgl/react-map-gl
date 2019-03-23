# Geolocate Control

This is a React equivalent of Mapbox's [GeolocateControl](https://www.mapbox.com/mapbox-gl-js/api/#geolocatecontrol).

```js
import React, { Component } from "react";
import ReactMapGL, {GeolocateControl} from "react-map-gl";

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        width: 800,
        height: 600,
        longitude: -122.45,
        latitude: 37.78,
        zoom: 14
      }
    }
  }
  
  _updateViewport = (viewport) => {
    this.setState({viewport});
  }
  
  render() {
    const {viewport} = this.state;
    return (
      <ReactMapGL {...viewport} onViewportChange={updateViewport}>
        <GeolocateControl 
          positionOptions={{enableHighAccuracy: true}}
          trackUserLocation={true}
          onViewportChange={this._updateViewport}
        />
      </ReactMapGL>
    );
  }
}
```

## Properties

##### `onViewportChange` {Function}

Callback when the viewport needs to be updated. See [InteractiveMap](/docs/components/interactive-map.md).


Accepts all the options of [Mapbox GeolocatControl](https://docs.mapbox.com/mapbox-gl-js/api/#geolocatecontrol).

##### `positionOptions` {Object} - default: `{enableHighAccuracy:false, timeout:6000}`

A Geolocation API [PositionOptions](https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions) object.

##### `fitBoundsOptions` {Object} - default: `{maxZoom: 15}`

A [fitBounds](https://docs.mapbox.com/mapbox-gl-js/api/#map#fitbounds) options object to use when the map is panned and zoomed to the user's location. The default is to use a  maxZoom of 15 to limit how far the map will zoom in for very accurate locations.

##### `trackUserLocation` {Boolean} - default: `false`

If true the Geolocate Control becomes a toggle button and when active the map will receive updates to the user's location as it changes.

##### `showUserLocation` {Boolean} - default: `true`

By default a dot will be shown on the map at the user's location. Set to false to disable.

##### `style` {Object} - default: `{}` 

A [React style](https://reactjs.org/docs/dom-elements.html#style) object applied to Geolocate control button.

Check [`locate user`](https://github.com/uber/react-map-gl/blob/master/examples/locate-user/src/app.js) example for basic styling.

## Styling

Like its Mapbox counterpart, this control relies on the mapbox-gl stylesheet to work properly. Make sure to add the stylesheet to your page.

## Source

[geolocate-control.js](https://github.com/uber/react-map-gl/tree/master/src/components/geolocate-control.js)
