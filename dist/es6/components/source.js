import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import * as React from 'react';
import { PureComponent, cloneElement } from 'react';
import PropTypes from 'prop-types';
import MapContext from './map-context';
import assert from '../utils/assert';
import deepEqual from '../utils/deep-equal';
const propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string
};
let sourceCounter = 0;
export default class Source extends PureComponent {
  constructor(_props) {
    super(_props);

    _defineProperty(this, "id", void 0);

    _defineProperty(this, "type", void 0);

    _defineProperty(this, "_map", null);

    _defineProperty(this, "_sourceOptions", {});

    _defineProperty(this, "_updateSource", () => {
      const {
        type,
        _map: map
      } = this;

      if (!map) {
        return;
      }

      const {
        _sourceOptions: sourceOptions,
        props
      } = this;
      assert(!props.id || props.id === this.id, 'source id changed');
      assert(props.type === type, 'source type changed');
      let changedKey = '';
      let changedKeyCount = 0;

      for (const key in props) {
        if (key !== 'children' && key !== 'id' && !deepEqual(sourceOptions[key], props[key])) {
          sourceOptions[key] = props[key];
          changedKey = key;
          changedKeyCount++;
        }
      }

      const source = this.getSource();

      if (!source) {
        this._createSource(sourceOptions);

        return;
      }

      if (!changedKeyCount) {
        return;
      }

      if (type === 'geojson') {
        source.setData(sourceOptions.data);
      } else if (type === 'image') {
        source.updateImage({
          url: sourceOptions.url,
          coordinates: sourceOptions.coordinates
        });
      } else if ((type === 'canvas' || type === 'video') && changedKeyCount === 1 && changedKey === 'coordinates') {
        source.setCoordinates(sourceOptions.coordinates);
      } else {
        console.warn("Unable to update <Source> prop: ".concat(changedKey));
      }
    });

    this.id = _props.id || "jsx-source-".concat(sourceCounter++);
    this.type = _props.type;
  }

  componentWillUnmount() {
    const map = this._map;

    if (map) {
      map.off('styledata', this._updateSource);
      requestAnimationFrame(() => {
        if (map.style && map.style._loaded) {
          map.removeSource(this.id);
        }
      });
    }
  }

  getSource() {
    const map = this._map;
    return map && map.style && map.getSource(this.id);
  }

  _createSource(sourceOptions) {
    const map = this._map;

    if (map.style && map.style._loaded) {
      map.addSource(this.id, sourceOptions);
    }
  }

  _render(context) {
    if (!this._map && context.map) {
      this._map = context.map;

      this._map.on('styledata', this._updateSource);
    }

    this._updateSource();

    return React.Children.map(this.props.children, child => cloneElement(child, {
      source: this.id
    }));
  }

  render() {
    return React.createElement(MapContext.Consumer, null, this._render.bind(this));
  }

}

_defineProperty(Source, "propTypes", propTypes);
//# sourceMappingURL=source.js.map