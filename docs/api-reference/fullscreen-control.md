# Fullscreen Control

![Since v4.1](https://img.shields.io/badge/since-v4.1-green)

This is a React equivalent of Mapbox's [FullscreenControl](https://www.mapbox.com/mapbox-gl-js/api/#fullscreencontrol).

```js
import {Component} from 'react';
import ReactMapGL, {FullscreenControl} from 'react-map-gl';

class Map extends Component {
  render() {
    const {viewport, updateViewport} = this.props;
    return (
      <ReactMapGL {...viewport} onViewportChange={updateViewport}>
        <div style={{position: 'absolute', right: 0}}>
          <FullscreenControl container={document.querySelector('body')}/>
        </div>
      </ReactMapGL>
    );
  }
}
```

## Properties

##### `container` (HTMLElement)

`container` is the compatible DOM element which should be made full screen. By default, the map container element will be made full screen.

## Styling

Like its Mapbox counterpart, this control relies on the mapbox-gl stylesheet to work properly. Make sure to add the stylesheet to your page.

## Source
[fullscreen-control.js](https://github.com/uber/react-map-gl/tree/5.2-release/src/components/fullscreen-control.js)

