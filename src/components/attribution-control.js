import * as React from 'react';
import {useEffect, useCallback, useState, useRef, useMemo} from 'react';
import * as PropTypes from 'prop-types';
import mapboxgl from '../utils/mapboxgl';
import useMapControl, {mapControlDefaultProps, mapControlPropTypes} from './use-map-control';

const propTypes = Object.assign({}, mapControlPropTypes, {
  toggleLabel: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  compact: PropTypes.bool,
  customAttribution: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
});

const defaultProps = Object.assign({}, mapControlDefaultProps, {
  className: '',
  toggleLabel: 'Toggle Attribution'
});

function setupAttributioncontrol(opts, map, container, attributionContainer) {
  const control = new mapboxgl.AttributionControl(opts);
  control._map = map;
  control._container = container;
  control._innerContainer = attributionContainer;

  // from AttributionControl.onAdd()
  control._updateAttributions();
  control._updateEditLink();
  map.on('styledata', control._updateData);
  map.on('sourcedata', control._updateData);

  return control;
}

function removeAttributionControl(control) {
  control._map.off('styledata', control._updateData);
  control._map.off('sourcedata', control._updateData);
}

function AttributionControl(props) {
  const {context, containerRef} = useMapControl(props);
  const innerContainerRef = useRef(null);
  const [showCompact, setShowCompact] = useState(false);

  useEffect(() => {
    let control;
    if (context.map) {
      control = setupAttributioncontrol(
        {
          customAttribution: props.customAttribution
        },
        context.map,
        containerRef.current,
        innerContainerRef.current
      );
    }

    return () => control && removeAttributionControl(control);
  }, [context.map]);

  const compact = props.compact === undefined ? context.viewport.width <= 640 : props.compact;

  useEffect(() => {
    if (!compact && showCompact) {
      setShowCompact(false);
    }
  }, [compact]);

  const toggleAttribution = useCallback(() => setShowCompact(value => !value), []);
  const style = useMemo(() => ({position: 'absolute', ...props.style}), [props.style]);

  return (
    <div style={style} className={props.className}>
      <div
        ref={containerRef}
        aria-pressed={showCompact}
        className={`mapboxgl-ctrl mapboxgl-ctrl-attrib ${compact ? 'mapboxgl-compact' : ''} ${
          showCompact ? 'mapboxgl-compact-show' : ''
        }`}
      >
        <button
          className="mapboxgl-ctrl-attrib-button"
          title={props.toggleLabel}
          onClick={toggleAttribution}
        />
        <div ref={innerContainerRef} className="mapboxgl-ctrl-attrib-inner" role="list" />
      </div>
    </div>
  );
}

AttributionControl.propTypes = propTypes;
AttributionControl.defaultProps = defaultProps;

export default React.memo(AttributionControl);
