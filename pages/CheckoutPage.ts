import { Page, expect } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {}

  async chooseGuestAndContinueIfShown() {

    const guestRadio = this.page.locator('input[type="radio"][value="guest"]');

    const continueBtn = this.page.getByRole('button').and(this.page.getByTitle('continue'));

    if (await guestRadio.count()) {
      await guestRadio.check();
      await expect(continueBtn).toBeVisible();
      await Promise.all([
        this.page.waitForLoadState('domcontentloaded'),
        continueBtn.click(),
      ]);
     
    }
  }

  async fillGuestDetails() {
    const id = Date.now();
    const uniqueEmail = `pw_user_${id}@example.com`;

    await this.page.locator('#guestFrm_firstname').fill('PAULQ');
    await this.page.locator('#guestFrm_lastname').fill(`User${id}`);
    await this.page.locator('#guestFrm_email').fill(uniqueEmail);

    await this.page.locator('#guestFrm_address_1').fill('123 Test Street');
    await this.page.locator('#guestFrm_city').fill('TestCity');
    await this.page.locator('#guestFrm_postcode').fill('12345');
   
   await this.page.locator('#guestFrm_country_id').selectOption({label:'India'});
     const state = this.page.locator('#guestFrm_zone_id');
    await expect(state).toBeVisible();           
    await state.selectOption({ label: 'Kerala' });

  }

  async continueToConfirm() {
    const continueBtn = this.page.getByRole('button', { name: /continue/i }).first();
    // click continue a few times until confirm page
    for (let i = 0; i < 4; i++) {
      if (/rt=checkout\/guest_step_3/i.test(this.page.url())) break;
      if (!(await continueBtn.isVisible().catch(() => false))) break;

      await Promise.all([
        this.page.waitForLoadState('domcontentloaded'),
        continueBtn.click(),
      ]);
    }
    await expect(this.page).toHaveURL(/rt=checkout\/guest_step_3/i);
  }

  async confirmOrder() {
    const confirmBtn = this.page.getByRole('button').and(this.page.getByTitle('Confirm Order')).first();
    await expect(confirmBtn).toBeVisible();
    await Promise.all([
      this.page.waitForURL(/rt=checkout\/success/i),
      confirmBtn.click(),
    ]);
  }
}
