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
import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {window} from '../utils/globals';
import useMapControl, {mapControlPropTypes} from '../components/use-map-control';

import type {MapControlProps} from '../components/use-map-control';

const propTypes = Object.assign({}, mapControlPropTypes, {
  redraw: PropTypes.func.isRequired
});

const defaultProps = {
  captureScroll: false,
  captureDrag: false,
  captureClick: false,
  captureDoubleClick: false,
  capturePointerMove: false
};

export type CanvasOverlayProps = MapControlProps & {
  redraw: Function
};

function CanvasOverlay(props: CanvasOverlayProps) {
  const {context, containerRef} = useMapControl(props);
  const [ctx, setDrawingContext] = useState(null);

  useEffect(() => {
    // $FlowFixMe
    setDrawingContext(containerRef.current.getContext('2d'));
  }, []);

  const pixelRatio = window.devicePixelRatio || 1;
  const {viewport, isDragging} = context;

  if (ctx) {
    ctx.save();
    ctx.scale(pixelRatio, pixelRatio);

    props.redraw({
      width: viewport.width,
      height: viewport.height,
      ctx,
      isDragging,
      project: viewport.project,
      unproject: viewport.unproject
    });

    ctx.restore();
  }

  return (
    <canvas
      ref={containerRef}
      width={viewport.width * pixelRatio}
      height={viewport.height * pixelRatio}
      style={{
        width: `${viewport.width}px`,
        height: `${viewport.height}px`,
        position: 'absolute',
        left: 0,
        top: 0
      }}
    />
  );
}

CanvasOverlay.propTypes = propTypes;
CanvasOverlay.defaultProps = defaultProps;

export default CanvasOverlay;
