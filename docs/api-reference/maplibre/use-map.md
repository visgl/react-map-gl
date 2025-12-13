# useMap

The `useMap` hook allows a custom component to reference the [Map](./map.md) that contains it.


```tsx
import {Map, useMap} from 'react-map-gl/maplibre';

function Root() {
  return (
    <Map ... >
      <NavigateButton />
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


When used with the [MapProvider](./map-provider.md), this hook can also reference maps that are rendered outside of the current component's direct render tree.


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


See a full example [here](https://github.com/visgl/react-map-gl/tree/8.0-release/examples/get-started/hook).

## Signature

`useMap(): {current?: MapRef, [id: string]: MapRef}`

The hook returns an object that contains all mounted maps under the closest `MapProvider`. The keys are each map's [id](./map.md#id) and the values are the [MapRef](./types.md#mapref).

If the hook is used inside a decendent of a `Map` component, the returned object also contains a `current` field that references the containing map.

## Source

[use-map.tsx](https://github.com/visgl/react-map-gl/tree/8.0-release/modules/react-maplibre/src/components/use-map.tsx)
