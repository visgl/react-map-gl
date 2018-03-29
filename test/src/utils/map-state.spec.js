import test from 'tape-catch';
import MapState, {MAPBOX_LIMITS} from 'react-map-gl/utils/map-state';
import WebMercatorViewport from 'viewport-mercator-project';
import {toLowPrecision, isSameLocation} from 'react-map-gl/test/test-utils';

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
    latitude: 75,
    zoom: 3,
    maxZoom: 5
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

test('MapState - Low zoom', t => {

  const viewport = new MapState({
    width: 800,
    height: 600,
    longitude: -179,
    latitude: 80,
    zoom: 0,
    maxZoom: 0.5
  }).getViewportProps();

  t.ok(viewport.zoom > 0, 'Constrained zoom');
  t.ok(Math.abs(viewport.latitude) < 1e-7, 'Centered map');

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
      new WebMercatorViewport(viewport).unproject(POS_START),
      new WebMercatorViewport(viewport1).unproject(POS_END)),
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
  const viewport = new MapState(SAMPLE_VIEWPORTS[0]);
  t.is(viewport, viewport.pan({pos: POS_START}), 'Do nothing when missing argument');

  t.end();
});

test('MapState - Rotate', t => {
  const X_DELTA = -0.2;
  const Y_DELTA = 0.2;

  SAMPLE_VIEWPORTS.forEach(viewport => {
    // one-off rotating
    const viewport1 = new MapState(viewport)
      .rotateStart({})
      .rotate({deltaScaleX: X_DELTA, deltaScaleY: Y_DELTA})
      .rotateEnd()
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
      .rotate({deltaScaleX: 0, deltaScaleY: 0})
      .rotate({deltaScaleX: X_DELTA, deltaScaleY: Y_DELTA})
      .rotateEnd()
      .getViewportProps();

    t.ok(toLowPrecision(viewport1.pitch) === toLowPrecision(viewport2.pitch) &&
      toLowPrecision(viewport1.bearing) === toLowPrecision(viewport2.bearing),
      'Consistent result');

    // out of bounds arguments
    const state = new MapState(viewport).rotateStart({});

    t.is(state.rotate({deltaScaleY: 2}).getViewportProps().pitch,
      viewport.maxPitch || MAPBOX_LIMITS.maxPitch,
      'Capped at max pitch');

    t.is(state.rotate({deltaScaleY: -2}).getViewportProps().pitch,
      viewport.minPitch || MAPBOX_LIMITS.minPitch,
      'Capped at min pitch');

    t.is(state.rotate({deltaScaleX: 2}).getViewportProps().bearing,
      viewport.bearing || 0,
      'Big delta X is fine');
  });

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
      new WebMercatorViewport(viewport).unproject(POS_START),
      new WebMercatorViewport(viewport1).unproject(POS_END)),
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
