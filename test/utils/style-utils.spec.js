import test from 'tape-catch';
import Immutable from 'immutable';
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
const TEST_STYLE_IMMUTABLE = Immutable.fromJS(TEST_STYLE_JS);

test('getInteractiveLayerIds#String style', t => {
  const layers = getInteractiveLayerIds(TEST_STYLE_STRING);
  t.equal(deepEqual(layers, []), true, 'got expected layer ids');
  t.end();
});

test('getInteractiveLayerIds#JS style', t => {
  const layers = getInteractiveLayerIds(TEST_STYLE_JS);
  t.equal(deepEqual(layers, ['interactive']), true, 'got expected layer ids');
  t.end();
});

test('getInteractiveLayerIds#Immutable style', t => {
  const layers = getInteractiveLayerIds(TEST_STYLE_IMMUTABLE);
  t.equal(deepEqual(layers, ['interactive']), true, 'got expected layer ids');
  t.end();
});
