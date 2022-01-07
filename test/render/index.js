/* global window, document, FontFace */
import test from 'tape-promise/tape';
import * as React from 'react';
import Map from 'react-map-gl';
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

async function runTestCase({Component = Map, props}) {
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
      // Wait for animations to finish
      target.once('idle', () => {
        /* global setTimeout */
        setTimeout(
          () =>
            resolve({
              map: target,
              boundingBox: getBoundingBoxInPage(container),
              unmount
            }),
          500
        );
      });
    };

    const onError = evt => {
      // clean up
      unmount();
      reject(evt.error);
    };

    render(<Component {...props} onLoad={onLoad} onError={onError} />, container);
  });
}

// CI does not have the same default fonts as local boxes.
async function loadStyles() {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = './node_modules/mapbox-gl/dist/mapbox-gl.css';
  document.head.append(link);

  const font = new FontFace(
    'Roboto',
    'url(https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2)',
    {style: 'normal', weight: 400}
  );
  const face = await font.load();
  document.fonts.add(face);
  const stylesheet = document.createElement('style');
  stylesheet.innerText = `.test-popup { font-family: Roboto; font-size: 20px; line-height: 1; }`;
  document.head.append(stylesheet);
}

test('Render test', async t => {
  // Default tape test timeout is 500ms - allow enough time for render and screenshot
  t.timeoutAfter(TEST_CASES.length * 4000);

  await loadStyles();

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
        tolerance: 0.05,
        includeEmpty: false,
        // Uncomment to save screenshot
        saveOnFail: true
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
