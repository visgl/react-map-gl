import * as React from 'react';
import {useState, useCallback, useMemo, useContext} from 'react';

import {MapRef} from '../mapbox/create-ref';
import {MapContext} from './map';
import {MapInstance} from '../types';

type MountedMapsContextValue = {
  maps: {[id: string]: MapRef<MapInstance>};
  onMapMount: (map: MapRef<MapInstance>, id: string) => void;
  onMapUnmount: (id: string) => void;
};

export const MountedMapsContext = React.createContext<MountedMapsContextValue>(null);

export const MapProvider: React.FC<{children?: React.ReactNode}> = props => {
  const [maps, setMaps] = useState<{[id: string]: MapRef<MapInstance>}>({});

  const onMapMount = useCallback((map: MapRef<MapInstance>, id: string = 'default') => {
    setMaps(currMaps => {
      if (id === 'current') {
        throw new Error("'current' cannot be used as map id");
      }
      if (currMaps[id]) {
        throw new Error(`Multiple maps with the same id: ${id}`);
      }
      return {...currMaps, [id]: map};
    });
  }, []);

  const onMapUnmount = useCallback((id: string = 'default') => {
    setMaps(currMaps => {
      if (currMaps[id]) {
        const nextMaps = {...currMaps};
        delete nextMaps[id];
        return nextMaps;
      }
      return currMaps;
    });
  }, []);

  return (
    <MountedMapsContext.Provider
      value={{
        maps,
        onMapMount,
        onMapUnmount
      }}
    >
      {props.children}
    </MountedMapsContext.Provider>
  );
};

export type MapCollection<MapT extends MapInstance> = {
  [id: string]: MapRef<MapT> | undefined;
  current?: MapRef<MapT>;
};

export function useMap<MapT extends MapInstance>(): MapCollection<MapT> {
  const maps = useContext(MountedMapsContext)?.maps;
  const currentMap = useContext(MapContext);

  const mapsWithCurrent = useMemo(() => {
    return {...maps, current: currentMap?.map};
  }, [maps, currentMap]);

  return mapsWithCurrent as MapCollection<MapT>;
}
