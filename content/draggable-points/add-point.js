addPoint(location) {
  var {points} = this.state;
  var point = Immutable.fromJS({id: points.last().get('id') + 1, location});
  this.setState({points: points.push(point)});
}