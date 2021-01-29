# FAQ

## Enable Right-to-Left Language Support

![Since v5.2.2](https://img.shields.io/badge/since-v5.2.2-green)

```js
import {setRTLTextPlugin} from 'react-map-gl';

setRTLTextPlugin(
  // find out the latest version at https://www.npmjs.com/package/@mapbox/mapbox-gl-rtl-text
  'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',
  null,
  // lazy: only load when the map first encounters Hebrew or Arabic text
  true
);
```

This is the same as `import {setRTLTextPlugin} from 'mapbox-gl'` in the browser, but will not crash in node. The export mainly offers a convenience when using server-side rendering.

To use this API, consult Mapbox's [setRTLTextPlugin](https://docs.mapbox.com/mapbox-gl-js/api/#setrtltextplugin) documentation.


## Where is fitBounds?

You can use the `WebMercatorViewport` utility to find the target viewport that fits around a longitude-latitude bounding box:

```js
import {WebMercatorViewport} from 'react-map-gl';

const viewport = new WebMercatorViewport({width: 800, height: 600})
    .fitBounds([[-122.4, 37.7], [-122.5, 37.8]], {
      padding: 20,
      offset: [0, -100]
    });

/* viewport is a WebMercatorViewport instance, containing these fields:
    latitude: 37.75001689223574,
    longitude: -122.44999999999976,
    zoom: 10.966817190981073,
    pitch: 0,
    bearing: 0,
    ...
 */
```

[Documentation of WebMercatorViewport](docs/api-reference/web-mercator-viewport.md)

## I called flyTo/panTo and all controls went out of sync

You cannot manipulate the map camera via `getMap()` and the native mapbox-gl API. To conform to the reactive programming paradigm, all camera changes should be driven by prop changes on the React component. Circumventing this will break the binding between React components and the underlying map instance.

Instead, use the [InteractiveMap](/docs/api-reference/interactive-map.md)'s transition props. See [viewport transition](/docs/advanced/viewport-transition.md) for examples.

## mapbox-gl-draw does not work with react-map-gl

Unfortunately, react-map-gl implements its own interative logic and disables the native event handling of mapbox-gl.

Short explanation: mapbox-gl is not designed to support React.

Long explanation: When using react-map-gl, we have two asynchronous rendering loops, React and Mapbox. Mapbox's `move` events are only fired after the camera changes and there is no way to control how and when the map rerenders. If we update React states upon the `move` events, all React controls/overlays may only get updated one animation frame after the map rerender. You can find discussions [here](https://github.com/visgl/react-map-gl/issues/569) and [here](https://github.com/mapbox/mapbox-gl-js/issues/3746).

Because of this, any mapbox-gl control that listens to the native map events will not work. An equivelant to mapbox-gl-draw is [react-map-gl-draw](https://www.npmjs.com/package/react-map-gl-draw). You can find an example [here](http://visgl.github.io/react-map-gl/examples/draw-polygon).
