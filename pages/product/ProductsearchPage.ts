
import { Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";
import { searchLocators } from "./ProductsearchPage.locators";

export class SearchPage extends BasePage {
  locators = searchLocators;

  constructor(page: Page) {
    super(page);
  }

  searchTextbox() {
    return this.page.getByRole(
      this.locators.searchTextbox.role,
      { name: this.locators.searchTextbox.name }
    );
  }

  productTitles() {
    return this.page.locator(this.locators.productTitle);
  }

  noResultsMessage() {
    return this.page.locator(`text=${this.locators.noResultsMessage}`);
  }
}

