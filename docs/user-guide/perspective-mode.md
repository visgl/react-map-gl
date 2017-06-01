## Perspective Mode

Perspective mode is exposed using the `pitch` and `bearing` props (both default to `0`), which will show the map "tilted" `pitch` degrees (overhead being 0 degrees), looking towards `bearing` (0 degrees is north).

In addition, the `perspectiveEnabled` prop (default: `false`) will activate mouse handlers that allow the user to change `pitch` and `bearing` using the mouse while holding down any function key {command, shift, ctrl, alt}.

If `perspectiveEnabled` is not set to `true` then the user will not be able to change the pitch and bearing, which means that the default props will show an overhead map and only enable standard pan and zoom mouse actions on that map.

**Considerations:**

- Mapbox-gl-js limits the pitch to 60 degrees.
- When using pitch, several additional fields are passed in the onViewportChange callback, make sure to pass all received props back to the component.
- Not all overlays are compatible with perspective mode. For a set of overlays that do work with perspective mode, look at [deck.gl](https://github.com/uber/deck.gl).
