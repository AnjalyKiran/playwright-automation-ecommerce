import { expect } from "@playwright/test";
import { RegisterAccountPage, RegisterUser } from "./RegisterAccountPage";
import { expectAlertContains } from "../../testData/uiAssertions";

export class RegisterActions extends RegisterAccountPage {

  async expectOnCreateAccountPage(): Promise<void> {
    await expect(this.page).toHaveURL(/rt=account\/create/i);
  }

  async fillBasicDetails(user: RegisterUser): Promise<void> {
    this.storeFirstName(user.firstName);

    await this.firstName().fill(user.firstName);
    await this.lastName().fill(user.lastName);
    await this.loginName().fill(user.loginName);
  }

  async fillEmailDetails(user: RegisterUser): Promise<void> {
    await this.email().fill(user.email);
  }

  async fillInvalidEmail(): Promise<void> {
    await this.email().fill("invalid-email");
  }

  async fillPasswordFields(password: string): Promise<void> {
    await this.password().fill(password);
    await this.confirmPassword().fill(password);
  }

 async fillPasswordMissmatchFields(password: string): Promise<void> {
    await this.password().fill(password);
    await this.confirmPassword().fill("password1");
  }
  async fillAddressDetails(user: RegisterUser): Promise<void> {
    await this.address1().fill(user.address1);
    await this.city().fill(user.city);
    await this.postcode().fill(user.zipcode);

    await this.country().selectOption({ label: user.country });

    await expect(this.state()).toBeVisible();
    await this.state().selectOption({ label: user.state });
  }

  async acceptPrivacyPolicyIfPresent(): Promise<void> {
    if (await this.agreeCheckbox().count()) {
      await this.agreeCheckbox().check();
    }
  }

  async submit(): Promise<void> {
    await Promise.all([
      this.page.waitForURL(/rt=account\/success|rt=account\/account|rt=account\/create/i),
      this.continueButton().first().click(),
    ]);
  }

  async register(user: RegisterUser): Promise<void> {
    await this.fillBasicDetails(user);
    await this.fillEmailDetails(user);
    await this.fillPasswordFields(user.password);
    await this.fillAddressDetails(user);
    await this.acceptPrivacyPolicyIfPresent();
    await this.submit();
  }

  // ---------------- Assertions ----------------

  async registrationSuccess(): Promise<void> {
    await expect(this.page).toHaveURL(/rt=account\/success|rt=account\/account/i);
    await expect(this.page.locator("body")).toContainText(this.locators.successMessage);

    await this.page.goto("/index.php?rt=account/account");

    const header = this.successHeading();
  //  await expect(header).toBeVisible();
    await expect(header.locator(".subtext")).toHaveText(this.storedUser());
  }

  async expectError(message: string | RegExp): Promise<void> {
    await expectAlertContains(this.page, message);
  }

  async expectEmailError(message: string | RegExp = /Email Address does not appear to be valid!/i) {
    await expect(this.emailError()).toContainText(message);

  }

  async expectPasswordMismatchError(): Promise<void> {
    await this.expectError(/Password confirmation does not match password/i);
  }
}
