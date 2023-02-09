# useMap

The `useMap` hook allows a component to reference the [Map](./map.md) that contains it.

When used with [MapProvider](./map-provider.md), this hook can also reference maps that are rendered outside of the current map component's direct render tree.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="map-library">
  <TabItem value="mapbox" label="Mapbox">

```tsx
import {Map, useMap} from 'react-map-gl';

function Root() {
  return (
    <Map ... >
      <NavigationButton />
    </Map>
  );
}

function NavigateButton() {
  const {current: map} = useMap();

  const onClick = () => {
    map.flyTo({center: [-122.4, 37.8]});
  };

  return <button onClick={onClick}>Go</button>;
}
```

  </TabItem>
  <TabItem value="maplibre" label="Maplibre">


```tsx
import {Map, useMap} from 'react-map-gl/maplibre';

function Root() {
  return (
    <Map ... >
      <NavigationButton />
    </Map>
  );
}

function NavigateButton() {
  const {current: map} = useMap();

  const onClick = () => {
    map.flyTo({center: [-122.4, 37.8]});
  };

  return <button onClick={onClick}>Go</button>;
}
```

  </TabItem>
</Tabs>


When used with the [MapProvider](./map-provider.md), this hook can also reference maps that are rendered outside of the current component's direct render tree as long as both trees are part of the current `<MapProvider>`.


<Tabs groupId="map-library">
  <TabItem value="mapbox" label="Mapbox">

```tsx
import {MapProvider, Map, useMap} from 'react-map-gl';

function Root() {
  // Note: `useMap` will not work in <Root>, only children of <MapProvider> can use `useMap`

  return (
    <MapProvider>
      <Map id="myMapA" ... />
      <Map id="myMapB" ... />
      <NavigateButton />
    </MapProvider>
  );
}

function NavigateButton() {
  const {myMapA, myMapB} = useMap();

  const onClick = () => {
    myMapA.flyTo({center: [-122.4, 37.8]});
    myMapB.flyTo({center: [-74, 40.7]});
  };

  return <button onClick={onClick}>Go</button>;
}
```

  </TabItem>
  <TabItem value="maplibre" label="Maplibre">


```tsx
import {MapProvider, Map, useMap} from 'react-map-gl/maplibre';

function Root() {
  return (
    <MapProvider>
      <Map id="myMapA" ... />
      <Map id="myMapB" ... />
      <NavigateButton />
    </MapProvider>
  );
}

function NavigateButton() {
  const {myMapA, myMapB} = useMap();

  const onClick = () => {
    myMapA.flyTo({center: [-122.4, 37.8]});
    myMapB.flyTo({center: [-74, 40.7]});
  };

  return <button onClick={onClick}>Go</button>;
}
```

  </TabItem>
</Tabs>

See a full example [here](https://github.com/visgl/react-map-gl/tree/7.0-release/examples/get-started/hook).

## Signature

`useMap(): {current?: MapRef, [id: string]: MapRef}`

The hook returns an object that contains all mounted maps under the closest `MapProvider`. The keys are each map's [id](./map.md#id) and the values are the [MapRef](./types.md#mapref).

If the hook is used inside a decendent of a `Map` component, the returned object additionally contains a `current` field that references the containing map.

## Source

[use-map.tsx](https://github.com/visgl/react-map-gl/tree/7.0-release/src/components/use-map.tsx)
