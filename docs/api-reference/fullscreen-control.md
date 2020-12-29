# Fullscreen Control

![Since v4.1](https://img.shields.io/badge/since-v4.1-green)

This is a React equivalent of Mapbox's [FullscreenControl](https://www.mapbox.com/mapbox-gl-js/api/#fullscreencontrol).

```js
import {Component} from 'react';
import ReactMapGL, {FullscreenControl} from 'react-map-gl';

class Map extends Component {
  render() {
    const {viewport, updateViewport} = this.props;
    return (
      <ReactMapGL {...viewport} onViewportChange={updateViewport}>
        <div style={{position: 'absolute', right: 0}}>
          <FullscreenControl container={document.querySelector('body')}/>
        </div>
      </ReactMapGL>
    );
  }
}
```

## Properties

##### `container` (HTMLElement)

`container` is the compatible DOM element which should be made full screen. By default, the map container element will be made full screen.

##### `label` (String)

- default: `Toggle fullscreen`

Label applied to the fullscreen control button.

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

##### `capturePointerMove` (Boolean)

- default: `false`

Stop propagation of pointermove event to the map component. Can be used to stop map from calling the `onMouseMove` or `onTouchMove` callback when this component is hovered.

## Styling

Like its Mapbox counterpart, this control relies on the mapbox-gl stylesheet to work properly. Make sure to add the stylesheet to your page.

## Source
[fullscreen-control.js](https://github.com/visgl/react-map-gl/tree/6.0-release/src/components/fullscreen-control.js)

