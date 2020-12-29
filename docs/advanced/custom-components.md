# Custom Components

You may create your own map control components by consuming [MapContext](/docs/api-reference/map-context.md).

## Using the MapContext

The following component renders a label "(longitude, latitude)" at the given coordinate:

```js
import * as React from 'react';
import MapGL, {MapContext} from 'react-map-gl';

function CustomMarker(props) {
  const context = React.useContext(MapContext);
  
  const {longitude, latitude} = props;

  const [x, y] = context.viewport.project([longitude, latitude]);

  const markerStyle = {
    position: 'absolute',
    background: '#fff',
    left: x,
    top: y
  };

  return (
    <div style={markerStyle} >
      ({longitude}, {latitude})
    </div>
  );
}

function App() {
  return (
    <MapGL longitude={-122.45} latitude={37.78} zoom={12} mapboxApiAccessToken={MAPBOX_TOKEN}>
      <CustomeMarker longitude={-122.45} latitude={37.78} />
    </MapGL>
  )
}
```

## Using the useMapControl hook

`useMapControl` is an experimental API that makes it easier to create controls with event handling.

```js
import * as React from 'react';
import MapGL, {_useMapControl as useMapControl} from 'react-map-gl';

function CustomControl(props) {
  const [counter, setCounter] = React.useState(0);
  const {context, containerRef} = useMapControl({
    onDragStart: evt => {
      // prevent the base map from panning
      evt.stopPropagation();
    },
    onClick: evt => {
      if (evt.type === 'click') {
        setCounter(v => v + 1);
      }
    }
  });

  return (
    <div ref={containerRef} >
      Clicked {counter} times
    </div>
  );
}

function App() {
  return (
    <MapGL longitude={-122.45} latitude={37.78} zoom={12} mapboxApiAccessToken={MAPBOX_TOKEN}>
      <CustomControl />
    </MapGL>
  )
}
```

Calling `useMapControl(opts)` returns an object containing the following fields:

- `context` (MapContext) - the current context value
- `containerRef` (RefObject) - this should be assigned to the `ref` prop of the DOM element that the event listeners should attach to.

This hook supports the following options:

- `onScroll` (Function) - called on mouse wheel event. Can be used to stop map from zooming when this component is scrolled.
- `onDragStart` (Function) - called on dragstart event. Can be used to stop map from panning when this component is dragged.
- `onClick` (Function) - called on click event. Can be used to stop map from calling the `onClick` callback when this component is clicked.
- `onDoubleClick` (Function) - called on double click event. Can be used to stop map from zooming when this component is double clicked.
- `onPointerMove` (Function) - called on pointermove event. Can be used to stop map from calling the `onMouseMove` or `onTouchMove` callback when this component is hovered.
