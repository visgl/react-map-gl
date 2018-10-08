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
import {Component, createElement} from 'react';
import PropTypes from 'prop-types';

import Immutable from 'immutable';
import {StaticContext} from '../../src/components/static-map';
import {InteractiveContext} from '../../src/components/interactive-map';
/* global window */

function round(x, n) {
  const tenN = Math.pow(10, n);
  return Math.round(x * tenN) / tenN;
}

const propTypes = {
  locations: PropTypes.instanceOf(Immutable.List).isRequired,
  lngLatAccessor: PropTypes.func,
  renderWhileDragging: PropTypes.bool,
  globalOpacity: PropTypes.number,
  dotRadius: PropTypes.number,
  dotFill: PropTypes.string,
  compositeOperation: PropTypes.string
};

const defaultProps = {
  lngLatAccessor: location => [location.get(0), location.get(1)],
  renderWhileDragging: true,
  dotRadius: 4,
  dotFill: '#1FBAD6',
  globalOpacity: 1,
  // Same as browser default.
  compositeOperation: 'source-over'
};

export default class ScatterplotOverlay extends Component {

  componentDidMount() {
    this._redraw();
  }

  componentDidUpdate() {
    this._redraw();
  }

  /* eslint-disable max-statements */
  _redraw() {
    const {viewport, isDragging} = this._context;
    const {
      dotRadius, dotFill, compositeOperation,
      renderWhileDragging, locations, lngLatAccessor
    } = this.props;

    const pixelRatio = window.devicePixelRatio || 1;
    const canvas = this.refs.overlay;
    const ctx = canvas.getContext('2d');

    ctx.save();
    ctx.scale(pixelRatio, pixelRatio);
    ctx.clearRect(0, 0, viewport.width, viewport.height);
    ctx.globalCompositeOperation = compositeOperation;

    if ((renderWhileDragging || !isDragging) && locations) {
      for (const location of locations) {
        const pixel = viewport.project(lngLatAccessor(location));
        const pixelRounded = [round(pixel[0], 1), round(pixel[1], 1)];
        if (pixelRounded[0] + dotRadius >= 0 &&
          pixelRounded[0] - dotRadius < viewport.width &&
          pixelRounded[1] + dotRadius >= 0 &&
          pixelRounded[1] - dotRadius < viewport.height
        ) {
          ctx.fillStyle = dotFill;
          ctx.beginPath();
          ctx.arc(pixelRounded[0], pixelRounded[1], dotRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    ctx.restore();
  }
  /* eslint-enable max-statements */

  render() {
    return (
      createElement(StaticContext.Consumer, null,
        sContext => {
          return createElement(InteractiveContext.Consumer, null,
            iContext => {
              this._context = Object.assign({}, sContext, iContext);
              const {viewport: {width, height}} = this._context;
              const {globalOpacity} = this.props;
              const pixelRatio = window.devicePixelRatio || 1;
              return (
                createElement('canvas', {
                  ref: 'overlay',
                  width: width * pixelRatio,
                  height: height * pixelRatio,
                  style: {
                    width: `${width}px`,
                    height: `${height}px`,
                    position: 'absolute',
                    pointerEvents: 'none',
                    opacity: globalOpacity,
                    left: 0,
                    top: 0
                  }
                })
              );
            }
          );
        })
    );
  }
}

ScatterplotOverlay.displayName = 'ScatterplotOverlay';
ScatterplotOverlay.propTypes = propTypes;
ScatterplotOverlay.defaultProps = defaultProps;
// ScatterplotOverlay.contextTypes = contextTypes;
