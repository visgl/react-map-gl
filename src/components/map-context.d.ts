import {WebMercatorViewport} from 'viewport-mercator-project';
import {Context} from 'react';

export type MapContextProps = {
  viewport?: WebMercatorViewport,

  map: any,
  container: null | HTMLDivElement,

  onViewStateChange?: Function,
  onViewportChange?: Function,

  isDragging: boolean,
  eventManager: any
};

declare const MapContext: Context<MapContextProps>;

export const MapContextProvider: Function;

export default MapContext;
