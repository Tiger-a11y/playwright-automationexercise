import { Locator, Page, expect } from '@playwright/test';

export class LoginPage {
    private usernameInput: Locator;
    private passwordInput: Locator;
    private adminRadio: Locator;
    private userRadio: Locator;
    private loginButton: Locator;
    private popup: Locator;
    private termsCheck: Locator;
    private popupAccept: Locator;

    constructor(private page: Page) {
        this.usernameInput = this.page.locator('input#username');
        this.passwordInput = this.page.locator('input#password');
        this.userRadio = this.page.locator("input#usertype[value='user']");
        this.adminRadio = this.page.locator("input#usertype[value='admin']");
        this.termsCheck = this.page.locator('input#terms');
        this.loginButton = this.page.locator('input#signInBtn');

        // Initialize popup locators
        this.popup = this.page.locator('div.modal-content');
        this.popupAccept = this.page.locator('button#okayBtn');
    }

    async gotoLoginPage() {
        await this.page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    }

    async handlePopupIfPresent() {
        if (await this.popup.isVisible({ timeout: 2000 }).catch(() => false)) {
            await this.popupAccept.click();
        }
    }

    async login(username: string, password: string) {
        await this.handlePopupIfPresent(); // 🔥 Handle popup just before radio click
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);

        await this.adminRadio.click();
        await this.termsCheck.click();
        await this.loginButton.click();

        // Optionally, handle popup again after login (if needed)
        await this.handlePopupIfPresent();
    }
}
