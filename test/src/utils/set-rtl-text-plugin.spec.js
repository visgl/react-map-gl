import test from 'tape-catch';
import {setRTLTextPlugin} from 'react-map-gl';

test('setRTLTextPlugin', t => {
  t.ok(typeof setRTLTextPlugin === 'function', 'setRTLTextPlugin is exported');
  t.end();
});
