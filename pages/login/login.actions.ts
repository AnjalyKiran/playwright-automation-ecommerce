import { expect } from "@playwright/test";
import { LoginPage } from "./LoginPage";
import { expectAlertContains } from "../../testData/uiAssertions";

export class LoginActions extends LoginPage {

  async login(username: string, password: string): Promise<void> {
    await this.usernameField().fill(username);
    await this.passwordField().fill(password);
    await this.loginButton().click();
  }
async fillLoginUser(username: string, password: string): Promise<void> {
   await this.usernameField().fill(username);
    await this.passwordField().fill(password);
}
  async verifySuccessfulLogin(): Promise<void> {
    await expect(this.accountHeading()).toBeVisible();
  }

  async logout(): Promise<void> {
    await this.logoutLink().click();
  }

  async verifyErrorMessage(message: string | RegExp): Promise<void> {
    await expectAlertContains(this.page, message);
  }
}
