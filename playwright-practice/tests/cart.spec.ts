import { test, expect } from '../fixtures/fixtures.js';

//preconditioned steps
test.beforeEach(async ({ page, loginPage }) => {
  await loginPage.open();

  await loginPage.login('standard_user', 'secret_sauce');
  await expect(page).toHaveURL(/inventory/);
});

//tests
test('add product to Cart', async ({ inventoryPage }) => {
  await inventoryPage.checkInventoryPage();

  await inventoryPage.addProduct('Sauce Labs Backpack');

  await expect(inventoryPage.header.productCounter).toHaveText('1');
  await expect(inventoryPage.removeButton('Sauce Labs Backpack')).toBeVisible();
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
