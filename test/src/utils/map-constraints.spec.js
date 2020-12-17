import test from 'tape-catch';
import {checkVisibilityConstraints} from 'react-map-gl/utils/map-constraints';

const TEST_CASES = [
  {
    props: {longitude: -122, latitude: 38, zoom: 10, pitch: 0, bearing: 0},
    result: true
  },
  {
    props: {longitude: -122, latitude: 38, zoom: 10, pitch: 90, bearing: 0},
    result: false
  },
  {
    props: {longitude: -122, latitude: 38, zoom: 10, pitch: 0, bearing: 0},
    constraints: {minZoom: 0, maxZoom: 4},
    result: false
  },
  {
    props: {longitude: -122, latitude: 38, zoom: 1, pitch: 0, bearing: 0},
    constraints: {minZoom: 4, maxZoom: 20},
    result: false
  },
  {
    props: {longitude: -122, latitude: 38, zoom: 10, pitch: 0, bearing: 0},
    constraints: {minLongitude: -100},
    result: false
  }
];

test('checkVisibilityConstraints', t => {
  TEST_CASES.forEach(testCase => {
    t.is(
      checkVisibilityConstraints(testCase.props, testCase.constraints),
      testCase.result,
      'Returns expected result'
    );
  });
  t.end();
});
