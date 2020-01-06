# Scale Control

![Since v5.2](https://img.shields.io/badge/since-v5.2-green)

This is a React equivalent of Mapbox's [ScaleControl](https://docs.mapbox.com/mapbox-gl-js/api/#scalecontrol).

```js
import {Component} from 'react';
import ReactMapGL, {ScaleControl} from 'react-map-gl';

class Map extends Component {
  render() {
    const {viewport, updateViewport} = this.props;
    return (
      <ReactMapGL {...viewport} onViewportChange={updateViewport}>
        <div style={{position: 'absolute', bottom: 100, left: 20}}>
          <ScaleControl maxWidth={100} unit="metric"}/>
        </div>
      </ReactMapGL>
    );
  }
}
```

## Properties

##### `maxWidth` {Number}

The maximum length of the scale control in pixels. Default `100`.

##### `unit` {String}

Unit of the distance, one of `'imperial'`, `'metric'` or `'nautical'`.

## Styling

Like its Mapbox counterpart, this control relies on the mapbox-gl stylesheet to work properly. Make sure to add the stylesheet to your page.

## Source
[scale-control.js](https://github.com/uber/react-map-gl/tree/5.2-release/src/components/scale-control.js)
