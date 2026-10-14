import { test, expect } from '@playwright/test';

test('login to sauce', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await expect(page).toHaveTitle('Swag Labs');

  const loginField = page.getByTestId('username');

  await loginField.fill('standard_user');

  await page.getByPlaceholder('Password').fill('secret_sauce');

  await page.getByRole('button', { name: 'login' }).click();

  await expect(page).toHaveURL(/inventory/);
});

test('blocked user login', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await expect(page).toHaveTitle('Swag Labs');

  const loginField = page.getByTestId('username');

  await loginField.fill('locked_out_user');

  await page.getByPlaceholder('Password').fill('secret_sauce');

  await page.getByRole('button', { name: 'login' }).click();

  const loginErrorMessage = page.getByTestId('error');

  await expect(loginErrorMessage).toContainText(
    'this user has been locked out',
  );

  await expect(page).not.toHaveURL(/inventory/);
});
