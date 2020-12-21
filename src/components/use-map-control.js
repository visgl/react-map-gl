import {useContext, useRef, useEffect} from 'react';
import * as PropTypes from 'prop-types';
import MapContext from './map-context';

export const mapControlDefaultProps = {
  captureScroll: false,
  captureDrag: true,
  captureClick: true,
  captureDoubleClick: true,
  capturePointerMove: false
};

export const mapControlPropTypes = {
  /** Event handling */
  captureScroll: PropTypes.bool,
  // Stop map pan & rotate
  captureDrag: PropTypes.bool,
  // Stop map click
  captureClick: PropTypes.bool,
  // Stop map double click
  captureDoubleClick: PropTypes.bool,
  // Stop map pointer move
  capturePointerMove: PropTypes.bool
};

function onMount(thisRef, callbacks = {}) {
  const ref = thisRef.containerRef.current;
  const {eventManager} = thisRef.context;
  if (!ref || !eventManager) {
    return undefined;
  }

  const events = {
    wheel: evt => {
      if (thisRef.props.captureScroll) {
        evt.stopPropagation();
      }
      if (callbacks.onScroll) {
        callbacks.onScroll(evt, thisRef);
      }
    },
    panstart: evt => {
      if (thisRef.props.captureDrag) {
        evt.stopPropagation();
      }
      if (callbacks.onDragStart) {
        callbacks.onDragStart(evt, thisRef);
      }
    },
    anyclick: evt => {
      if (thisRef.props.captureClick) {
        evt.stopPropagation();
      }
      if (callbacks.onClick) {
        callbacks.onClick(evt, thisRef);
      }
    },
    click: evt => {
      if (thisRef.props.captureClick) {
        evt.stopPropagation();
      }
      if (callbacks.onClick) {
        callbacks.onClick(evt, thisRef);
      }
    },
    dblclick: evt => {
      if (thisRef.props.captureDoubleClick) {
        evt.stopPropagation();
      }
      if (callbacks.onDoubleClick) {
        callbacks.onDoubleClick(evt, thisRef);
      }
    },
    pointermove: evt => {
      if (thisRef.props.capturePointerMove) {
        evt.stopPropagation();
      }
      if (callbacks.onPointerMove) {
        callbacks.onPointerMove(evt, thisRef);
      }
    }
  };
  eventManager.watch(events, ref);

  // Clean up
  return () => {
    eventManager.off(events);
  };
}

export default function useMapControl(props, callbacks) {
  const context = useContext(MapContext);
  const containerRef = useRef(null);
  const thisRef = useRef({props, state: {}, context, containerRef});

  thisRef.current.props = props;
  thisRef.current.context = context;

  useEffect(() => onMount(thisRef.current, callbacks), [context.eventManager]);

  return thisRef.current;
}
