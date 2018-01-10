# State Management

`InteractiveMap` is designed to be a stateless component. Its appearance is entirely controlled by the properties that are passed in from its parent. In this architecture, transition works the same way as interaction: the component shall notify the application of "user intent" by calling the `onViewportChange` callback, but ultimately the application needs to decide what to do with it.

The most simple handling of this intent is to save it and pass it back to the component:
```jsx
<ReactMapGL
    {...this.state.viewport}
    onViewportChange={(viewport) => this.setState({viewport})} />
```

User interaction and transition will not work without a valid `onViewportChange` handler.


## Using with Redux

If you're using redux, it is very easy to hook this component up to store state in the redux state tree.
The simplest way is to take all properties passed to the `onViewportChange` function property and add them
directly into the store. This state can then be passed back to the `<ReactMapGL>` component without any transformation.

You can even use the package [redux-map-gl](https://github.com/Willyham/redux-map-gl) to save you some writing.
