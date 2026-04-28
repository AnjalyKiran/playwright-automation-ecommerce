import { expect } from "@playwright/test";
import { CheckoutPage } from "./CheckoutPage";

export class CheckoutActions extends CheckoutPage {

  async chooseGuestAndContinueIfShown(): Promise<void> {
    const guestRadio = this.guestRadio();
    const continueBtn = this.continueButton();

    if (await guestRadio.count()) {
      await guestRadio.check();
      await expect(continueBtn).toBeVisible();

      await Promise.all([
        this.page.waitForLoadState("domcontentloaded"),
        continueBtn.click(),
      ]);
    }
  }


  async fillGuestDetails(): Promise<void> {
    const id = Date.now();
    const uniqueEmail = `pw_user_${id}@example.com`;

    await this.page.locator(this.locators.firstName).fill("PAULQ");
    await this.page.locator(this.locators.lastName).fill(`User${id}`);
    await this.page.locator(this.locators.email).fill(uniqueEmail);

    await this.page.locator(this.locators.address1).fill("123 Test Street");
    await this.page.locator(this.locators.city).fill("TestCity");
    await this.page.locator(this.locators.postcode).fill("12345");

    await this.page.locator(this.locators.country).selectOption({ label: "India" });

    const state = this.page.locator(this.locators.state);
    await expect(state).toBeVisible();
    await state.selectOption({ label: "Kerala" });
  }


  async continueToConfirm(): Promise<void> {
    const continueBtn = this.page.getByRole("button", { name: /continue/i }).first();

    for (let i = 0; i < 4; i++) {
      if (/rt=checkout\/guest_step_3/i.test(this.page.url())) break;
      if (!(await continueBtn.isVisible().catch(() => false))) break;

      await Promise.all([
        this.page.waitForLoadState("domcontentloaded"),
        continueBtn.click(),
      ]);
    }

    await expect(this.page).toHaveURL(/rt=checkout\/guest_step_3/i);
  }


  async confirmOrder(): Promise<void> {
    const confirmBtn = this.confirmOrderButton();
    await expect(confirmBtn).toBeVisible();

    await Promise.all([
      this.page.waitForURL(/rt=checkout\/success/i),
      confirmBtn.click(),
    ]);
  }
}
