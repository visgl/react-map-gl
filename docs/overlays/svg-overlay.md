# SVG Overlay

Allows applications to overlay data on top of maps using a SVG container.

## Properties

### `redraw` {Function}

Called every time the map updates.

Parameters:
- `width` {Number} - width of the viewport
- `height` {Number} - height of the viewport
- `project` {Function} - get screen position `[x, y]` from geo coordinates `[lng, lat]`
- `unproject` {Function} - get geo coordinates `[lng, lat]` from screen position `[x, y]`

### `style` {Object, optional}

Additional css styles of the `svg` container.

##### `preventScrollZoom` {Boolean} - default: `false`
Block map zoom when scrolling over this component.

##### `preventDragPanRotate` {Boolean} - default: `false`
Block map pan & rotate when dragging this component.

##### `preventClick` {Boolean} - default: `false`
Block map click when clicking on this component.

##### `preventDoubleClickZoom` {Boolean} - default: `false`
Block map zoom when double clicking on this component.
