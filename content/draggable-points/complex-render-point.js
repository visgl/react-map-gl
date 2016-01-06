<MapGL {...viewport} mapStyle={mapStyle}>
    <DraggablePoints
      {...viewport}
      points={points}
      onUpdatePoint={this.updatePoint}
      renderPoint={point => {
        var scale = point.get('id') / 10 + 1;
        return <g transform={'scale(' + scale + ')'}>
          <circle r="10"></circle>
          <text style={{fill: 'white', textAnchor: 'middle'}} y="6">
            {point.get('id')}
          </text>
        </g>;
      }}
    />
</MapGL>