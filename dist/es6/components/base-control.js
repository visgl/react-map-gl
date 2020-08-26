import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import * as React from 'react';
import { PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';
import MapContext from './map-context';
const propTypes = {
  captureScroll: PropTypes.bool,
  captureDrag: PropTypes.bool,
  captureClick: PropTypes.bool,
  captureDoubleClick: PropTypes.bool
};
const defaultProps = {
  captureScroll: false,
  captureDrag: true,
  captureClick: true,
  captureDoubleClick: true
};
export default class BaseControl extends PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "_context", {});

    _defineProperty(this, "_events", null);

    _defineProperty(this, "_containerRef", createRef());

    _defineProperty(this, "_onScroll", evt => {
      if (this.props.captureScroll) {
        evt.stopPropagation();
      }
    });

    _defineProperty(this, "_onDragStart", evt => {
      if (this.props.captureDrag) {
        evt.stopPropagation();
      }
    });

    _defineProperty(this, "_onDblClick", evt => {
      if (this.props.captureDoubleClick) {
        evt.stopPropagation();
      }
    });

    _defineProperty(this, "_onClick", evt => {
      if (this.props.captureClick) {
        evt.stopPropagation();
      }
    });
  }

  componentDidMount() {
    const ref = this._containerRef.current;

    if (!ref) {
      return;
    }

    const {
      eventManager
    } = this._context;

    if (eventManager) {
      this._events = {
        wheel: this._onScroll,
        panstart: this._onDragStart,
        anyclick: this._onClick,
        click: this._onClick,
        dblclick: this._onDblClick
      };
      eventManager.watch(this._events, ref);
    }
  }

  componentWillUnmount() {
    const {
      eventManager
    } = this._context;

    if (eventManager && this._events) {
      eventManager.off(this._events);
    }
  }

  _render() {
    throw new Error('_render() not implemented');
  }

  render() {
    return React.createElement(MapContext.Consumer, null, context => {
      this._context = context;
      return this._render();
    });
  }

}

_defineProperty(BaseControl, "propTypes", propTypes);

_defineProperty(BaseControl, "defaultProps", defaultProps);
//# sourceMappingURL=base-control.js.map