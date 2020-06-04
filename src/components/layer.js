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
import {PureComponent} from 'react';
import PropTypes from 'prop-types';
import MapContext from './map-context';
import assert from '../utils/assert';
import deepEqual from '../utils/deep-equal';

import type {MapContextProps} from './map-context';

const propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string,
  source: PropTypes.string,
  beforeId: PropTypes.string
};

type LayerProps = {
  id?: string,
  type: string,
  source?: string,
  beforeId?: string,
  layout: any,
  paint: any,
  filter?: Array<mixed>,
  minzoom?: number,
  maxzoom?: number
};

/* eslint-disable complexity */
function diffLayerStyles(map: any, id: string, props: LayerProps, prevProps: LayerProps) {
  const {layout = {}, paint = {}, filter, minzoom, maxzoom, beforeId, ...otherProps} = props;

  if (beforeId !== prevProps.beforeId) {
    map.moveLayer(id, beforeId);
  }
  if (layout !== prevProps.layout) {
    for (const key in layout) {
      if (!deepEqual(layout[key], prevProps.layout[key])) {
        map.setLayoutProperty(id, key, layout[key]);
      }
    }
  }
  if (paint !== prevProps.paint) {
    for (const key in paint) {
      if (!deepEqual(paint[key], prevProps.paint[key])) {
        map.setPaintProperty(id, key, paint[key]);
      }
    }
  }
  if (!deepEqual(filter, prevProps.filter)) {
    map.setFilter(id, filter);
  }
  if (minzoom !== prevProps.minzoom || maxzoom !== prevProps.maxzoom) {
    map.setLayerZoomRange(id, minzoom, maxzoom);
  }
  for (const key in otherProps) {
    if (!deepEqual(otherProps[key], prevProps[key])) {
      map.setLayerProperty(id, key, otherProps[key]);
    }
  }
}
/* eslint-enable complexity */

let layerCounter = 0;

export default class Layer<Props: LayerProps> extends PureComponent<Props> {
  static propTypes = propTypes;

  constructor(props: Props) {
    super(props);
    this.id = props.id || `jsx-layer-${layerCounter++}`;
    this.type = props.type;
  }

  componentDidMount() {
    this._updateLayer();
  }

  componentDidUpdate() {
    this._updateLayer();
  }

  componentWillUnmount() {
    const map = this._map;
    if (map) {
      map.off('styledata', this._updateLayer);
      if (map.style && map.style._loaded) {
        map.removeLayer(this.id);
      }
    }
  }

  id: string;
  type: string;
  _map: any = null;
  _layerOptions: any = {};

  getLayer() {
    const map = this._map;
    return map && map.style && map.getLayer(this.id);
  }

  _createLayer() {
    const map = this._map;

    if (map.style && map.style._loaded) {
      const options = Object.assign({}, this.props);
      options.id = this.id;
      delete options.beforeId;

      map.addLayer(options, this.props.beforeId);
      this._layerOptions = options;
    }
  }

  /* eslint-disable complexity */
  _updateLayer = () => {
    const map = this._map;
    if (!map) {
      return;
    }

    const {props, _layerOptions: layerOptions} = this;
    assert(!props.id || props.id === this.id, 'layer id changed');
    assert(props.type === this.type, 'layer type changed');

    if (!this.getLayer()) {
      this._createLayer();
      return;
    }

    try {
      diffLayerStyles(map, this.id, props, layerOptions);
      Object.assign(layerOptions, props);
    } catch (error) {
      console.warn(error); // eslint-disable-line
    }
  };
  /* eslint-disable complexity */

  _render(context: MapContextProps) {
    if (!this._map && context.map) {
      this._map = context.map;
      this._map.on('styledata', this._updateLayer);
    }
    return null;
  }

  render() {
    return <MapContext.Consumer>{this._render.bind(this)}</MapContext.Consumer>;
  }
}
