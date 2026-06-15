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
};
