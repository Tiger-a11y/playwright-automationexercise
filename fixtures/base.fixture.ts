// fixtures/base.fixture.ts
import { test as base, chromium, expect, Browser, BrowserContext, Page } from '@playwright/test';

type TestFixtures = {
  browser: Browser;
  context: BrowserContext;
  page: Page;
};

const test = base.extend<TestFixtures>({
  browser: async ({}, use) => {
    const browser = await chromium.launch({ headless: false });
    await use(browser);
    await browser.close();
  },

  context: async ({ browser }, use) => {
    const context = await browser.newContext();
    await use(context);
    await context.close();
  },

  page: async ({ context }, use) => {
    const page = await context.newPage();
    await page.goto(process.env.BASE_URL || 'https://automationexercise.com');
    await use(page);
  },
});

export { test, expect };
