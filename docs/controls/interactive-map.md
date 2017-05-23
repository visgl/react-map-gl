# InteractiveMap


## Properties

Additional props on top of [StaticMap]()

### maxZoom (number)

Max zoom level

### minZoom (number)

Min zoom level

### maxPitch (number)

Max pitch in degrees

### minPitch (number)

Min pitch in degrees


### onChangeViewport

`onChangeViewport` callback is fired when the user interacted with the map. The object passed to the callback contains viewport properties such as `longitude`, `latitude`, `zoom` and additional interaction state information.

### perspectiveEnabled (bool)

Enables perspective control event handling

### isHovering (bool)
### isDragging (bool)

Is the component currently being dragged. This is used to show/hide the drag cursor. Also used as an optimization in some overlays by preventing rendering while dragging.

### mapControls (shape()
    events (arrayOf(PropTypes.string))
    setState (func)
    handle (fun)
  })

  // A map control instance to replace the default map controls
  // The object must expose one property: `events` as an array of subscribed
  // event names; and two methods: `setState(state)` and `handle(event)`
