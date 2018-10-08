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
import {Component, createElement} from 'react';
import PropTypes from 'prop-types';
// import WebMercatorViewport from 'viewport-mercator-project';
import {InteractiveContext} from './interactive-map';
import {StaticContext} from './static-map';

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

// const contextTypes = {
//   viewport: PropTypes.instanceOf(WebMercatorViewport),
//   isDragging: PropTypes.bool,
//   eventManager: PropTypes.object
// };

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
    this._containerRef = null;
  }

  componentWillUnmount() {
    const eventManager = this._eventManager;
    if (eventManager && this._events) {
      eventManager.off(this._events);
    }
  }

  _onContainerLoad = (ref) => {
    this._containerRef = ref;

    const eventManager = this._eventManager;

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
      events = {
        wheel: this._onScroll,
        panstart: this._onDragStart,
        click: this._onClick,
        dblclick: this._onDoubleClick
      };

      eventManager.on(events, ref);
    }

    this._events = events;
  }

  _onScroll = (evt) => {
    if (this.props.captureScroll) {
      evt.stopPropagation();
    }
  }

  _onDragStart = (evt) => {
    if (this.props.captureDrag) {
      evt.stopPropagation();
    }
  }

  _onClick = (evt) => {
    if (this.props.captureClick) {
      evt.stopPropagation();
    }
  }

  _onDoubleClick = (evt) => {
    if (this.props.captureDoubleClick) {
      evt.stopPropagation();
    }
  }

  _render(context) {
    throw new Error('_render() must be implemented');
  }

  render() {
    return (
      createElement(InteractiveContext.Consumer,
        null, iContext => {
          this._eventManager = iContext.eventManager;
          return createElement(StaticContext.Consumer,
            null, sContext => {
              return this._render({
                viewport: sContext.viewport,
                isDragging: iContext.isDragging
              });
            }
          );
        }
      )
    );
  }
}

BaseControl.propTypes = propTypes;
BaseControl.defaultProps = defaultProps;
// BaseControl.contextTypes = contextTypes;
