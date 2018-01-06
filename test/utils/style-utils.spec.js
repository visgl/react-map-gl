import test from 'tape-catch';
import deepEqual from 'deep-equal';
import {getInteractiveLayerIds} from 'react-map-gl/utils/style-utils';

const TEST_STYLE_STRING = 'mapbox://styles/mapbox/streets-v9';
const TEST_STYLE_JS = {
  layers: [
    {
      id: 'interactive',
      interactive: true
    }, {
      id: 'non-interactive',
      interactive: false
    }
  ]
};

test('getInteractiveLayerIds#String style', t => {
  const layers = getInteractiveLayerIds(TEST_STYLE_STRING);
  t.notOk(layers, 'should not return layer ids');
  t.end();
});

test('getInteractiveLayerIds#JS style', t => {
  const layers = getInteractiveLayerIds(TEST_STYLE_JS);
  t.equal(deepEqual(layers, ['interactive']), true, 'got expected layer ids');
  t.end();
});
