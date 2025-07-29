import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './base';

export class SignupPage extends BasePage {
    private nameInput: Locator;
    private emailInput: Locator;
    private submitBtn: Locator;

    constructor(page: Page) {
        super(page);

        this.nameInput = this.page.locator('input[data-qa="signup-name"]');
        this.emailInput = this.page.locator('input[data-qa="signup-email"]');
        this.submitBtn = this.page.locator('button[data-qa="signup-button"]');
    }

    async signup(name: string, email: string) {
        await this.type(this.nameInput, name);
        await this.type(this.emailInput, email);
        await this.click(this.submitBtn);
    }
} 