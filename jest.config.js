module.exports = {
  preset: 'jest-preset-ns',
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
  moduleNameMapper: {
    '@/(.*)': ['<rootDir>/$1', '<rootDir>/src/$1'],
  },
  // @see https://github.com/node-fetch/node-fetch/issues/1265#issuecomment-977520130
  transformIgnorePatterns: [
    'node_modules/(?!(data-uri-to-buffer|formdata-polyfill|fetch-blob|node-fetch)/)',
  ],
}
