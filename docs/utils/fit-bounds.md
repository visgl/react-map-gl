# fitBounds

## Usage

```js
import {fitBounds} from 'react-map-gl';

const viewport = fitBounds(
  {width: 800, height: 600},
  [[-122.5, 37.7], [-122.4, 37.8]],
  {padding: 20}
);

// viewport: { longitude: -122.45, latitude: 37.7500169, zoom: 11.7037828 }

```

## Parameters

##### viewport {Object} (required)
- `viewport.width` (number, required) Width of the viewport
- `viewport.height` (number, required) Height of the viewport

##### bounds {[[Number, Number], [Number, Number]]} (required)
Bounding box defined by two opposite corners in `[lng, lat]` format.

##### options {Object}
- `options.padding {Number} - default: 0`
  The amount of padding in pixels to add to the given bounds.
- `options.offset {[Number, Number]} - default: [0, 0]`
  The center of the given bounds relative to the map's center, measured in pixels.

## Returns {Object}
An object with viewport properties `longitude`, `latitude` and `zoom`.
