

import { test, expect } from '@playwright/test';
import { env } from '../../utils/envConfig';
import { LoginPage } from '../../pages/LoginPage';
test('Login syncs with backend: wait for response and assert UI success', async ({ page }) => {
   const login = new LoginPage(page);
   await login.navigate();
   await login.userName.fill(env.username);
   await login.password.fill(env.password);

  const [loginResponse] = await Promise.all([
    page.waitForResponse((resp) =>
      resp.url().includes('rt=account/login') &&
      resp.request().method() === 'POST'
    ),
    login.loginButton.click(),
  ]);

  // backend assertion
  expect([200, 302]).toContain(loginResponse.status());
  //UI assertion
  await expect(page).toHaveURL(/rt=account\/account/i);
 await expect(page.getByRole('link', { name: 'Logoff', exact: true }).first()).toBeVisible();

});

