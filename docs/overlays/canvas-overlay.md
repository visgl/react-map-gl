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
Block map zoom when scrolling over this component.

##### `captureDrag` {Boolean} - default: `false`
Block map pan & rotate when dragging this component.

##### `captureClick` {Boolean} - default: `false`
Block map click when clicking on this component.

##### `captureDoubleClick` {Boolean} - default: `false`
Block map zoom when double clicking on this component.
