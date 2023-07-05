import * as React from 'react';
import {useState, useRef, useEffect, useContext, useMemo, useImperativeHandle} from 'react';

import {MountedMapsContext} from './use-map';
import Mapbox, {MapboxProps} from '../mapbox/mapbox';
import createRef, {MapRef} from '../mapbox/create-ref';

import type {CSSProperties} from 'react';
import useIsomorphicLayoutEffect from '../utils/use-isomorphic-layout-effect';
import setGlobals, {GlobalSettings} from '../utils/set-globals';
import type {MapLib, MapInstance} from '../types';

export type MapContextValue<MapT extends MapInstance = MapInstance> = {
  mapLib: MapLib<MapT>;
  map: MapRef<MapT>;
};

export const MapContext = React.createContext<MapContextValue>(null);

type MapInitOptions<MapOptions> = Omit<
  MapOptions,
  'style' | 'container' | 'bounds' | 'fitBoundsOptions' | 'center'
>;

export type MapProps<MapOptions, MapT extends MapInstance> = MapInitOptions<MapOptions> &
  MapboxProps<MapT> &
  GlobalSettings & {
    mapLib?: MapLib<MapT> | Promise<MapLib<MapT>>;
    reuseMaps?: boolean;
    /** Map container id */
    id?: string;
    /** Map container CSS style */
    style?: CSSProperties;
    children?: any;
  };

export default function Map<MapOptions, MapT extends MapInstance>(
  props: MapProps<MapOptions, MapT>,
  ref: React.Ref<MapRef<MapT>>,
  defaultLib: MapLib<MapT> | Promise<MapLib<MapT>>
) {
  const mountedMapsContext = useContext(MountedMapsContext);
  const [mapInstance, setMapInstance] = useState<Mapbox<MapT>>(null);
  const containerRef = useRef();

  const {current: contextValue} = useRef<MapContextValue<MapT>>({mapLib: null, map: null});

  useEffect(() => {
    const mapLib = props.mapLib;
    let isMounted = true;
    let mapbox: Mapbox<MapT>;

    Promise.resolve(mapLib || defaultLib)
      .then((module: MapLib<MapT> | {default: MapLib<MapT>}) => {
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
        if (!mapboxgl.supported || mapboxgl.supported(props)) {
          if (props.reuseMaps) {
            mapbox = Mapbox.reuse(props, containerRef.current);
          }
          if (!mapbox) {
            mapbox = new Mapbox(mapboxgl.Map, props, containerRef.current);
          }
          contextValue.map = createRef(mapbox);
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
