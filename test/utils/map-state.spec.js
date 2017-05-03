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
function toLowPrecision(input, precision = 11) {
  if (typeof input === 'number') {
    input = Number(input.toPrecision(precision));
  }
  /* eslint-enable guard-for-in */
  return input;
}

// Compare two [lng, lat] locations, account for longitude wrapping
function isSameLocation(lngLat1, lngLat2) {
  const lng1 = toLowPrecision(lngLat1[0]);
  const lat1 = toLowPrecision(lngLat1[1]);
  const lng2 = toLowPrecision(lngLat2[0]);
  const lat2 = toLowPrecision(lngLat2[1]);
  return ((lng1 - lng2) % 360) === 0 && lat1 === lat2;
}

test('MapState - Pan', t => {
  const POS = [300, 300];
  const START_POS = [100, 100];

  SAMPLE_VIEWPORTS.forEach(viewport => {
    // one-off panning
    const mapState1 = new MapState(viewport).pan({pos: POS, startPos: START_POS});
    t.ok(toLowPrecision(mapState1.props.longitude) !== toLowPrecision(viewport.longitude) ||
      toLowPrecision(mapState1.props.latitude) !== toLowPrecision(viewport.latitude),
      'Map center has changed');
    t.ok(mapState1.props.longitude < 180 &&
      mapState1.props.longitude >= -180, 'Longitude is within bounds');
    t.ok(mapState1.props.latitude <= 90 &&
      mapState1.props.latitude >= -90, 'Latitude is within bounds');
    t.ok(isSameLocation(
      new PerspectiveMercatorViewport(viewport).unproject(START_POS),
      new PerspectiveMercatorViewport(mapState1.props).unproject(POS)),
      'Location under the pointer remains the same');

    // chained panning
    const mapState2 = new MapState(viewport)
      .panStart({pos: START_POS})
      .pan({pos: POS})
      .panEnd();
    t.ok(toLowPrecision(mapState1.props.longitude) === toLowPrecision(mapState2.props.longitude) &&
      toLowPrecision(mapState1.props.latitude) === toLowPrecision(mapState2.props.latitude),
      'Consistent result');
  });

  // insufficient arguments
  try {
    new MapState(SAMPLE_VIEWPORTS[0]).pan({pos: POS});
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
    const mapState1 = new MapState(viewport).rotate({xDeltaScale: X_DELTA, yDeltaScale: Y_DELTA});
    t.ok(toLowPrecision(mapState1.props.bearing) !== toLowPrecision(viewport.bearing),
      'Bearing has changed');
    t.ok(toLowPrecision(mapState1.props.pitch) !== toLowPrecision(viewport.pitch),
      'Pitch has changed');
    t.ok(mapState1.props.pitch <= mapState1.props.maxPitch &&
      mapState1.props.pitch >= mapState1.props.minPitch, 'Pitch is within bounds');
    t.ok(mapState1.props.bearing < 180 &&
      mapState1.props.bearing >= -180, 'Bearing is within bounds');

    // chained rotating
    const mapState2 = new MapState(viewport)
      .rotateStart({})
      .rotate({xDeltaScale: X_DELTA, yDeltaScale: Y_DELTA})
      .rotateEnd();
    t.ok(toLowPrecision(mapState1.props.pitch) === toLowPrecision(mapState2.props.pitch) &&
      toLowPrecision(mapState1.props.bearing) === toLowPrecision(mapState2.props.bearing),
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
  const POS = [100, 100];
  const START_POS = [200, 200];
  const SCALE = 2;

  SAMPLE_VIEWPORTS.forEach(viewport => {
    // one-off panning
    const mapState1 = new MapState(viewport).zoom({pos: POS, startPos: START_POS, scale: SCALE});
    t.ok(toLowPrecision(mapState1.props.zoom) !== toLowPrecision(viewport.zoom),
      'Zoom has changed');
    t.ok(mapState1.props.zoom <= mapState1.props.maxZoom &&
      mapState1.props.zoom >= mapState1.props.minZoom, 'Zoom is within bounds');
    t.ok(isSameLocation(
      new PerspectiveMercatorViewport(viewport).unproject(START_POS),
      new PerspectiveMercatorViewport(mapState1.props).unproject(POS)),
      'Location under the pointer remains the same');

    // chained panning
    const mapState2 = new MapState(viewport)
      .zoomStart({pos: START_POS})
      .zoom({pos: POS, scale: SCALE})
      .zoomEnd();
    t.ok(toLowPrecision(mapState1.props.longitude) === toLowPrecision(mapState2.props.longitude) &&
      toLowPrecision(mapState1.props.latitude) === toLowPrecision(mapState2.props.latitude) &&
      toLowPrecision(mapState1.props.zoom) === toLowPrecision(mapState2.props.zoom),
      'Consistent result');
  });

  // insufficient arguments
  try {
    new MapState(SAMPLE_VIEWPORTS[0]).zoom({pos: POS, scale: SCALE});
    t.fail('Should throw error for missing argument');
  } catch (error) {
    t.ok(/startZoomLngLat/.test(error.message), 'Should throw error for missing argument');
  }

  // argument out of bounds
  try {
    new MapState(SAMPLE_VIEWPORTS[0]).zoom({pos: POS, startPos: START_POS, scale: -1});
    t.fail('Should throw error with out of bounds argument');
  } catch (error) {
    t.ok(/scale/.test(error.message), 'Should throw error with out of bounds argument');
  }

  t.end();
});
