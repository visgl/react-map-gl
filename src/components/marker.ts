/* global document */
import * as React from 'react';
import {createPortal} from 'react-dom';
import {useEffect, useState, useRef, useContext} from 'react';

import mapboxgl from '../utils/mapboxgl';
import type {MarkerDragEvent, MarkerOptions, MapboxPopup} from '../utils/types';

import {MapContext} from './map';
import {arePointsEqual} from '../utils/deep-equal';

export type MarkerProps = Omit<MarkerOptions, 'element'> & {
  longitude: number;
  latitude: number;
  popup?: MapboxPopup;
  onDragStart?: (e: MarkerDragEvent) => void;
  onDrag?: (e: MarkerDragEvent) => void;
  onDragEnd?: (e: MarkerDragEvent) => void;
  children?: React.ReactNode;
};

const defaultProps: Partial<MarkerProps> = {
  draggable: false,
  popup: null,
  rotation: 0,
  rotationAlignment: 'auto',
  pitchAlignment: 'auto'
};

function Marker(props: MarkerProps) {
  const map = useContext(MapContext);
  const [marker] = useState(() => {
    let hasChildren = false;
    React.Children.forEach(props.children, el => {
      if (el) {
        hasChildren = true;
      }
    });
    const options = {
      ...props,
      element: hasChildren ? document.createElement('div') : null
    };

    return new mapboxgl.Marker(options).setLngLat([props.longitude, props.latitude]).addTo(map);
  });
  const thisRef = useRef({props});
  thisRef.current.props = props;

  useEffect(() => {
    marker.on('dragstart', e => {
      const evt = e as MarkerDragEvent;
      evt.lngLat = marker.getLngLat();
      thisRef.current.props.onDragStart?.(evt);
    });
    marker.on('drag', e => {
      const evt = e as MarkerDragEvent;
      evt.lngLat = marker.getLngLat();
      thisRef.current.props.onDrag?.(evt);
    });
    marker.on('dragend', e => {
      const evt = e as MarkerDragEvent;
      evt.lngLat = marker.getLngLat();
      thisRef.current.props.onDragEnd?.(evt);
    });

    return () => {
      marker.remove();
    };
  }, []);

  if (marker.getLngLat().lng !== props.longitude || marker.getLngLat().lat !== props.latitude) {
    marker.setLngLat([props.longitude, props.latitude]);
  }
  if (props.offset && !arePointsEqual(marker.getOffset(), props.offset)) {
    marker.setOffset(props.offset);
  }
  if (marker.isDraggable() !== props.draggable) {
    marker.setDraggable(props.draggable);
  }
  if (marker.getRotation() !== props.rotation) {
    marker.setRotation(props.rotation);
  }
  if (marker.getRotationAlignment() !== props.rotationAlignment) {
    marker.setRotationAlignment(props.rotationAlignment);
  }
  if (marker.getPitchAlignment() !== props.pitchAlignment) {
    marker.setPitchAlignment(props.pitchAlignment);
  }
  if (marker.getPopup() !== props.popup) {
    marker.setPopup(props.popup);
  }

  return createPortal(props.children, marker.getElement());
}

Marker.defaultProps = defaultProps;

// @ts-ignore
export default React.memo(Marker);
