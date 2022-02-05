# MapProvider

A [Context.Provider](https://reactjs.org/docs/context.html#contextprovider) that facilitates map operations outside of the component that directly renders a [Map](/docs/api-reference/map.md).

The component should wrap all nodes in which you may want to access the maps:

```js
import {MapProvider} from 'react-map-gl';

function Root() {
  return (
    <MapProvider>
      {
        // Application tree, somewhere one or more <Map /> component(s) are rendered
      }
    </MapProvider>
  );
}
```

See [useMap](/docs/api-reference/use-map.md) for more information.


## Source

[use-map.tsx](https://github.com/visgl/react-map-gl/tree/7.0-release/src/components/use-map.tsx)
