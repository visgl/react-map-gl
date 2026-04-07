import test from 'tape-promise/tape';
import {Marker} from 'react-map-gl/mapbox-legacy';

import {MapContext} from '../../src/mapbox-legacy/components/map';
import {testMissingCanvasContainer} from '../../../../test/helpers/marker-canvas-container-guard';

test('Marker ignores maps whose canvas container is already unavailable', async t => {
  await testMissingCanvasContainer(t, {MapContext, Marker});
  t.end();
});
