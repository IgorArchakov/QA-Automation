import { test, expect } from '../fixtures/fixtures.js';

test.use({ storageState: { cookies: [], origins: [] } });

test('login to sauce', async ({ loginPage }) => {
  await loginPage.open();

  await loginPage.login('standard_user', 'secret_sauce');

  await expect(loginPage.page).toHaveURL(/inventory/);
});

test('blocked user login', async ({ loginPage }) => {
  await loginPage.open();

  await loginPage.login('locked_out_user', 'secret_sauce');

  await expect(loginPage.errorMessage).toContainText(
    'this user has been locked out',
  );

  await expect(loginPage.page).not.toHaveURL(/inventory/);
});
