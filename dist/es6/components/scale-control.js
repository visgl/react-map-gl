import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import * as React from 'react';
import PropTypes from 'prop-types';
import BaseControl from './base-control';
import mapboxgl from '../utils/mapboxgl';
const propTypes = Object.assign({}, BaseControl.propTypes, {
  maxWidth: PropTypes.number,
  unit: PropTypes.oneOf(['imperial', 'metric', 'nautical'])
});
const defaultProps = Object.assign({}, BaseControl.defaultProps, {
  maxWidth: 100,
  unit: 'metric'
});
export default class ScaleControl extends BaseControl {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "_control", null);

    _defineProperty(this, "_mapboxScaleControl", null);
  }

  componentDidMount() {
    const mapboxScaleControl = new mapboxgl.ScaleControl();
    mapboxScaleControl._map = this._context.map;
    mapboxScaleControl._container = this._containerRef.current;
    this._mapboxScaleControl = mapboxScaleControl;

    this._update();
  }

  _update() {
    const mapboxScaleControl = this._mapboxScaleControl;

    if (mapboxScaleControl) {
      mapboxScaleControl.options = this.props;

      mapboxScaleControl._onMove();
    }
  }

  _render() {
    this._control = this._control || React.createElement("div", {
      ref: this._containerRef,
      className: "mapboxgl-ctrl mapboxgl-ctrl-scale"
    });

    this._update();

    return this._control;
  }

}

_defineProperty(ScaleControl, "propTypes", propTypes);

_defineProperty(ScaleControl, "defaultProps", defaultProps);
//# sourceMappingURL=scale-control.js.map