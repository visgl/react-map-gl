import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import { document } from '../utils/globals';
import PropTypes from 'prop-types';
import BaseControl from './base-control';
import * as React from 'react';
import mapboxgl from '../utils/mapboxgl';
const propTypes = Object.assign({}, BaseControl.propTypes, {
  className: PropTypes.string,
  container: PropTypes.object
});
const defaultProps = Object.assign({}, BaseControl.defaultProps, {
  className: '',
  container: null
});
export default class FullscreenControl extends BaseControl {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      isFullscreen: false,
      showButton: false
    });

    _defineProperty(this, "_mapboxFullscreenControl", null);

    _defineProperty(this, "_onFullscreenChange", () => {
      const nextState = !this._mapboxFullscreenControl._fullscreen;
      this._mapboxFullscreenControl._fullscreen = nextState;
      this.setState({
        isFullscreen: nextState
      });
    });

    _defineProperty(this, "_onClickFullscreen", () => {
      this._mapboxFullscreenControl._onClickFullscreen();
    });
  }

  componentDidMount() {
    const container = this.props.container || this._context.mapContainer;
    this._mapboxFullscreenControl = new mapboxgl.FullscreenControl({
      container
    });
    this.setState({
      showButton: this._mapboxFullscreenControl._checkFullscreenSupport()
    });
    document.addEventListener(this._mapboxFullscreenControl._fullscreenchange, this._onFullscreenChange);
  }

  componentWillUnmount() {
    document.removeEventListener(this._mapboxFullscreenControl._fullscreenchange, this._onFullscreenChange);
  }

  _renderButton(type, label, callback) {
    return React.createElement("button", {
      key: type,
      className: "mapboxgl-ctrl-icon mapboxgl-ctrl-".concat(type),
      type: "button",
      title: label,
      onClick: callback
    }, React.createElement("span", {
      className: "mapboxgl-ctrl-icon",
      "aria-hidden": "true"
    }));
  }

  _render() {
    if (!this.state.showButton) {
      return null;
    }

    const {
      className
    } = this.props;
    const {
      isFullscreen
    } = this.state;
    const type = isFullscreen ? 'shrink' : 'fullscreen';
    return React.createElement("div", {
      className: "mapboxgl-ctrl mapboxgl-ctrl-group ".concat(className),
      ref: this._containerRef
    }, this._renderButton(type, 'Toggle fullscreen', this._onClickFullscreen));
  }

}

_defineProperty(FullscreenControl, "propTypes", propTypes);

_defineProperty(FullscreenControl, "defaultProps", defaultProps);
//# sourceMappingURL=fullscreen-control.js.map