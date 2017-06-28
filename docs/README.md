# Introduction

react-map-gl is a suite of React components for
[Mapbox GL JS](https://github.com/mapbox/mapbox-gl-js).

## Example

```js
import ReactMapGL from 'react-map-gl';

<ReactMapGL
  width={400}
  height={400}
  latitude={37.7577}
  longitude={-122.4376}
  zoom={8}
  onViewportChange={(viewport) => {
    const {width, height, latitude, longitude, zoom} = viewport;
    // Optionally call `setState` and use the state to update the map.
  }}
/>
```
