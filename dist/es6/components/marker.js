import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import * as React from 'react';
import PropTypes from 'prop-types';
import DraggableControl from './draggable-control';
import { crispPixel } from '../utils/crisp-pixel';
const propTypes = Object.assign({}, DraggableControl.propTypes, {
  className: PropTypes.string,
  longitude: PropTypes.number.isRequired,
  latitude: PropTypes.number.isRequired
});
const defaultProps = Object.assign({}, DraggableControl.defaultProps, {
  className: ''
});
export default class Marker extends DraggableControl {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "_control", null);
  }

  _getPosition() {
    const {
      longitude,
      latitude,
      offsetLeft,
      offsetTop
    } = this.props;
    const {
      dragPos,
      dragOffset
    } = this.state;

    if (dragPos && dragOffset) {
      return this._getDraggedPosition(dragPos, dragOffset);
    }

    let [x, y] = this._context.viewport.project([longitude, latitude]);

    x += offsetLeft;
    y += offsetTop;
    return [x, y];
  }

  _render() {
    const [x, y] = this._getPosition();

    const transform = "translate(".concat(crispPixel(x), "px, ").concat(crispPixel(y), "px)");
    const div = this._containerRef.current;

    if (this._control && div) {
      div.style.transform = transform;
    } else {
      const {
        className,
        draggable
      } = this.props;
      const {
        dragPos
      } = this.state;
      const containerStyle = {
        position: 'absolute',
        left: 0,
        top: 0,
        transform,
        cursor: draggable ? dragPos ? 'grabbing' : 'grab' : 'auto'
      };
      this._control = React.createElement("div", {
        className: "mapboxgl-marker ".concat(className),
        ref: this._containerRef,
        style: containerStyle
      }, this.props.children);
    }

    return this._control;
  }

  render() {
    this._control = null;
    return super.render();
  }

}

_defineProperty(Marker, "propTypes", propTypes);

_defineProperty(Marker, "defaultProps", defaultProps);
//# sourceMappingURL=marker.js.map