import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import * as React from 'react';
import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import MapContext from './map-context';
import assert from '../utils/assert';
import deepEqual from '../utils/deep-equal';
const LAYER_TYPES = {
  fill: 'fill',
  line: 'line',
  symbol: 'symbol',
  circle: 'circle',
  'fill-extrusion': 'fill-extrusion',
  raster: 'raster',
  background: 'background',
  heatmap: 'heatmap',
  hillshade: 'hillshade'
};
const propTypes = {
  type: PropTypes.oneOf(Object.keys(LAYER_TYPES)).isRequired,
  id: PropTypes.string,
  source: PropTypes.string,
  beforeId: PropTypes.string
};

function diffLayerStyles(map, id, props, prevProps) {
  const {
    layout = {},
    paint = {},
    filter,
    minzoom,
    maxzoom,
    beforeId
  } = props,
        otherProps = _objectWithoutProperties(props, ["layout", "paint", "filter", "minzoom", "maxzoom", "beforeId"]);

  if (beforeId !== prevProps.beforeId) {
    map.moveLayer(id, beforeId);
  }

  if (layout !== prevProps.layout) {
    const prevLayout = prevProps.layout || {};

    for (const key in layout) {
      if (!deepEqual(layout[key], prevLayout[key])) {
        map.setLayoutProperty(id, key, layout[key]);
      }
    }

    for (const key in prevLayout) {
      if (!layout.hasOwnProperty(key)) {
        map.setLayoutProperty(id, key, undefined);
      }
    }
  }

  if (paint !== prevProps.paint) {
    const prevPaint = prevProps.paint || {};

    for (const key in paint) {
      if (!deepEqual(paint[key], prevPaint[key])) {
        map.setPaintProperty(id, key, paint[key]);
      }
    }

    for (const key in prevPaint) {
      if (!paint.hasOwnProperty(key)) {
        map.setPaintProperty(id, key, undefined);
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

let layerCounter = 0;
export default class Layer extends PureComponent {
  constructor(_props) {
    super(_props);

    _defineProperty(this, "id", void 0);

    _defineProperty(this, "type", void 0);

    _defineProperty(this, "_map", null);

    _defineProperty(this, "_layerOptions", {});

    _defineProperty(this, "_updateLayer", () => {
      const map = this._map;

      if (!map) {
        return;
      }

      const {
        props,
        _layerOptions: layerOptions
      } = this;
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
        console.warn(error);
      }
    });

    this.id = _props.id || "jsx-layer-".concat(layerCounter++);
    this.type = _props.type;
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

  _render(context) {
    if (!this._map && context.map) {
      this._map = context.map;

      this._map.on('styledata', this._updateLayer);
    }

    return null;
  }

  render() {
    return React.createElement(MapContext.Consumer, null, this._render.bind(this));
  }

}

_defineProperty(Layer, "propTypes", propTypes);
//# sourceMappingURL=layer.js.map