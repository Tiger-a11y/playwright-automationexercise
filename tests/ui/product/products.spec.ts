// tests/ui/products.spec.ts
import { test, expect } from '../../../fixtures/base.fixture';
import { ProductsPage } from '../../../pages/productsPage';

test('TC8 - Verify All Products and Product Detail Page', async ({ page }) => {
  const productsPage = new ProductsPage(page);

  // Step 1–3: Verify home page is visible
  await expect(page.locator('img[alt="Website for automation practice"]')).toBeVisible();

  // Step 4: Click on 'Products' button
  await productsPage.goToProductsPage();

  // Step 5: Verify navigation to 'ALL PRODUCTS' page
  await expect(productsPage.getAllProductsHeader()).toBeVisible();
  await expect(page).toHaveURL(/\/products/);

  // Step 6: Verify the products list is visible
  await expect(productsPage.getProductList()).toBeVisible();

  // Step 7: Click on 'View Product' of first product
  await productsPage.viewFirstProductDetails();

  // Step 8: Verify user is on product detail page
  await expect(page).toHaveURL(/\/product_details\/\d+/);
  await expect(productsPage.getProductDetailsSection()).toBeVisible();

  // Step 9: Verify product details
  await expect(productsPage.getProductDetailField('h2')).toBeVisible(); // Name
  await expect(productsPage.getProductDetailField('p:has-text("Category")')).toBeVisible();
  await expect(productsPage.getProductDetailField('//span[contains(text(), "Rs.")]')).toBeVisible(); // Price (XPath)
  await expect(productsPage.getProductDetailField('p:has-text("Availability:")')).toBeVisible();
  await expect(productsPage.getProductDetailField('p:has-text("Condition:")')).toBeVisible();
  await expect(productsPage.getProductDetailField('p:has-text("Brand:")')).toBeVisible();
});

test('TC9 - Search Product', async ({ page }) => {
  const productsPage = new ProductsPage(page);

  // Step 1–3: Verify homepage
  await expect(page.locator('img[alt="Website for automation practice"]')).toBeVisible();

  // Step 4–5: Navigate to Products page
  await productsPage.goToProductsPage();
  await expect(productsPage.getAllProductsHeader()).toBeVisible();
  await expect(page).toHaveURL(/\/products/);

  // Step 6: Search for product
  await productsPage.searchForProduct('top');

  // Step 7: Verify 'SEARCHED PRODUCTS' is visible
  await expect(productsPage.getSearchedProductsHeader()).toBeVisible();

  // Step 8: Verify matching products are visible
  const itemsCount = await productsPage.getSearchedProductItems().count();
  expect(itemsCount).toBeGreaterThan(0);
});