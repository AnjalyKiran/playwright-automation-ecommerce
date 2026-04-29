
import { Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";
import { registerLocators } from "./register.locators";
export type RegisterUser = {
  firstName: string;
  lastName: string;
  email: string;
  loginName: string;
  password: string;
  address1: string;
  city: string;
  zipcode: string;
  country: string;
  state: string;
};

export class RegisterAccountPage extends BasePage {
  locators = registerLocators;

  private storedFirstName!: string;

  constructor(page: Page) {
    super(page);
  }

  async navigate(): Promise<void> {
    await this.page.goto("/index.php?rt=account/create");
  }

  // Field getters
  firstName() { return this.page.locator(this.locators.firstName); }
  lastName() { return this.page.locator(this.locators.lastName); }
  email() { return this.page.locator(this.locators.email); }
  loginName() { return this.page.locator(this.locators.loginName); }
  password() { return this.page.locator(this.locators.password); }
  confirmPassword() { return this.page.locator(this.locators.confirmPassword); }

  address1() { return this.page.locator(this.locators.address1); }
  city() { return this.page.locator(this.locators.city); }
  postcode() { return this.page.locator(this.locators.postcode); }

  country() { return this.page.locator(this.locators.country); }
  state() { return this.page.locator(this.locators.state); }

  agreeCheckbox() { return this.page.locator(this.locators.agreeCheckbox); }

  continueButton() {
    return this.page
      .getByRole(this.locators.continueButtonRole)
      .and(this.page.getByTitle(this.locators.continueButtonTitle));
  }

  successHeading() {
    return this.page.getByRole(
      this.locators.successHeading.role,
      { name: this.locators.successHeading.name }
    );
  }

 emailError() {
  return this.page.locator(this.locators.emailFormatError);
}



  storeFirstName(value: string) {
    this.storedFirstName = value;
  }

  storedUser() {
    return this.storedFirstName;
  }
}
