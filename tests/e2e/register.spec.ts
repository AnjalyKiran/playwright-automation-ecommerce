import { test } from '@playwright/test';
import { RegisterAccountPage } from '../../pages/RegisterAccountPage';
import { registerNewUser } from '../../utils/testData';

test.describe('Register (Create Account)', () => {
  let registerPage: RegisterAccountPage;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterAccountPage(page);
    await registerPage.navigate();
  });

  test('User can create account', async () => {
    const user = registerNewUser();
    await registerPage.register(user);
    await registerPage.registrationSuccess();
  });

  test('Invalid email format', async () => {
    const user = registerNewUser();

    await registerPage.fillBasicDetails(user);
    await registerPage.fillInvalidEmailDetails(user);
    await registerPage.fillPassword(user.password, user.password);
    await registerPage.fillAddressDetails(user);
    await registerPage.acceptPrivacyPolicyIfPresent();
    await registerPage.submit();

    await registerPage.expectEmailFormatError();
  });
test('Password Mismatch', async () => {
    const user = registerNewUser();

    await registerPage.fillBasicDetails(user);
    await registerPage.fillEmailDetails(user);
    await registerPage.fillPassword(user.password,'Invalid-password');
    await registerPage.fillAddressDetails(user);
    await registerPage.acceptPrivacyPolicyIfPresent();
    await registerPage.submit();

    await registerPage.expectPasswordMismatchError();
  });

});
