import PropTypes from 'prop-types';
import {Marker} from 'react-map-gl';
import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import WebMercatorViewport from 'viewport-mercator-project';
import sinon from 'sinon';
import test from 'tape-catch';

function createMockContext() {
  const viewport = new WebMercatorViewport({
    width: 800,
    height: 600,
    longitude: -122.58,
    latitude: 37.74,
    zoom: 14
  });
  const eventManager = {
    on: sinon.spy(),
    off: sinon.spy()
  };

  class MockContext extends React.Component {
    getChildContext() {
      return {
        viewport,
        eventManager
      };
    }

    render() {
      return this.props.children;
    }
  }

  MockContext.childContextTypes = {
    viewport: PropTypes.instanceOf(WebMercatorViewport),
    eventManager: PropTypes.object
  };

  MockContext.viewport = viewport;
  MockContext.eventManager = eventManager;

  return MockContext;
}

test('Marker#renders children', t => {
  t.ok(Marker, 'Marker is defined');

  const MockContext = createMockContext();

  const tree = React.createElement(MockContext, {},
    React.createElement(
      Marker,
      {
        latitude: 37,
        longitude: -122
      },
      React.createElement('div', {className: 'test-marker'}, ['hello'])
    )
  );

  const result = ReactTestRenderer.create(tree);
  const resultRoot = result.root;

  t.ok(resultRoot.findByProps({className: 'mapboxgl-marker '}));
  t.equal(resultRoot.findByProps({className: 'test-marker'}).children[0], 'hello');

  result.unmount();

  t.end();
});
