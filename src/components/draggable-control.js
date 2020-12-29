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
import * as PropTypes from 'prop-types';
import {useState, useEffect} from 'react';
import useMapControl, {mapControlDefaultProps, mapControlPropTypes} from './use-map-control';

export const draggableControlPropTypes = Object.assign({}, mapControlPropTypes, {
  draggable: PropTypes.bool,
  onDrag: PropTypes.func,
  onDragEnd: PropTypes.func,
  onDragStart: PropTypes.func,
  // Offset from the left
  offsetLeft: PropTypes.number,
  // Offset from the top
  offsetTop: PropTypes.number
});

export const draggableControlDefaultProps = Object.assign({}, mapControlDefaultProps, {
  draggable: false,
  offsetLeft: 0,
  offsetTop: 0
});

function getDragEventPosition(event) {
  const {
    offsetCenter: {x, y}
  } = event;
  return [x, y];
}

/**
 * Returns offset of top-left of marker from drag start event
 * (used for positioning marker relative to next mouse coordinates)
 */
function getDragEventOffset(event, container) {
  const {
    center: {x, y}
  } = event;
  if (container) {
    const rect = container.getBoundingClientRect();
    return [rect.left - x, rect.top - y];
  }
  return null;
}

function getDragLngLat(dragPos, dragOffset, props, context) {
  const x = dragPos[0] + dragOffset[0] - props.offsetLeft;
  const y = dragPos[1] + dragOffset[1] - props.offsetTop;
  // Unproject x/y value while respecting offset coordinates
  return context.viewport.unproject([x, y]);
}

function onDragStart(event, {props, callbacks, state, context, containerRef}) {
  const {draggable} = props;
  if (!draggable) {
    return;
  }
  event.stopPropagation();

  const dragPos = getDragEventPosition(event);
  const dragOffset = getDragEventOffset(event, containerRef.current);
  state.setDragPos(dragPos);
  state.setDragOffset(dragOffset);

  if (callbacks.onDragStart && dragOffset) {
    const callbackEvent = Object.assign({}, event);
    callbackEvent.lngLat = getDragLngLat(dragPos, dragOffset, props, context);
    callbacks.onDragStart(callbackEvent);
  }
}

function onDrag(event, {props, callbacks, state, context}) {
  event.stopPropagation();

  const dragPos = getDragEventPosition(event);
  state.setDragPos(dragPos);

  const {dragOffset} = state;
  if (callbacks.onDrag && dragOffset) {
    const callbackEvent = Object.assign({}, event);
    callbackEvent.lngLat = getDragLngLat(dragPos, dragOffset, props, context);
    callbacks.onDrag(callbackEvent);
  }
}

function onDragEnd(event, {props, callbacks, state, context}) {
  event.stopPropagation();

  const {dragPos, dragOffset} = state;
  state.setDragPos(null);
  state.setDragOffset(null);

  if (callbacks.onDragEnd && dragPos && dragOffset) {
    const callbackEvent = Object.assign({}, event);
    callbackEvent.lngLat = getDragLngLat(dragPos, dragOffset, props, context);
    callbacks.onDragEnd(callbackEvent);
  }
}

function onDragCancel(event, {state}) {
  event.stopPropagation();

  state.setDragPos(null);
  state.setDragOffset(null);
}

function registerEvents(thisRef) {
  const {eventManager} = thisRef.context;
  if (!eventManager || !thisRef.state.dragPos) {
    return undefined;
  }

  // panstart is already attached by parent class BaseControl,
  // here we just add listeners for subsequent drag events
  const events = {
    panmove: evt => onDrag(evt, thisRef),
    panend: evt => onDragEnd(evt, thisRef),
    pancancel: evt => onDragCancel(evt, thisRef)
  };
  eventManager.watch(events);

  // Clean up
  return () => {
    eventManager.off(events);
  };
}

export default function useDraggableControl(props) {
  const [dragPos, setDragPos] = useState(null);
  const [dragOffset, setDragOffset] = useState(null);

  const thisRef = useMapControl({
    ...props,
    onDragStart
  });

  thisRef.callbacks = props;
  thisRef.state.dragPos = dragPos;
  thisRef.state.setDragPos = setDragPos;
  thisRef.state.dragOffset = dragOffset;
  thisRef.state.setDragOffset = setDragOffset;

  useEffect(() => registerEvents(thisRef), [thisRef.context.eventManager, Boolean(dragPos)]);

  return thisRef;
}
