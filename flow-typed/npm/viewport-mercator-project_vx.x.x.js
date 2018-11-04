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

declare module 'viewport-mercator-project' {
  declare export class WebMercatorViewport {
    constructor(Viewport) : WebMercatorViewport;

    project(xyz: Array<number>): Array<number>;
    unproject(xyz: Array<number>): Array<number>;
    getMapCenterByLngLatPosition({lngLat: Array<number>, pos: Array<number>}): Array<number>;
  }

  declare export function normalizeViewportProps(props: Viewport) : Viewport;
  declare export function flyToViewport(startProps: Viewport, endProps: Viewport, t: number) : Viewport;

  declare export default typeof WebMercatorViewport;
}
