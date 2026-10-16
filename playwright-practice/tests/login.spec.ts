import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';

test('login to sauce', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();

  await loginPage.login('standard_user', 'secret_sauce');

  await expect(page).toHaveURL(/inventory/);
});

test('blocked user login', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();

  await loginPage.login('locked_out_user', 'secret_sauce');

  await expect(loginPage.errorMessage).toContainText(
    'this user has been locked out',
  );

  await expect(page).not.toHaveURL(/inventory/);
});
