import { Page, expect, Locator } from '@playwright/test';
import { text } from 'stream/consumers';
import { expectAlertContains } from '../utils/uiAssertions';
import { userInfo } from 'os';

export type RegisterUser = {
  firstName: string;
  lastName: string;
  email: string;
  loginName: string;
  password: string;

  address1: string;
  city: string;
  zipcode: string;

  country: string; 
  state: string;  
};


export class RegisterAccountPage {
  constructor(private page: Page) {}

  // ---------- Navigation ----------
  async navigate() {
    await this.page.goto('/index.php?rt=account/create');
  }
 private registeredUser!: string;
  async expectOnCreateAccountPage() {
    await expect(this.page).toHaveURL(/rt=account\/create/i);
  }

  // ---------- Locators (recommended first + fallbacks) ----------
  private firstNameInput(): Locator {
    return this.page.locator("//input[@id='AccountFrm_firstname']");
  }
 

  private lastNameInput(): Locator {
    return this.page.locator("//input[@id='AccountFrm_lastname']");
  }

  private emailInput(): Locator {
    return this.page.locator("//input[@id='AccountFrm_email']");
  }

  private loginNameInput(): Locator {
   
   
       return this.page.locator("//input[@id='AccountFrm_loginname']");
  }

  private passwordInput(): Locator {
    return this.page.locator("//input[@id='AccountFrm_password']");
  }

  private confirmPasswordInput(): Locator {
  return this.page.locator("//input[@id='AccountFrm_confirm']");
  }

  private address1Input(): Locator {
    return this.page.locator("//input[@id='AccountFrm_address_1']");
  }

  private cityInput(): Locator {
  return this.page.locator("//input[@id='AccountFrm_city']");
  }

  private postcodeInput(): Locator {
    return this.page.locator("//input[@id='AccountFrm_postcode']");
  }

  private countryDropdown(): Locator {
    // Country dropdown is typically select[name="country_id"]
    return this.page.locator("//select[@id='AccountFrm_country_id']");
  }

  private stateDropdown(): Locator {
    // State/Region dropdown is typically select[name="zone_id"]
      return this.page.locator("//select[@id='AccountFrm_zone_id']");
  }

  private agreeCheckbox(): Locator {
    return this.page.locator("//input[@id='AccountFrm_agree']");
  }

  private continueButton(): Locator {
    return this.page.getByRole('button').and(this.page.getByTitle('continue'));
  }

  // ---------- Actions ----------
  async fillBasicDetails(user: RegisterUser) {
   this. registeredUser=user.firstName;
   console.log(this.registeredUser);
    await this.firstNameInput().fill(user.firstName);
    await this.lastNameInput().fill(user.lastName);
     await this.loginNameInput().fill(user.loginName);
  }
  async fillEmailDetails(user: RegisterUser) {
  await this.emailInput().fill(user.email);
   
  }
  async fillInvalidEmailDetails(user: RegisterUser) {
  await this.emailInput().fill('invalid-email');
  }

  async fillPassword(password: string, confirmPassword: string) {
    await this.passwordInput().fill(password);
    await this.confirmPasswordInput().fill(confirmPassword);
  }

  async fillAddressDetails(user: RegisterUser) {
    await this.address1Input().fill(user.address1);
    await this.cityInput().fill(user.city);
    await this.postcodeInput().fill(user.zipcode);
    await this.countryDropdown().selectOption({ label: user.country });
    await expect(this.stateDropdown()).toBeVisible();
    await this.stateDropdown().selectOption({ label: user.state });
  }

  async acceptPrivacyPolicyIfPresent() {
    if (await this.agreeCheckbox().count()) {
      await this.agreeCheckbox().check();
    }
  }

  async submit() {
    await Promise.all([
      this.page.waitForURL(/rt=account\/success|rt=account\/account|rt=account\/create/i),
      this.continueButton().first().click(),
    ]);
  }

 
 async register(user: RegisterUser) {
    await this.fillBasicDetails(user);
    await this.fillEmailDetails(user);
    await this.fillPassword(user.password, user.password);
    await this.fillAddressDetails(user);
    await this.acceptPrivacyPolicyIfPresent();
    await this.submit();
  }

  // ---------- Assertions / Validations ----------
  async registrationSuccess() {
    await expect(this.page).toHaveURL(/rt=account\/success|rt=account\/account/i);
    await expect(this.page.locator('body')).toContainText(/your account has been created/i);
     await this.page.goto('/index.php?rt=account/account');
    const accountHeader = this.page.getByRole('heading', { level: 1, name: /My Account/i });
  await expect(accountHeader).toBeVisible();
  await expect(accountHeader.locator('.subtext')).toHaveText(this.registeredUser);

  }

  async expectErrorContains(message: string | RegExp) {
  await expectAlertContains(this.page, message);
}

async expectEmailError(message: string | RegExp = /e-?mail address.*valid/i) {
  
   const ErrorMessage= this.page.locator('span.help-block', { hasText: 'Email Address does not appear to be valid!' });
    await expect(ErrorMessage).toContainText(message);
  }

  async expectEmailFormatError() {
    await this.expectEmailError('Email Address does not appear to be valid!');
  }

  async expectPasswordMismatchError() {
    await this.expectErrorContains('Password confirmation does not match password');
  }
}
