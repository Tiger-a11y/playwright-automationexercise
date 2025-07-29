import { test, expect } from '../../../fixtures/base.fixture';
import { TestCasesPage } from '../../../pages/testcasePage';

test('TC7 - Verify Test Cases Page', async ({ page }) => {
  const testCasesPage = new TestCasesPage(page);

  // Step 1-3: Navigate to Home (implicitly handled by base fixture)
  await expect(page.locator('img[alt="Website for automation practice"]')).toBeVisible();

  // Step 4: Click 'Test Cases' button
  await testCasesPage.navigateToTestCasesPage();

  // Step 5: Assert navigation success
  await testCasesPage.assertTestCasesPageVisible();
});
