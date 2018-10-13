module.exports = {
  'root': true,
  'extends': 'recommended',
  'rules': {
    'array-callback-return': 'error',
    'comma-dangle': ['error', {
      'arrays': 'always-multiline',
      'objects': 'always-multiline',
      'imports': 'always-multiline',
      'exports': 'always-multiline',
      'functions': 'never',
    }],
    'dot-notation': 'error',
    'eqeqeq': ['error', 'always'],
    'indent': ['error', 2, { 'SwitchCase': 1 }],
    'no-array-constructor': 'error',
    'no-else-return': 'error',
    'no-eval': 'error',
    'no-new-object': 'error',
    'no-param-reassign': 'error',
    'no-restricted-globals': ['error', 'isNaN', 'isFinite'],
    'no-trailing-spaces': 'error',
    'no-underscore-dangle': ['error', { 'allowAfterThis': true }],
    'no-var': 'error',
    'prefer-const': 'error',
    'quote-props': ['error', 'always'],
    'quotes': ['error', 'single', {
      'avoidEscape': true,
    }],
    'radix': 'error',
    'semi': ['error', 'always'],
  }
};