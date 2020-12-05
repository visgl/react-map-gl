# Geolocate Control

![Since v4.1](https://img.shields.io/badge/since-v4.1-green)

This is a React equivalent of Mapbox's [GeolocateControl](https://www.mapbox.com/mapbox-gl-js/api/#geolocatecontrol).

```js
import * as React from 'react';
import { Component } from "react";
import ReactMapGL, {GeolocateControl} from "react-map-gl";

class Map extends Component {
  state = {
    viewport: {longitude: -122.45, latitude: 37.78, zoom: 14}
  }

  render() {
    const {viewport} = this.state;
    return (
      <ReactMapGL {...viewport}
        width="100vw"
        height="100vh"
        onViewportChange={viewport => this.setState({viewport})}>
        <GeolocateControl
          positionOptions={{enableHighAccuracy: true}}
          trackUserLocation={true}
        />
      </ReactMapGL>
    );
  }
}
```

## Properties

Accepts all the options of [Mapbox GeolocateControl](https://docs.mapbox.com/mapbox-gl-js/api/#geolocatecontrol).

##### `onViewportChange` (Function, optional)

Callback when the user interaction with this control requests a viewport update. If provided, will be called instead of the containing [InteractiveMap](/docs/api-reference/interactive-map.md)'s `onViewportChange`.

##### `onGeolocate` (Function, optional)

Callback when Geolocation API position updates. It is called with a Geolocation API [PositionOptions](https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions) object.

##### `positionOptions` (Object)

- default: `{enableHighAccuracy: false, timeout: 6000}`

A Geolocation API [PositionOptions](https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions) object.

##### `fitBoundsOptions` (Object)

- default: `{maxZoom: 15}`

A [fitBounds](/docs/api-reference/web-mercator-viewport.md#fitboundsbounds-options-object) options object to use when the map is panned and zoomed to the user's location. The default is to use a  maxZoom of 15 to limit how far the map will zoom in for very accurate locations.

##### `trackUserLocation` (Boolean)

- default: `false`

If true the Geolocate Control becomes a toggle button and when active the map will receive updates to the user's location as it changes.

##### `showUserLocation` (Boolean)

- default: `true`

By default a dot will be shown on the map at the user's location. Set to false to disable.

##### `showAccuracyCircle` (Boolean)

- default: `true`

By default, if showUserLocation is `true` , a transparent circle will be drawn around the user location indicating the accuracy (95% confidence level) of the user's location. Set to `false` to disable. Always disabled when showUserLocation is `false`.

##### `style` (Object)

A [React style](https://reactjs.org/docs/dom-elements.html#style) object applied to Geolocate control button.

Check [`locate user`](https://github.com/visgl/react-map-gl/tree/5.2-release/examples/locate-user/src/app.js) example for basic styling.

##### `label` (String)

- default: `Geolocate`

Label applied to the Geolocate control button.

##### `auto` (Boolean)

- default: `false`

Programmatically triggers geolocate when set to true. Initializing the component with true triggers inside `componentDidMount` where as changing to true at a later point triggers inside `componentDidUpdate`. Initally setting as or changing to false has no effect.


## Styling

Like its Mapbox counterpart, this control relies on the mapbox-gl stylesheet to work properly. Make sure to add the stylesheet to your page.

## Source

[geolocate-control.js](https://github.com/visgl/react-map-gl/tree/5.2-release/src/components/geolocate-control.js)
