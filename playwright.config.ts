import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests', // Or './test' if your actual test folder is named that
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  reporter: 'html',

  use: {
    browserName: 'chromium',
    headless: true, // 👀 UI opens by default
    baseURL: process.env.BASE_URL || 'https://automationexercise.com',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    launchOptions: {
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
  },

  // Define module-wise projects
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
  ]
});
