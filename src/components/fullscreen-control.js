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

import {document} from '../utils/globals';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import {useEffect, useState, useMemo} from 'react';
import mapboxgl from '../utils/mapboxgl';

import useMapControl, {mapControlDefaultProps, mapControlPropTypes} from './use-map-control';

const propTypes = Object.assign({}, mapControlPropTypes, {
  // Custom className
  className: PropTypes.string,
  style: PropTypes.object,
  /* eslint-disable max-len */
  // `container` is the [compatible DOM element](https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullScreen#Compatible_elements)
  // which should be made full screen. By default, the map container element will be made full screen.
  /* eslint-enable max-len */
  container: PropTypes.object,
  label: PropTypes.string
});

const defaultProps = Object.assign({}, mapControlDefaultProps, {
  className: '',
  container: null,
  label: 'Toggle fullscreen'
});

function FullscreenControl(props) {
  const {context, containerRef} = useMapControl(props);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [mapboxFullscreenControl, createMapboxFullscreenControl] = useState(null);

  useEffect(() => {
    const container = props.container || context.container;

    const control = new mapboxgl.FullscreenControl({container});

    createMapboxFullscreenControl(control);
    setShowButton(control._checkFullscreenSupport());

    const onFullscreenChange = () => {
      const nextState = !control._fullscreen;
      // this is a hack
      // Mapbox use `_fullscreen` flag to toggle fullscreen mode
      control._fullscreen = nextState;
      setIsFullscreen(nextState);
    };

    document.addEventListener(control._fullscreenchange, onFullscreenChange);

    return () => {
      document.removeEventListener(control._fullscreenchange, onFullscreenChange);
    };
  }, []);

  const onClickFullscreen = () => {
    if (mapboxFullscreenControl) {
      mapboxFullscreenControl._onClickFullscreen();
    }
  };

  const style = useMemo(() => ({position: 'absolute', ...props.style}), [props.style]);

  if (!showButton) {
    return null;
  }

  const {className, label} = props;
  const type = isFullscreen ? 'shrink' : 'fullscreen';

  return (
    <div style={style} className={className}>
      <div className="mapboxgl-ctrl mapboxgl-ctrl-group" ref={containerRef}>
        <button
          key={type}
          className={`mapboxgl-ctrl-icon mapboxgl-ctrl-${type}`}
          type="button"
          title={label}
          onClick={onClickFullscreen}
        >
          <span className="mapboxgl-ctrl-icon" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

FullscreenControl.propTypes = propTypes;
FullscreenControl.defaultProps = defaultProps;

export default React.memo(FullscreenControl);
