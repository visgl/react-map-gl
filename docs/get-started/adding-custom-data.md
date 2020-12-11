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

Note that the built-in overlays are intended to provide basic functionality only. For more feature rich and performant data visualization overlay use cases, consider using [deck.gl](https://deck.gl).


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

Built-in overlays are: `SVGOverlay`, `HTMLOverlay`, and `CanvasOverlay`. They are imported using
```
import {SVGOverlay, HTMLOverlay, CanvasOverlay} from 'react-map-gl';
```

### Example Overlays

There are a couple of [additional overlays](https://github.com/visgl/react-map-gl/tree/5.2-release/examples/additional-overlays) in the examples folder that can be copied into applications `ScatterplotOverlay`, `DraggablePointsOverlay`, `ChoroplethOverlay`.


### Third-party Overlays

Third party overlays can also be created. For example, the [heatmap-overlay](https://github.com/vicapow/react-map-gl-heatmap-overlay) uses [webgl-heatmap](https://github.com/vicapow/webgl-heatmap) to create geographic heatmaps.

<img width="200" src="https://cloud.githubusercontent.com/assets/499192/11028150/33f34640-86bc-11e5-9678-3fa1798394d5.gif" />

```js
import HeatmapOverlay from 'react-map-gl-heatmap-overlay';
import cities from 'example-cities';

<MapGL {...viewport}>
  <HeatmapOverlay locations={cities} {...viewport} />
</MapGL>
```

Want to create and share your own overlay? Check the [examples/additional-overlays](https://github.com/visgl/react-map-gl/tree/5.2-release/examples/additional-overlays) folder for examples.
