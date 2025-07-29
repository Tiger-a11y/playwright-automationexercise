// pages/ContactPage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from './base';
import path from 'path';

export class ContactPage extends BasePage {
  private nameInput: Locator;
  private emailInput: Locator;
  private subjectInput: Locator;
  private messageTextarea: Locator;
  private uploadInput: Locator;
  private submitButton: Locator;
  private successMessage: Locator;
  private getInTouchHeader: Locator;
  private homeButton: Locator;

  constructor(page: Page) {
    super(page);
    this.nameInput = page.locator('input[data-qa="name"]');
    this.emailInput = page.locator('input[data-qa="email"]');
    this.subjectInput = page.locator('input[data-qa="subject"]');
    this.messageTextarea = page.locator('textarea[data-qa="message"]');
    this.uploadInput = page.locator('input[name="upload_file"]');
    this.submitButton = page.locator('input[data-qa="submit-button"]');
    this.successMessage = page.locator('div.status.alert-success');
    this.getInTouchHeader = page.locator('h2:has-text("Get In Touch")');
    this.homeButton = page.locator('a[class="btn btn-success"]');
  }

  async navigateToContactPage() {
    await this.click('a[href="/contact_us"]');
    await this.getInTouchHeader.waitFor();
  }

  async fillContactForm({
    name,
    email,
    subject,
    message,
    fileName = 'sample.txt'
  }: {
    name: string;
    email: string;
    subject: string;
    message: string;
    fileName?: string;
  }) {
    await this.type(this.nameInput, name);
    await this.type(this.emailInput, email);
    await this.type(this.subjectInput, subject);
    await this.type(this.messageTextarea, message);

    const filePath = path.resolve(__dirname, `../resources/files/${fileName}`);
    await this.uploadInput.setInputFiles(filePath);
  }

  async submitFormAndAcceptAlert() {
    await Promise.all([
      this.page.waitForEvent('dialog').then(dialog => dialog.accept()),
      (async () => {
        await this.page.waitForTimeout(500); // slight delay for stability
        await this.click(this.submitButton);
      })()
    ]);
  }

  async returnHome() {
    await this.click(this.homeButton);
  }

  async minimizeAdIfPresent() {
    const adMinimizeBtn = this.page.locator('span > svg');
    if (await adMinimizeBtn.isVisible()) {
      try {
        await adMinimizeBtn.click({ timeout: 2000 });
        console.log('✅ Ad minimized');
      } catch (e) {
        console.warn('⚠️ Ad minimize click failed:', e);
      }
    }
  }

  getSuccessMessage() {
    return this.successMessage;
  }

  getHomePageLogo() {
    return this.page.locator('img[alt="Website for automation practice"]');
  }
}
