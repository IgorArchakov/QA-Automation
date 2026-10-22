import { test as setup } from '../fixtures/fixtures.js';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ loginPage }) => {
  await loginPage.open();
  await loginPage.login('standard_user', 'secret_sauce');
  await loginPage.page.context().storageState({ path: authFile });
});
