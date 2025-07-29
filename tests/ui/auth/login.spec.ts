import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/loginPage';
import { HomePage } from '../../../pages/homePage';
import { env } from '../../../configs/env';
import { paths } from '../../../configs/paths';

test('@smoke TC2 - Login with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateTo(`${env.baseURL}${paths.login}`);
  await loginPage.login('already.registered@example.com', 'Test@123');

  // ✅ Assert login success
  await expect(page.locator('text=Logged in as')).toContainText('Logged in as');
});

test('@smoke TC3 - Login with invalid credentials shows error', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateTo(`${env.baseURL}${paths.login}`);
  await loginPage.login('wronguser@example.com', 'wrongpassword');

  // ❌ Assert login failure message
  await expect(page.locator('p:has-text("Your email or password is incorrect!")')).toBeVisible();
});

test('@smoke TC4 - Logout after successful login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);

  await loginPage.navigateTo(`${env.baseURL}${paths.login}`);
  await loginPage.login('already.registered@example.com', 'Test@123');

  await expect(page.locator('text=Logged in as')).toBeVisible();

  // 🔚 Click logout
  await homePage.logout();

  // ✅ Assert redirection to login page
  await expect(page).toHaveURL(/.*\/login/);
  await expect(page.locator('h2:has-text("Login to your account")')).toBeVisible();
});