import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { env } from '../../utils/envConfig';


//Positive Scenario

test.describe('Login Tests', () => {

  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('Valid Login', async ({ page }) => {
    await loginPage.login(env.username, env.password);
    await loginPage.verifySuccessfulLogin();
  });
//Neagtive Scenario
 test('Invalid Login: User should see the error message', async ({ page }) => {
    await loginPage.login(env.username, 'Password123');
    await loginPage.verifyErrorMessage(
      'Error: Incorrect login or password provided.'
    );

  });
});



