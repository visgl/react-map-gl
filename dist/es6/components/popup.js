import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import * as React from 'react';
import { createRef } from 'react';
import PropTypes from 'prop-types';
import BaseControl from './base-control';
import { getDynamicPosition, ANCHOR_POSITION } from '../utils/dynamic-position';
import { crispPercentage, crispPixel } from '../utils/crisp-pixel';
const propTypes = Object.assign({}, BaseControl.propTypes, {
  className: PropTypes.string,
  longitude: PropTypes.number.isRequired,
  latitude: PropTypes.number.isRequired,
  altitude: PropTypes.number,
  offsetLeft: PropTypes.number,
  offsetTop: PropTypes.number,
  tipSize: PropTypes.number,
  closeButton: PropTypes.bool,
  closeOnClick: PropTypes.bool,
  anchor: PropTypes.oneOf(Object.keys(ANCHOR_POSITION)),
  dynamicPosition: PropTypes.bool,
  sortByDepth: PropTypes.bool,
  onClose: PropTypes.func
});
const defaultProps = Object.assign({}, BaseControl.defaultProps, {
  className: '',
  altitude: 0,
  offsetLeft: 0,
  offsetTop: 0,
  tipSize: 10,
  anchor: 'bottom',
  dynamicPosition: true,
  sortByDepth: false,
  closeButton: true,
  closeOnClick: true,
  onClose: () => {}
});
export default class Popup extends BaseControl {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "_closeOnClick", false);

    _defineProperty(this, "_contentRef", createRef());

    _defineProperty(this, "_onClick", evt => {
      if (this.props.captureClick) {
        evt.stopPropagation();
      }

      if (this.props.closeOnClick || evt.target.className === 'mapboxgl-popup-close-button') {
        this.props.onClose();
        const {
          eventManager
        } = this._context;

        if (eventManager) {
          eventManager.once('click', e => e.stopPropagation(), evt.target);
        }
      }
    });
  }

  componentDidMount() {
    super.componentDidMount();
    this.forceUpdate();
  }

  _getPosition(x, y) {
    const {
      viewport
    } = this._context;
    const {
      anchor,
      dynamicPosition,
      tipSize
    } = this.props;
    const content = this._contentRef.current;

    if (content) {
      return dynamicPosition ? getDynamicPosition({
        x,
        y,
        anchor,
        padding: tipSize,
        width: viewport.width,
        height: viewport.height,
        selfWidth: content.clientWidth,
        selfHeight: content.clientHeight
      }) : anchor;
    }

    return anchor;
  }

  _getContainerStyle(x, y, z, positionType) {
    const {
      viewport
    } = this._context;
    const {
      offsetLeft,
      offsetTop,
      sortByDepth
    } = this.props;
    const anchorPosition = ANCHOR_POSITION[positionType];
    const left = x + offsetLeft;
    const top = y + offsetTop;
    const el = this._containerRef.current;
    const xPercentage = crispPercentage(el, -anchorPosition.x * 100);
    const yPercentage = crispPercentage(el, -anchorPosition.y * 100, 'y');
    const style = {
      position: 'absolute',
      transform: "\n        translate(".concat(xPercentage, "%, ").concat(yPercentage, "%)\n        translate(").concat(crispPixel(left), "px, ").concat(crispPixel(top), "px)\n      "),
      display: undefined,
      zIndex: undefined
    };

    if (!sortByDepth) {
      return style;
    }

    if (z > 1 || z < -1 || x < 0 || x > viewport.width || y < 0 || y > viewport.height) {
      style.display = 'none';
    } else {
      style.zIndex = Math.floor((1 - z) / 2 * 100000);
    }

    return style;
  }

  _renderTip(positionType) {
    const {
      tipSize
    } = this.props;
    return React.createElement("div", {
      key: "tip",
      className: "mapboxgl-popup-tip",
      style: {
        borderWidth: tipSize
      }
    });
  }

  _renderContent() {
    const {
      closeButton,
      children
    } = this.props;
    const onClick = this._context.eventManager ? null : this._onClick;
    return React.createElement("div", {
      key: "content",
      ref: this._contentRef,
      className: "mapboxgl-popup-content",
      onClick: onClick
    }, closeButton && React.createElement("button", {
      key: "close-button",
      className: "mapboxgl-popup-close-button",
      type: "button"
    }, "\xD7"), children);
  }

  _render() {
    const {
      className,
      longitude,
      latitude,
      altitude
    } = this.props;

    const [x, y, z] = this._context.viewport.project([longitude, latitude, altitude]);

    const positionType = this._getPosition(x, y);

    const containerStyle = this._getContainerStyle(x, y, z, positionType);

    return React.createElement("div", {
      className: "mapboxgl-popup mapboxgl-popup-anchor-".concat(positionType, " ").concat(className),
      style: containerStyle,
      ref: this._containerRef
    }, this._renderTip(positionType), this._renderContent());
  }

}

_defineProperty(Popup, "propTypes", propTypes);

_defineProperty(Popup, "defaultProps", defaultProps);
//# sourceMappingURL=popup.js.map