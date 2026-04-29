
import { Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";
import { checkoutLocators } from "./checkout.locators";

export class CheckoutPage extends BasePage {
  locators = checkoutLocators;

  constructor(page: Page) {
    super(page);
  }

  guestRadio() {
    return this.page.locator(this.locators.guestRadio);
  }

  continueButton() {
    return this.page.getByRole(this.locators.continueButtonRole)
      .and(this.page.getByTitle(this.locators.continueButtonTitle));
  }

  confirmOrderButton() {
    return this.page.getByRole(this.locators.confirmButtonRole)
      .and(this.page.getByTitle(this.locators.confirmButtonTitle));
  }
}

