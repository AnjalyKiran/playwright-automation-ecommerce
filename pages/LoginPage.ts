import { Page,Locator, expect } from '@playwright/test';
import { expectAlertContains } from '../utils/uiAssertions';

  export class LoginPage {

  readonly page: Page;
  readonly userName: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  constructor(page: Page) {
    this.page=page;
   this.userName=page.locator('#loginFrm_loginname');
    this.password=page.locator('#loginFrm_password');
    this.loginButton=page.getByRole('button',{name:/login/i});
  }

  async navigate() {
    await this.page.goto('/index.php?rt=account/login');
  }


  async login(username: string, password: string) {
 await this.userName.fill(username);
  await this.password.fill(password);
  await this.loginButton.click();
  }
 

  async verifySuccessfulLogin() {
  await expect(this.page.getByRole('heading', { name: 'My Account', exact: true })).toBeVisible();

  }

  async logout() {
  await this.page.getByRole('link', { name: /logoff/i }).click();
  }

  async verifyErrorMessage(message: string | RegExp) {
  await expectAlertContains(this.page, message);
}
}
