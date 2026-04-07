import test from 'tape-promise/tape';
import {Marker} from '@vis.gl/react-maplibre';

import {MapContext} from '../../src/components/map';
import {testMissingCanvasContainer} from '../../../../test/helpers/marker-canvas-container-guard';

test('Marker ignores maps whose canvas container is already unavailable', async t => {
  await testMissingCanvasContainer(t, {MapContext, Marker});
  t.end();
});
