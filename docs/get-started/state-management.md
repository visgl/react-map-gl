# State Management

`InteractiveMap` is designed to be a stateless component. Its appearance is entirely controlled by the properties that are passed in from its parent. In this architecture, transition works the same way as interaction: the component shall notify the application of "user intent" by calling the `onViewportChange` callback, but ultimately the application needs to decide what to do with it.

The most simple handling of this intent is to save it and pass it back to the component:
```jsx
<ReactMapGL
    {...this.state.viewport}
    onViewportChange={(viewport) => this.setState({viewport})} />
```

User interaction and transition will not work without a valid `onViewportChange` handler.

The advantage of this practice is that it ensures a single source of truth regarding the viewport state (in the example above, saved in the `state` of the container component). When you use this viewport state to direct the rendering of other components, it is guaranteed that they will always be synced with the map.

You may apply additional constraints to the viewport:

```jsx
_onViewportChange = viewport => {
    if (viewport.longitude > 0) {
        viewport.longitude = 0;
    }
    this.setState({viewport});
}

render() {
    return <ReactMapGL {...this.state.viewport} onViewportChange={this._onViewportChange} />
}
```

Or manipulate the viewport outside of the ReactMap component:

```jsx
_goToNYC = () => {
    const viewport = {...this.state.viewport, longitude: -74.1, latitude: 40.7};
    this.setState({viewport});
}

render() {
    return (
        <div>
            <ReactMapGL {...this.state.viewport} onViewportChange={this._onViewportChange} />
            <button onClick={this._goToNYC}>New York City</button>
        </div>
    );
}
```


## Using with Redux

If you're using redux, it is very easy to hook this component up to store state in the redux state tree.
The simplest way is to take all properties passed to the `onViewportChange` function property and add them
directly into the store. This state can then be passed back to the `<ReactMapGL>` component without any transformation.
