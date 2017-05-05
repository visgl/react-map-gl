import test from 'tape-catch';
import {getDynamicPosition, ANCHOR_POSITION} from '../../src/utils/dynamic-position';

const ANCHORS = Object.keys(ANCHOR_POSITION);

 // * @param {String} anchor - type of the anchor, one of 'top', 'bottom',
 //    'left', 'right', 'top-left', 'top-right', 'bottom-left' , and  'bottom-right'

const TEST_CASES = [
  {
    opts: {
      x: 0,
      y: 0,
      width: 10,
      height: 10,
      selfWidth: 20,
      selfHeight: 20
    },
    expected: (input, output) => output === 'top-left',
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
    expected: (input, output) => input === output,
    message: 'Very large container'
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
    expected: (input, output) => output === 'top-left',
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
    expected: (input, output) => {
      if (input.endsWith('right')) {
        return output === 'right';
      }
      return output === 'left';
    },
    message: 'Very short container'
  },
  {
    opts: {
      x: 10,
      y: 50,
      width: 100,
      height: 100,
      selfWidth: 20,
      selfHeight: 20
    },
    expected: (input, output) => {
      switch (input) {
      case 'top':
      case 'top-left':
        return output === 'top-right';
      case 'left':
        return output === 'right';
      case 'bottom':
      case 'bottom-left':
        return output === 'bottom-right';
      default:
        return input === output;
      }
    },
    message: 'Left border'
  },
  {
    opts: {
      x: 90,
      y: 50,
      width: 100,
      height: 100,
      selfWidth: 20,
      selfHeight: 20
    },
    expected: (input, output) => {
      switch (input) {
      case 'top':
      case 'top-right':
        return output === 'top-left';
      case 'right':
        return output === 'left';
      case 'bottom':
      case 'bottom-right':
        return output === 'bottom-left';
      default:
        return input === output;
      }
    },
    message: 'Right border'
  },
  {
    opts: {
      x: 50,
      y: 10,
      width: 100,
      height: 100,
      selfWidth: 20,
      selfHeight: 20
    },
    expected: (input, output) => {
      switch (input) {
      case 'left':
      case 'top-left':
        return output === 'bottom-left';
      case 'top':
        return output === 'bottom';
      case 'right':
      case 'top-right':
        return output === 'bottom-right';
      default:
        return input === output;
      }
    },
    message: 'Top border'
  },
  {
    opts: {
      x: 50,
      y: 90,
      width: 100,
      height: 100,
      selfWidth: 20,
      selfHeight: 20
    },
    expected: (input, output) => {
      switch (input) {
      case 'left':
      case 'bottom-left':
        return output === 'top-left';
      case 'bottom':
        return output === 'top';
      case 'right':
      case 'bottom-right':
        return output === 'top-right';
      default:
        return input === output;
      }
    },
    message: 'Bottom border'
  }
];

test('getDynamicPosition', t => {
  TEST_CASES.forEach(testCase => {

    ANCHORS.forEach(anchor => {
      const params = Object.assign({anchor}, testCase.opts);
      const result = getDynamicPosition(params);

      if (testCase.expected(result)) {
        t.fail(`Incorrect position: gets '${result}' from ${JSON.stringify(params)}`);
      }
    });

    t.pass(testCase.message);
  });

  t.end();
});
