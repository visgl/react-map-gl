// Copyright (c) 2015 Uber Technologies, Inc.

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MapGL, {DraggablePointsOverlay, SVGOverlay, autobind} from 'react-map-gl';
import Immutable from 'immutable';

import alphaify from '../alphaify';

// A mock example path.
const initialPoints = [
  {location: [-122.39508481737994, 37.79450507471435], id: 0},
  {location: [-122.39750244137034, 37.79227619464379], id: 1},
  {location: [-122.4013303460217, 37.789251178427776], id: 2},
  {location: [-122.40475531334141, 37.786862920252986], id: 3},
  {location: [-122.40505751634022, 37.78861431712821], id: 4},
  {location: [-122.40556118800487, 37.79060449046487], id: 5},
  {location: [-122.4088854209916, 37.790047247333675], id: 6},
  {location: [-122.4091876239904, 37.79275381746233], id: 7},
  {location: [-122.40989276432093, 37.795619489534374], id: 8},
  {location: [-122.41049717031848, 37.79792786675678], id: 9},
  {location: [-122.4109001076502, 37.80031576728801], id: 10},
  {location: [-122.41916032295062, 37.79920142331301], id: 11}
];

let ids = initialPoints[initialPoints.length - 1].id;

export default class GeodataCreatorExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        longitude: -122.40677,
        latitude: 37.78949,
        zoom: 12.76901,
        startDragLngLat: null,
        isDragging: false
      },
      points: Immutable.fromJS(initialPoints)
    };
    autobind(this);
  }

  _onChangeViewport(viewport) {
    this.setState({viewport});
  }

  _onAddPoint(location) {
    const points = this.state.points.push(new Immutable.Map({
      location: new Immutable.List(location),
      id: ++ids
    }));
    this.setState({points});
  }

  _onUpdatePoint(opt) {
    const index = this.state.points.findIndex(p => p.get('id') === opt.key);
    let point = this.state.points.get(index);
    point = point.set('location', new Immutable.List(opt.location));
    const points = this.state.points.set(index, point);
    this.setState({points});
  }

  _redrawSVGOverlay(opt) {
    if (!this.state.points.size) {
      return null;
    }
    const pointString = this.state.points.map(
      point => opt.project(point.get('location').toArray())
    ).join('L');

    return (
      <path
        style={ {stroke: '#1FBAD6', strokeWidth: 2, fill: 'none'} }
        d={ `M${pointString}` }/>
    );
  }

  _renderOverlays(viewport) {
    return [
      <SVGOverlay key="svg-overlay" { ...viewport }
        redraw={ this._redrawSVGOverlay }/>,

      <DraggablePointsOverlay key="draggable-overlay" { ...viewport }
        points={ this.state.points }
        onAddPoint={ this._onAddPoint }
        onUpdatePoint={ this._onUpdatePoint }
        renderPoint={
          (point, pixel) => (
            <g>
              <circle
                style={ {fill: alphaify('#1FBAD6', 0.5), pointerEvents: 'all'} }
                r={ 10 }/>
              <text
                style={ {fill: 'white', textAnchor: 'middle'} }
                y={ 5 }>
                { point.get('id') }
              </text>
            </g>
          )
        }/>
    ];
  }

  render() {
    const viewport = {...this.state.viewport, ...this.props};
    return (
      <MapGL { ...viewport } onChangeViewport={ this._onChangeViewport }>
        { this._renderOverlays(viewport) }
      </MapGL>
    );
  }
}

GeodataCreatorExample.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};
