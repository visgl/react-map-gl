import test from 'tape-catch';
import {getDynamicPosition, ANCHOR_POSITION} from 'react-map-gl/utils/dynamic-position';

const ANCHORS = Object.keys(ANCHOR_POSITION);

const TEST_CASES = [
  {
    opts: {
      x: 0,
      y: 0,
      width: 10,
      height: 10,
      selfWidth: 15,
      selfHeight: 15
    },
    expected: () => 'top-left',
    message: 'Very large content'
  },
  {
    opts: {
      x: 50,
      y: 50,
      width: 100,
      height: 100,
      selfWidth: 20,
      selfHeight: 20
    },
    expected: input => input,
    message: 'Very large container'
  },
  {
    opts: {
      height: 720,
      padding: 10,
      selfHeight: 589,
      selfWidth: 620,
      width: 1216,
      x: 771,
      y: 401
    },
    expected: () => 'right',
    message: 'Overwhelmingly large content'
  },
  {
    opts: {
      x: 50,
      y: 50,
      width: 100,
      height: 100,
      selfWidth: 20,
      selfHeight: 20,
      padding: 45
    },
    expected: input => (input.endsWith('right') ? 'right' : 'left'),
    message: 'Very large padding'
  },
  {
    opts: {
      x: 50,
      y: 10,
      width: 100,
      height: 20,
      selfWidth: 20,
      selfHeight: 20
    },
    expected: input => (input.endsWith('right') ? 'right' : 'left'),
    message: 'Very short container'
  },
  {
    opts: {
      x: 5,
      y: 50,
      width: 100,
      height: 100,
      selfWidth: 20,
      selfHeight: 20
    },
    expected: input => {
      if (input.startsWith('top')) {
        return 'top-left';
      }
      if (input.startsWith('bottom')) {
        return 'bottom-left';
      }
      return 'left';
    },
    message: 'Left border'
  },
  {
    opts: {
      x: 95,
      y: 50,
      width: 100,
      height: 100,
      selfWidth: 20,
      selfHeight: 20
    },
    expected: input => {
      if (input.startsWith('top')) {
        return 'top-right';
      }
      if (input.startsWith('bottom')) {
        return 'bottom-right';
      }
      return 'right';
    },
    message: 'Right border'
  },
  {
    opts: {
      x: 50,
      y: 5,
      width: 100,
      height: 100,
      selfWidth: 20,
      selfHeight: 20
    },
    expected: input => {
      if (input.endsWith('left')) {
        return 'top-left';
      }
      if (input.endsWith('right')) {
        return 'top-right';
      }
      return 'top';
    },
    message: 'Top border'
  },
  {
    opts: {
      x: 50,
      y: 95,
      width: 100,
      height: 100,
      selfWidth: 20,
      selfHeight: 20
    },
    expected: input => {
      if (input.endsWith('left')) {
        return 'bottom-left';
      }
      if (input.endsWith('right')) {
        return 'bottom-right';
      }
      return 'bottom';
    },
    message: 'Bottom border'
  }
];

test('getDynamicPosition', t => {
  for (const testCase of TEST_CASES) {
    t.comment(testCase.message);
    for (const anchor of ANCHORS) {
      const params = Object.assign({anchor}, testCase.opts);
      const result = getDynamicPosition(params);
      const expected = testCase.expected(anchor);

      t.is(result, expected, `Returns correct result for anchor '${anchor}'`);
    }
  }

  t.end();
});
