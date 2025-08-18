import type {Config} from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: './', // جذر المشروع
  modulePaths: ['<rootDir>'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1' // عشان الـ paths في tsconfig
  },
  testMatch: ['**/__test__/**/*.test.ts', '**/__test__/**/*.spec.ts'], // يخلي Jest يلقط ملفات الاختبار
  transform: {
    '^.+\\.ts$': 'ts-jest' // يحول TypeScript إلى JavaScript
  },
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  clearMocks: true
};

export default config;
