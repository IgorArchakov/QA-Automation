import { type Page, type Locator, expect } from '@playwright/test';

export class LoginPage {
  //page fields
  readonly page: Page;
  readonly pageUrl: string;
  readonly loginContainer: Locator;
  readonly usernameField: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageUrl = '/';
    this.loginContainer = page.getByTestId('login-container');
    this.usernameField = page.getByTestId('username');
    this.passwordField = page.getByTestId('password');
    this.loginButton = page.getByRole('button', { name: 'login' });
    this.errorMessage = page.getByRole('alert');
  }
  //methods
  async open() {
    await this.page.goto(this.pageUrl);

    await expect(this.loginContainer).toBeVisible();
  }

  async login(username: string, password: string) {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }
}
