/* global window, document */
import test from 'tape-catch';
import React from 'react';
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

function sleep(delay) {
  return new Promise(resolve => {
    window.setTimeout(resolve, delay);
  });
}

function runTestCase({Component = MapGL, threshold = 0.99, props, goldenImage}) {
  const container = document.createElement('div');
  container.style.width = `${WIDTH}px`;
  container.style.height = `${HEIGHT}px`;
  container.style.position = 'absolute';
  container.style.zIndex = 1;
  document.body.append(container);

  return new Promise((resolve, reject) => {
    const onLoad = () => {
      // Wait for mapbox's animation to finish
      sleep(500)
        .then(() =>
          window.browserTestDriver_captureAndDiffScreen({
            threshold,
            goldenImage,
            region: getBoundingBoxInPage(container),
            tolerance: 0.05
            // Uncomment to save screenshot
            // , saveOnFail: true
          })
        )
        .then(result => {
          // clean up
          unmountComponentAtNode(container);
          container.remove();

          if (result.error) {
            reject(result.error);
          } else {
            resolve(result);
          }
        });
    };

    const onError = evt => {
      // clean up
      unmountComponentAtNode(container);
      container.remove();

      reject(evt.error);
    };

    render(
      <Component width="100%" height="100%" {...props} onLoad={onLoad} onError={onError} />,
      container
    );
  });
}

test('Render test', t => {
  // Default tape test timeout is 500ms - allow enough time for render and screenshot
  t.timeoutAfter(TEST_CASES.length * 4000);

  let testCaseIndex = 0;

  function nextTestCase() {
    const testCase = TEST_CASES[testCaseIndex];
    if (!testCase) {
      t.end();
      return;
    }
    t.comment(testCase.title);
    runTestCase(testCase)
      .then(result => {
        t.ok(result.success, `Render test matched ${result.matchPercentage}`);
      })
      .catch(error => {
        if (testCase.mapError) {
          t.ok(testCase.mapError.test(error.message), 'Map should throw error');
        } else {
          t.fail(error.message);
        }
      })
      .finally(() => {
        testCaseIndex++;
        nextTestCase();
      });
  }

  nextTestCase();
});
