react-map-gl provides an overlay API so you can use the built-in visualization
overlays, or create your own.

```js
import {ScatterplotOverlay} from 'react-map-gl/overlays';

<MapGL {...viewport}>
  <ScatterplotOverlay
    {...viewport}
    locations={locations}
    dotRadius={4}
    globalOpacity={1}
    compositeOperation="screen" />
</MapGL>
```

Built-in overlays are: `ChoroplethOverlay`, `ScatterplotOverlay`, `DraggablePointsOverlay`,
`SVGOverlay` and `CanvasOverlay`. They are imported using
```
import {SVGOverlay, ...} from 'react-map-gl/overlays';
```
Remarks:
* **These overlays are currently not tested with perspective mode, although
  they should in theory be compatible with perspective enabled viewports in
  [viewport-mercator-project](https://github.com/uber-common/viewport-mercator-project)**
* In v1, overlays were exported directly from 'react-map-gl'.
