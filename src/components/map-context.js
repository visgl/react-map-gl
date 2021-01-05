import * as React from 'react';
import {createContext, useState, useContext} from 'react';

const MapContext = createContext({
  /* Map context */

  // Viewport
  viewport: null,
  // mapboxgl.Map instance
  map: null,
  // DOM element that contains the map
  container: null,

  /* Interaction callbacks */
  onViewportChange: null,
  onViewStateChange: null,

  // EventManager instance
  eventManager: null
});

// Save the original Provider component
export const MapContextProvider = MapContext.Provider;

// And replace Provider with our own
function WrappedProvider({value, children}) {
  const [map, setMap] = useState(null);
  const context = useContext(MapContext);

  value = {
    setMap,
    ...context,
    map: (context && context.map) || map,
    ...value
  };

  return <MapContextProvider value={value}>{children}</MapContextProvider>;
}

MapContext.Provider = WrappedProvider;

export default MapContext;
