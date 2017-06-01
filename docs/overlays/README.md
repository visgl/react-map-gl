# Overlays

react-map-gl provides a basic overlay API that enables applications to overlay data on top of maps.

Note that the built-in overlays are intended to provide basic functionality only. For more feature rich and performant data visualization overlay use cases, consider using [deck.gl](deck.gl) and/or mapbox styles.


## Example

```js
import {ScatterplotOverlay} from 'react-map-gl';

<MapGL {...viewport}>
  <ScatterplotOverlay
    {...viewport}
    locations={locations}
    dotRadius={4}
    globalOpacity={1}
    compositeOperation="screen" />
</MapGL>
```


## Built-in Overlays

Built-in overlays are: `SVGOverlay`, `HTMLOverlay`, and `CanvasOverlay`. They are imported using
```
import {SVGOverlay, HTMLOverlay, CanvasOverlay} from 'react-map-gl';
```

## Example Overlays

There are a couple of additional overlays in the examples folder that can be copied into applications `ScatterplotOverlay`, `DraggablePointsOverlay`, `ChoroplethOverlay`.


### Third-party Overlays

Third party overlays can also be created. For example, the [heatmap-overlay](https://github.com/vicapow/react-map-gl-heatmap-overlay) uses [webgl-heatmap](https://github.com/vicapow/webgl-heatmap) to create geographic heatmaps.

<img width=200 src="https://cloud.githubusercontent.com/assets/499192/11028150/33f34640-86bc-11e5-9678-3fa1798394d5.gif" />

```js
import HeatmapOverlay from 'react-map-gl-heatmap-overlay';
import cities from 'example-cities';

<MapGL {...viewport}>
  <HeatmapOverlay locations={cities} {...viewport} />
</MapGL>
```

Want to create and share your own overlay? Fork the
[react-map-gl-example-overlay](https://github.com/vicapow/react-map-gl-example-overlay)
project to get started.


## Remarks
* **These overlays are currently not tested with perspective mode, although
  they should in theory be compatible with perspective enabled viewports in
  [viewport-mercator-project](https://github.com/uber-common/viewport-mercator-project)**
* In v1, overlays were exported directly from 'react-map-gl'.
