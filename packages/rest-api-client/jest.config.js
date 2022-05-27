module.exports = {
  preset: 'ts-jest',
  clearMocks: true,
  rootDir: 'src',
  setupFilesAfterEnv: ['<rootDir>/__tests__/setup.ts'],
  testPathIgnorePatterns: ['node_modules', '<rootDir>/__tests__/setup.ts'],
  testEnvironment: 'node',
}
