
# Introduction

> These docs are for v8.0. For v7, see [here](https://github.com/visgl/react-map-gl/tree/7.1-release/docs).

react-map-gl is a suite of [React](http://facebook.github.io/react/) components for
[mapbox-gl](https://www.npmjs.com/package/mapbox-gl), [maplibre-gl](https://www.npmjs.com/package/maplibre-gl) or compatible libraries.

| Library | Description |
| --- | --- | 
| [MapLibre GL JS](https://maplibre.org/maplibre-gl-js/docs/) | An Open-source TypeScript library for publishing web maps. |
| [Mapbox GL JS](https://www.mapbox.com/mapbox-gljs) | A JavaScript library for interactive, customizable vector maps on the web. |
| [Mapbox GL JS v1](https://github.com/mapbox/mapbox-gl-js/tree/release-v1.13.3) | The last free-open-source version of Mapbox GL JS. This version can be used without a Mapbox token if you do not use Mapbox hosted basemaps. |
| Other compatible forks | It may be possible to use react-map-gl with mapbox-gl/maplibre-gl forks, but this is not a supported use case. Minor PRs to enable other forks to be used may be accepted. |

If you need help choosing a base map library that is right for you:

- Decide where to get your vector map data.
  + `mapbox-gl` is designed to work seamlessly with Mapbox's own data service. You will need a billable Mapbox token to use it.
  + There are a number of [map data providers](./get-started/mapbox-tokens.md#display-maps-without-a-mapbox-token) who support `maplibre-gl`, with a variaty of data quality and price options.
  + You can create and host your own map tiles and use them with `maplibre-gl` for (almost) free, if you are comfortable of using [open source tools](./get-started/mapbox-tokens.md#display-maps-without-a-mapbox-token) and setting up a cloud storage account.
- Visit Mapbox and MapLibre websites for examples and documentation. Each library offer unique features that may not exist in another.

New to react-map-gl? [Get Started](./get-started/get-started.md)

Want to contribute? See our [Developer Guide](./contributing.md)


## Design Philosophy

react-map-gl was first created by Uber's Visualization team, where Mapbox was used as a component to build powerful web tools such as [geospatial analytics](https://kepler.gl) and [self-driving data visualization](https://avs.auto/). To manage the complexity of these applications, we fully embrace React and reactive programming.

The stock mapbox-gl APIs are [imperative](https://en.wikipedia.org/wiki/Imperative_programming). That is, you instruct the map to do something (for example, [map.flyTo](https://docs.mapbox.com/mapbox-gl-js/api/#map#flyto)), and it will execute the command at its own pace.

This does not scale when we have many components that need to synchronize with each other. We sometimes render two maps side by side, and when the user interacts with one, update both cameras. We draw React UI outside of the map container, that moves with the camera. We also render WebGL graphic overlays on top of the map, most notably with [deck.gl](https://deck.gl). In these use cases, in order for all components to synchronize correctly, they must have their shared states managed by React. We might store the **source of truth** in a parent component state, or Redux store, or hooks, and let it propagate down to the map as well as its peers. 

Ultimately, in the spirit of the [reactive programming paradigm](https://en.wikipedia.org/wiki/Reactive_programming), data always flows **down**. As long as the map manages its own state, as mapbox-gl is designed to do, we risk the components going out of sync.

react-map-gl creates a fully reactive wrapper for mapbox-gl/maplibre-gl. The [Map](./api-reference/maplibre/map.md) component can be fully [controlled](https://reactjs.org/docs/forms.html#controlled-components), that is, the map's camera would never deviate from the props that it's assigned. Read more about this core behavior in [state management](./get-started/state-management.md).

## Limitations

In v7.0, react-map-gl was fully rewritten to better align its API with the underlying Mapbox GL JS library. Wherever the reactive usage patterns permits, the wrapper's props and methods are 1:1 mappings to their native API equivelants.

It is possible to call the native methods directly from the `Map` instance obtained via [getMap](./api-reference/maplibre/map.md#gemap). However, doing so may result in the map's state to deviate from its props. For example, calling `map.setMaxZoom` directly will cause the map's constraint settings to differ from the value of the `maxZoom` prop. Generally speaking, calling a native method is disencouraged if the same thing can be achieved through the React interface. If a third-party plugin does so, then it may lead to some unexpected behaviors.
