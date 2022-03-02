const {getESLintConfig, deepMerge} = require('ocular-dev-tools');

const defaultConfig = getESLintConfig({react: '16.8.2'});

// Make any changes to default config here
const config = deepMerge(defaultConfig, {
  parserOptions: {
    project: ['./tsconfig.json'],
    ecmaVersion: 2020
  },

  env: {
    es2020: true
    // browser: true,
    // node: true
  },

  rules: {
    camelcase: 0,
    indent: 0,
    'import/no-unresolved': 0,
    'import/no-extraneous-dependencies': 0, // ['warn'],
    'no-console': 1,
    'no-continue': ['warn'],
    'callback-return': 0,
    'max-depth': ['warn', 4],
    complexity: ['warn'],
    'max-statements': ['warn'],
    'default-case': ['warn'],
    'no-eq-null': ['warn'],
    eqeqeq: ['warn'],
    radix: 0
    // 'accessor-pairs': ['error', {getWithoutSet: false, setWithoutGet: false}]
  },

  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx', '**/*.d.ts'],
      rules: {
        indent: 0,
        quotes: ['error', 'single', {avoidEscape: true}],
        // For parquet module
        '@typescript-eslint/no-non-null-assertion': 0,
        '@typescript-eslint/no-non-null-asserted-optional-chain': 0,
        // Gradually enable
        '@typescript-eslint/ban-ts-comment': 0,
        '@typescript-eslint/ban-types': 0,
        '@typescript-eslint/no-unsafe-member-access': 0,
        '@typescript-eslint/no-unsafe-assignment': 0,
        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {vars: 'all', args: 'none', ignoreRestSiblings: false}
        ],
        // We still have some issues with import resolution
        'import/named': 0,
        // Warn instead of error
        // 'max-params': ['warn'],
        // 'no-undef': ['warn'],
        // camelcase: ['warn'],
        // '@typescript-eslint/no-floating-promises': ['warn'],
        // '@typescript-eslint/await-thenable': ['warn'],
        // '@typescript-eslint/no-misused-promises': ['warn'],
        '@typescript-eslint/no-empty-function': ['warn', {allow: ['arrowFunctions']}],
        // We use function hoisting
        '@typescript-eslint/no-use-before-define': 0,
        // We always want explicit typing, e.g `field: string = ''`
        '@typescript-eslint/no-inferrable-types': 0,
        '@typescript-eslint/restrict-template-expressions': 0,
        '@typescript-eslint/explicit-module-boundary-types': 0,
        '@typescript-eslint/require-await': 0,
        '@typescript-eslint/no-unsafe-return': 0,
        '@typescript-eslint/no-unsafe-call': 0,
        '@typescript-eslint/no-empty-interface': 0,
        '@typescript-eslint/restrict-plus-operands': 0
      }
    }
  ],

  settings: {
    // Ensure eslint finds typescript files
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx']
      }
    }
  }
});

module.exports = config;
