# Introduction

react-map-gl is a suite of [React](http://facebook.github.io/react/) components for
[Mapbox GL JS](https://github.com/mapbox/mapbox-gl-js).

Mapbox GL JS is an awesome library for making modern web maps. It is beautiful, efficient (WebGL-powered), and fully open source. You may load map data from Mapbox's own service, which is free until a certain level of traffic is exceeded; or you can create and host your own map data using one of the many [open source tools](https://github.com/mapbox/awesome-vector-tiles).

New to react-map-gl? [Get Started](/docs/get-started/get-started.md)

Want to contribute? See our [Developer Guide](/docs/developer-guide.md)


## Design Philosophy

At Uber, we make powerful web tools that contain maps. To manage the complexity of our applications, we fully embrace React and reactive programming.

The stock mapbox-gl APIs are [imperative](https://en.wikipedia.org/wiki/Imperative_programming). That is, you instruct the map to do something (for example, [map.flyTo](https://docs.mapbox.com/mapbox-gl-js/api/#map#flyto)), and it will execute the command at its own pace.

This does not scale when we have many components that need to synchronize with each other. One use case we have is to render two maps side by side, and when the user interacts with one, update both cameras. We draw UI on top of the map using React, pinned to a given geolocation. We also render visualization layers on top of the map using WebGL, most notably with [deck.gl](https://deck.gl). The mapbox maps, the deck.gl canvas, and React controls' render cycles are all asynchronous. If we listen to the [move](https://docs.mapbox.com/mapbox-gl-js/api/#map.event:move) event in the map and tell the other components to update, the other components would always be one frame behind.

Ultimately, in the spirit of the [reactive programming paradigm](https://en.wikipedia.org/wiki/Reactive_programming), data always flows **down**. In a complex application, any user input or data fetch can affect the rendering of many components. We might store the **source of truth** in a parent component state, or Redux store, or hooks, and let it propagate down to the map as well as its peers. As long as the map manages its own state, as mapbox-gl is designed to do, we risk the components going out of sync.

react-map-gl creates a fully reactive wrapper for mapbox-gl. The [InteractiveMap](/docs/api-reference/interactive-map) component is stateless. To move the map camera in anyway, the application must update the component's props. The application can also be confident that the map's camera would never deviate from the props that it's assigned. At first glance, its API may seem verbose to those who come from the imperative world of mapbox-gl. However, it is essential for the correctness of large applications.


## Limitations

This library provides convenient wrappers around initializing and (to some degree) tracking the state of a Mapbox WebGL map. Because most of the functionality of Mapbox's JS API depends on the use of HTML5 canvases and WebGL, which React is not built to manipulate, the React component does not mirror all the functionality of Mapbox GL JS's Map class. You may access the native Mapbox API exposed by the [getMap()](/docs/api-reference/static-map.md#getmap) function in this library. However, proceed with caution as calling the native APIs may break the connection between the React layer props and the underlying map state.
