// @flow

import React, {createContext, useState, useContext} from 'react';

import type {WebMercatorViewport} from 'viewport-mercator-project';

export type MapContextProps = {
  viewport: ?WebMercatorViewport,

  map: any,
  container: null | HTMLDivElement,

  onViewStateChange: ?Function,
  onViewportChange: ?Function,

  isDragging: boolean,
  eventManager: any
};

const MapContext = createContext<MapContextProps>({
  /* Map context */

  // Viewport
  viewport: null,
  // mapboxgl.Map instance
  map: null,
  // DOM element that contains the map
  container: null,

  /* Interactive-only context */
  onViewportChange: null,
  onViewStateChange: null,

  // EventManager instance
  eventManager: null,
  // whether the map is being dragged
  isDragging: false
});

// Save the original Provider component
export const MapContextProvider = MapContext.Provider;

// And replace Provider with our own
MapContext.Provider = function WrappedProvider({
  value,
  children
}: {
  value: MapContextProps,
  children: any
}) {
  const [map, setMap] = useState(null);
  const context = useContext(MapContext);

  value = {
    setMap,
    ...context,
    map: (context && context.map) || map,
    ...value
  };

  return <MapContextProvider value={value}>{children}</MapContextProvider>;
};

export default MapContext;
