export type GlobalSettings = {
  /** The maximum number of images (raster tiles, sprites, icons) to load in parallel.
   * @default 16
   */
  maxParallelImageRequests?: number;
  /** The map's RTL text plugin. Necessary for supporting the Arabic and Hebrew languages, which are written right-to-left.  */
  RTLTextPlugin?: {pluginUrl: string; lazy?: boolean};
  /** The number of web workers instantiated on a page with maplibre-gl maps.
   * @default 2
   */
  workerCount?: number;
  /** Provides an interface for loading maplibre-gl's WebWorker bundle from a self-hosted URL.
   * This is useful if your site needs to operate in a strict CSP (Content Security Policy) environment
   * wherein you are not allowed to load JavaScript code from a Blob URL, which is default behavior. */
  workerUrl?: string;
};

export default function setGlobals(mapLib: any, props: GlobalSettings) {
  const {RTLTextPlugin, maxParallelImageRequests, workerCount, workerUrl} = props;
  if (
    RTLTextPlugin &&
    mapLib.getRTLTextPluginStatus &&
    mapLib.getRTLTextPluginStatus() === 'unavailable'
  ) {
    mapLib.setRTLTextPlugin(
      RTLTextPlugin.pluginUrl,
      (error?: Error) => {
        if (error) {
          // eslint-disable-next-line
          console.error(error);
        }
      },
      RTLTextPlugin.lazy ?? true
    );
  }
  if (maxParallelImageRequests !== undefined) {
    mapLib.setMaxParallelImageRequests(maxParallelImageRequests);
  }
  if (workerCount !== undefined) {
    mapLib.setWorkerCount(workerCount);
  }
  if (workerUrl !== undefined) {
    mapLib.setWorkerUrl(workerUrl);
  }
}
