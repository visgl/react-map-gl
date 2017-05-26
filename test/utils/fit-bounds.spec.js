import test from 'tape-catch';
import {fitBounds} from 'react-map-gl';

/* fitBounds from Mapbox for comparison */
import Transform from 'mapbox-gl/js/geo/transform';
import {LngLatBounds, Point} from 'mapbox-gl';
import {toLowPrecision} from '../test-utils';

/**
 * Adapted from mapbox-gl/js/ui/camera.js
 * https://www.mapbox.com/mapbox-gl-js/api/#map#fitbounds
 */
/* eslint-disable */
function mapboxFitBounds({width, height}, bounds, options) {

  options = Object.assign({
    padding: 0,
    offset: [0, 0],
    maxZoom: Infinity
  }, options);

  bounds = LngLatBounds.convert(bounds);

  const tr = new Transform();
  tr.width = width;
  tr.height = height;

  const offset = Point.convert(options.offset),
    nw = tr.project(bounds.getNorthWest()),
    se = tr.project(bounds.getSouthEast()),
    size = se.sub(nw),
    scaleX = (tr.width - options.padding * 2 - Math.abs(offset.x) * 2) / size.x,
    scaleY = (tr.height - options.padding * 2 - Math.abs(offset.y) * 2) / size.y;

  const center = tr.unproject(nw.add(se).div(2));
  const zoom = Math.min(tr.scaleZoom(tr.scale * Math.min(scaleX, scaleY)), options.maxZoom);

  return {
    longitude: center.lng,
    latitude: center.lat,
    zoom
  };
}
/* eslint-enable */

const FITBOUNDS_TEST_CASES = [
  {
    viewport: {width: 100, height: 100},
    bounds: [[-73.9876, 40.7661], [-72.9876, 41.7661]],
    options: {}
  },
  {
    viewport: {width: 600, height: 400},
    bounds: [[-23.407, 64.863], [-23.406, 64.874]],
    options: {padding: 20, offset: [0, -40]}
  }
];

test('fitBounds', t => {
  for (const testCase of FITBOUNDS_TEST_CASES) {
    const result = fitBounds(testCase.viewport, testCase.bounds, testCase.options);
    const mapboxResult = mapboxFitBounds(testCase.viewport, testCase.bounds, testCase.options);

    t.ok(Number.isFinite(result.longitude), 'get valid longitude');
    t.ok(Number.isFinite(result.latitude), 'get valid latitude');
    t.ok(Number.isFinite(result.zoom), 'get valid zoom');
    t.deepEqual(toLowPrecision(result), toLowPrecision(mapboxResult), 'match Mapbox result');
  }
  t.end();
});
