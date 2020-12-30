# Fullscreen Control

![Since v4.1](https://img.shields.io/badge/since-v4.1-green)

This is a React equivalent of Mapbox's [FullscreenControl](https://www.mapbox.com/mapbox-gl-js/api/#fullscreencontrol).

```js
import * as React from 'react';
import ReactMapGL, {FullscreenControl} from 'react-map-gl';

function App() {
  const [viewport, setViewport] = React.useState({
    longitude: -122.45,
    latitude: 37.78,
    zoom: 14
  });
  return (
    <ReactMapGL {...viewport} width="100vw" height="100vh" onViewportChange={setViewport}>
      <div style={{position: 'absolute', top: 10, right: 10}}>
        <FullscreenControl />
      </div>
    </ReactMapGL>
  );
}
```

## Properties

##### `container` (HTMLElement)

`container` is the compatible DOM element which should be made full screen. By default, the map container element will be made full screen.

##### `label` (String)

- default: `Toggle fullscreen`

Label applied to the fullscreen control button.

## Styling

Like its Mapbox counterpart, this control relies on the mapbox-gl stylesheet to work properly. Make sure to add the stylesheet to your page.

## Source
[fullscreen-control.js](https://github.com/visgl/react-map-gl/tree/6.0-release/src/components/fullscreen-control.js)

