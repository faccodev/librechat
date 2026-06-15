export default {
  testEnvironment: 'node',
  rootDir: '.',
  testMatch: ['<rootDir>/src/**/*.spec.ts'],
  transform: {
    '^.+\\.tsx?$': [
      'babel-jest',
      {
        presets: [
          ['@babel/preset-env', { targets: { node: 'current' } }],
          '@babel/preset-typescript',
        ],
      },
    ],
  },
  // ESM is irrelevant here — we run babel-jest and treat the
  // compiled output as CommonJS, which matches the published
  // runtime.
  moduleFileExtensions: ['ts', 'js', 'json'],
  // The source files use NodeNext `.js` extension imports (mandatory
  // for ESM compliance). Under the runtime, the bundler/loader maps
  // those back to the `.ts` source. Under Jest, we map them ourselves
  // so the test runner can find `runner.ts` when `runner.js` is
  // requested.
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
};
