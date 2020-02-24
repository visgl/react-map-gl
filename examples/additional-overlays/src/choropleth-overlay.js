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
import {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {extent} from 'd3-array';
import {scaleLinear} from 'd3-scale';
import {geoPath, geoTransform} from 'd3-geo';
import Immutable from 'immutable';

import {CanvasOverlay} from 'react-map-gl';

const propTypes = {
  renderWhileDragging: PropTypes.bool.isRequired,
  globalOpacity: PropTypes.number.isRequired,
  /**
   * An Immutable List of feature objects.
   */
  features: PropTypes.instanceOf(Immutable.List),
  /* eslint-disable react/forbid-prop-types */
  colorDomain: PropTypes.array,
  colorRange: PropTypes.array.isRequired,
  valueAccessor: PropTypes.func.isRequired
};

const defaultProps = {
  renderWhileDragging: true,
  globalOpacity: 1,
  colorDomain: null,
  colorRange: ['#FFFFFF', '#1FBAD6'],
  valueAccessor: feature => feature.get('properties').get('value')
};

export default class ChoroplethOverlay extends PureComponent {
  _redraw = ({width, height, ctx, isDragging, project, unproject}) => {
    ctx.clearRect(0, 0, width, height);

    function projectPoint(lon, lat) {
      const point = project([lon, lat]);
      /* eslint-disable no-invalid-this */
      this.stream.point(point[0], point[1]);
      /* eslint-enable no-invalid-this */
    }

    if (this.props.renderWhileDragging || !isDragging) {
      const transform = geoTransform({point: projectPoint});
      const path = geoPath()
        .projection(transform)
        .context(ctx);
      this._drawFeatures(ctx, path);
    }
  };

  _drawFeatures(ctx, path) {
    const {features} = this.props;
    if (!features) {
      return;
    }
    const colorDomain =
      this.props.colorDomain || extent(features.toArray(), this.props.valueAccessor);

    const colorScale = scaleLinear()
      .domain(colorDomain)
      .range(this.props.colorRange)
      .clamp(true);

    for (const feature of features) {
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.lineWidth = '1';
      ctx.fillStyle = colorScale(this.props.valueAccessor(feature));
      const geometry = feature.get('geometry');
      path({
        type: geometry.get('type'),
        coordinates: geometry.get('coordinates').toJS()
      });
      ctx.fill();
      ctx.stroke();
    }
  }

  render() {
    return <CanvasOverlay redraw={this._redraw} />;
  }
}

ChoroplethOverlay.propTypes = propTypes;
ChoroplethOverlay.defaultProps = defaultProps;
