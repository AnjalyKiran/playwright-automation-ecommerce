
import { Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";
import { homeLocators } from "./home.locators";

export class HomePage extends BasePage {
  locators = homeLocators;

  constructor(page: Page) {
    super(page);
  }

  productLinks() {
    return this.page.locator(this.locators.productLinks);
  }

  async navigate(): Promise<void> {
    await this.page.goto("/", { waitUntil: "domcontentloaded" });
  }
}
