import { test, expect } from '@playwright/test';

//preconditioned steps
test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await expect(page).toHaveTitle('Swag Labs');

  const loginField = page.getByTestId('username');

  await loginField.fill('standard_user');

  await page.getByPlaceholder('Password').fill('secret_sauce');

  await page.getByRole('button', { name: 'login' }).click();

  await expect(page).toHaveURL(/inventory/);
});

//tests
test('add product to Cart', async ({ page }) => {
  await expect(page.getByTestId('inventory-item')).toHaveCount(6);

  const testProductBackpack = page
    .getByTestId('inventory-item-description')
    .filter({ hasText: 'Sauce Labs Backpack' });

  const testProductAddButton = testProductBackpack.getByRole('button', {
    name: 'Add to cart',
  });

  await testProductAddButton.click();

  const shoppingCart = page.getByTestId('shopping-cart-link');

  await expect(shoppingCart.getByTestId('shopping-cart-badge')).toHaveText('1');

  const testProductRemoveButton = testProductBackpack.getByRole('button', {
    name: 'Remove',
  });

  await expect(testProductRemoveButton).toBeVisible();
});

test('remove product from Cart', async ({ page }) => {
  const testProductBackpack = page
    .getByTestId('inventory-item-description')
    .filter({ hasText: 'Sauce Labs Backpack' });

  const testProductAddButton = testProductBackpack.getByRole('button', {
    name: 'Add to cart',
  });

  await testProductAddButton.click();

  const testProductRemoveButton = testProductBackpack.getByRole('button', {
    name: 'Remove',
  });

  const shoppingCart = page.getByTestId('shopping-cart-link');

  //await testProductRemoveButton.click();

  await expect(
    shoppingCart.getByTestId('shopping-cart-badge'),
  ).not.toBeVisible();

  await expect(testProductRemoveButton).not.toBeVisible();

  await expect(testProductAddButton).toBeVisible();
});
