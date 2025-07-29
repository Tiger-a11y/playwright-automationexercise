// pages/productsPage.ts
import { Page, Locator } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly productsLink: Locator;
  readonly firstViewProductBtn: Locator;
  readonly productDetailsSection: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly searchedProductsHeader: Locator;
  readonly searchedProductItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productsLink = page.locator('a[href="/products"]');
    this.firstViewProductBtn = page.locator('a[href^="/product_details/"]').first();
    this.productDetailsSection = page.locator('.product-information');
    this.searchInput = page.locator('#search_product');
    this.searchButton = page.locator('#submit_search');
    this.searchedProductsHeader = page.locator('h2:has-text("Searched Products")');
    this.searchedProductItems = page.locator('.features_items .product-image-wrapper');
  }

  async goToProductsPage() {
    await this.productsLink.click();
  }

  async viewFirstProductDetails() {
    await this.firstViewProductBtn.click();
  }

  getAllProductsHeader() {
    return this.page.locator('h2:has-text("All Products")');
  }

  getProductList() {
    return this.page.locator('.features_items');
  }

  getProductDetailsSection() {
    return this.productDetailsSection;
  }

  getProductDetailField(selector: string) {
    return this.productDetailsSection.locator(selector);
  }

  async searchForProduct(productName: string) {
    await this.searchInput.fill(productName);
    await this.searchButton.click();
  }

  getSearchedProductsHeader() {
    return this.searchedProductsHeader;
  }

  getSearchedProductItems() {
    return this.searchedProductItems;
  }
}
