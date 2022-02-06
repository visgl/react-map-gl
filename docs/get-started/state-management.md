# State Management

There are two ways to use a [Map](/docs/api-reference/map.md):

- [Uncontrolled](https://reactjs.org/docs/uncontrolled-components.html): The application sets the initial view state (Camera options) when the map is mounted, and the component automatically makes changes to the view states afterwards. This mode works very similarly to the mapbox-gl `Map` class.
- [Controlled](https://reactjs.org/docs/forms.html#controlled-components): The application manages the view state, and pass it to the map via props. The map invokes a callback with a new view state during user interaction transition, and the application can decide what to do with it. This mode is the most powerful when an application has other components that need to interact with the map, or implements its own user input and data handling logic.


## Uncontrolled Map

You may clone a full app configuration for this example [here](https://github.com/visgl/react-map-gl/tree/7.0-release/examples/get-started/basic).

```js
import * as React from 'react';
import Map from 'react-map-gl';

function App() {
  return <Map
    initialViewState={{
      longitude: -100,
      latitude: 40,
      zoom: 3.5
    }}
    mapStyle="mapbox://styles/mapbox/streets-v9"
  />;
}
```

## Controlled Map

You may clone a full app configuration for this example [here](https://github.com/visgl/react-map-gl/tree/7.0-release/examples/get-started/controlled).

```js
import * as React from 'react';
import Map from 'react-map-gl';

function App() {
  const [viewState, setViewState] = React.useState({
    longitude: -100,
    latitude: 40,
    zoom: 3.5
  });

  return <Map
    {...viewState}
    onMove={evt => setViewState(evt.viewState)}
    mapStyle="mapbox://styles/mapbox/streets-v9"
  />;
}
```

A real-world application likely uses more complicated state flows:

- Using map with a state store (Redux) [example](https://github.com/visgl/react-map-gl/tree/7.0-release/examples/get-started/redux)
- Using map with SSR (Next.js) [example](https://github.com/visgl/react-map-gl/tree/7.0-release/examples/get-started/nextjs)


## Custom Camera Constraints

`Map` offers props that set basic constraints for the camera, e.g. `maxBounds`, `minZoom`, `maxPitch`. If you need more complicated logic to constrain the camera, you may use it as a controlled component. The following example restricts the map center inside a GeoJSON geofence:

```js
import * as React from 'react';
import Map from 'react-map-gl';

// npm install @turf/turf
import * as turf from '@turf/turf';

// A circle of 5 mile radius of the Empire State Building
const GEOFENCE = turf.circle([-74.0122106, 40.7467898], 5, {units: 'miles'});

function App() {
  const [viewState, setViewState] = React.useState({
    longitude: -100,
    latitude: 40,
    zoom: 3.5
  });

  const onMove = React.useCallback(({viewState}) => {
    const newCenter = [viewState.longitude, viewState.latitude];
    // Only update the view state if the center is inside the geofence
    if (turf.booleanPointInPolygon(newCenter, GEOFENCE)) {
      setViewState(newCenter);
    }
  }, [])

  return <Map
    {...viewState}
    onMove={onMove}
    mapStyle="mapbox://styles/mapbox/streets-v9"
  />;
}
```
