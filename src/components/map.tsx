import * as React from 'react';
import {useState, useRef, useEffect, useLayoutEffect} from 'react';

import Mapbox from '../mapbox/mapbox';
import type {MapboxProps} from '../mapbox/mapbox';
import MapContext from './map-context';

import type {CSSProperties} from 'react';

export type MapProps = MapboxProps & {
  id?: string;
  style?: CSSProperties;
  children?: any;
};

const defaultProps: MapProps = {
  // Constraints
  minZoom: 0,
  maxZoom: 22,
  minPitch: 0,
  maxPitch: 85,

  // Interaction handlers
  scrollZoom: true,
  boxZoom: true,
  dragRotate: true,
  dragPan: true,
  keyboard: true,
  doubleClickZoom: true,
  touchZoomRotate: true,
  touchPitch: true,

  // Style
  mapStyle: {version: 8},
  styleDiffing: true,
  projection: 'mercator',
  renderWorldCopies: true
};

export default function Map(props: MapProps) {
  const [mapInstance, setMapInstance] = useState<Mapbox>(null);
  const containerRef = useRef();

  useEffect(() => {
    const map = new Mapbox(props);
    map.initialize(containerRef.current);
    setMapInstance(map);
    return () => map.destroy();
  }, []);

  useLayoutEffect(() => {
    if (mapInstance) {
      mapInstance.setProps(props);
    }
  });

  const style: CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '100%',
    ...props.style
  };

  return (
    <div id={props.id} ref={containerRef} style={style}>
      {mapInstance && (
        <MapContext.Provider value={mapInstance.getMap()}>{props.children}</MapContext.Provider>
      )}
    </div>
  );
}

Map.defaultProps = defaultProps;
