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

import alphaify from 'alphaify';
import window from 'global/window';
const windowAlert = window.alert;

import React, {PropTypes, Component} from 'react';
import autobind from 'autobind-decorator';
import d3 from 'd3';

import MapGL from '../../src/index.js';
import SVGOverlay from '../../src/overlays/svg.react';
import CanvasOverlay from '../../src/overlays/canvas.react';

import ROUTES from './../data/routes-example.json';

const color = d3.scale.category10();

const PROP_TYPES = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};

export default class RouteOverlayExample extends Component {

  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 37.7736092599127,
        longitude: -122.42312591099463,
        zoom: 12.011557070552028,
        startDragLngLat: null,
        isDragging: false
      }
    };
  }

  @autobind
  _onChangeViewport(viewport) {
    if (this.props.onChangeViewport) {
      return this.props.onChangeViewport(viewport);
    }
    this.setState({viewport});
  }

  _renderRoute(points, index) {
    return (
      <g style={ {pointerEvents: 'click', cursor: 'pointer'} }>
        <g
          style={ {pointerEvents: 'visibleStroke'} }
          onClick={ () => windowAlert(`route ${index}`) }>
          <path
            style={ {
              fill: 'none',
              stroke: alphaify(color(index), 0.7),
              strokeWidth: 6
            } }
            d={ `M${points.join('L')}` }/>
        </g>
      </g>
    );
  }

  @autobind
  _redrawSVGOverlay({project}) {
    return (
      <g>
      {
        ROUTES.map((route, index) => {
          const points = route.coordinates.map(project).map(
            p => [d3.round(p[0], 1), d3.round(p[1], 1)]
          );
          return <g key={ index }>{ this._renderRoute(points, index) }</g>;
        })
      }
      </g>
    );
  }

  @autobind
  _redrawCanvasOverlay({ctx, width, height, project}) {
    ctx.clearRect(0, 0, width, height);
    ROUTES.map((route, index) =>
      route.coordinates.map(project).forEach((p, i) => {
        const point = [d3.round(p[0], 1), d3.round(p[1], 1)];
        ctx.fillStyle = d3.rgb(color(index)).brighter(1).toString();
        ctx.beginPath();
        ctx.arc(point[0], point[1], 2, 0, Math.PI * 2);
        ctx.fill();
      })
    );
  }

  render() {
    const viewport = {
      ...this.state.viewport,
      ...this.props
    };
    return (
      <MapGL { ...viewport } onChangeViewport={ this._onChangeViewport }>
        <SVGOverlay { ...viewport } redraw={ this._redrawSVGOverlay }/>,
        <CanvasOverlay { ...viewport } redraw={ this._redrawCanvasOverlay }/>
      </MapGL>
    );
  }
}

RouteOverlayExample.propTypes = PROP_TYPES;
