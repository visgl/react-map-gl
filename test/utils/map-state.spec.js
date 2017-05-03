import test from 'tape-catch';
import MapState from '../../src/utils/map-state';
import {PerspectiveMercatorViewport} from 'viewport-mercator-project';

const SAMPLE_VIEWPORTS = [
  // SF
  {
    width: 800,
    height: 600,
    longitude: -122.58,
    latitude: 37.74,
    zoom: 14
  },
  // Edge location, custom zoom limit
  {
    width: 800,
    height: 600,
    longitude: -179,
    latitude: 90,
    zoom: 0,
    maxZoom: 0.5
  },
  // SF with rotation, custom pitch limit
  {
    width: 800,
    height: 600,
    longitude: -122.58,
    latitude: 37.74,
    zoom: 14,
    pitch: 60,
    bearing: 45,
    maxPitch: 90
  }
];

// Discard precision errors for comparison
const toLowPrecision = (input, precision = 11) => Number(input.toPrecision(precision));

// Compare two [lng, lat] locations, account for longitude wrapping
function isSameLocation(lngLat1, lngLat2) {
  const lng1 = toLowPrecision(lngLat1[0]);
  const lat1 = toLowPrecision(lngLat1[1]);
  const lng2 = toLowPrecision(lngLat2[0]);
  const lat2 = toLowPrecision(lngLat2[1]);
  return ((lng1 - lng2) % 360) === 0 && lat1 === lat2;
}

test('MapState - Constructor', t => {
  SAMPLE_VIEWPORTS.forEach(viewport => {
    t.ok(new MapState(viewport), 'Constructed MapState instance');
  });

  // Normalize props
  {
    const mapState = new MapState(Object.assign({}, SAMPLE_VIEWPORTS[0], {longitude: -200}));
    t.is(mapState.getViewportProps().longitude, 160, 'Normalized props');
  }

  // Missing required prop
  try {
    t.notOk(new MapState({width: 100, height: 100}), 'Should throw error for missing prop');
  } catch (error) {
    t.ok(/must be supplied/.test(error.message), 'Should throw error for missing prop');
  }

  t.end();
});

test('MapState - Pan', t => {
  const POS_START = [100, 100];
  const POS_IMTERMIDIATE = [200, 200];
  const POS_END = [300, 300];

  SAMPLE_VIEWPORTS.forEach(viewport => {
    // one-off panning
    const viewport1 = new MapState(viewport)
      .pan({pos: POS_END, startPos: POS_START})
      .getViewportProps();

    t.ok(toLowPrecision(viewport1.longitude) !== toLowPrecision(viewport.longitude) ||
      toLowPrecision(viewport1.latitude) !== toLowPrecision(viewport.latitude),
      'Map center has changed');
    t.ok(viewport1.longitude < 180 &&
      viewport1.longitude >= -180, 'Longitude is within bounds');
    t.ok(viewport1.latitude <= 90 &&
      viewport1.latitude >= -90, 'Latitude is within bounds');
    t.ok(isSameLocation(
      new PerspectiveMercatorViewport(viewport).unproject(POS_START),
      new PerspectiveMercatorViewport(viewport1).unproject(POS_END)),
      'Location under the pointer remains the same');

    // chained panning
    const viewport2 = new MapState(viewport)
      .panStart({pos: POS_START})
      .pan({pos: POS_IMTERMIDIATE})
      .pan({pos: POS_END})
      .panEnd()
      .getViewportProps();

    t.ok(toLowPrecision(viewport1.longitude) === toLowPrecision(viewport2.longitude) &&
      toLowPrecision(viewport1.latitude) === toLowPrecision(viewport2.latitude),
      'Consistent result');
  });

  // insufficient arguments
  try {
    new MapState(SAMPLE_VIEWPORTS[0]).pan({pos: POS_START});
    t.fail('Should throw error for missing argument');
  } catch (error) {
    t.ok(/startPanLngLat/.test(error.message), 'Should throw error for missing argument');
  }

  t.end();
});

test('MapState - Rotate', t => {
  const X_DELTA = -0.2;
  const Y_DELTA = 0.2;

  SAMPLE_VIEWPORTS.forEach(viewport => {
    // one-off rotating
    const viewport1 = new MapState(viewport)
      .rotate({xDeltaScale: X_DELTA, yDeltaScale: Y_DELTA})
      .getViewportProps();

    t.ok(toLowPrecision(viewport1.bearing) !== toLowPrecision(viewport.bearing || 0),
      'Bearing has changed');
    t.ok(toLowPrecision(viewport1.pitch) !== toLowPrecision(viewport.pitch || 0),
      'Pitch has changed');
    t.ok(viewport1.pitch <= viewport1.maxPitch &&
      viewport1.pitch >= viewport1.minPitch, 'Pitch is within bounds');
    t.ok(viewport1.bearing < 180 &&
      viewport1.bearing >= -180, 'Bearing is within bounds');

    // chained rotating
    const viewport2 = new MapState(viewport)
      .rotateStart({})
      .rotate({xDeltaScale: 0, yDeltaScale: 0})
      .rotate({xDeltaScale: X_DELTA, yDeltaScale: Y_DELTA})
      .rotateEnd()
      .getViewportProps();

    t.ok(toLowPrecision(viewport1.pitch) === toLowPrecision(viewport2.pitch) &&
      toLowPrecision(viewport1.bearing) === toLowPrecision(viewport2.bearing),
      'Consistent result');
  });

  // argument out of bounds
  try {
    new MapState(SAMPLE_VIEWPORTS[0]).rotate({xDeltaScale: 2, yDeltaScale: 0});
    t.fail('Should throw error with out of bounds argument');
  } catch (error) {
    t.ok(/xDeltaScale/.test(error.message), 'Should throw error with out of bounds argument');
  }

  // insufficient arguments
  try {
    new MapState(SAMPLE_VIEWPORTS[0]).rotate({xDeltaScale: 0});
    t.fail('Should throw error for missing argument');
  } catch (error) {
    t.ok(/yDeltaScale/.test(error.message), 'Should throw error for missing argument');
  }

  t.end();
});

test('MapState - Zoom', t => {
  const POS_START = [300, 300];
  const POS_IMTERMIDIATE = [200, 200];
  const POS_END = [100, 100];
  const SCALE = 2;

  SAMPLE_VIEWPORTS.forEach(viewport => {
    // one-off panning
    const viewport1 = new MapState(viewport)
      .zoom({pos: POS_END, startPos: POS_START, scale: SCALE})
      .getViewportProps();

    t.ok(toLowPrecision(viewport1.zoom) !== toLowPrecision(viewport.zoom),
      'Zoom has changed');
    t.ok(viewport1.zoom <= viewport1.maxZoom &&
      viewport1.zoom >= viewport1.minZoom, 'Zoom is within bounds');
    t.ok(isSameLocation(
      new PerspectiveMercatorViewport(viewport).unproject(POS_START),
      new PerspectiveMercatorViewport(viewport1).unproject(POS_END)),
      'Location under the pointer remains the same');

    // chained panning
    const viewport2 = new MapState(viewport)
      .zoomStart({pos: POS_START})
      .zoom({pos: POS_IMTERMIDIATE, scale: 1.5})
      .zoom({pos: POS_END, scale: SCALE})
      .zoomEnd()
      .getViewportProps();

    t.ok(toLowPrecision(viewport1.longitude) === toLowPrecision(viewport2.longitude) &&
      toLowPrecision(viewport1.latitude) === toLowPrecision(viewport2.latitude) &&
      toLowPrecision(viewport1.zoom) === toLowPrecision(viewport2.zoom),
      'Consistent result');
  });

  // argument out of bounds
  try {
    new MapState(SAMPLE_VIEWPORTS[0]).zoom({pos: POS_END, scale: -1});
    t.fail('Should throw error with out of bounds argument');
  } catch (error) {
    t.ok(/scale/.test(error.message), 'Should throw error with out of bounds argument');
  }

  t.end();
});
