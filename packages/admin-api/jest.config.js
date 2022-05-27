module.exports = {
  preset: 'ts-jest',
  clearMocks: true,
  rootDir: 'src',
  testPathIgnorePatterns: ['node_modules', '<rootDir>/__tests__/setup.ts'],
  testEnvironment: 'node',
}
