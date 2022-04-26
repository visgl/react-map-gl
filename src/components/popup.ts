/* global document */
import * as React from 'react';
import {createPortal} from 'react-dom';
import {useEffect, useMemo, useRef, useContext} from 'react';
import {applyReactStyle} from '../utils/apply-react-style';

import type {PopupEvent, Anchor, PointLike, MapboxPopup} from '../types';

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
  /** CSS style override, applied to the control's container */
  style?: React.CSSProperties;

  onOpen?: (e: PopupEvent) => void;
  onClose?: (e: PopupEvent) => void;
  children?: React.ReactNode;
};

// Adapted from https://github.com/mapbox/mapbox-gl-js/blob/v1.13.0/src/ui/popup.js
function getClassList(className: string) {
  return new Set(className ? className.trim().split(/\s+/) : []);
}

/* eslint-disable complexity,max-statements */
function Popup(props: PopupProps) {
  const {map, mapLib} = useContext(MapContext);
  const container = useMemo(() => {
    return document.createElement('div');
  }, []);
  const thisRef = useRef({props});
  thisRef.current.props = props;

  const popup: MapboxPopup = useMemo(() => {
    const options = {...props};
    const pp = new mapLib.Popup(options).setLngLat([props.longitude, props.latitude]);
    pp.once('open', e => {
      thisRef.current.props.onOpen?.(e as PopupEvent);
    });
    return pp;
  }, []);

  useEffect(() => {
    const onClose = e => {
      thisRef.current.props.onClose?.(e as PopupEvent);
    };
    popup.on('close', onClose);
    popup.setDOMContent(container).addTo(map.getMap());

    return () => {
      // https://github.com/visgl/react-map-gl/issues/1825
      // onClose should not be fired if the popup is removed by unmounting
      // When using React strict mode, the component is mounted twice.
      // Firing the onClose callback here would be a false signal to remove the component.
      popup.off('close', onClose);
      if (popup.isOpen()) {
        popup.remove();
      }
    };
  }, []);

  useEffect(() => {
    applyReactStyle(popup.getElement(), props.style);
  }, [props.style]);

  if (popup.isOpen()) {
    if (popup.getLngLat().lng !== props.longitude || popup.getLngLat().lat !== props.latitude) {
      popup.setLngLat([props.longitude, props.latitude]);
    }
    // @ts-ignore
    if (props.offset && !deepEqual(popup.options.offset, props.offset)) {
      popup.setOffset(props.offset);
    }
    // @ts-ignore
    if (popup.options.anchor !== props.anchor || popup.options.maxWidth !== props.maxWidth) {
      // @ts-ignore
      popup.options.anchor = props.anchor;
      popup.setMaxWidth(props.maxWidth);
    }
    // @ts-ignore
    if (popup.options.className !== props.className) {
      // @ts-ignore
      const prevClassList = getClassList(popup.options.className);
      const nextClassList = getClassList(props.className);

      for (const c of prevClassList) {
        if (!nextClassList.has(c)) {
          popup.removeClassName(c);
        }
      }
      for (const c of nextClassList) {
        if (!prevClassList.has(c)) {
          popup.addClassName(c);
        }
      }
      // @ts-ignore
      popup.options.className = props.className;
    }
  }

  return createPortal(props.children, container);
}

// @ts-ignore
export default React.memo(Popup);
