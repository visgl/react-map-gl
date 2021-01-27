# MapContext

![Since v5.3](https://img.shields.io/badge/since-v5.3-green)

`MapContext` allows components to interact with `InteractiveMap` or `StaticMap` via React's [context](https://reactjs.org/docs/context.html) API.

```js
import * as React from 'react';
import MapGL, {MapContext} from 'react-map-gl';

function CurrentZoomLevel() {
  const context = React.useContext(MapContext);

  return <div>{context.viewport.zoom}</div>;
}

function App() {
  return (
    <MapGL latitude={37.78} longitude={-122.41} zoom={8}>
      <div style={{position: 'absolute', right: 20, bottom: 20}}>
        <CurrentZoomLevel />
      </div>
    </MapGL>
  );
}
```

It is also possible to consume `MapContext` outside the map component, if you render your own `Provider`. Note that not all context fields are available if you use it this way.

```js
import * as React from 'react';
import MapGL, {MapContext} from 'react-map-gl';

function MyComponent() {
  const {map} = React.useContext(MapContext);

  if (map) {
    // do something
  }

  return null;
}

function App() {
  return (
    <MapContext.Provider>
      <div>
        <MapGL latitude={37.78} longitude={-122.41} zoom={8}>
          <div style={{position: 'absolute', right: 20, bottom: 20}}>
            <CurrentZoomLevel />
          </div>
        </MapGL>
        <div>
          <MyComponent />
        </div>
      </div>
    </MapContext.Provider>
  );
}
```

## Fields

The context value object may contain the following fields:

- `map` (Map) - the mapbox-gl [Map]((https://www.mapbox.com/mapbox-gl-js/api/#map)) instance
- `viewport` (WebMercatorViewport) - the current viewport
- `container` (HTMLDivElement) - the outer container of the map component
- `onViewportChange` (Function) - a callback invoked when a map control requests a viewport change, with the signature `onViewportChange(viewState, interactionState, oldViewState)`
- `onViewStateChange` (Function) - an alternative callback invoked when a map control requests a viewport change, with the signature `onViewStateChange({viewState, interactionState, oldViewState})`
- `eventManager` (EventManager) - an [EventManager](https://uber-web.github.io/mjolnir.js/docs/api-reference/event-manager) instance used to register all interactive events


## Source

[map-context.js](https://github.com/visgl/react-map-gl/tree/6.1-release/src/components/map-context.js)
