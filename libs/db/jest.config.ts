// libs/db/jest.config.ts (and similar for auth and types)
/* eslint-disable */

export default {
  displayName: 'db', // IMPORTANT: Change to 'auth' for auth, 'types' for types
  preset: '../../jest.preset.js', // This path is crucial to reach the root preset
  testEnvironment: 'node', // Or 'jsdom' if it's a frontend library
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/libs/db', // IMPORTANT: Change to 'libs/auth' for auth, 'libs/types' for types
  // rootDir: './', // Jest usually figures this out, but you can explicitly set if needed
};