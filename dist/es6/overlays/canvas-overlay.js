import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import * as React from 'react';
import PropTypes from 'prop-types';
import BaseControl from '../components/base-control';
import { window } from '../utils/globals';
const propTypes = Object.assign({}, BaseControl.propTypes, {
  redraw: PropTypes.func.isRequired
});
const defaultProps = {
  captureScroll: false,
  captureDrag: false,
  captureClick: false,
  captureDoubleClick: false
};
export default class CanvasOverlay extends BaseControl {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "_canvas", void 0);

    _defineProperty(this, "_ctx", void 0);

    _defineProperty(this, "_redraw", () => {
      const ctx = this._ctx;

      if (!ctx) {
        return;
      }

      const pixelRatio = window.devicePixelRatio || 1;
      ctx.save();
      ctx.scale(pixelRatio, pixelRatio);
      const {
        viewport,
        isDragging
      } = this._context;
      this.props.redraw({
        width: viewport.width,
        height: viewport.height,
        ctx,
        isDragging,
        project: viewport.project.bind(viewport),
        unproject: viewport.unproject.bind(viewport)
      });
      ctx.restore();
    });
  }

  componentDidMount() {
    const canvas = this._containerRef.current;

    if (canvas) {
      this._canvas = canvas;
      this._ctx = canvas.getContext('2d');
    }

    this._redraw();
  }

  _render() {
    const pixelRatio = window.devicePixelRatio || 1;
    const {
      viewport: {
        width,
        height
      }
    } = this._context;

    this._redraw();

    return React.createElement("canvas", {
      ref: this._containerRef,
      width: width * pixelRatio,
      height: height * pixelRatio,
      style: {
        width: "".concat(width, "px"),
        height: "".concat(height, "px"),
        position: 'absolute',
        left: 0,
        top: 0
      }
    });
  }

}

_defineProperty(CanvasOverlay, "propTypes", propTypes);

_defineProperty(CanvasOverlay, "defaultProps", defaultProps);
//# sourceMappingURL=canvas-overlay.js.map