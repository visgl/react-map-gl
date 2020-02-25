// @flow
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
import * as React from 'react';
import PropTypes from 'prop-types';
import DraggableControl from './draggable-control';
import {crispPixel} from '../utils/crisp-pixel';

import type {DraggableControlProps} from './draggable-control';

const propTypes = Object.assign({}, DraggableControl.propTypes, {
  // Custom className
  className: PropTypes.string,
  // Longitude of the anchor point
  longitude: PropTypes.number.isRequired,
  // Latitude of the anchor point
  latitude: PropTypes.number.isRequired
});

const defaultProps = Object.assign({}, DraggableControl.defaultProps, {
  className: ''
});

export type MarkerProps = DraggableControlProps & {
  className: string,
  longitude: number,
  latitude: number
};

/*
 * PureComponent doesn't update when context changes.
 * The only way is to implement our own shouldComponentUpdate here. Considering
 * the parent component (StaticMap or InteractiveMap) is pure, and map re-render
 * is almost always triggered by a viewport change, we almost definitely need to
 * recalculate the marker's position when the parent re-renders.
 */
export default class Marker extends DraggableControl<MarkerProps> {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  _control: any = null;

  _getPosition(): [number, number] {
    const {longitude, latitude, offsetLeft, offsetTop} = this.props;
    const {dragPos, dragOffset} = this.state;

    // If dragging, just return the current drag position
    if (dragPos && dragOffset) {
      return this._getDraggedPosition(dragPos, dragOffset);
    }

    // Otherwise return the projected lat/lng with offset
    let [x, y] = this._context.viewport.project([longitude, latitude]);
    x += offsetLeft;
    y += offsetTop;
    return [x, y];
  }

  _render() {
    const [x, y] = this._getPosition();
    const transform = `translate(${crispPixel(x)}px, ${crispPixel(y)}px)`;
    const div = this._containerRef.current;

    if (this._control && div) {
      // Perf: avoid rerendering if only the viewport changed
      div.style.transform = transform;
    } else {
      const {className, draggable} = this.props;
      const {dragPos} = this.state;

      const containerStyle = {
        position: 'absolute',
        left: 0,
        top: 0,
        transform,
        cursor: draggable ? (dragPos ? 'grabbing' : 'grab') : 'auto'
      };

      this._control = (
        <div
          className={`mapboxgl-marker ${className}`}
          ref={this._containerRef}
          style={containerStyle}
        >
          {this.props.children}
        </div>
      );
    }
    return this._control;
  }

  render() {
    // invalidate cached element
    this._control = null;
    return super.render();
  }
}
