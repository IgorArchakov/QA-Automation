import { type Page, type Locator, expect } from '@playwright/test';

export class Header {
  //page fields
  readonly page: Page;
  readonly secondaryHeader: Locator;
  readonly productCounter: Locator;

  constructor(page: Page) {
    this.page = page;
    this.secondaryHeader = page.getByTestId('secondary-header');
    this.productCounter = page.getByTestId('shopping-cart-badge');
  }
}
