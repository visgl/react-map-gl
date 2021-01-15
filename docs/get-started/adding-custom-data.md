# Adding Custom Data

## Native Mapbox Layers

You can inject data and mapbox native layers by modifying the map style object:

```js
import {fromJS} from 'immutable';
const mapStyle = fromJS({
    version: 8,
    sources: {
        points: {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [
                    {type: 'Feature', geometry: {type: 'Point', coordinates: [-122.45, 37.78]}}
                ]
            }
        }
    },
    layers: [
        {
            id: 'my-layer',
            type: 'circle',
            source: 'points',
            paint: {
                'circle-color': '#f00',
                'circle-radius': 4
            }
        }
    ]
});

<ReactMapGL mapStyle={mapStyle} ... />

```

For details about data sources and layer configuration, check out the [Mapbox style specification](https://www.mapbox.com/mapbox-gl-js/style-spec).

For dynamically updating data and layers, check out the [GeoJSON](http://visgl.github.io/react-map-gl/examples/geojson) and [GeoJSON animation](http://visgl.github.io/react-map-gl/examples/geojson-animation) examples.


## Overlays

react-map-gl provides a basic overlay API that enables applications to overlay data on top of maps.
They are great for creating light-weight custom drawings.

### Example

```js
import {SVGOverlay} from 'react-map-gl';

function redraw({project}) {
  const [cx, cy] = project([-122, 37]);
  return <circle cx={cx} cy={cy} r={4} fill="blue" />;
}

<MapGL {...viewport}>
  <SVGOverlay redraw={redraw} />
</MapGL>
```

### Built-in Overlays

- [SVGOverlay](/docs/api-reference/svg-overlay.md)
- [HTMLOverlay](/docs/api-reference/html-overlay.md)
- [CanvasOverlay](/docs/api-reference/canvas-overlay.md)

### Example Overlays

There are a couple of [additional overlays](https://github.com/visgl/react-map-gl/tree/6.0-release/examples/additional-overlays) in the examples folder that can be copied into applications `ScatterplotOverlay`, `ChoroplethOverlay`.

Third-party overlays are also available. For example, the [heatmap-overlay](https://github.com/vicapow/react-map-gl-heatmap-overlay) module uses [webgl-heatmap](https://github.com/vicapow/webgl-heatmap) to create geographic heatmaps.


## Other vis.gl Libraries

For more feature rich and performant data visualization overlay use cases, you may consider using other visualization libraries. react-map-gl is part of the [vis.gl](https://www.github.com/visgl) ecosystem, a suite of high-performance data visualization tools for the Web.

- [deck.gl](https://deck.gl) - WebGL-powered framework for the visualization of large datasets.
- [loaders.gl](https://loaders.gl) - loaders for file formats focused on visualization of big data, including point clouds, 3D geometries, images, geospatial formats as well as tabular data.
- [nebula.gl](https://nebula.gl) - 3D-enabled GeoJSON editing based on deck.gl and React.
