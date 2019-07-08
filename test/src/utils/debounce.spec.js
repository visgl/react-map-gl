/* global setTimeout */
import test from 'tape-catch';
import debounce from 'react-map-gl/utils/debounce';

test('debounce', t => {
  const funcCalled = [];

  function func(x) {
    funcCalled.push({context: this, arg: x});
  }

  const debounced = debounce(func, 1);

  debounced.call('0', 0);
  debounced.call('1', 1);
  debounced.call('2', 2);

  t.deepEquals(funcCalled, [], 'function is not called yet');

  setTimeout(() => {
    t.deepEquals(funcCalled, [{context: '2', arg: 2}], 'function is called once');
    t.end();
  }, 5);
});
