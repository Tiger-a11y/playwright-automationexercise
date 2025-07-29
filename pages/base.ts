import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  constructor(public page: Page) { }

  async navigateTo(path: string) {
    await this.page.goto(path);
  }

  async click(locator: string | Locator) {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await element.waitFor({ state: 'attached' });
    await element.click();
  }

  async type(locator: string | Locator, text: string) {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await element.waitFor({ state: 'visible' });
    await element.fill(text);
  }

  async isVisible(locator: string | Locator): Promise<boolean> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    return await element.isVisible();
  }

  async getText(locator: string | Locator): Promise<string> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    return await element.innerText();
  }

  async assertTitleContains(expected: string) {
    const title = await this.page.title();
    expect(title).toContain(expected);
  }

  async waitForSelector(locator: string | Locator) {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await element.waitFor({ state: 'visible' });
  }

  async pressKey(locator: string | Locator, key: string) {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await element.press(key);
  }

  async selectByValue(locator: string | Locator, value: string) {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await element.selectOption({ value });
  }

  async selectByVisibleText(locator: string | Locator, text: string) {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await element.selectOption({ label: text });
  }

  async expectText(locator: Locator, expectedText: string) {
    await expect(locator).toHaveText(expectedText);
  }
  
}
