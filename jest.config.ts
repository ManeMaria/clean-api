/* eslint-disable @typescript-eslint/quotes */
/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,
  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,
  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: [
    '<rootDir>/src/**/*/*.ts',
    '!<rootDir>/src/main/**'

  ],
  coverageProvider: "v8",
  roots: [
    "<rootDir>/src"
  ],
  // A map from regular expressions to paths to transformers
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  preset: "@shelf/jest-mongodb"
}
