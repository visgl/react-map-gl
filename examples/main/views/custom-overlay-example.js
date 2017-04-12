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

/* global window */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MapGL, {CanvasOverlay, SVGOverlay, autobind} from 'react-map-gl';

import {randomNormal} from 'd3-random';
import {range} from 'd3-array';
import Immutable from 'immutable';

import alphaify from '../alphaify';

// San Francisco
import CITIES from '../data/cities.json';

const location = CITIES[0];

const wiggle = (function _wiggle() {
  const normal = randomNormal();
  return function __wiggle(scale) {
    return normal() * scale;
  };
}());

// Example data.
const locations = Immutable.fromJS(range(30).map(
  () => [location.longitude + wiggle(0.01), location.latitude + wiggle(0.01)]
));

const propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};

// Makes working with SVG transforms a little nicer
function svgTransform(props) {
  const transform = [];
  if (Array.isArray(props)) {
    props.forEach(prop => {
      const key = Object.keys(prop)[0];
      transform.push(`${key}(${prop[key]})`);
    });
  }
  return transform.join(' ');
}

export default class CustomOverlayExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: location.latitude,
        longitude: location.longitude,
        zoom: 12.4,
        startDragLngLat: null,
        isDragging: false
      }
    };
    autobind(this);
  }

  _onChangeViewport(viewport) {
    this.setState({viewport});
  }

  _redrawCanvasOverlay(opt) {
    const p1 = opt.project([location.longitude, location.latitude]);
    opt.ctx.clearRect(0, 0, opt.width, opt.height);
    opt.ctx.strokeStyle = alphaify('#1FBAD6', 0.4);
    opt.ctx.lineWidth = 2;
    locations.forEach((loc, index) => {
      opt.ctx.beginPath();
      const p2 = opt.project(loc.toArray());
      opt.ctx.moveTo(p1[0], p1[1]);
      opt.ctx.lineTo(p2[0], p2[1]);
      opt.ctx.stroke();
      opt.ctx.beginPath();
      opt.ctx.fillStyle = alphaify('#1FBAD6', 0.4);
      opt.ctx.arc(p2[0], p2[1], 6, 0, 2 * Math.PI);
      opt.ctx.fill();
      opt.ctx.beginPath();
      opt.ctx.fillStyle = '#FFFFFF';
      opt.ctx.textAlign = 'center';
      opt.ctx.fillText(index, p2[0], p2[1] + 4);
    });
  }

  _redrawSVGOverlay(opt) {
    const p1 = opt.project([location.longitude, location.latitude]);
    /* We use invisible SVG elements to support interactivity. */
    const style = {
      // transparent but still clickable.
      fill: 'rgba(0, 0, 0, 0)'
    };
    return (
      <g style={ {
        pointerEvents: 'all',
        cursor: 'pointer'
      } }>
        <circle
          key={ 0 }
          style={ {...style, stroke: alphaify('#1FBAD6', 0.8)} }
          r={ 10 }
          transform={ svgTransform([{translate: p1}]) }
          onClick={ () => {
            const windowAlert = window.alert;
            windowAlert('center');
          } }/>
        {
          locations.map((loc, index) =>
            <circle
              key={ index + 1 }
              style={ style }
              r={ 6 }
              transform={ svgTransform([{translate: opt.project(loc.toArray())}]) }
              onClick={ () => {
                const windowAlert = window.alert;
                windowAlert(`dot ${index}`);
              } }/>
          )
        }
      </g>
    );
  }

  render() {
    const viewport = {...this.state.viewport, ...this.props};
    return (
      <MapGL { ...viewport } onChangeViewport={ this._onChangeViewport }>
        <CanvasOverlay { ...viewport } redraw={ this._redrawCanvasOverlay }/>
        <SVGOverlay { ...viewport } redraw={ this._redrawSVGOverlay }/>
      </MapGL>
    );
  }
}

CustomOverlayExample.propTypes = propTypes;
