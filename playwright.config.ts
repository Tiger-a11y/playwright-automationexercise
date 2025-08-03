import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  reporter: [['html', { open: 'never' }]],

  use: {
    browserName: 'chromium',
    headless: true,
    baseURL: process.env.BASE_URL || 'https://automationexercise.com',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    launchOptions: {
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    },
  },

  workers: process.env.CI ? 1 : undefined, // ⛑️ Force serial execution in CI

  projects: [
    {
      name: 'auth',
      testMatch: /.*auth\/.*\.spec\.ts/,
    },
    {
      name: 'products',
      testMatch: /.*products\/.*\.spec\.ts/,
    },
    {
      name: 'contact',
      testMatch: /.*contact\/.*\.spec\.ts/,
    },
  ],
});
