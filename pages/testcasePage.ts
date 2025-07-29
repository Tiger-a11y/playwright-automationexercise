import { Page, Locator, expect } from '@playwright/test';

export class TestCasesPage {
  readonly page: Page;
  readonly testCasesButton: Locator;
  readonly testCasesHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.testCasesButton = page.locator('//a[contains(text(),"Test Cases")]');
    this.testCasesHeading = page.locator('h2:has-text("Test Cases")');
  }

  async navigateToTestCasesPage() {
    await this.testCasesButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async assertTestCasesPageVisible() {
    await expect(this.testCasesHeading).toBeVisible();
    await expect(this.page).toHaveURL(/.*\/test_cases/);
  }
}
