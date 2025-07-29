// tests/ui/contactForm.spec.ts
import { test, expect } from '../../../fixtures/base.fixture';
import { ContactPage } from '../../../pages/ContactPage';
import { faker } from '@faker-js/faker';

test('TC6 - Contact Us Form', async ({ page }) => {
  const contactPage = new ContactPage(page);

  // Step 1: Navigate to contact page
  await contactPage.navigateToContactPage();

  // Step 2: Fill the contact form
  await contactPage.fillContactForm({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    subject: 'Feedback for Automation Test',
    message: 'Playwright test automation feedback.',
    fileName: 'sample.txt'
  });

  // Step 3: Submit the form and handle alert
  await contactPage.submitFormAndAcceptAlert();

  // Step 4: Assert success message is shown
  const successMsg = contactPage.getSuccessMessage();
  await expect(successMsg).toBeVisible({ timeout: 10000 });
  await expect(successMsg).toHaveText('Success! Your details have been submitted successfully.');

  // Step 5: Return to homepage
  await contactPage.returnHome();

  // Step 6: Assert home page logo is visible
  await expect(contactPage.getHomePageLogo()).toBeVisible();
});
