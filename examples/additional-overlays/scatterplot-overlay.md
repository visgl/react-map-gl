# Scatter Plot Overlay

This is a live example of the [`<ScatterPlot>`](https://github.com/uber/react-map-gl/blob/master/src/overlays/scatterplot.react.js) overlay. Adjust the more interesting props using the controls below.


```js
var ScatterPlotOverlay = require('react-map-gl/src/overlays/scatterplot.react`);
```

TODO interactive example
```js
      r(MapGL,
        assign({onChangeViewport: this._onChangeViewport}, this.state.map),
        [
          r(ScatterPlotOverlay, assign({}, this.state.map, {
            locations: this.state.locations,
            dotRadius: dotRadius,
            globalOpacity: globalOpacity,
            compositeOperation: compositeOperation,
            dotFill: dotFill,
            renderWhileDragging: renderWhileDragging
          })),
          r(Attribute, this.state.map)
        ]
      ),
      r.div([
        r(PropLabel, 'dotRadius: '),
        r.input({
          type: 'range',
          max: 20,
          min: 1,
          step: 1,
          value: dotRadius,
          onChange: this._onChangeScatterPlotStyle('dotRadius', Number)
        })
      ]),
      r.div([
        r(PropLabel, 'globalOpacity: '),
        r.input({
          type: 'range',
          max: 1,
          min: 0,
          step: 0.01,
          value: globalOpacity,
          onChange: this._onChangeScatterPlotStyle('globalOpacity', Number)
        })
      ]),
      r.div([
        r(PropLabel, 'renderWhileDragging: '),
        r.input({
          type: 'checkbox',
          checked: renderWhileDragging,
          onChange: this._onChangeScatterPlotStyle('renderWhileDragging',
            Boolean)
        })
      ]),
      r.div([
        r(PropLabel, 'compositeOperation'),
        r.select({
          value: compositeOperation,
          onChange: this._onChangeScatterPlotStyle('compositeOperation', String)
        }, COMPOSITE_TYPES.map(function _map(type) {
          return r.option({value: type}, type);
        }))
      ]),
      r.div([
        r(PropLabel, 'dotFill'),
        r.select({
          value: dotFill,
          onChange: this._onChangeScatterPlotStyle('dotFill', String)
        }, SAMPLE_COLORS.map(function _map(color) {
          return r.option({value: color}, color);
        }))
      ]),
```

```js
<MapGL\ {...viewport} mapStyle={mapStyle}>
    <ScatterPlotOverlay
      {...viewport}
      locations={locations}
      dotRadius={' + dotRadius + '}
      globalOpacity={' + globalOpacity + '}
      compositeOperation="' + compositeOperation + '"
      dotFill="' + dotFill + '"
      renderWhileDragging={' + renderWhileDragging + '}
    />\n ' +
</MapGL>'
```

#### locations \nWhere `locations` is an [ImmutableJS](https://facebook.github.io/immutable-js/) [List](https://facebook.github.io/immutable-js/docs/#/List).

```js
var locations = Immutable.fromJS([
  [-122.39851786165565, 37.78736425435588],
  [-122.40015469418074, 37.78531678199267],
  [-122.4124101516789, 37.80051001607987],
  // ...
]);
```