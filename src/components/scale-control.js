// @flow
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
import PropTypes from 'prop-types';
import BaseControl from './base-control';
import mapboxgl from '../utils/mapboxgl';

import type {BaseControlProps} from './base-control';

const propTypes = Object.assign({}, BaseControl.propTypes, {
  maxWidth: PropTypes.number,
  unit: PropTypes.oneOf(['imperial', 'metric', 'nautical'])
});

const defaultProps = Object.assign({}, BaseControl.defaultProps, {
  maxWidth: 100,
  unit: 'metric'
});

export type ScaleControlProps = BaseControlProps & {
  maxWidth: number,
  unit: string
};

export default class ScaleControl extends BaseControl<ScaleControlProps, *, HTMLDivElement> {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  componentDidMount() {
    const mapboxScaleControl = new mapboxgl.ScaleControl();
    mapboxScaleControl._map = this._context.map;
    mapboxScaleControl._container = this._containerRef.current;
    this._mapboxScaleControl = mapboxScaleControl;

    this._update();
  }

  _control: any = null;
  _mapboxScaleControl: any = null;

  _update() {
    const mapboxScaleControl = this._mapboxScaleControl;
    if (mapboxScaleControl) {
      mapboxScaleControl.options = this.props;
      mapboxScaleControl._onMove();
    }
  }

  _render() {
    this._control = this._control || (
      <div ref={this._containerRef} className="mapboxgl-ctrl mapboxgl-ctrl-scale" />
    );
    // Likely viewport has changed
    this._update();

    return this._control;
  }
}
