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

import Immutable from 'immutable';
import {document} from '../utils/globals';
import autobind from 'react-autobind';
import {InteractiveContext} from '../../src/components/interactive-map';
import {StaticContext} from '../../src/components/static-map';

function noop() {}

// Makes working with SVG transforms a little nicer
function svgTransform(props) {
  const transform = [];
  if (Array.isArray(props)) {
    props.forEach(prop => {
      const key = Object.keys(prop)[0];
      transform.push(`${key}(${prop[key]})`);
    });
  }
  return transform.join(' ');
}

function mouse(container, event) {
  const rect = container.getBoundingClientRect();
  const x = event.clientX - rect.left - container.clientLeft;
  const y = event.clientY - rect.top - container.clientTop;
  return [x, y];
}

const propTypes = {
  points: PropTypes.instanceOf(Immutable.List).isRequired,
  keyAccessor: PropTypes.func.isRequired,
  lngLatAccessor: PropTypes.func.isRequired,
  onAddPoint: PropTypes.func.isRequired,
  onUpdatePoint: PropTypes.func.isRequired,
  renderPoint: PropTypes.func.isRequired
};

const defaultProps = {
  keyAccessor: point => point.get('id'),
  lngLatAccessor: point => point.get('location').toArray(),
  onAddPoint: noop,
  onUpdatePoint: noop,
  renderPoint: noop,
  isDragging: false
};

export default class DraggablePointsOverlay extends Component {

  constructor(props) {
    super(props);
    this.state = {
      draggedPointKey: null
    };
    autobind(this);
  }

  _onDragStart(point, event) {
    event.stopPropagation();
    document.addEventListener('mousemove', this._onDrag, false);
    document.addEventListener('mouseup', this._onDragEnd, false);
    this.setState({draggedPointKey: this.props.keyAccessor(point)});
  }

  _onDrag(event) {
    event.stopPropagation();
    const pixel = mouse(this.refs.container, event);
    const lngLat = this._context.viewport.unproject(pixel);
    const key = this.state.draggedPointKey;
    this.props.onUpdatePoint({key, location: lngLat});
  }

  _onDragEnd(event) {
    event.stopPropagation();
    document.removeEventListener('mousemove', this._onDrag, false);
    document.removeEventListener('mouseup', this._onDragEnd, false);
    this.setState({draggedPointKey: null});
  }

  _addPoint(event) {
    event.stopPropagation();
    event.preventDefault();
    const pixel = mouse(this.refs.container, event);
    this.props.onAddPoint(this._context.viewport.unproject(pixel));
  }

  render() {
    return (
      createElement(StaticContext.Consumer,
        null, sContext => {
          return createElement(InteractiveContext.Consumer,
            null, iContext => {
              this._context = Object.assign({}, sContext, iContext);
              const {viewport, isDragging} = this._context;
              const {points, style} = this.props;

              return (
                createElement('svg', {
                  ref: 'container',
                  width: viewport.width,
                  height: viewport.height,
                  style: Object.assign({
                    pointerEvents: 'all',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    cursor: isDragging ? '-webkit-grabbing' : '-webkit-grab'
                  }, style),
                  onContextMenu: this._addPoint
                }, [
                  createElement('g', {
                    style: {cursor: 'pointer'}
                  },
                    points.map((point, index) => {
                      const pixel = viewport.project(this.props.lngLatAccessor(point));
                      return (
                        createElement('g', {
                          key: index,
                          style: {pointerEvents: 'all'},
                          transform: svgTransform([{translate: pixel}]),
                          onMouseDown: this._onDragStart.bind(this, point)
                        },
                          this.props.renderPoint.call(this, point, pixel)
                        )
                      );
                    })
                  )
                ])
              );
            }
          );
        }
      )
    );
  }
}

DraggablePointsOverlay.displayName = 'DraggablePointsOverlay';
DraggablePointsOverlay.propTypes = propTypes;
DraggablePointsOverlay.defaultProps = defaultProps;
// DraggablePointsOverlay.contextTypes = contextTypes;
