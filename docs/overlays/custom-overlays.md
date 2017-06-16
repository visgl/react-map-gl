# Custom Overlays

Because overlays are regular React components, it's straightforward to create
resuable overlays that others can include into their project. Overlays can access
the current viewport through the React [context](https://facebook.github.io/react/docs/context.html):

```js
import React from 'react';
import PropTypes from 'prop-types';

class MyCustomOverlay extends React.Component {
  render() {
    const {viewport} = this.context;
    // draw something
  }
}

MyCustomOverlay.contextType = {
  viewport: PropTypes.object,
  isDragging: PropTypes.bool
};
```

Here's an example of using the [ScatterplotOverlay](https://github.com/uber/react-map-gl/blob/master/examples/additional-overlays/scatterplot-overlay.js):

```jsx
<MapGL {...viewport} mapStyle={mapStyle}>
    <ScatterplotOverlay
      locations={this.state.locations}
      dotRadius={1}
      globalOpacity={0.8}
      compositeOperation="lighter"
      dotFill="blue"
      renderWhileDragging={true}
    />
</MapGL>
```

There are more examples in the [examples/additional-overlays](https://github.com/uber/react-map-gl/tree/master/examples/additional-overlays) folder of this repo.
