// tests/ui/homeSubscription.spec.ts
import { test, expect } from '../../../fixtures/base.fixture';
import { HomePage } from '../../../pages/homePage';
import { faker } from '@faker-js/faker';

test('TC10 - Verify Subscription in Home Page', async ({ page }) => {
  const homePage = new HomePage(page);

  // Step 1–3: Home page should be visible
  await expect(page.locator('img[alt="Website for automation practice"]')).toBeVisible();

  // Step 4: Scroll to footer
  await homePage.scrollToFooter();

  // Step 5: Verify "SUBSCRIPTION" section
  await expect(homePage.getSubscriptionHeader()).toBeVisible();

  // Step 6: Enter email and subscribe
  const email = faker.internet.email();
  await homePage.subscribe(email);

  // Step 7: Verify success message
  await expect(homePage.getSuccessMessage()).toBeVisible();
  await expect(homePage.getSuccessMessage()).toHaveText('You have been successfully subscribed!');
});
