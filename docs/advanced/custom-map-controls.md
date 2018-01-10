# Custom Map Controls

## Overriding The Default Map Controller

To change the default behavior of map interaction, you can provide a custom map control to the `mapControls` prop of `InteractiveMap`.

This custom map control must offer the following interface:
- `setOptions(options)` - called by `InteractiveMap` when props change.

```jsx
  const mapControls = new MyMapControls();

  render() {
    return <ReactMapGL mapControls={mapControls} ... />;
  }
```


Documentation of [the MapControls class](/docs/components/map-controls.md).


## Examples

A simple example to swap drag pan and drag rotate:
```js
  /// my-map-controls.js
  import {experimental} from 'react-map-gl';

  export default class MyMapControls extends experimental.MapControls {

    _onPan(event) {
      return this.isFunctionKeyPressed(event) || event.rightButton ?
    //  Default implementation in MapControls
    //  this._onPanRotate(event) : this._onPanMove(event);
        this._onPanMove(event) : this._onPanRotate(event);
    }
  }
```

Overwrite existing event handling:
```js
  /// my-map-controls.js
  import {experimental} from 'react-map-gl';

  export default class MyMapControls extends experimental.MapControls {

    // Override the default double tap handler
    _onDoubleTap(event) {
      // Go to New York City
      this.updateViewport(this.getMapState(), {
        longitude: -74.0,
        latitude: 40.7,
        zoom: 10
      });
    }
  }
```

Listen to additional events:
```js
  /// my-map-controls.js
  import {experimental} from 'react-map-gl';

  export default class MyMapControls extends experimental.MapControls {

    constructor() {
      super();
      // subscribe to additional events
      this.events = ['click'];
    }

    // Override the default handler in MapControls
    handleEvent(event) {
      if (event.type === 'click') {
        console.log('hi');
      }
      return super.handleEvent(event);
    }
  }
```

Add a custom callback:
```js
  /// my-map-controls.js
  import {experimental} from 'react-map-gl';

  export default class MyMapControls extends experimental.MapControls {

    setOptions(options) {
      super.setOptions(options);
      // save the custom callback
      this.onRotate = options.onRotate;
    }

    _onPanRotate(event) {
      super._onPanRotate(event);
      this.onRotate();
    }
  }
```

