# Canvas Overlay

Allows applications to overlay data on top of maps using a canvas.

## Properties

### `redraw` {Function}

Called every time the map updates.

Parameters:
- `ctx` {CanvasRenderingContext2D} - rendering context of the canvas
- `width` {Number} - width of the viewport
- `height` {Number} - height of the viewport
- `project` {Function} - get screen position `[x, y]` from geo coordinates `[lng, lat]`
- `unproject` {Function} - get geo coordinates `[lng, lat]` from screen position `[x, y]`

##### `captureScroll` {Boolean} - default: `false`
Stop propagation of mouse wheel event to the map component. Can be used to stop map from zooming when this component is scrolled.

##### `captureDrag` {Boolean} - default: `false`
Stop propagation of dragstart event to the map component. Can be used to stop map from panning when this component is dragged.

##### `captureClick` {Boolean} - default: `false`
Stop propagation of click event to the map component. Can be used to stop map from calling the `onClick` callback when this component is clicked.

##### `captureDoubleClick` {Boolean} - default: `false`
Stop propagation of dblclick event to the map component. Can be used to stop map from zooming when this component is double clicked.


## Source
[canvas-overlay.js](https://github.com/uber/react-map-gl/tree/5.1-release/src/overlays/canvas-overlay.js)

