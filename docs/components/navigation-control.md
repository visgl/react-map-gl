# Navigation Control

This is a React equivalent of Mapbox's [NavigationControl](https://www.mapbox.com/mapbox-gl-js/api/#navigationcontrol),
which provides zoom buttons and a compass button.

```js
import {Component} from 'react';
import ReactMapGL, {NavigationControl} from 'react-map-gl';

class Map extends Component {
  render() {
    const {viewport, updateViewport} = this.props;
    return (
      <ReactMapGL {...viewport} onViewportChange={updateViewport}>
        <div style={{position: 'absolute', right: 0}}>
          <NavigationControl onViewportChange={updateViewport} />
        </div>
      </ReactMapGL>
    );
  }
}
```

## Properties

##### `onViewportChange` {Function}
Callback when the viewport needs to be updated. See [InteractiveMap](/docs/components/interactive-map.md).

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
