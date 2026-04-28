import { expect } from "@playwright/test";
import { SuccessPage } from "./SuccessPage";

export class SuccessActions extends SuccessPage {

  async verifyOrderSuccess(): Promise<void> {
    await expect(this.page).toHaveURL(this.locators.successUrl);

    const heading = this.successHeading();
    await expect(heading).toBeVisible();
  }
}
