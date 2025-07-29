// tests/ui/registration.spec.ts
import { test, expect } from '../../../fixtures/base.fixture';
import { faker } from '@faker-js/faker';
import { SignupPage } from '../../../pages/signupPage';
import { RegistrationPage } from '../../../pages/registrationPage';

test('@smoke TC1 - User should be able to complete full signup and registration', async ({ page }) => {
  const signupPage = new SignupPage(page);
  const registrationPage = new RegistrationPage(page);

  const name = faker.person.firstName();
  const email = faker.internet.email();
  const lastName = faker.person.lastName();

  // Step 1: Navigate and sign up
  await signupPage.navigateTo(`${process.env.BASE_URL}/login`);
  await signupPage.signup(name, email);
  await expect(page.locator('h2:has-text("Enter Account Information")')).toBeVisible();
  const actualEmail = await registrationPage.getEmailInput().inputValue();
  expect(actualEmail).toBe(email);

  // Step 2: Fill registration form
  await registrationPage.fillAccountInfo({
    password: 'Test@1234',
    title: 'Mr',
    day: '10',
    month: '5',
    year: '1995'
  });

  await registrationPage.fillAddressInfo({
    firstName: name,
    lastName,
    company: 'Test Co',
    address: '123 Main St',
    address2: 'Apt 101',
    country: 'India',
    state: 'MH',
    city: 'Pune',
    zip: '411001',
    mobile: '9876543210'
  });

  await registrationPage.submitRegistration();

  // Step 3: Assert account created and continue
  await expect(page.locator('h2:has-text("Account Created!")')).toBeVisible();
  await page.locator('a[data-qa="continue-button"]').click();

  // Step 4: Assert user is logged in
  await expect(page.locator(`text=Logged in as ${name}`)).toBeVisible();
});

test(' @smoke TC5 - Should show error for already registered email', async ({ page }) => {
  const signupPage = new SignupPage(page);
  const name = faker.person.firstName();
  const reusedEmail = 'already.registered@example.com'; // Use an existing email

  await signupPage.navigateTo(`${process.env.BASE_URL}/login`);
  await signupPage.signup(name, reusedEmail);

  await expect(page.locator('p:has-text("Email Address already exist!")')).toBeVisible();
});