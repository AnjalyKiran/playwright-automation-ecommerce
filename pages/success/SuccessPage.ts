
import { Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";
import { successLocators } from "./success.locators";

export class SuccessPage extends BasePage {
  locators = successLocators;

  constructor(page: Page) {
    super(page);
  }

  successHeading() {
    return this.page
      .locator(this.locators.successHeading.selector)
      .filter({ hasText: this.locators.successHeading.text })
      .first();
  }
}

