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
import * as React from 'react';
import {useCallback} from 'react';
import PropTypes from 'prop-types';

import {CanvasOverlay} from 'react-map-gl';

function round(x, n) {
  const tenN = Math.pow(10, n);
  return Math.round(x * tenN) / tenN;
}

const propTypes = {
  locations: PropTypes.array.isRequired,
  lngLatAccessor: PropTypes.func,
  renderWhileDragging: PropTypes.bool,
  globalOpacity: PropTypes.number,
  dotRadius: PropTypes.number,
  dotFill: PropTypes.string,
  compositeOperation: PropTypes.string
};

const defaultProps = {
  lngLatAccessor: location => location,
  renderWhileDragging: true,
  dotRadius: 4,
  dotFill: '#1FBAD6',
  globalOpacity: 1,
  // Same as browser default.
  compositeOperation: 'source-over'
};

export default function ScatterplotOverlay(props) {
  /* eslint-disable max-statements */
  const redraw = useCallback(({width, height, ctx, isDragging, project, unproject}) => {
    const {
      dotRadius,
      dotFill,
      compositeOperation,
      renderWhileDragging,
      locations,
      lngLatAccessor
    } = props;

    ctx.clearRect(0, 0, width, height);
    ctx.globalCompositeOperation = compositeOperation;

    if (renderWhileDragging || !isDragging) {
      for (const location of locations) {
        const pixel = project(lngLatAccessor(location));
        const pixelRounded = [round(pixel[0], 1), round(pixel[1], 1)];
        if (
          pixelRounded[0] + dotRadius >= 0 &&
          pixelRounded[0] - dotRadius < width &&
          pixelRounded[1] + dotRadius >= 0 &&
          pixelRounded[1] - dotRadius < height
        ) {
          ctx.fillStyle = dotFill;
          ctx.beginPath();
          ctx.arc(pixelRounded[0], pixelRounded[1], dotRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
  }, []);
  /* eslint-enable max-statements */

  return <CanvasOverlay redraw={redraw} />;
}

ScatterplotOverlay.propTypes = propTypes;
ScatterplotOverlay.defaultProps = defaultProps;
