/* global document */
import * as React from 'react';
import {createPortal} from 'react-dom';
import {useImperativeHandle, useEffect, useMemo, useRef, useContext, forwardRef, memo} from 'react';
import {applyReactStyle} from '../utils/apply-react-style';

import type {MarkerEvent, MarkerDragEvent, PointLike, MarkerInstance} from '../types';

import {MapContext} from './map';
import {arePointsEqual} from '../utils/deep-equal';

export type MarkerProps<OptionsT, MarkerT extends MarkerInstance> = OptionsT & {
  /** Longitude of the anchor location */
  longitude: number;
  /** Latitude of the anchor location */
  latitude: number;

  // These types will be further constraint by OptionsT
  draggable?: boolean;
  offset?: PointLike;
  pitchAlignment?: string;
  rotation?: number;
  rotationAlignment?: string;
  popup?: any;

  /** CSS style override, applied to the control's container */
  style?: React.CSSProperties;
  onClick?: (e: MarkerEvent<MarkerT, MouseEvent>) => void;
  onDragStart?: (e: MarkerDragEvent<MarkerT>) => void;
  onDrag?: (e: MarkerDragEvent<MarkerT>) => void;
  onDragEnd?: (e: MarkerDragEvent<MarkerT>) => void;
  children?: React.ReactNode;
};

/* eslint-disable complexity,max-statements */
function Marker<MarkerOptions, MarkerT extends MarkerInstance>(
  props: MarkerProps<MarkerOptions, MarkerT>,
  ref: React.Ref<MarkerT>
) {
  const {map, mapLib} = useContext(MapContext);
  const thisRef = useRef({props});
  thisRef.current.props = props;

  const marker: MarkerT = useMemo(() => {
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

    const mk = new mapLib.Marker(options) as MarkerT;
    mk.setLngLat([props.longitude, props.latitude]);

    mk.getElement().addEventListener('click', (e: MouseEvent) => {
      thisRef.current.props.onClick?.({
        type: 'click',
        target: mk,
        originalEvent: e
      });
    });

    mk.on('dragstart', e => {
      const evt = e as MarkerDragEvent<MarkerT>;
      evt.lngLat = marker.getLngLat();
      thisRef.current.props.onDragStart?.(evt);
    });
    mk.on('drag', e => {
      const evt = e as MarkerDragEvent<MarkerT>;
      evt.lngLat = marker.getLngLat();
      thisRef.current.props.onDrag?.(evt);
    });
    mk.on('dragend', e => {
      const evt = e as MarkerDragEvent<MarkerT>;
      evt.lngLat = marker.getLngLat();
      thisRef.current.props.onDragEnd?.(evt);
    });

    return mk;
  }, []);

  useEffect(() => {
    marker.addTo(map.getMap());

    return () => {
      marker.remove();
    };
  }, []);

  const {
    longitude,
    latitude,
    offset,
    style,
    draggable = false,
    popup = null,
    rotation = 0,
    rotationAlignment = 'auto',
    pitchAlignment = 'auto'
  } = props;

  useEffect(() => {
    applyReactStyle(marker.getElement(), style);
  }, [style]);

  useImperativeHandle(ref, () => marker, []);

  if (marker.getLngLat().lng !== longitude || marker.getLngLat().lat !== latitude) {
    marker.setLngLat([longitude, latitude]);
  }
  if (offset && !arePointsEqual(marker.getOffset(), offset)) {
    marker.setOffset(offset);
  }
  if (marker.isDraggable() !== draggable) {
    marker.setDraggable(draggable);
  }
  if (marker.getRotation() !== rotation) {
    marker.setRotation(rotation);
  }
  if (marker.getRotationAlignment() !== rotationAlignment) {
    marker.setRotationAlignment(rotationAlignment);
  }
  if (marker.getPitchAlignment() !== pitchAlignment) {
    marker.setPitchAlignment(pitchAlignment);
  }
  if (marker.getPopup() !== popup) {
    marker.setPopup(popup);
  }

  return createPortal(props.children, marker.getElement());
}

export default memo(forwardRef(Marker));
