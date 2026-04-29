
import { Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";
import { cartLocators } from "./cart.locators";

export class CartPage extends BasePage {
  locators = cartLocators;

  constructor(page: Page) {
    super(page);
  }

  quantityInput() {
    return this.page.locator(this.locators.quantityInput).first();
  }

  updateButton() {
    return this.page.getByRole(this.locators.updateButton.role, {
      name: this.locators.updateButton.name
    });
  }

  emptyCartMessage() {
    return this.page.getByText(this.locators.emptyCartMessage);
  }

  removeButton() {
    return this.page.locator(this.locators.removeButton).first();
  }

  cartRows() {
    return this.page.locator(this.locators.cartTableRow).filter({
      has: this.page.locator(this.locators.removeButton)
    });
  }

  productNames() {
    return this.cartRows().locator(this.locators.productNameCell);
  }
}


