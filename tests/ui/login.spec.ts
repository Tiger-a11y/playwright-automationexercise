import test from "@playwright/test";
import { LoginPage } from "../../pages/loginPage";

test.describe("Login Feature", () => {

    test('should login with valid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.gotoLoginPage();
        await loginPage.login('rahulshettyacademy', 'learning');
        // await loginPage.assertLoginSuccess();
    });

    test('should show error on invalid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.gotoLoginPage();
        await loginPage.login('wronguser', 'wrongpass');
        // await loginPage.assertLoginFailure('Invalid username or password');
    });
})