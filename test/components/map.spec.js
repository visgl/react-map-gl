/* global setTimeout, clearTimeout */
// import InteractiveMap from 'react-map-gl';
import MapGL, {InteractiveMap} from 'react-map-gl';
import {createElement} from 'react';
import ReactTestUtils from 'react-test-renderer/shallow';
import ReactTestRenderer from 'react-test-renderer';
import sinon from 'sinon';
import test from 'tape-catch';
import Immutable from 'immutable';

const mapboxApiAccessToken = process.env._MapboxAccessToken_; // eslint-disable-line

const defaultProps = {
  width: 500,
  height: 500,
  longitude: -122,
  latitude: 37,
  zoom: 14,
  mapboxApiAccessToken
};

const minimalStyle = {
  version: 8,
  name: 'Minimal',
  sources: {
    point: {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-122, 37]
        }
      }
    }
  },
  layers: [
    {
      id: 'point',
      source: 'point',
      type: 'circle',
      paint: {
        'circle-radius': 10,
        'circle-color': '#000000'
      }
    }
  ]
};

const TEST_CASES = [
  {
    title: 'Mapbox data without token',
    props: Object.assign({}, defaultProps, {
      mapboxApiAccessToken: ''
    }),
    shouldLoad: false
  },
  {
    title: 'Mapbox data with token (string)',
    props: Object.assign({}, defaultProps, {
      mapStyle: 'mapbox://styles/mapbox/dark-v9'
    }),
    shouldLoad: true
  },
  {
    title: 'non-Mapbox data without token (JSON)',
    props: Object.assign({}, defaultProps, {
      mapStyle: minimalStyle,
      mapboxApiAccessToken: ''
    }),
    shouldLoad: true
  },
  {
    title: 'non-Mapbox data without token (Immutable)',
    props: Object.assign({}, defaultProps, {
      mapStyle: Immutable.fromJS(minimalStyle)
    }),
    shouldLoad: true
  }
];

test('InteractiveMap#default export', t => {
  t.ok(MapGL, 'InteractiveMap is defined');

  const map = createElement(MapGL, defaultProps);
  const result = ReactTestUtils.createRenderer().render(map);

  t.ok(result, 'InteractiveMap rendered');
  t.end();
});

test('InteractiveMap#named export', t => {
  t.ok(InteractiveMap, 'InteractiveMap is defined');

  const map = createElement(InteractiveMap, defaultProps);
  const result = ReactTestUtils.createRenderer().render(map);

  t.ok(result, 'InteractiveMap rendered');
  t.end();
});

TEST_CASES.forEach(testCase => {
  test(`InteractiveMap#load ${testCase.title}`, t => {
    let result = null;
    let timer = null;

    function checkRenderResult() {
      // The "Mapbox API access token required" warning is rendered with a <h3 />
      const warning = result.root.findAllByType('h3');
      if (testCase.shouldLoad) {
        t.notOk(warning.length, 'shouldn\'t show warning');
      } else {
        t.ok(warning.length, 'should show warning');
      }

      // Unmount the component to avoid creating too many maps
      result.unmount();
    }

    function onLoad() {
      if (testCase.shouldLoad) {
        t.pass('onLoad is called');
      } else {
        t.fail('onLoad should not be called');
      }
      clearTimeout(timer);
      checkRenderResult();
      t.end();
    }

    function onTimeout() {
      if (testCase.shouldLoad) {
        t.fail('onLoad wasn\'t called');
      } else {
        t.pass('onLoad wasn\'t called');
      }
      checkRenderResult();
      t.end();
    }

    const props = Object.assign({}, testCase.props, {onLoad});

    const map = createElement(InteractiveMap, props);

    result = ReactTestRenderer.create(map);

    t.ok(result, 'InteractiveMap rendered');

    if (!InteractiveMap.supported()) {
      t.ok('onLoad not called since InteractiveMap.supported() false');
      t.end();
    } else {
      timer = setTimeout(onTimeout, 5000);
    }
  });
});

test('Interactive map renders children on first render', t => {
  const childComponent = sinon.spy(() => null);
  const child = createElement(childComponent);
  const map = createElement(InteractiveMap, defaultProps, child);
  try {
    const result = ReactTestRenderer.create(map);
    // Unmount the component to avoid creating too many maps
    result.unmount();
  } catch (e) {
    // we use try catch here as InteractiveMap fails in DidMount
    // but having that render have already called this fail does not matter
    // for this test
  }

  t.ok(childComponent.called, 'Child rendered');
  t.end();
});

test('Interactive map#call transformRequest callback when provided', t => {
  const transformRequest = sinon.spy(() => null);

  const props = Object.assign({}, defaultProps, {transformRequest});

  const map = createElement(InteractiveMap, props);

  // const result = ReactTestUtils.createRenderer().render(map);
  const result = ReactTestRenderer.create(map);

  if (!InteractiveMap.supported()) {
    t.pass('transformRequest not called since InteractiveMap.supported() false');
  } else {
    t.ok(transformRequest.called, 'transformRequest handler was called');
  }
  result.unmount();
  t.end();
});
