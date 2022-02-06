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

See a full example [here](https://github.com/visgl/react-map-gl/tree/7.0-release/examples/get-started/hook).

## Signature

`useMap(): {[id: string]: MapRef}`

The hook returns an object that contains all mounted maps under the closest `MapProvider`. The keys are each map's [id](/docs/api-reference/map.md#id) and the values are the [MapRef](/docs/api-reference/types.md#mapref).


## Source

[use-map.tsx](https://github.com/visgl/react-map-gl/tree/7.0-release/src/components/use-map.tsx)
