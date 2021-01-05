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

function onMount(thisRef) {
  const ref = thisRef.containerRef.current;
  const {eventManager} = thisRef.context;
  if (!ref || !eventManager) {
    return undefined;
  }

  const events = {
    wheel: evt => {
      const {props} = thisRef;
      if (props.captureScroll) {
        evt.stopPropagation();
      }
      if (props.onScroll) {
        props.onScroll(evt, thisRef);
      }
    },
    panstart: evt => {
      const {props} = thisRef;
      if (props.captureDrag) {
        evt.stopPropagation();
      }
      if (props.onDragStart) {
        props.onDragStart(evt, thisRef);
      }
    },
    anyclick: evt => {
      const {props} = thisRef;
      if (props.captureClick) {
        evt.stopPropagation();
      }
      if (props.onClick) {
        props.onClick(evt, thisRef);
      }
    },
    click: evt => {
      const {props} = thisRef;
      if (props.captureClick) {
        evt.stopPropagation();
      }
      if (props.onClick) {
        props.onClick(evt, thisRef);
      }
    },
    dblclick: evt => {
      const {props} = thisRef;
      if (props.captureDoubleClick) {
        evt.stopPropagation();
      }
      if (props.onDoubleClick) {
        props.onDoubleClick(evt, thisRef);
      }
    },
    pointermove: evt => {
      const {props} = thisRef;
      if (props.capturePointerMove) {
        evt.stopPropagation();
      }
      if (props.onPointerMove) {
        props.onPointerMove(evt, thisRef);
      }
    }
  };
  eventManager.watch(events, ref);

  // Clean up
  return () => {
    eventManager.off(events);
  };
}

export default function useMapControl(props = {}) {
  const context = useContext(MapContext);
  const containerRef = useRef(null);
  const _thisRef = useRef({props, state: {}, context, containerRef});
  const thisRef = _thisRef.current;

  thisRef.props = props;
  thisRef.context = context;

  useEffect(() => onMount(thisRef), [context.eventManager]);

  return thisRef;
}
