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

const stopPropagation = event => event.stopPropagation();

const propTypes = {
  /** Event handling */
  onWheel: PropTypes.func,
  // Stop map pan & rotate
  onDragStart: PropTypes.func,
  // Stop map click
  onClick: PropTypes.func,
  // Stop map double click
  onDblClick: PropTypes.func
};

const defaultProps = {
  onWheel: null,
  onDragStart: stopPropagation,
  onClick: stopPropagation,
  onDblClick: stopPropagation
};

const contextTypes = {
  viewport: PropTypes.instanceOf(PerspectiveMercatorViewport),
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
      tap: this._onEvent,
      doubletap: this._onEvent
    };

    if (ref) {
      this.context.eventManager.on(events, ref);
    } else {
      this.context.eventManager.off(events);
    }
  }

  _onEvent(event) {
    let handler;
    switch (event.type) {
    case 'wheel':
      handler = this.props.onWheel;
      break;
    case 'panstart':
      handler = this.props.onDragStart;
      break;
    case 'tap':
      handler = this.props.onClick;
      break;
    case 'doubletap':
      handler = this.props.onDblClick;
      break;
    default:
    }

    if (handler) {
      handler(event);
    }
  }

  render() {
    return null;
  }

}

BaseControl.propTypes = propTypes;
BaseControl.defaultProps = defaultProps;
BaseControl.contextTypes = contextTypes;
