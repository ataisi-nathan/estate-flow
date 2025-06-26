// libs/db/jest.config.ts (apply similar for auth and types)
/* eslint-disable */

export default {
  displayName: 'auth', // Change to 'auth' or 'types' for other libraries
  preset: '../../jest.preset.js', // This path is crucial to reach the root preset
  testEnvironment: 'node', // Or 'jsdom' if it's a frontend library
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/libs/auth', // Change to 'libs/auth' or 'libs/types'
  // rootDir: './', // Jest usually figures this out, but you can explicitly set if needed
};