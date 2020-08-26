import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import * as React from 'react';
import PropTypes from 'prop-types';
import BaseControl from './base-control';
import MapState from '../utils/map-state';
import { LINEAR_TRANSITION_PROPS } from '../utils/map-controller';
import deprecateWarn from '../utils/deprecate-warn';
import { compareVersions } from '../utils/version';

const noop = () => {};

const propTypes = Object.assign({}, BaseControl.propTypes, {
  className: PropTypes.string,
  onViewStateChange: PropTypes.func,
  onViewportChange: PropTypes.func,
  showCompass: PropTypes.bool,
  showZoom: PropTypes.bool,
  zoomInLabel: PropTypes.string,
  zoomOutLabel: PropTypes.string,
  compassLabel: PropTypes.string
});
const defaultProps = Object.assign({}, BaseControl.defaultProps, {
  className: '',
  showCompass: true,
  showZoom: true,
  zoomInLabel: 'Zoom In',
  zoomOutLabel: 'Zoom Out',
  compassLabel: 'Reset North'
});
const VERSION_LEGACY = 1;
const VERSION_1_6 = 2;

function getUIVersion(mapboxVersion) {
  return compareVersions(mapboxVersion, '1.6.0') >= 0 ? VERSION_1_6 : VERSION_LEGACY;
}

export default class NavigationControl extends BaseControl {
  constructor(props) {
    super(props);

    _defineProperty(this, "_uiVersion", void 0);

    _defineProperty(this, "_onZoomIn", () => {
      this._updateViewport({
        zoom: this._context.viewport.zoom + 1
      });
    });

    _defineProperty(this, "_onZoomOut", () => {
      this._updateViewport({
        zoom: this._context.viewport.zoom - 1
      });
    });

    _defineProperty(this, "_onResetNorth", () => {
      this._updateViewport({
        bearing: 0,
        pitch: 0
      });
    });

    deprecateWarn(props);
  }

  _updateViewport(opts) {
    const {
      viewport
    } = this._context;
    const mapState = new MapState(Object.assign({}, viewport, opts));
    const viewState = Object.assign({}, mapState.getViewportProps(), LINEAR_TRANSITION_PROPS);
    const onViewportChange = this.props.onViewportChange || this._context.onViewportChange || noop;
    const onViewStateChange = this.props.onViewStateChange || this._context.onViewStateChange || noop;
    onViewStateChange({
      viewState
    });
    onViewportChange(viewState);
  }

  _renderCompass() {
    const {
      bearing
    } = this._context.viewport;
    const style = {
      transform: "rotate(".concat(-bearing, "deg)")
    };
    return this._uiVersion === VERSION_1_6 ? React.createElement("span", {
      className: "mapboxgl-ctrl-icon",
      "aria-hidden": "true",
      style: style
    }) : React.createElement("span", {
      className: "mapboxgl-ctrl-compass-arrow",
      style: style
    });
  }

  _renderButton(type, label, callback, children) {
    return React.createElement("button", {
      key: type,
      className: "mapboxgl-ctrl-icon mapboxgl-ctrl-".concat(type),
      type: "button",
      title: label,
      onClick: callback
    }, children || React.createElement("span", {
      className: "mapboxgl-ctrl-icon",
      "aria-hidden": "true"
    }));
  }

  _render() {
    const {
      className,
      showCompass,
      showZoom,
      zoomInLabel,
      zoomOutLabel,
      compassLabel
    } = this.props;

    if (!this._uiVersion) {
      const {
        map
      } = this._context;
      this._uiVersion = map ? getUIVersion(map.version) : VERSION_1_6;
    }

    return React.createElement("div", {
      className: "mapboxgl-ctrl mapboxgl-ctrl-group ".concat(className),
      ref: this._containerRef
    }, showZoom && this._renderButton('zoom-in', zoomInLabel, this._onZoomIn), showZoom && this._renderButton('zoom-out', zoomOutLabel, this._onZoomOut), showCompass && this._renderButton('compass', compassLabel, this._onResetNorth, this._renderCompass()));
  }

}

_defineProperty(NavigationControl, "propTypes", propTypes);

_defineProperty(NavigationControl, "defaultProps", defaultProps);
//# sourceMappingURL=navigation-control.js.map