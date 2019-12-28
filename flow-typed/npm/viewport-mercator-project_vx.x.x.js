// flow-typed signature: 124cebe2f2c462f58e0aa7c0b863fad8
// flow-typed version: <<STUB>>/viewport-mercator-project_v6.x/flow_v0.80.0

type Viewport = {
  width: number,
  height: number,
  longitude: number,
  latitude: number,
  zoom: number,
  pitch: number,
  bearing: number
};

type FlyToInterpolatorOpts = {
  curve?: number,
  speed?: number,
  screenSpeed?: number,
  maxDuraiton?: number
};

declare module 'viewport-mercator-project' {
  declare export class WebMercatorViewport {
    constructor(Viewport): WebMercatorViewport;

    width: number;
    height: number;
    longitude: number;
    latitude: number;
    zoom: number;
    pitch: number;
    bearing: number;

    project(xyz: Array<number>): Array<number>;
    unproject(xyz: Array<number>): Array<number>;
    getMapCenterByLngLatPosition({lngLat: Array<number>, pos: Array<number>}): Array<number>;
    fitBounds(bounds: [[Number, Number], [Number, Number]], options: any): WebMercatorViewport;
  }

  declare export function normalizeViewportProps(props: Viewport): Viewport;
  declare export function flyToViewport(
    startProps: Viewport,
    endProps: Viewport,
    t: number,
    opts?: FlyToInterpolatorOpts
  ): Viewport;
  declare export function getFlyToDuration(
    startProps: Viewport,
    endProps: Viewport,
    opts?: FlyToInterpolatorOpts
  ): number;

  declare export default typeof WebMercatorViewport;
}
