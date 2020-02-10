# Navigation Control

![Since v3.0](https://img.shields.io/badge/since-v3.0-green)

This is a React equivalent of Mapbox's [NavigationControl](https://www.mapbox.com/mapbox-gl-js/api/#navigationcontrol),
which provides zoom buttons and a compass button.

```js
import React, {Component} from 'react';
import ReactMapGL, {NavigationControl} from 'react-map-gl';

class Map extends Component {
  state = {
    viewport: {longitude: -122.45, latitude: 37.78, zoom: 12}
  };

  render() {
    const {viewport} = this.state;
    return (
      <ReactMapGL {...viewport}
        width="100vw"
        height="100vh"
        onViewportChange={viewport => this.setState({viewport})}>
        <div style={{position: 'absolute', right: 0}}>
          <NavigationControl />
        </div>
      </ReactMapGL>
    );
  }
}
```

## Properties

##### `onViewportChange` (Function)

Callback when the user interaction with this control requests a viewport update. If provided, will be called instead of the containing [InteractiveMap](/docs/api-reference/interactive-map.md)'s `onViewportChange`.

##### `showCompass` (Boolean)

- default: `true`

Show or hide the compass button

##### `showZoom` (Boolean)

- default: `true`

Show or hide the zoom buttons

##### `captureScroll` (Boolean)

- default: `false`

Stop propagation of mouse wheel event to the map component. Can be used to stop map from zooming when this component is scrolled.

##### `captureDrag` (Boolean)

- default: `true`

Stop propagation of dragstart event to the map component. Can be used to stop map from panning when this component is dragged.

##### `captureClick` (Boolean)

- default: `true`

Stop propagation of click event to the map component. Can be used to stop map from calling the `onClick` callback when this component is clicked.

##### `captureDoubleClick` (Boolean)

- default: `true`

Stop propagation of dblclick event to the map component. Can be used to stop map from zooming when this component is double clicked.

##### `zoomInLabel` (String)

- default: `Zoom In`

Label applied to the zoom in control button.

##### `zoomOutLabel` (String)

- default: `Zoom Out`

Label applied to the zoom out control button.

##### `compassLabel` (String)

- default: `Reset North`

Label applied to the compass control button.

## Styling

Like its Mapbox counterpart, this control relies on the mapbox-gl stylesheet to work properly. Make sure to add the stylesheet to your page.

## Source

[navigation-control.js](https://github.com/uber/react-map-gl/tree/5.2-release/src/components/navigation-control.js)

