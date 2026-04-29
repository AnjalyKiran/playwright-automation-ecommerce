
import { Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";
import { productLocators } from "./product.locators";

export class ProductPage extends BasePage {
  locators = productLocators;

  constructor(page: Page) {
    super(page);
  }

  addToCartButton() {
    return this.page.getByRole(
      this.locators.addToCartButton.role,
      { name: this.locators.addToCartButton.name }
    ).first();
  }
}


