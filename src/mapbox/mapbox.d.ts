import * as MapboxGL from "mapbox-gl";

export interface MapLoadEvent {
  type: string;
  target: MapboxGL.Map;
}

export interface MapRequest {
  url: string;
  headers?: { [index: string]: string };
  credentials?: string;
}

export interface MapError {
  error?: { message: string; status: number };
  status: number;
}

export type ViewState = {
  longitude: number,
  latitude: number,
  zoom: number,
  bearing?: number,
  pitch?: number,
  altitude?: number
};

export type MapboxProps = Partial<{
  mapboxgl: any,
  container: any,
  gl: any,
  mapboxApiAccessToken: string,
  mapboxApiUrl: string,
  attributionControl: boolean,
  preserveDrawingBuffer: boolean,
  onLoad: (event: MapLoadEvent) => void,
  onError: (e: MapError) => void;
  reuseMaps: boolean,
  transformRequest: (url?: string, resourceType?: string) => MapRequest;
  mapStyle: any,
  preventStyleDiffing: boolean,
  visible: boolean,
  asyncRender: boolean,
  width: number | string,
  height: number | string,
  viewState: ViewState,
  longitude: number,
  latitude: number,
  zoom: number,
  bearing: number,
  pitch: number,
  altitude: number,
  mapOptions: Omit<MapboxGL.MapboxOptions, 'container'>
}>;

export default class Mapbox {
  static initialized: boolean;
  static defaultProps: MapboxProps;
  static propTypes: any;
  static savedMap: any;

  props: MapboxProps;
  width: number;
  height: number;

  constructor(props: MapboxProps);
  finalize(): Mapbox;
  setProps(props: MapboxProps): Mapbox;
  getMap(): any;
}
