import test from 'tape-promise/tape';
import {compareClassNames} from '@vis.gl/react-maplibre/utils/compare-class-names';

test('compareClassNames', t => {
  const TEST_CASES = [
    {
      title: 'Empty class names',
      prevClassName: '',
      nextClassName: '',
      output: null
    },
    {
      title: 'Identical class names',
      prevClassName: 'marker active',
      nextClassName: 'active  marker ',
      output: null
    },
    {
      title: 'Addition',
      prevClassName: undefined,
      nextClassName: 'marker',
      output: ['marker']
    },
    {
      title: 'Addition',
      prevClassName: 'marker',
      nextClassName: 'marker active',
      output: ['active']
    },
    {
      title: 'Removal',
      prevClassName: 'marker active',
      nextClassName: 'marker',
      output: ['active']
    },
    {
      title: 'Multiple addition & removal',
      prevClassName: 'marker active',
      nextClassName: 'marker hovered hidden',
      output: ['hovered', 'hidden', 'active']
    }
  ];

  for (const testCase of TEST_CASES) {
    t.deepEqual(
      compareClassNames(testCase.prevClassName, testCase.nextClassName),
      testCase.output,
      testCase.title
    );
  }
  t.end();
});
