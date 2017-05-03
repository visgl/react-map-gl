# Custom Overlays

Because overlays are regular React components, it's straightforward to create
resuable overlays that others can include into their project. Overlays typically
take at least the following viewport props.

```html
<MyCustomOverlay
  longitude={longitude}
  latitude={latitude}
  zoom={zoom}
  width={width}
  height={height}
/>
```

Here's an example of the third party [react-map-gl-heatmap-overlay](https://github.com/vicapow/react-map-gl-heatmap-overlay) which uses a fork of [Florian Boesch](https://github.com/pyalot)'s [WebGL Heatmap](https://github.com/vicapow/webgl-heatmap).

```html
   <MapGL {...viewport} mapStyle={mapStyle}>\n
     <HeatmapOverlay
       {...viewport}
       locations={locations}
       intensityAccessor={location => 1 / 10}
       sizeAccessor={location => 40}
     />
   '</MapGL>'
```

TODO - Link to live example -
```js
      r(MapGL,
        assign({onChangeViewport: this._onChangeViewport}, this.state.map), [
          r(HeatmapOverlay, assign({}, this.state.map, {
            locations: this.state.locations,
            latLngAccessor: function latLngAccessor(location) {
              return location.toArray();
            },
            intensityAccessor: function intensityAccessor() {
              return 1 / 10;
            },
            sizeAccessor: function sizeAccessor() {
              return 10;
            }
          })),
          r(Attribute, this.state.map)
        ]),
```

If you\'re planning on creating an overlay resuable overlay, fork the [react-map-gl-example-overlay](https://github.com/vicapow/react-map-gl-example-overlay) project.

