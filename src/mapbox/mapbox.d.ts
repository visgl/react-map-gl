
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
  onLoad: Function,
  onError: Function,
  reuseMaps: boolean,
  transformRequest: Function,
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
  mapOptions: any
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
