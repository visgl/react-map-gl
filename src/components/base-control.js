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
import WebMercatorViewport from 'viewport-mercator-project';

const propTypes = {
  /** Event handling */
  captureScroll: PropTypes.bool,
  // Stop map pan & rotate
  captureDrag: PropTypes.bool,
  // Stop map click
  captureClick: PropTypes.bool,
  // Stop map double click
  captureDoubleClick: PropTypes.bool
};

const defaultProps = {
  captureScroll: false,
  captureDrag: true,
  captureClick: true,
  captureDoubleClick: true
};

const contextTypes = {
  viewport: PropTypes.instanceOf(WebMercatorViewport),
  isDragging: PropTypes.bool,
  eventManager: PropTypes.object
};

const EVENT_MAP = {
  captureScroll: 'wheel',
  captureDrag: 'panstart',
  captureClick: 'click',
  captureDoubleClick: 'dblclick'
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

    this._events = null;

    this._onContainerLoad = this._onContainerLoad.bind(this);
  }

  _onContainerLoad(ref) {
    const {eventManager} = this.context;

    // Return early if no eventManager is found
    if (!eventManager) {
      return;
    }

    let events = this._events;

    // Remove all previously registered events
    if (events) {
      eventManager.off(events);
      events = null;
    }

    if (ref) {
      // container is mounted: register events for this element
      events = {};

      for (const propName in EVENT_MAP) {
        const shouldCapture = this.props[propName];
        const eventName = EVENT_MAP[propName];

        if (shouldCapture) {
          events[eventName] = this._captureEvent;
        }
      }

      eventManager.on(events, ref);
    }

    this._events = events;
  }

  _captureEvent(evt) {
    evt.stopPropagation();
  }

  render() {
    return null;
  }

}

BaseControl.propTypes = propTypes;
BaseControl.defaultProps = defaultProps;
BaseControl.contextTypes = contextTypes;
