
<p align="center">
  These docs are for
  <a href="https://github.com/visgl/react-map-gl/tree/7.0-release/docs">
    <img src="https://img.shields.io/badge/v7.0-brightgreen.svg?style=flat-square" />
  </a>
  Looking for an old version?
  <a href="https://github.com/visgl/react-map-gl/tree/6.1-release/docs">
    <img src="https://img.shields.io/badge/v6.1-brightgreen.svg?style=flat-square" />
  </a>
  <a href="https://github.com/visgl/react-map-gl/tree/5.3-release/docs">
    <img src="https://img.shields.io/badge/v5.3-brightgreen.svg?style=flat-square" />
  </a>
</p>


# Introduction

react-map-gl is a suite of [React](http://facebook.github.io/react/) components for
Mapbox GL JS-compatible libraries.

| Library | Description |
| --- | --- | 
| [MapLibre](https://github.com/MapLibre/maplibre-gl-js) | An open fork of mapbox-gl v1, that can be used without a mapbox token. |
| [Mapbox GL JS v1](https://github.com/mapbox/mapbox-gl-js) | The previous version of mapbox GL JS. This version is free open source and can be used with non-mapbox basemaps without a mapbox token. |
| [Mapbox GL JS v2](https://github.com/mapbox/mapbox-gl-js) | The latest version of Mapbox GL JS. Note that version 2 is not free open source, and a mapbox token is required and billable events are generated even if you do not use mapbox hosted basemaps. |
| Other mapbox-gl forks | It may be possible to use react-map-gl with other mapbox forks, but this is not a supported use case. Minor PRs to enable other forks to be used may be accepted. |

For basemaps:
- You can load map data from Mapbox's own service.
- You can create and host your own map data using one of the many [open source tools](https://github.com/mapbox/awesome-vector-tiles).

New to react-map-gl? [Get Started](/docs/get-started/get-started.md)

Want to contribute? See our [Developer Guide](/docs/developer-guide.md)


## Design Philosophy

react-map-gl was first created by Uber's Visualization team, where Mapbox was used as a component to build powerful web tools such as [geospatial analytics](https://kepler.gl) and [self-driving data visualization](https://avs.auto/). To manage the complexity of these applications, we fully embrace React and reactive programming.

The stock mapbox-gl APIs are [imperative](https://en.wikipedia.org/wiki/Imperative_programming). That is, you instruct the map to do something (for example, [map.flyTo](https://docs.mapbox.com/mapbox-gl-js/api/#map#flyto)), and it will execute the command at its own pace.

This does not scale when we have many components that need to synchronize with each other. We sometimes render two maps side by side, and when the user interacts with one, update both cameras. We draw React UI outside of the map container, that moves with the camera. We also render WebGL graphic overlays on top of the map, most notably with [deck.gl](https://deck.gl). In these use cases, in order for all components to synchronize correctly, they must have their shared states managed by React. We might store the **source of truth** in a parent component state, or Redux store, or hooks, and let it propagate down to the map as well as its peers. 

Ultimately, in the spirit of the [reactive programming paradigm](https://en.wikipedia.org/wiki/Reactive_programming), data always flows **down**. As long as the map manages its own state, as mapbox-gl is designed to do, we risk the components going out of sync.

react-map-gl creates a fully reactive wrapper for mapbox-gl. The [Map](/docs/api-reference/map.md) component can be fully [controlled](https://reactjs.org/docs/forms.html#controlled-components), that is, the map's camera would never deviate from the props that it's assigned. Read more about this core behavior in [state management](/docs/get-started/state-management.md).

## Limitations

In v7.0, react-map-gl was fully rewritten to better align its API with the underlying Mapbox GL JS library. Wherever the reactive usage patterns permits, the wrapper's props and methods are 1:1 mappings to their native API equivelants.

It is possible to call the native methods directly from the `Map` instance obtained via [getMap](/docs/api-reference/map.md#gemap). However, doing so may result in the map's state to deviate from its props. For example, calling `map.setMaxZoom` directly will cause the map's constraint settings to differ from the value of the `maxZoom` prop. Generally speaking, calling a native method is disencouraged if the same thing can be achieved through the React interface. If a third-party plugin does so, then it may lead to some unexpected behaviors.
