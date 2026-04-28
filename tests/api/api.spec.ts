
import { test, expect } from '@playwright/test';
import { Env } from "../../config/env.config";
import { LoginActions } from "../../pages/login/login.actions";

test('Login syncs with backend response and assert UI success', async ({ page }) => {
  const login = new LoginActions(page);

  await login.navigate();

  const [accountResponse] = await Promise.all([
    page.waitForResponse((resp) =>
      resp.url().includes('rt=account/account') &&
      resp.status() === 200
    ),

    login.login(
      Env.loginUser.username,
      Env.loginUser.password
    ),
  ]);

  expect(accountResponse.status()).toBe(200);

  await expect(page).toHaveURL(/rt=account\/account/i);
  await login.verifySuccessfulLogin();
});

