import * as React from 'react';
import {createPortal} from 'react-dom';
import {useEffect, useState, useRef, useContext} from 'react';

import mapboxgl from '../utils/mapboxgl';
import type {PopupOptions, MapboxEvent} from '../utils/types';

import MapContext from './map-context';
import {deepEqual} from '../utils/deep-equal';

export type PopupProps = PopupOptions & {
  longitude: number;
  latitude: number;
  onOpen?: (e: MapboxEvent) => void;
  onClose?: (e: MapboxEvent) => void;
  children?: React.ReactNode;
};

function Popup(props: PopupProps) {
  const map = useContext(MapContext);
  const [container] = useState(() => {
    return document.createElement('div');
  });
  const [popup] = useState(() => {
    const options = {...props};
    return new mapboxgl.Popup(options)
      .setLngLat([props.longitude, props.latitude])
      .setDOMContent(container)
      .addTo(map);
  });
  const thisRef = useRef({props});
  thisRef.current.props = props;

  useEffect(() => {
    popup.on('open', e => {
      thisRef.current.props.onOpen?.(e as MapboxEvent);
    });
    popup.on('close', e => {
      thisRef.current.props.onClose?.(e as MapboxEvent);
    });

    return () => {
      popup.remove();
    };
  }, []);

  if (popup.getLngLat().lng !== props.longitude || popup.getLngLat().lat !== props.latitude) {
    popup.setLngLat([props.longitude, props.latitude]);
  }
  // @ts-ignore
  if (props.offset && deepEqual(popup.options.offset, props.offset)) {
    popup.setOffset(props.offset);
  }
  // @ts-ignore
  if (popup.options.anchor !== props.anchor || popup.options.maxWidth !== props.maxWidth) {
    // @ts-ignore
    popup.options.anchor = props.anchor;
    popup.setMaxWidth(props.maxWidth);
  }
  // Adapted from https://github.com/mapbox/mapbox-gl-js/blob/main/src/ui/popup.js
  // @ts-ignore
  if (popup.options.className !== props.className) {
    // @ts-ignore
    popup.options.className = props.className;
    // @ts-ignore
    popup._classList = new Set(props.className ? props.className.trim().split(/\s+/) : []);
    // @ts-ignore
    popup._updateClassList();
  }

  return createPortal(props.children, container);
}

// @ts-ignore
export default React.memo(Popup);
