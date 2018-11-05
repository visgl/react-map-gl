# Custom Components

[Marker](/docs/components/marker.md),
[Popup](/docs/components/popup.md), and
[NavigationControl](/docs/components/navigation-control.md)
all extend the `BaseControl` React component. You may also create your own map control components.

## Example

The following component renders a label "(longitude, latitude)" at the given coordinate:

```js
import React from 'react';
import {BaseControl} from 'react-map-gl';

class CustomMarker extends BaseControl {
  _render() {
    const {longitude, latitude} = this.props;

    const [x, y] = this._context.viewport.project([longitude, latitude]);

    const markerStyle = {
      position: 'absolute',
      background: '#fff',
      left: x,
      top: y
    };

    return (
      <div ref={this._containerRef}
        style={markerStyle} />
        ({longitude}, {latitude})
      </div>
    );
  }
}
```

## Properties

The following properties are handled by the `BaseControl` component:

##### `captureScroll` {Boolean} - default: `false`
Stop propagation of mouse wheel event to the map component. Can be used to stop map from zooming when this component is scrolled.

##### `captureDrag` {Boolean} - default: `true`
Stop propagation of dragstart event to the map component. Can be used to stop map from panning when this component is dragged.

##### `captureClick` {Boolean} - default: `true`
Stop propagation of click event to the map component. Can be used to stop map from calling the `onClick` callback when this component is clicked.

##### `captureDoubleClick` {Boolean} - default: `true`
Stop propagation of dblclick event to the map component. Can be used to stop map from zooming when this component is double clicked.

## Private Members

##### `_containerRef`

A React [ref](https://reactjs.org/docs/refs-and-the-dom.html#creating-refs) object.

Should be assigned to the `ref` prop of the root DOM element of this component. Required to leverage the `capture*` props.

##### `_context`

An object containing the following fields:

- `viewport` {WebMercatorViewport} - the current viewport
- `map` {mapboxgl.Map} - the Mapbox map instance
- `eventManager` {EventManager} - the event manager. Only available if using `InteractiveMap`.
- `isDragging` {Bool} - whether the map is being dragged. Only available if using `InteractiveMap`.


## Private Methods

##### `_render`

Implement this method to render the content of this component. `this._context` is accessible when this method is called.


## Source
[base-control.js](https://github.com/uber/react-map-gl/tree/4.0-release/src/components/base-control.js)
