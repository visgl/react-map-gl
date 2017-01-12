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

import React, {PropTypes, Component} from 'react';
import autobind from 'autobind-decorator';

import Immutable from 'immutable';

import transform from 'svg-transform';
import document from 'global/document';
import config from '../config';
import ViewportMercator from 'viewport-mercator-project';

function noop() {}

function mouse(container, event) {
  const rect = container.getBoundingClientRect();
  const x = event.clientX - rect.left - container.clientLeft;
  const y = event.clientY - rect.top - container.clientTop;
  return [x, y];
}

export default class DraggablePointsOverlay extends Component {

  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    zoom: PropTypes.number.isRequired,
    points: PropTypes.instanceOf(Immutable.List).isRequired,
    isDragging: PropTypes.bool.isRequired,
    keyAccessor: PropTypes.func.isRequired,
    lngLatAccessor: PropTypes.func.isRequired,
    onAddPoint: PropTypes.func.isRequired,
    onUpdatePoint: PropTypes.func.isRequired,
    renderPoint: PropTypes.func.isRequired
  };

  static defaultProps = {
    keyAccessor: point => point.get('id'),
    lngLatAccessor: point => point.get('location').toArray(),
    onAddPoint: noop,
    onUpdatePoint: noop,
    renderPoint: noop,
    isDragging: false
  };

  constructor(props) {
    super(props);
    this.state = {
      draggedPointKey: null
    };
  }

  @autobind
  _onDragStart(point, event) {
    event.stopPropagation();
    document.addEventListener('mousemove', this._onDrag, false);
    document.addEventListener('mouseup', this._onDragEnd, false);
    this.setState({draggedPointKey: this.props.keyAccessor(point)});
  }

  @autobind
  _onDrag(event) {
    event.stopPropagation();
    const pixel = mouse(this.refs.container, event);
    const mercator = ViewportMercator(this.props);
    const lngLat = mercator.unproject(pixel);
    const key = this.state.draggedPointKey;
    this.props.onUpdatePoint({key, location: lngLat});
  }

  @autobind
  _onDragEnd(event) {
    event.stopPropagation();
    document.removeEventListener('mousemove', this._onDrag, false);
    document.removeEventListener('mouseup', this._onDragEnd, false);
    this.setState({draggedPointKey: null});
  }

  @autobind
  _addPoint(event) {
    event.stopPropagation();
    event.preventDefault();
    const pixel = mouse(this.refs.container, event);
    const mercator = ViewportMercator(this.props);
    this.props.onAddPoint(mercator.unproject(pixel));
  }

  render() {
    const {points, width, height, isDragging, style} = this.props;
    const mercator = ViewportMercator(this.props);
    return (
      <svg
        ref="container"
        width={ width }
        height={ height }
        style={ {
          pointerEvents: 'all',
          position: 'absolute',
          left: 0,
          top: 0,
          cursor: isDragging ? config.CURSOR.GRABBING : config.CURSOR.GRAB,
          ...style
        } }
        onContextMenu={ this._addPoint }>

        <g style={ {cursor: 'pointer'} }>
          {
            points.map((point, index) => {
              const pixel = mercator.project(this.props.lngLatAccessor(point));
              return (
                <g
                  key={ index }
                  style={ {pointerEvents: 'all'} }
                  transform={ transform([{translate: pixel}]) }
                  onMouseDown={ this._onDragStart.bind(this, point) }>
                  {
                    this.props.renderPoint.call(this, point, pixel)
                  }
                </g>
              );
            })
          }
        </g>
      </svg>
    );
  }
}
