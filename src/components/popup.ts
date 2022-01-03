/* global document */
import * as React from 'react';
import {createPortal} from 'react-dom';
import {useEffect, useState, useRef, useContext} from 'react';

import mapboxgl from '../utils/mapboxgl';
import type {MapboxEvent, Anchor, PointLike} from '../types';

import {MapContext} from './map';
import {deepEqual} from '../utils/deep-equal';

export type PopupProps = {
  /** Longitude of the anchor location */
  longitude: number;
  /** Latitude of the anchor location */
  latitude: number;
  /**
   * A string indicating the part of the popup that should be positioned closest to the coordinate.
   * Options are `'center'`, `'top'`, `'bottom'`, `'left'`, `'right'`, `'top-left'`, `'top-right'`, `'bottom-left'`,
   * and `'bottom-right'`. If unset, the anchor will be dynamically set to ensure the popup falls within the map
   * container with a preference for `'bottom'`.
   */
  anchor?: Anchor;
  /**
   * If `true`, a close button will appear in the top right corner of the popup.
   * @default true
   */
  closeButton?: boolean;
  /**
   * If `true`, the popup will close when the map is clicked.
   * @default true
   */
  closeOnClick?: boolean;
  /**
   * If `true`, the popup will closed when the map moves.
   * @default false
   */
  closeOnMove?: boolean;
  /**
   * If `true`, the popup will try to focus the first focusable element inside the popup.
   * @default true
   */
  focusAfterOpen?: boolean;
  /**
   * A pixel offset applied to the popup's location specified as:
   * - a single number specifying a distance from the popup's location
   * - a PointLike specifying a constant offset
   * - an object of Points specifing an offset for each anchor position.
   */
  offset?: number | PointLike | Partial<{[anchor in Anchor]: PointLike}>;
  /** Space-separated CSS class names to add to popup container. */
  className?: string;
  /**
   * A string that sets the CSS property of the popup's maximum width (for example, `'300px'`).
   * To ensure the popup resizes to fit its content, set this property to `'none'`
   * @default "240px"
   */
  maxWidth?: string;

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
