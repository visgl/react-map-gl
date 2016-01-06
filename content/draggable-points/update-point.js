updatePoint({key, location}) {
  var points = this.state.points.map(point => {
    var id = point.get('id');
    return id === key ? point.set('location', List(location)) : point;
  });
  this.setState({points: points});
},