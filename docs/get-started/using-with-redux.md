## Using with Redux

If you're using redux, it is very easy to hook this component up to
store state in the redux state tree. The simplest way is to take all
properties passed to the `onChangeViewport` function property and add them
directly into the store. This state can then be passed back to `react-map-gl`
without any transformation.

You can use the package [redux-map-gl](https://github.com/Willyham/redux-map-gl) to save writing this code yourself.
