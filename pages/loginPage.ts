// pages/LoginPage.ts
import { Locator, Page } from '@playwright/test';
import { BasePage } from './base';

export class LoginPage extends BasePage {
    private emailInput: Locator;
    private passwordInput: Locator;
    private loginButton: Locator;
    private loggedInText: Locator;

    constructor(page: Page) {
        super(page);

        this.emailInput = this.page.locator('input[data-qa="login-email"]');
        this.passwordInput = this.page.locator('input[data-qa="login-password"]');
        this.loginButton = this.page.locator('button[data-qa="login-button"]');
        this.loggedInText = this.page.locator('a:has-text("Logged in as")');
    }

    async login(email: string, password: string) {
        await this.type(this.emailInput, email);
        await this.type(this.passwordInput, password);
        await this.click(this.loginButton);
    }

    async assertLoginSuccessful() {
        await this.waitForSelector(this.loggedInText);
    }
}
