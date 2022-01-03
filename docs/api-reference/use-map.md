# useMap

The `useMap` hook, used with the [MapProvider](/docs/api-reference/map-provider.md), helps an app to perform map operations outside of the component that directly renders a [Map](/docs/api-reference/map.md).


```js
import {MapProvider, Map, useMap} from 'react-map-gl';

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

See a full example [here](/examples/get-started/hook).

## Signature

`useMap(): {[id: string]: MapRef}`

The hook returns an object that contains all mounted maps under the closest `MapProvider`. The keys are each map's [id](/docs/api-reference/map.md#prperties) and the values are the [ref object](/docs/api-reference/map.md#methods).
