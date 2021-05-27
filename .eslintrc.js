module.exports = {
    rules: {
      semi: ['error', 'always'],
      quotes: ['error', 'double'],
      'no-unused-vars': 0,
      indent: [false, 'spaces', 2],
    },
  
    parserOptions: {
      ecmaVersion: 2020,
    },
  
    env: {
      node: true,
      es6: true,
      es7: true,
      es8: true,
      browser: true,
    },
  };