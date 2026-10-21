import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';

//preconditioned steps
test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();

  await loginPage.login('standard_user', 'secret_sauce');

  await expect(page).toHaveURL(/inventory/);
});

//tests
test('add product to Cart', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);

  await inventoryPage.checkInventoryPage();

  await inventoryPage.addProduct('Sauce Labs Backpack');

  await expect(inventoryPage.header.productCounter).toHaveText('1');

  await expect(inventoryPage.removeButton('Sauce Labs Backpack')).toBeVisible();
});

test('remove product from Cart', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);

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
