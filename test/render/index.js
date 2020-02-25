/* global window, document */
import test from 'tape-promise/tape';
import * as React from 'react';
import MapGL from 'react-map-gl';
import {render, unmountComponentAtNode} from 'react-dom';

import TEST_CASES from './test-cases';

const WIDTH = 400;
const HEIGHT = 300;

function getBoundingBoxInPage(domElement) {
  const bbox = domElement.getBoundingClientRect();
  return {
    x: window.scrollX + bbox.x,
    y: window.scrollY + bbox.y,
    width: bbox.width,
    height: bbox.height
  };
}

async function runTestCase({Component = MapGL, props}) {
  const container = document.createElement('div');
  container.style.width = `${WIDTH}px`;
  container.style.height = `${HEIGHT}px`;
  container.style.position = 'absolute';
  container.style.zIndex = 1;
  document.body.append(container);

  return new Promise((resolve, reject) => {
    const unmount = () => {
      unmountComponentAtNode(container);
      container.remove();
    };
    const onLoad = ({target}) => {
      // Wait for mapbox's animation to finish
      target.once('idle', () =>
        resolve({
          map: target,
          boundingBox: getBoundingBoxInPage(container),
          unmount
        })
      );
    };

    const onError = evt => {
      // clean up
      unmount();
      reject(evt.error);
    };

    render(
      <Component width="100%" height="100%" {...props} onLoad={onLoad} onError={onError} />,
      container
    );
  });
}

test('Render test', async t => {
  // Default tape test timeout is 500ms - allow enough time for render and screenshot
  t.timeoutAfter(TEST_CASES.length * 4000);

  for (const testCase of TEST_CASES) {
    t.comment(testCase.title);

    const {threshold = 0.99, goldenImage} = testCase;
    let result;
    let error;

    try {
      const {boundingBox, unmount} = await runTestCase(testCase);

      result = await window.browserTestDriver_captureAndDiffScreen({
        threshold,
        goldenImage,
        region: boundingBox,
        tolerance: 0.05
        // Uncomment to save screenshot
        // , saveOnFail: true
      });

      error = result.error;
      unmount();
    } catch (err) {
      error = err;
    }

    if (testCase.mapError) {
      t.ok(error && testCase.mapError.test(error.message), 'Map should throw error');
    } else if (error) {
      t.fail(error.message);
    } else {
      t.ok(result && result.success, `Render test matched ${result.matchPercentage}`);
    }
  }

  t.end();
});
