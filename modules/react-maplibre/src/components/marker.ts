/* global document */
import * as React from 'react';
import {createPortal} from 'react-dom';
import {useImperativeHandle, useEffect, useMemo, useRef, useContext, forwardRef, memo} from 'react';
import {applyReactStyle} from '../utils/apply-react-style';

import type {PopupInstance, MarkerInstance, MarkerOptions} from '../types/lib';
import type {MarkerEvent, MarkerDragEvent} from '../types/events';

import {MapContext} from './map';
import {arePointsEqual} from '../utils/deep-equal';

export type MarkerProps = MarkerOptions & {
  /** Longitude of the anchor location */
  longitude: number;
  /** Latitude of the anchor location */
  latitude: number;

  popup?: PopupInstance;

  /** CSS style override, applied to the control's container */
  style?: React.CSSProperties;
  onClick?: (e: MarkerEvent<MouseEvent>) => void;
  onDragStart?: (e: MarkerDragEvent) => void;
  onDrag?: (e: MarkerDragEvent) => void;
  onDragEnd?: (e: MarkerDragEvent) => void;
  children?: React.ReactNode;
};

/* eslint-disable complexity,max-statements */
export const Marker = memo(
  forwardRef((props: MarkerProps, ref: React.Ref<MarkerInstance>) => {
    const {map, mapLib} = useContext(MapContext);
    const thisRef = useRef({props});
    thisRef.current.props = props;

    const marker: MarkerInstance = useMemo(() => {
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

      const mk = new mapLib.Marker(options);
      mk.setLngLat([props.longitude, props.latitude]);

      mk.getElement().addEventListener('click', (e: MouseEvent) => {
        thisRef.current.props.onClick?.({
          type: 'click',
          target: mk,
          originalEvent: e
        });
      });

      mk.on('dragstart', e => {
        const evt = e as MarkerDragEvent;
        evt.lngLat = marker.getLngLat();
        thisRef.current.props.onDragStart?.(evt);
      });
      mk.on('drag', e => {
        const evt = e as MarkerDragEvent;
        evt.lngLat = marker.getLngLat();
        thisRef.current.props.onDrag?.(evt);
      });
      mk.on('dragend', e => {
        const evt = e as MarkerDragEvent;
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
  })
);
