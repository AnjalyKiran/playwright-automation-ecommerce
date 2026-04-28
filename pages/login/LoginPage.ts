import { Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";
import { loginLocators } from "./login.locators";

export class LoginPage extends BasePage {
  locators = loginLocators;

  constructor(page: Page) {
    super(page);
  }

  usernameField() {
    return this.page.locator(this.locators.username);
  }

  passwordField() {
   return this.page.locator(this.locators.password);
  }

  loginButton() {
    return this.page.getByRole(
      this.locators.loginButton.Role,
      { name: this.locators.loginButton.name }
    );
  }

  logoutLink() {
    return this.page.getByRole(
      this.locators.logoutLink.Role,
      { name: this.locators.logoutLink.name }
    );
  }

 accountHeading() {
  return this.page.getByRole(
    this.locators.accountHeading.role,
    {
      name: this.locators.accountHeading.name,
      level: this.locators.accountHeading.level
    }
  );
}
  async navigate(): Promise<void> {
    await this.page.goto('/index.php?rt=account/login');
  }
}

