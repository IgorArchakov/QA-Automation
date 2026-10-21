import { type Page, type Locator, expect } from '@playwright/test';
import { Header } from './Header.js';

export class InventoryPage {
  readonly page: Page;
  readonly header: Header;
  readonly itemContainers: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = new Header(page);
    this.itemContainers = page.getByTestId('inventory-item-description');
  }

  async checkInventoryPage() {
    await expect(this.page).toHaveURL(/inventory/);
    await expect(this.header.secondaryHeader).toHaveText(/Products/);
  }

  productCard(productName: string): Locator {
    return this.itemContainers.filter({
      has: this.page.getByText(productName, { exact: true }),
    });
  }

  addButton(productName: string): Locator {
    return this.productCard(productName).getByRole('button', {
      name: 'Add to cart',
    });
  }

  async addProduct(productName: string) {
    await this.addButton(productName).click();
  }

  removeButton(productName: string): Locator {
    return this.productCard(productName).getByRole('button', {
      name: 'Remove',
    });
  }

  async removeProduct(productName: string) {
    await this.removeButton(productName).click();
  }
}
