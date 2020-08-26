import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import * as React from 'react';
import PropTypes from 'prop-types';
import BaseControl from '../components/base-control';
const propTypes = Object.assign({}, BaseControl.propTypes, {
  redraw: PropTypes.func.isRequired,
  style: PropTypes.object
});
const defaultProps = {
  captureScroll: false,
  captureDrag: false,
  captureClick: false,
  captureDoubleClick: false
};
export default class SVGOverlay extends BaseControl {
  _render() {
    const {
      viewport,
      isDragging
    } = this._context;
    const style = Object.assign({
      position: 'absolute',
      left: 0,
      top: 0
    }, this.props.style);
    return React.createElement("svg", {
      width: viewport.width,
      height: viewport.height,
      ref: this._containerRef,
      style: style
    }, this.props.redraw({
      width: viewport.width,
      height: viewport.height,
      isDragging,
      project: viewport.project.bind(viewport),
      unproject: viewport.unproject.bind(viewport)
    }));
  }

}

_defineProperty(SVGOverlay, "propTypes", propTypes);

_defineProperty(SVGOverlay, "defaultProps", defaultProps);
//# sourceMappingURL=svg-overlay.js.map