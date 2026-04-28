import { expect } from "@playwright/test";
import { HomePage } from "./HomePage";

export class HomeActions extends HomePage {

  async continueToRegister(): Promise<void> {
    await this.page.getByRole("button", this.locators.loginButton).click();

    const continueBtn = this.page.getByRole("button", this.locators.continueButton);

    await Promise.all([
      this.page.waitForURL(/rt=account\/create/i),
      continueBtn.click(),
    ]);
  }

  async openFirstProductFromHome(): Promise<void> {
    await this.navigate();

    const firstProduct = this.productLinks().first();
    await expect(firstProduct).toBeVisible();
    await firstProduct.click();
  }

  async openProductByIndex(index: number): Promise<void> {
    await this.navigate();

    const product = this.productLinks().nth(index);
    await expect(product).toBeVisible();
    await product.click();
  }
}
