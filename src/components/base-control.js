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
import {Component} from 'react';
import PropTypes from 'prop-types';
import {PerspectiveMercatorViewport} from 'viewport-mercator-project';

const propTypes = {
  /** Event handling */
  preventScrollZoom: PropTypes.bool,
  // Stop map pan & rotate
  preventDragPanRotate: PropTypes.bool,
  // Stop map click
  preventClick: PropTypes.bool,
  // Stop map double click
  preventDoubleClickZoom: PropTypes.bool
};

const defaultProps = {
  preventScrollZoom: false,
  preventDragPanRotate: true,
  preventClick: true,
  preventDoubleClickZoom: true
};

const contextTypes = {
  viewport: PropTypes.instanceOf(PerspectiveMercatorViewport),
  isDragging: PropTypes.bool,
  eventManager: PropTypes.object
};

/*
 * PureComponent doesn't update when context changes.
 * The only way is to implement our own shouldComponentUpdate here. Considering
 * the parent component (StaticMap or InteractiveMap) is pure, and map re-render
 * is almost always triggered by a viewport change, we almost definitely need to
 * recalculate the marker's position when the parent re-renders.
 */
export default class BaseControl extends Component {

  constructor(props) {
    super(props);

    this._onContainerLoad = this._onContainerLoad.bind(this);
    this._onEvent = this._onEvent.bind(this);
  }

  _onContainerLoad(ref) {
    const events = {
      wheel: this._onEvent,
      panstart: this._onEvent,
      click: this._onEvent,
      dblclick: this._onEvent
    };

    if (ref) {
      this.context.eventManager.on(events, ref);
    } else {
      this.context.eventManager.off(events);
    }
  }

  _onEvent(event) {
    let stopPropagation;
    switch (event.type) {
    case 'wheel':
      stopPropagation = this.props.preventScrollZoom;
      break;
    case 'panstart':
      stopPropagation = this.props.preventDragPanRotate;
      break;
    case 'click':
      stopPropagation = this.props.preventClick;
      break;
    case 'dblclick':
      stopPropagation = this.props.preventDoubleClickZoom;
      break;
    default:
    }

    if (stopPropagation) {
      event.stopPropagation();
    }
  }

  render() {
    return null;
  }

}

BaseControl.propTypes = propTypes;
BaseControl.defaultProps = defaultProps;
BaseControl.contextTypes = contextTypes;
