import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();
console.log('BASE_URL from env:', process.env.BASE_URL);

export default defineConfig({
  testDir: './tests',
  timeout: 60 * 1000,  // 🔺 Increased timeout
  expect: {
    timeout: 8000,
  },
  reporter: 'html',

  use: {
    headless: true,
    baseURL: process.env.BASE_URL || 'https://automationexercise.com',
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    launchOptions: {
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    }
  },

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
