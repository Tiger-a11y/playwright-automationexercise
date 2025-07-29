// pages/homePage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from './base';

export class HomePage extends BasePage {
  private logoutLink: Locator;
  private subscriptionSection: Locator;
  private emailInput: Locator;
  private submitButton: Locator;
  private successMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.logoutLink = page.locator('a:has-text("Logout")');
    this.subscriptionSection = page.locator('h2:has-text("Subscription")');
    this.emailInput = page.locator('#susbscribe_email');
    this.submitButton = page.locator('#subscribe');
    this.successMessage = page.locator('div#success-subscribe');
  }

  async logout() {
    await this.click(this.logoutLink);
  }

  async scrollToFooter() {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  }

  async subscribe(email: string) {
    await this.emailInput.fill(email);
    await this.submitButton.click();
  }

  getSubscriptionHeader() {
    return this.subscriptionSection;
  }

  getSuccessMessage() {
    return this.successMessage;
  }
}
