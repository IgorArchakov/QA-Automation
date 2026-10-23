import { test, expect } from '../fixtures/fixtures.js';

test.describe('Cart', () => {
  //preconditioned steps
  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.open();
  });

  //tests
  test('add product to Cart', { tag: '@smoke' }, async ({ inventoryPage }) => {
    await inventoryPage.checkInventoryPage();

    await inventoryPage.addProduct('Sauce Labs Backpack');

    await expect(inventoryPage.header.productCounter).toHaveText('1');
    await expect(
      inventoryPage.removeButton('Sauce Labs Backpack'),
    ).toBeVisible();
  });

  test('remove product from Cart', async ({ inventoryPage }) => {
    await inventoryPage.checkInventoryPage();

    await inventoryPage.addProduct('Sauce Labs Backpack');

    await expect(inventoryPage.header.productCounter).toHaveText('1');

    await inventoryPage.removeProduct('Sauce Labs Backpack');

    await expect(inventoryPage.header.productCounter).not.toBeVisible();

    await expect(
      inventoryPage.removeButton('Sauce Labs Backpack'),
    ).not.toBeVisible();
    await expect(inventoryPage.addButton('Sauce Labs Backpack')).toBeVisible();
  });
});
