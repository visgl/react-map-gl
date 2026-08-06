import {expect, test} from 'vitest';
import {compareClassNames} from '@vis.gl/react-mapbox/utils/compare-class-names';

test('compareClassNames', () => {
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
    expect(
      compareClassNames(testCase.prevClassName, testCase.nextClassName),
      testCase.title
    ).toEqual(testCase.output);
  }
});
