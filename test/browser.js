/* global window */
import test from 'tape';
import {getVersion, setWorkerUrl} from 'maplibre-gl';

// MapLibre v6 resolves its worker relative to import.meta.url. Vite prebundles
// dependencies into .vite/deps, where the sibling worker file is not present.
if (Number.parseInt(getVersion(), 10) >= 6) {
  setWorkerUrl('/node_modules/maplibre-gl/dist/maplibre-gl-worker.mjs');
}

test.onFinish(window.browserTestDriver_finish);
test.onFailure(window.browserTestDriver_fail);

import '../modules/main/test/components';
import '../modules/main/test/utils';
import '../modules/react-mapbox/test/components';
import '../modules/react-mapbox/test/utils';
import '../modules/react-maplibre/test/components';
import '../modules/react-maplibre/test/utils';
// import './render';
