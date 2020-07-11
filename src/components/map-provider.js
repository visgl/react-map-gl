// @flow
import React, {useState, useContext, createContext} from 'react';
import MapContext from './map-context';
import WebMercatorViewport from 'viewport-mercator-project';
import {Map} from 'mapbox-gl';

type MapProviderProps = {
  defaultViewport: ?WebMercatorViewport
};

const SetMapContext = createContext(undefined);

const MapProvider: React$ComponentType<MapProviderProps> = ({defaultViewport, children}) => {
  /** Store viewport in state */
  const [viewport, setViewport] = useState<typeof undefined | WebMercatorViewport>(undefined);

  /** Store viewport in state */
  const [mapRef, setMapRef] = useState<typeof undefined | Map>(undefined);

  return (
    <MapContext.Provider
      value={{
        viewport,
        map: mapRef,
        eventManager: null,
        isDragging: false,
        mapContainer: null,
        onViewStateChange: setViewport,
        onViewportChange: setViewport
      }}
    >
      <SetMapContext.Provider value={{setViewport, setMapRef}}>{children}</SetMapContext.Provider>
    </MapContext.Provider>
  );
};

export default MapProvider;

/** Hook to expose the MapContext */
export const useMap = () => {
  const context = useContext(MapContext);
  if (!context) throw Error('Not inside <MapProvider />');
  return context;
};

/** Split out state updaters into it's own hook to prevent unnecessary re-renders (when viewport changes, often). */
export const useSetMap = () => {
  const context = useContext(SetMapContext);
  if (!context) throw Error('Not inside <MapProvider />');
  return context;
};
