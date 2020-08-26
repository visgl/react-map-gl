import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import PropTypes from 'prop-types';
import BaseControl from './base-control';
const propTypes = Object.assign({}, BaseControl.propTypes, {
  draggable: PropTypes.bool,
  onDrag: PropTypes.func,
  onDragEnd: PropTypes.func,
  onDragStart: PropTypes.func,
  offsetLeft: PropTypes.number,
  offsetTop: PropTypes.number
});
const defaultProps = Object.assign({}, BaseControl.defaultProps, {
  draggable: false,
  offsetLeft: 0,
  offsetTop: 0
});
export default class DraggableControl extends BaseControl {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      dragPos: null,
      dragOffset: null
    });

    _defineProperty(this, "_dragEvents", null);

    _defineProperty(this, "_onDragStart", event => {
      const {
        draggable,
        captureDrag
      } = this.props;

      if (draggable || captureDrag) {
        event.stopPropagation();
      }

      if (!draggable) {
        return;
      }

      const dragPos = this._getDragEventPosition(event);

      const dragOffset = this._getDragEventOffset(event);

      this.setState({
        dragPos,
        dragOffset
      });

      this._setupDragEvents();

      const {
        onDragStart
      } = this.props;

      if (onDragStart && dragOffset) {
        const callbackEvent = Object.assign({}, event);
        callbackEvent.lngLat = this._getDragLngLat(dragPos, dragOffset);
        onDragStart(callbackEvent);
      }
    });

    _defineProperty(this, "_onDrag", event => {
      event.stopPropagation();

      const dragPos = this._getDragEventPosition(event);

      this.setState({
        dragPos
      });
      const {
        onDrag
      } = this.props;
      const {
        dragOffset
      } = this.state;

      if (onDrag && dragOffset) {
        const callbackEvent = Object.assign({}, event);
        callbackEvent.lngLat = this._getDragLngLat(dragPos, dragOffset);
        onDrag(callbackEvent);
      }
    });

    _defineProperty(this, "_onDragEnd", event => {
      const {
        dragPos,
        dragOffset
      } = this.state;
      event.stopPropagation();
      this.setState({
        dragPos: null,
        dragOffset: null
      });

      this._removeDragEvents();

      const {
        onDragEnd
      } = this.props;

      if (onDragEnd && dragPos && dragOffset) {
        const callbackEvent = Object.assign({}, event);
        callbackEvent.lngLat = this._getDragLngLat(dragPos, dragOffset);
        onDragEnd(callbackEvent);
      }
    });

    _defineProperty(this, "_onDragCancel", event => {
      event.stopPropagation();
      this.setState({
        dragPos: null,
        dragOffset: null
      });

      this._removeDragEvents();
    });
  }

  componentWillUnmount() {
    super.componentWillUnmount();

    this._removeDragEvents();
  }

  _setupDragEvents() {
    const {
      eventManager
    } = this._context;

    if (!eventManager) {
      return;
    }

    this._dragEvents = {
      panmove: this._onDrag,
      panend: this._onDragEnd,
      pancancel: this._onDragCancel
    };
    eventManager.on(this._dragEvents);
  }

  _removeDragEvents() {
    const {
      eventManager
    } = this._context;

    if (!eventManager || !this._dragEvents) {
      return;
    }

    eventManager.off(this._dragEvents);
    this._dragEvents = null;
  }

  _getDragEventPosition(event) {
    const {
      offsetCenter: {
        x,
        y
      }
    } = event;
    return [x, y];
  }

  _getDragEventOffset(event) {
    const {
      center: {
        x,
        y
      }
    } = event;
    const container = this._containerRef.current;

    if (container) {
      const rect = container.getBoundingClientRect();
      return [rect.left - x, rect.top - y];
    }

    return null;
  }

  _getDraggedPosition(dragPos, dragOffset) {
    return [dragPos[0] + dragOffset[0], dragPos[1] + dragOffset[1]];
  }

  _getDragLngLat(dragPos, dragOffset) {
    const {
      offsetLeft,
      offsetTop
    } = this.props;

    const [x, y] = this._getDraggedPosition(dragPos, dragOffset);

    return this._context.viewport.unproject([x - offsetLeft, y - offsetTop]);
  }

}

_defineProperty(DraggableControl, "propTypes", propTypes);

_defineProperty(DraggableControl, "defaultProps", defaultProps);
//# sourceMappingURL=draggable-control.js.map