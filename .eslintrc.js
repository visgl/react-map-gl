const {getESLintConfig} = require('ocular-dev-tools/configuration');

module.exports = getESLintConfig({
  react: '16.8.2',
  overrides: {
    parserOptions: {
      project: ['./tsconfig.json'],
      ecmaVersion: 2020
    },

    rules: {
      'max-depth': ['warn', 4],
      complexity: ['warn'],
      'max-statements': ['warn'],
      'callback-return': 0
    },

    overrides: [
      {
        files: ['**/*.ts', '**/*.tsx', '**/*.d.ts'],
        rules: {
          // Gradually enable
          '@typescript-eslint/ban-ts-comment': 0,
          '@typescript-eslint/ban-types': 0,
          '@typescript-eslint/no-unsafe-member-access': 0,
          '@typescript-eslint/no-unsafe-assignment': 0,
          'import/named': 0,
          '@typescript-eslint/no-empty-function': ['warn', {allow: ['arrowFunctions']}],
          '@typescript-eslint/restrict-template-expressions': 0,
          '@typescript-eslint/explicit-module-boundary-types': 0,
          '@typescript-eslint/no-unsafe-return': 0,
          '@typescript-eslint/no-unsafe-call': 0,
          '@typescript-eslint/restrict-plus-operands': 0
        }
      }
    ]
  }
});
