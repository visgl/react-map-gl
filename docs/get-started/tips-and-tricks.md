# Tips and Tricks

## Securing Mapbox Token

Because Mapbox tokens are required for the client application to make requests to Mapbox servers, you have to distribute it with your app. It is not possible to stop a visitor to your site from scraping the token. The practice outlined below can help you protect your token from being abused.

- Never commit your token in clear text into GitHub or other source control.
- In your local dev environment, define the token in an environment variable e.g. `MapboxAccessTokenDev=...` in the command line, or use something like [dotenv](https://github.com/motdotla/dotenv) and put `MapboxAccessTokenDev=...` in a `.env` file. Add `.env` to `.gitignore` so it's never tracked. If your app is deployed by a continuous integration pipeline, follow its documentation and set a secret environment variable.
- Create separate tokens for development (often times on `http://localhost`), public code snippet (Gist, Codepen etc.) and production (deployed to `https://mycompany.com`). The public token should be rotated regularly. The production token should have strict [scope and URL restrictions](https://docs.mapbox.com/help/troubleshooting/how-to-use-mapbox-securely/#access-tokens) that only allows it to be used on a domain that you own.
- Add the following to your bundler config:

  ```js
  /// webpack.config.js
  const {DefinePlugin} = require('webpack');

  module.exports = {
    ...
    plugins: [
      new DefinePlugin({
        'process.env.MapboxAccessToken': JSON.stringify(process.env.NODE_ENV == 'production' ? process.env.MapboxAccessTokenProd : process.env.MapboxAccessTokenDev)
      })
    ]
  };
  ```

  ```js
  /// rollup.config.js
  const replace = require('@rollup/plugin-replace').default;

  module.exports = {
    ...
    plugins: [
      replace({ 
        'process.env.MapboxAccessToken': JSON.stringify(process.env.NODE_ENV == 'production' ? process.env.MapboxAccessTokenProd : process.env.MapboxAccessTokenDev)
      })
    ]
  };
  ```

  react-map-gl automatically picks up `process.env.MapboxAccessToken` or `process.env.REACT_APP_MAPBOX_ACCESS_TOKEN` if they are defined. Alternatively, you can use your own variable name (e.g. `__SUPER_SECRET_TOKEN__`) and pass it in manually with `mapboxAccessToken={__SUPER_SECRET_TOKEN__}`.


## Minimize Cost from Frequent Re-mounting

In a moderately complex single-page app, as the user navigates through the UI, a map component may unmount and mount again many times during a session. Consider the following layout:

```jsx
/// Example using Tabs from Material UI
<TabContext value={selectedTab}>
  <TabList onChange={handleTabChange}>
    <Tab label="Map" value="map" />
    <Tab label="List" value="table" />
  </TabList>
  <TabPanel value="map">
    <Map
      mapStyle="mapbox://styles/mapbox/streets-v9" >
      {items.map(renderMarker)}
    </Map>
  </TabPanel>
  <TabPanel value="table">
    <Table>
      {items.map(renderRow)}
    </Table>
  </TabPanel>
</TabContext>
```

Every time the user clicks the "table" tab, the map is unmounted. When they click the "map" tab, the map is mounted again. As of v2.0, mapbox-gl generates a [billable event](https://www.mapbox.com/pricing#maploads) every time a Map object is initialized. It is obviously not ideal to get billed for just collapsing and expanding part of the UI.

In this case, it is recommended that you set the [reuseMaps](/docs/api-reference/map.md#reuseMaps) prop to `true`:

```jsx
  <TabPanel value="map">
    <Map reuseMaps
      mapStyle="mapbox://styles/mapbox/streets-v9" >
      {items.map(renderMarker)}
    </Map>
  </TabPanel>
```

This bypasses the initialization when a map is removed then added back.

## Performance with Many Markers

If your application uses externally managed camera state, like with Redux, the number of React rerenders may be very high when the user is interacting with the map. Consider the following setup:

```jsx
import {useSelector, useDispatch} from 'react-redux';
import Map, {Marker} from 'react-map-gl';

function MapView() {
  const viewState = useSelector(s => s.viewState);
  const vehicles = useSelector(s => s.vehicles);
  const dispatch = useDispatch();

  const onMove = useCallback(evt => {
    dispatch({type: 'setViewState', payload: evt.viewState});
  }, []);

  return (
    <Map
      {...viewState}
      onMove={onMove}
      mapStyle="mapbox://styles/mapbox/streets-v9" >
    >
      {vehicles.map(vehicle => (
        <Marker key={vehicle.id}
          longitude={vehicle.coordinates[0]}
          latitude={vehicle.coordinates[1]}>
          <svg>
            // vehicle icon
          </svg>
        </Marker>)
      )}
    </Map>
  );
}
```

This component is rerendered on every animation frame when the user is dragging the map. If it's trying to render hundreds of markers, the performance lag will become quite visible.

One way to improve the performance is `useMemo`:

```jsx
  const markers = useMemo(() => vehicles.map(vehicle => (
    <Marker key={vehicle.id}
      longitude={vehicle.coordinates[0]}
      latitude={vehicle.coordinates[1]}>
      <svg>
        // vehicle icon
      </svg>
    </Marker>)
  )}, [vehicles]);

  return (
    <Map
      {...viewState}
      onMove={onMove}
      mapStyle="mapbox://styles/mapbox/streets-v9" >
    >
      {markers}
    </Map>
  );
}
```

This prevents React from rerendering the markers unless they have changed.

If your application can do without complicated DOM objects and CSS styling, consider switching to a [symbol layer](https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#symbol). Layers are rendered in WebGL and are much more performant than markers:

```jsx
  const vehiclesGeoJSON = useMemo(() => {
    return {
      type: 'FeatureCollection',
      features: vehicles.map(vehicle => turf.point(vehicle.coordinates, vehicle))
    };
  }, [vehicles]);

  return (
    <Map
      {...viewState}
      onMove={onMove}
      mapStyle="mapbox://styles/mapbox/streets-v9" >
    >
      <Source id="vehicles" type="geojson" data={vehiclesGeoJSON}>
        <Layer type="symbol"
          layout={{
            'icon-image': 'vehicle-icon',
            'icon-size': 1,
            'text-field': ['get', 'id']
          }} >
      </Sources>
    </Map>
  );
```

## Finding out if a point is within the current viewport

There are some situations where you want to know if a point is currently visible on the map.  
Checking this is simple and can be done like so:

```jsx
const mapRef = useRef<MapRef>();

const checkIfPositionInViewport = (lat, lng) => {
    const bounds = mapRef.current.getMap().getBounds();
    return (lat >= bounds._sw.lat && lat <= bounds._nw.lat && lng >= bounds._sw.lng && lng <= bounds._nw.lng);
}

return <Map ref={mapRef} [..]/>
```
