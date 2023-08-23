/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    // 절대경로 사용할 수 있도록
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}
