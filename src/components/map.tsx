import * as React from 'react';
import {useState, useRef, useEffect, useContext, forwardRef, useImperativeHandle} from 'react';

import {MountedMapsContext} from './use-map';
import mapboxgl from '../utils/mapboxgl';
import Mapbox, {MapboxProps} from '../mapbox/mapbox';
import createRef, {MapRef} from '../mapbox/create-ref';

import type {CSSProperties} from 'react';
import type {MapboxMap} from '../types';
import useIsomorphicLayoutEffect from '../utils/use-isomorphic-layout-effect';

export const MapContext = React.createContext<MapboxMap>(null);

export type MapProps = MapboxProps & {
  /** Map container id */
  id?: string;
  /** Map container CSS style */
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

const Map = forwardRef<MapRef, MapProps>((props, ref) => {
  const mountedMapsContext = useContext(MountedMapsContext);
  const [mapInstance, setMapInstance] = useState<Mapbox>(null);
  const containerRef = useRef();

  useEffect(() => {
    const map = new Mapbox(mapboxgl.Map, props);
    map.initialize(containerRef.current);
    setMapInstance(map);
    mountedMapsContext?.onMapMount(createRef(map), props.id);

    return () => {
      mountedMapsContext?.onMapUnmount(props.id);
      map.destroy();
    };
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (mapInstance) {
      mapInstance.setProps(props);
    }
  });

  useImperativeHandle(ref, () => createRef(mapInstance), [mapInstance]);

  const style: CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '100%',
    ...props.style
  };

  return (
    <div id={props.id} ref={containerRef} style={style}>
      {mapInstance && (
        <MapContext.Provider value={mapInstance.map}>{props.children}</MapContext.Provider>
      )}
    </div>
  );
});

Map.displayName = 'Map';
Map.defaultProps = defaultProps;

export default Map;
