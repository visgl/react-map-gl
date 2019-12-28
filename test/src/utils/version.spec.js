import test from 'tape-catch';

import {compareVersions} from 'react-map-gl/utils/version';

test('compareVersions', t => {
  const TEST_CASES = [
    {
      title: 'both empty',
      version1: undefined,
      version2: null,
      expected: 0
    },
    {
      title: 'one empty',
      version1: undefined,
      version2: '1.6.0',
      expected: -1
    },
    {
      title: 'major version diff',
      version1: '0.53.1',
      version2: '1.3.0',
      expected: -1
    },
    {
      title: 'minor version diff',
      version1: '1.6.0',
      version2: '1.13.0',
      expected: -1
    },
    {
      title: 'patch version diff',
      version1: '1.6',
      version2: '1.6.1',
      expected: -1
    }
  ];

  for (const testCase of TEST_CASES) {
    t.is(compareVersions(testCase.version1, testCase.version2), testCase.expected, testCase.title);
    // reverse order
    t.is(compareVersions(testCase.version2, testCase.version1), -testCase.expected, testCase.title);
  }

  t.end();
});
