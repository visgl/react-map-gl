import test from 'tape-catch';
import Immutable from 'immutable';
import deepEqual from 'deep-equal';
import {getInteractiveLayerIds} from 'react-map-gl/utils/style-utils';

var TEST_STYLE_STRING = 'mapbox://styles/mapbox/streets-v9';
var TEST_STYLE_JS = {
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
var TEST_STYLE_IMMUTABLE = Immutable.fromJS(TEST_STYLE_JS);

test('getInteractiveLayerIds#String style', function (t) {
  var layers = getInteractiveLayerIds(TEST_STYLE_STRING);
  t.equal(deepEqual(layers, []), true, 'got expected layer ids');
  t.end();
});

test('getInteractiveLayerIds#JS style', function (t) {
  var layers = getInteractiveLayerIds(TEST_STYLE_JS);
  t.equal(deepEqual(layers, ['interactive']), true, 'got expected layer ids');
  t.end();
});

test('getInteractiveLayerIds#Immutable style', function (t) {
  var layers = getInteractiveLayerIds(TEST_STYLE_IMMUTABLE);
  t.equal(deepEqual(layers, ['interactive']), true, 'got expected layer ids');
  t.end();
});
