// Copyright (c) 2015 Uber Technologies, Inc.

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
import {createElement} from 'react';
import PropTypes from 'prop-types';
import BaseControl from './base-control';

const propTypes = Object.assign({}, BaseControl.propTypes, {
  // Custom className
  className: PropTypes.string,
  // Longitude of the anchor point
  longitude: PropTypes.number.isRequired,
  // Latitude of the anchor point
  latitude: PropTypes.number.isRequired,
  // Offset from the left
  offsetLeft: PropTypes.number,
  // Offset from the top
  offsetTop: PropTypes.number,
  // Drag and Drop props
  draggable: PropTypes.bool,
  onDrag: PropTypes.func,
  onDragEnd: PropTypes.func,
  onDragStart: PropTypes.func
});

const defaultProps = Object.assign({}, BaseControl.defaultProps, {
  className: '',
  offsetLeft: 0,
  offsetTop: 0
});

/*
 * PureComponent doesn't update when context changes.
 * The only way is to implement our own shouldComponentUpdate here. Considering
 * the parent component (StaticMap or InteractiveMap) is pure, and map re-render
 * is almost always triggered by a viewport change, we almost definitely need to
 * recalculate the marker's position when the parent re-renders.
 */
export default class Marker extends BaseControl {
  constructor(props) {
    super(props);
    this.state = {
      dragPos: null,
      dragOffset: null
    };
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    this._removeDragEvents();
  }

  _setupDragEvents() {
    const {eventManager} = this.context;
    if (!eventManager) {
      return;
    }

    // panstart is already attached by parent class BaseControl,
    // here we just add listeners for subsequent drag events
    this._dragEvents = {
      panmove: this._onDrag.bind(this),
      panend: this._onDragEnd.bind(this),
      pancancel: this._onDragCancel.bind(this)
    };
    eventManager.on(this._dragEvents);
  }

  _removeDragEvents() {
    const {eventManager} = this.context;
    if (!eventManager || !this._dragEvents) {
      return;
    }
    eventManager.off(this._dragEvents);
    this._dragEvents = null;
  }

  _getDragEventPosition(event) {
    const {offsetCenter: {x, y}} = event;
    return [x, y];
  }

  /**
   * Returns offset of top-left of marker from drag start event
   * (used for positioning marker relative to next mouse coordinates)
   */
  _getDragEventOffset(event) {
    const {center: {x, y}} = event;
    const rect = this._containerRef.getBoundingClientRect();
    return [rect.left - x, rect.top - y];
  }

  _getDraggedMarkerPos(dragPos, dragOffset) {
    return [
      dragPos[0] + dragOffset[0],
      dragPos[1] + dragOffset[1]
    ];
  }

  _getDragLngLat(dragPos, dragOffset) {
    return this.context.viewport.unproject(
      this._getDraggedMarkerPos(dragPos, dragOffset)
    );
  }

  _onDragStart(event) {
    const {draggable, captureDrag} = this.props;
    if (draggable || captureDrag) {
      event.stopPropagation();
    }
    if (!draggable) {
      return;
    }

    const dragPos = this._getDragEventPosition(event);
    const dragOffset = this._getDragEventOffset(event);
    this.setState({dragPos, dragOffset});
    this._setupDragEvents();

    if (this.props.onDragStart) {
      event.lngLat = this._getDragLngLat(dragPos, dragOffset);
      this.props.onDragStart(event);
    }
  }

  _onDrag(event) {
    event.stopPropagation();

    const dragPos = this._getDragEventPosition(event);
    this.setState({dragPos});

    if (this.props.onDrag) {
      event.lngLat = this._getDragLngLat(dragPos, this.state.dragOffset);
      this.props.onDrag(event);
    }
  }

  _onDragEnd(event) {
    const {dragPos, dragOffset} = this.state;

    event.stopPropagation();
    this.setState({dragPos: null, dragOffset: null});
    this._removeDragEvents();

    if (this.props.onDragEnd) {
      event.lngLat = this._getDragLngLat(dragPos, dragOffset);
      this.props.onDragEnd(event);
    }
  }

  _onDragCancel(event) {
    event.stopPropagation();
    this.setState({dragPos: null, dragOffset: null});
    this._removeDragEvents();
  }

  render() {
    const {className, longitude, latitude, offsetLeft, offsetTop} = this.props;
    const {dragPos, dragOffset} = this.state;

    const [x, y] = dragPos ?
      this._getDraggedMarkerPos(dragPos, dragOffset) :
      this.context.viewport.project([longitude, latitude]);

    const containerStyle = {
      position: 'absolute',
      left: x + offsetLeft,
      top: y + offsetTop
    };

    return createElement('div', {
      className: `mapboxgl-marker ${className}`,
      ref: this._onContainerLoad,
      style: containerStyle,
      children: this.props.children
    });
  }

}

Marker.displayName = 'Marker';
Marker.propTypes = propTypes;
Marker.defaultProps = defaultProps;
