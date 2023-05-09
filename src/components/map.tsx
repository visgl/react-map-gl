import * as React from 'react';
import {
  useState,
  useRef,
  useEffect,
  useContext,
  useMemo,
  forwardRef,
  useImperativeHandle
} from 'react';

import {MountedMapsContext} from './use-map';
import Mapbox, {MapboxProps} from '../mapbox/mapbox';
import createRef, {MapRef} from '../mapbox/create-ref';

import type {CSSProperties} from 'react';
import useIsomorphicLayoutEffect from '../utils/use-isomorphic-layout-effect';
import setGlobals, {GlobalSettings} from '../utils/set-globals';

export type MapContextValue = {
  mapLib: any;
  map: MapRef;
};

export const MapContext = React.createContext<MapContextValue>(null);

export type MapProps = MapboxProps &
  GlobalSettings & {
    mapLib?: any;
    reuseMaps?: boolean;
    /** Map container id */
    id?: string;
    /** Map container CSS style */
    style?: CSSProperties;
    children?: any;
  };

function Map(props: MapProps, ref: React.Ref<MapRef>) {
  const mountedMapsContext = useContext(MountedMapsContext);
  const [mapInstance, setMapInstance] = useState<Mapbox>(null);
  const containerRef = useRef();

  const {current: contextValue} = useRef<MapContextValue>({mapLib: null, map: null});

  useEffect(() => {
    const mapLib = props.mapLib;
    let isMounted = true;
    let mapbox;

    Promise.resolve(mapLib)
      .then(module => {
        if (!isMounted) {
          return;
        }
        if (!module) {
          throw new Error('Invalid mapLib');
        }
        const mapboxgl = 'Map' in module ? module : module.default;
        if (!mapboxgl.Map) {
          throw new Error('Invalid mapLib');
        }

        // workerUrl & workerClass may change the result of supported()
        // https://github.com/visgl/react-map-gl/discussions/2027
        setGlobals(mapboxgl, props);
        if (mapboxgl.supported(props)) {
          if (props.reuseMaps) {
            mapbox = Mapbox.reuse(props, containerRef.current);
          }
          if (!mapbox) {
            mapbox = new Mapbox(mapboxgl.Map, props, containerRef.current);
          }
          contextValue.map = createRef(mapbox, mapboxgl);
          contextValue.mapLib = mapboxgl;

          setMapInstance(mapbox);
          mountedMapsContext?.onMapMount(contextValue.map, props.id);
        } else {
          throw new Error('Map is not supported by this browser');
        }
      })
      .catch(error => {
        const {onError} = props;
        if (onError) {
          onError({
            type: 'error',
            target: null,
            originalEvent: null,
            error
          });
        } else {
          console.error(error); // eslint-disable-line
        }
      });

    return () => {
      isMounted = false;
      if (mapbox) {
        mountedMapsContext?.onMapUnmount(props.id);
        if (props.reuseMaps) {
          mapbox.recycle();
        } else {
          mapbox.destroy();
        }
      }
    };
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (mapInstance) {
      mapInstance.setProps(props);
    }
  });

  useImperativeHandle(ref, () => contextValue.map, [mapInstance]);

  const style: CSSProperties = useMemo(
    () => ({
      position: 'relative',
      width: '100%',
      height: '100%',
      ...props.style
    }),
    [props.style]
  );

  const CHILD_CONTAINER_STYLE = {
    height: '100%'
  };

  return (
    <div id={props.id} ref={containerRef} style={style}>
      {mapInstance && (
        <MapContext.Provider value={contextValue}>
          <div mapboxgl-children="" style={CHILD_CONTAINER_STYLE}>
            {props.children}
          </div>
        </MapContext.Provider>
      )}
    </div>
  );
}

export default forwardRef(Map);
