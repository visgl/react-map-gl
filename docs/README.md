<h5 align="center">React friendly API wrapper around MapboxGL JS</h5>

![screen](https://cloud.githubusercontent.com/assets/499192/11028165/49f41da2-86bc-11e5-85eb-9279621ef971.png)


## Example

```js
import MapGL from 'react-map-gl';

<MapGL
  width={400}
  height={400}
  latitude={37.7577}
  longitude={-122.4376}
  zoom={8}
  onChangeViewport={viewport => {
    const {latitude, longitude, zoom} = viewport;
    // Optionally call `setState` and use the state to update the map.
  }}
/>
```
