import * as React from 'react';
import {useState, useRef, useEffect, forwardRef, useImperativeHandle} from 'react';

import Mapbox from '../mapbox/mapbox';
import type {MapboxProps} from '../mapbox/mapbox';
import MapContext from './map-context';

import type {CSSProperties} from 'react';
import type {MapboxMap} from '../utils/types';
import useIsomorphicLayoutEffect from '../utils/use-isomorphic-layout-effect';

export interface MapRef {
  getMap(): MapboxMap;
}

export type MapProps = MapboxProps & {
  /** Map container id */
  id?: string;
  /** Map container CSS style */
  style?: CSSProperties;
  children?: any;

  ref?: React.Ref<MapRef>;
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

const Map = forwardRef((props: MapProps, ref) => {
  const [mapInstance, setMapInstance] = useState<Mapbox>(null);
  const containerRef = useRef();

  useEffect(() => {
    const map = new Mapbox(props);
    map.initialize(containerRef.current);
    setMapInstance(map);
    return () => map.destroy();
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (mapInstance) {
      mapInstance.setProps(props);
    }
  });

  useImperativeHandle(
    ref,
    () => ({
      getMap: () => mapInstance.getMap()
    }),
    [mapInstance]
  );

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
});

Map.defaultProps = defaultProps;

export default Map;
