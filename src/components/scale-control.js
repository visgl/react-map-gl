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
import {useEffect, useState, useMemo} from 'react';
import * as PropTypes from 'prop-types';
import mapboxgl from '../utils/mapboxgl';
import useMapControl, {mapControlDefaultProps, mapControlPropTypes} from './use-map-control';

const propTypes = Object.assign({}, mapControlPropTypes, {
  className: PropTypes.string,
  style: PropTypes.object,
  maxWidth: PropTypes.number,
  unit: PropTypes.oneOf(['imperial', 'metric', 'nautical'])
});

const defaultProps = Object.assign({}, mapControlDefaultProps, {
  className: '',
  maxWidth: 100,
  unit: 'metric'
});

function ScaleControl(props) {
  const {context, containerRef} = useMapControl(props);
  const [mapboxScaleControl, createMapboxScaleControl] = useState(null);

  useEffect(() => {
    if (context.map) {
      const control = new mapboxgl.ScaleControl();
      control._map = context.map;
      control._container = containerRef.current;
      createMapboxScaleControl(control);
    }
  }, [context.map]);

  if (mapboxScaleControl) {
    mapboxScaleControl.options = props;
    mapboxScaleControl._onMove();
  }

  const style = useMemo(() => ({position: 'absolute', ...props.style}), [props.style]);

  return (
    <div style={style} className={props.className}>
      <div ref={containerRef} className="mapboxgl-ctrl mapboxgl-ctrl-scale" />
    </div>
  );
}

ScaleControl.propTypes = propTypes;
ScaleControl.defaultProps = defaultProps;

export default React.memo(ScaleControl);
