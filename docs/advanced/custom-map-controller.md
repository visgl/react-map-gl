# Custom Map Controller

## Overriding The Default Map Controller

To change the default behavior of map interaction, you can provide a custom map control to the `controller` prop of `InteractiveMap`.

This custom map control must offer the following interface:
- `setOptions(options)` - called by `InteractiveMap` when props change.

```jsx
  const mapController = new MyMapController();

  render() {
    return <ReactMapGL controller={mapController} ... />;
  }
```


Documentation of [the MapController class](/docs/api-reference/map-controller.md).


## Examples

A simple example to swap drag pan and drag rotate:

```js
  /// my-map-controller.js
  import {MapController} from 'react-map-gl';

  export default class MyMapController extends MapController {

    _onPan(event) {
      return this.isFunctionKeyPressed(event) || event.rightButton ?
    //  Default implementation in MapController
    //  this._onPanRotate(event) : this._onPanMove(event);
        this._onPanMove(event) : this._onPanRotate(event);
    }
  }
```

Overwrite existing event handling:

```js
  /// my-map-controller.js
  import {MapController} from 'react-map-gl';

  export default class MyMapController extends MapController {

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
  /// my-map-controller.js
  import {MapController} from 'react-map-gl';

  export default class MyMapController extends MapController {

    constructor() {
      super();
      // subscribe to additional events
      this.events = ['click'];
    }

    // Override the default handler in MapController
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
  /// my-map-controller.js
  import {MapController} from 'react-map-gl';

  export default class MyMapController extends MapController {

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

