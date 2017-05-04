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
import {PerspectiveMercatorViewport} from 'viewport-mercator-project';

const propTypes = {
  // Longitude of the anchor point
  longitude: PropTypes.number.isRequired,
  // Latitude of the anchor point
  latitude: PropTypes.number.isRequired,
  // Offset from the left
  offsetLeft: PropTypes.number,
  // Offset from the top
  offsetTop: PropTypes.number
};

const defaultProps = {
  offsetLeft: 0,
  offsetTop: 0
};

const contextTypes = {
  viewport: PropTypes.instanceOf(PerspectiveMercatorViewport)
};

export default class Marker extends Component {

  render() {
    const {longitude, latitude, offsetLeft, offsetTop} = this.props;

    const [x, y] = this.context.viewport.project([longitude, latitude]);
    const containerStyle = {
      position: 'absolute',
      left: x + offsetLeft,
      top: y + offsetTop
    };

    return createElement('div', {
      className: 'map-control-marker',
      style: containerStyle,
      children: this.props.children
    });
  }

}

Marker.displayName = 'Marker';
Marker.propTypes = propTypes;
Marker.defaultProps = defaultProps;
Marker.contextTypes = contextTypes;
